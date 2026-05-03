import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, PROFILE_STORAGE_KEY } from '../constants.js';
import { normalizeStateId } from '../data/elections.js';
import { db, trackEvent } from '../firebase.js';
import { doc, onSnapshot, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext.jsx';

const VoterProfileContext = createContext(null);

function readStoredProfile() {
  try {
    const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!rawProfile) {
      return null;
    }

    const storedProfile = JSON.parse(rawProfile);
    if (!storedProfile?.state) {
      return null;
    }

    return { ...storedProfile, state: normalizeStateId(storedProfile.state) };
  } catch (error) {
    console.error('Error reading stored profile:', error);
    return null;
  }
}

/** Provides voter profile and localization state to descendants using Firestore. */
export function VoterProfileProvider({ children }) {
  const { user } = useAuth();
  const [profile, setProfileState] = useState(null);
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);
  const [loading, setLoading] = useState(true);

  // Sync profile from Firestore when user changes
  useEffect(() => {
    if (!db) {
      setProfileState(readStoredProfile());
      setLanguageState(localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE);
      setLoading(false);
      return undefined;
    }

    if (!user) {
      setProfileState(null);
      setLanguageState(localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE);
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.profile) {
          setProfileState({ ...data.profile, state: normalizeStateId(data.profile.state) });
        }
        if (data.language) {
          setLanguageState(data.language);
        }
      } else {
        // Handle new user or no data
        setProfileState(null);
      }
      setLoading(false);
    }, (error) => {
      console.error('Firestore onSnapshot error:', error);
      trackEvent('firestore_error', { operation: 'onSnapshot', error: error.message });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  /** Persists a normalized voter profile to Firestore. */
  async function setProfile(nextProfile) {
    const normalizedProfile = { ...nextProfile, state: normalizeStateId(nextProfile.state) };

    if (!user || !db) {
      try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(normalizedProfile));
        setProfileState(normalizedProfile);
        trackEvent('update_profile_local', { state: normalizedProfile.state });
      } catch (error) {
        console.error('Error saving local profile:', error);
      }
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { profile: normalizedProfile }, { merge: true });
      setProfileState(normalizedProfile);
      trackEvent('update_profile', { state: normalizedProfile.state });
    } catch (error) {
      console.error('Error saving profile:', error);
      trackEvent('update_profile_error', { error: error.message });
    }
  }

  /** Persists the current language preference to Firestore and localStorage (for pre-auth). */
  async function setLanguage(lang) {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { language: lang });
        trackEvent('change_language', { language: lang });
      } catch (error) {
        console.error('Error saving language:', error);
        trackEvent('change_language_error', { error: error.message });
      }
    }
  }

  /** Clears the current voter profile in Firestore. */
  async function resetProfile() {
    if (!user || !db) {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      setProfileState(null);
      return;
    }

    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { profile: null });
        trackEvent('reset_profile', { uid: user.uid });
      } catch (error) {
        console.error('Error resetting profile:', error);
        trackEvent('reset_profile_error', { error: error.message });
      }
    }

    setProfileState(null);
  }

  const value = useMemo(() => ({ 
    profile, 
    setProfile, 
    updateProfile: setProfile,
    resetProfile,
    language,
    setLanguage,
    loading
  }), [profile, language, loading]);

  return <VoterProfileContext.Provider value={value}>{!loading && children}</VoterProfileContext.Provider>;
}

VoterProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/** Returns voter profile context for components under VoterProfileProvider. */
export function useVoterProfile() {
  const context = useContext(VoterProfileContext);
  if (!context) {
    throw new Error('useVoterProfile must be used inside VoterProfileProvider');
  }
  return context;
}

