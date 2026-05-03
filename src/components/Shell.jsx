import { BadgeCheck, RotateCcw, Languages, LogIn, LogOut, User } from 'lucide-react';
import PropTypes from 'prop-types';
import { useVoterProfile } from '../context/VoterProfileContext.jsx';
import { useTranslation } from '../hooks/useTranslation.js';
import { useAuth } from '../context/AuthContext.jsx';
import { UI_STRINGS, trackEvent } from '../constants.js';

/**
 * Provides the shared page chrome, accessibility links, and language control.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Main content to be wrapped.
 * @param {Function} [props.onReset] - Optional callback to reset the voter profile.
 * @param {boolean} [props.hasProfile] - Whether a valid voter profile exists.
 */
export function Shell({ children, onReset = undefined, hasProfile = false }) {
  const { language, setLanguage } = useVoterProfile();
  const { t } = useTranslation();
  const { user, loginWithGoogle, logout } = useAuth();

  /** Toggles the application language and tracks the event. */
  const handleLanguageToggle = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
    trackEvent('toggle_language', { language: nextLang });
  };

  /** Initiates Google Sign-In and tracks the attempt. */
  const handleLogin = async () => {
    trackEvent('login_click');
    await loginWithGoogle();
  };

  /** Logs the user out and tracks the event. */
  const handleLogout = async () => {
    trackEvent('logout_click');
    await logout();
  };

  /** Resets the profile and tracks the event. */
  const handleReset = () => {
    trackEvent('reset_profile_click');
    if (onReset) onReset();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f9fa] font-outfit">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-civic-navy focus:shadow"
      >
        {UI_STRINGS.SKIP_TO_CONTENT}
      </a>
      {hasProfile && <div className="chakra-watermark pointer-events-none fixed -right-24 top-28 h-80 w-80 opacity-70" aria-hidden="true" />}
      
      {/* Utility Bar */}
      <div className="bg-[#1a1a1a] text-white py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex justify-between items-center text-[11px] font-bold tracking-wider uppercase">
          <div className="flex gap-4 items-center">
            <a href="#main-content" className="hover:text-eci-saffron transition-colors">{UI_STRINGS.SKIP_TO_CONTENT}</a>
            <span className="h-3 w-px bg-white/20" aria-hidden="true" />
            <span className="hover:text-eci-saffron cursor-pointer transition-colors">{UI_STRINGS.SCREEN_READER_ACCESS}</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 border-r border-white/20 pr-4">
              <span className="cursor-pointer hover:bg-white hover:text-black px-1 rounded transition-colors" aria-label="Decrease text size">A-</span>
              <span className="cursor-pointer hover:bg-white hover:text-black px-1 rounded transition-colors" aria-label="Normal text size">A</span>
              <span className="cursor-pointer hover:bg-white hover:text-black px-1 rounded transition-colors" aria-label="Increase text size">A+</span>
            </div>
            <div className="flex gap-3 items-center">
              <button 
                onClick={handleLanguageToggle}
                aria-label="Toggle language"
                className="flex items-center gap-1.5 hover:text-eci-saffron transition-colors uppercase"
              >
                <Languages size={14} aria-hidden="true" />
                <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
              </button>
              <div className="flex flex-col gap-0.5 w-5 cursor-pointer group" aria-label="Tricolor indicator">
                <div className="h-1 bg-[#FF9933] w-full" />
                <div className="h-1 bg-white w-full" />
                <div className="h-1 bg-[#138808] w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-20 ${hasProfile ? 'bg-white border-b border-eci-yellow-border shadow-sm' : 'bg-white/80 backdrop-blur-md border-b border-slate-200'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-eci-saffron rounded-xl flex items-center justify-center shadow-lg shadow-eci-saffron/20">
                <BadgeCheck className="text-white" size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xl font-black text-civic-navy tracking-tight leading-none uppercase">{t('voters_service')}</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">{t('eci_name')}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-civic-navy leading-none">{user.displayName}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{user.email}</p>
                </div>
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-9 h-9 rounded-full border-2 border-eci-saffron p-0.5 shadow-sm" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-civic-navy border border-slate-200">
                    <User size={18} aria-hidden="true" />
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title={UI_STRINGS.LOGOUT}
                  aria-label={UI_STRINGS.LOGOUT}
                >
                  <LogOut size={18} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-civic-navy px-5 text-sm font-bold text-white transition-all hover:bg-black shadow-lg shadow-civic-navy/20 active:scale-95"
              >
                <LogIn size={18} aria-hidden="true" />
                {UI_STRINGS.SIGN_IN_GOOGLE}
              </button>
            )}

            {hasProfile && (
              <button
                type="button"
                onClick={handleReset}
                aria-label={UI_STRINGS.START_OVER}
                className="inline-flex h-9 items-center gap-2 rounded-lg border-2 border-eci-saffron bg-white px-3 text-[10px] font-black text-eci-saffron transition-all hover:bg-eci-saffron hover:text-white uppercase tracking-wider"
              >
                <RotateCcw size={12} aria-hidden="true" />
                {UI_STRINGS.START_OVER}
              </button>
            )}
          </div>
        </div>
        <div className="tricolor-bar" aria-hidden="true" />
      </header>
      <main id="main-content" tabIndex={-1} className={hasProfile ? "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" : "mx-auto max-w-7xl"}>{children}</main>
    </div>
  );
}

Shell.propTypes = {
  children: PropTypes.node.isRequired,
  onReset: PropTypes.func,
  hasProfile: PropTypes.bool,
};


