import { BadgeCheck, RotateCcw } from 'lucide-react';

export function Shell({ children, onReset, hasProfile }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="chakra-watermark pointer-events-none fixed -right-24 top-28 h-80 w-80 opacity-70" />
      <div className="h-2 bg-[#3f4095]" />
      <header className="sticky top-0 z-20 border-b border-eci-yellow-border bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-eci-blue p-1">
              <img src="https://voters.eci.gov.in/static/media/eci-logo-white.76f4e153.png" alt="ECI Logo" className="invert brightness-0 h-full w-auto" />
            </div>
            <div>
              <p className="text-xl font-bold text-eci-blue tracking-tight">Voters' Service Portal</p>
              <p className="text-xs font-bold text-muted uppercase tracking-wider">Election Commission of India</p>
            </div>
          </div>
          {hasProfile && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-eci-blue bg-white px-4 text-xs font-bold text-eci-blue transition-colors hover:bg-eci-blue hover:text-white"
            >
              <RotateCcw size={14} aria-hidden="true" />
              LOGOUT / RESET
            </button>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
