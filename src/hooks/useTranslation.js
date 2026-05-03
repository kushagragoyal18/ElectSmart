import { useVoterProfile } from '../context/VoterProfileContext.jsx';
import { translations } from '../data/translations.js';

/** Returns the active language and a safe translation lookup function. */
export function useTranslation() {
  const { language } = useVoterProfile();
  
  /** Looks up a localized string and falls back to the key when missing. */
  function t(key) {
    return translations[language][key] || key;
  }

  return { t, language };
}
