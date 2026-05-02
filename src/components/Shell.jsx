import { BadgeCheck, RotateCcw } from 'lucide-react';

export function Shell({ children, onReset, hasProfile }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="chakra-watermark pointer-events-none fixed -right-24 top-28 h-80 w-80 opacity-70" />
      <div className="h-1.5 bg-gradient-to-r from-civic-saffron via-white to-civic-green" />
      <header className="sticky top-0 z-20 border-b border-civic-line/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-civic-navy text-white shadow-sm">
              <BadgeCheck size={23} aria-hidden="true" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-civic-navy">ElectSmart Assistant</p>
              <p className="text-sm font-medium text-muted">Personal voting readiness guide</p>
            </div>
          </div>
          {hasProfile && (
            <button
              type="button"
              onClick={onReset}
              className="interactive-card inline-flex h-10 items-center gap-2 rounded-lg border border-civic-line bg-white px-3 text-sm font-semibold text-civic-navy hover:border-civic-blue hover:bg-slate-50"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Reset
            </button>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
