import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, PROFILE_STORAGE_KEY } from '../constants.js';
import { normalizeStateId } from '../data/elections.js';

const VoterProfileContext = createContext(null);

/** Reads the saved voter profile from browser storage. */
function readStoredProfile() {
  try {
    const value = localStorage.getItem(PROFILE_STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : null;
    return parsed ? { ...parsed, state: normalizeStateId(parsed.state) } : null;
  } catch {
    return null;
  }
}

/** Reads the selected language from browser storage. */
function readStoredLang() {
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE;
}

/** Provides voter profile and localization state to descendants. */
export function VoterProfileProvider({ children }) {
  const [profile, setProfileState] = useState(readStoredProfile);
  const [language, setLanguageState] = useState(readStoredLang);

  /** Persists a normalized voter profile. */
  function setProfile(nextProfile) {
    const normalizedProfile = { ...nextProfile, state: normalizeStateId(nextProfile.state) };
    setProfileState(normalizedProfile);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(normalizedProfile));
  }

  /** Persists the current language preference. */
  function setLanguage(lang) {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  }

  /** Clears the current voter profile. */
  function resetProfile() {
    setProfileState(null);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  }

  const value = useMemo(() => ({ 
    profile, 
    setProfile, 
    resetProfile,
    language,
    setLanguage
  }), [profile, language]);

  return <VoterProfileContext.Provider value={value}>{children}</VoterProfileContext.Provider>;
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
