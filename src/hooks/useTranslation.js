import { useVoterProfile } from '../context/VoterProfileContext.jsx';
import { translations } from '../data/translations.js';

/**
 * Hook to access localized translation strings based on the current application language.
 * @returns {Object} translation functions and current language.
 */
export function useTranslation() {
  const { language } = useVoterProfile();

  /**
   * Translates a key into the current language.
   * @param {string} key - The translation key.
   * @returns {string} The translated string or the key itself if not found.
   */
  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return { t, language };
}
