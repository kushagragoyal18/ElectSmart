import { createContext, useContext, useMemo, useState } from 'react';
import { normalizeStateId } from '../data/elections.js';

const STORAGE_KEY = 'electsmart-profile-v2';
const LANG_KEY = 'electsmart-lang';
const VoterProfileContext = createContext(null);

function readStoredProfile() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : null;
    return parsed ? { ...parsed, state: normalizeStateId(parsed.state) } : null;
  } catch {
    return null;
  }
}

function readStoredLang() {
  return localStorage.getItem(LANG_KEY) || 'en';
}

export function VoterProfileProvider({ children }) {
  const [profile, setProfileState] = useState(readStoredProfile);
  const [language, setLanguageState] = useState(readStoredLang);

  function setProfile(nextProfile) {
    const normalizedProfile = { ...nextProfile, state: normalizeStateId(nextProfile.state) };
    setProfileState(normalizedProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedProfile));
  }

  function setLanguage(lang) {
    setLanguageState(lang);
    localStorage.setItem(LANG_KEY, lang);
  }

  function resetProfile() {
    setProfileState(null);
    localStorage.removeItem(STORAGE_KEY);
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

export function useVoterProfile() {
  const context = useContext(VoterProfileContext);
  if (!context) {
    throw new Error('useVoterProfile must be used inside VoterProfileProvider');
  }
  return context;
}
