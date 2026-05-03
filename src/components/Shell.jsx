import { BadgeCheck, RotateCcw, Languages } from 'lucide-react';
import { useVoterProfile } from '../context/VoterProfileContext.jsx';
import { useTranslation } from '../hooks/useTranslation.js';

export function Shell({ children, onReset, hasProfile }) {
  const { language, setLanguage } = useVoterProfile();
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f9fa]">
      {hasProfile && <div className="chakra-watermark pointer-events-none fixed -right-24 top-28 h-80 w-80 opacity-70" />}
      
      {/* Utility Bar */}
      {hasProfile ? (
        <div className="bg-[#1a1a1a] text-white py-1.5 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex justify-between items-center text-[11px] font-bold tracking-wider uppercase">
            <div className="flex gap-4 items-center">
              <span className="hover:text-eci-saffron cursor-pointer transition-colors">Skip to Main Content</span>
              <span className="h-3 w-px bg-white/20" />
              <span className="hover:text-eci-saffron cursor-pointer transition-colors">Screen Reader Access</span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 border-r border-white/20 pr-4">
                <span className="cursor-pointer hover:bg-white hover:text-black px-1 rounded transition-colors">A-</span>
                <span className="cursor-pointer hover:bg-white hover:text-black px-1 rounded transition-colors">A</span>
                <span className="cursor-pointer hover:bg-white hover:text-black px-1 rounded transition-colors">A+</span>
              </div>
              <div className="flex gap-3 items-center">
                <button 
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="flex items-center gap-1.5 hover:text-eci-saffron transition-colors uppercase"
                >
                  <Languages size={14} />
                  <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
                </button>
                <div className="flex flex-col gap-0.5 w-5 cursor-pointer group">
                  <div className="h-1 bg-[#FF9933] w-full" />
                  <div className="h-1 bg-white w-full" />
                  <div className="h-1 bg-[#138808] w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <header className={`sticky top-0 z-20 ${hasProfile ? 'bg-white border-b border-eci-yellow-border shadow-sm' : 'bg-transparent border-none'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xl font-bold text-white tracking-tight leading-none">{t('voters_service')}</p>
              <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mt-1">{t('eci_name')}</p>
            </div>
          </div>
          {hasProfile && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-9 items-center gap-2 rounded-lg border-2 border-eci-saffron bg-white px-4 text-xs font-bold text-eci-saffron transition-all hover:bg-eci-saffron hover:text-white"
            >
              <RotateCcw size={14} aria-hidden="true" />
              {t('start_over')}
            </button>
          )}
        </div>
        {hasProfile && <div className="tricolor-bar" />}
      </header>
      <main className={hasProfile ? "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" : ""}>{children}</main>
    </div>
  );
}
