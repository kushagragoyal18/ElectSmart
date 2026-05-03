import { useVoterProfile } from '../context/VoterProfileContext.jsx';
import { translations } from '../data/translations.js';

export function useTranslation() {
  const { language } = useVoterProfile();
  
  function t(key) {
    return translations[language][key] || key;
  }

  return { t, language };
}
