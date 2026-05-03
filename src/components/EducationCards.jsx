import { BookOpen, Info } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation.js';
import { EDUCATION_CARDS } from '../constants.js';

/** Displays horizontally scrollable civic education cards. */
export function EducationCards() {
  const { t } = useTranslation();

  return (
    <section className="premium-card p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-eci-green text-white shadow-sm">
          <BookOpen size={22} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-ink">{t('learn_title')}</h2>
          <p className="text-sm text-muted">Essential knowledge for every Indian voter.</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {EDUCATION_CARDS.map((card) => (
          <div 
            key={card.id}
            className="min-w-[280px] md:min-w-[320px] bg-white border border-slate-100 rounded-2xl p-5 shadow-sm snap-start flex flex-col gap-4 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-bold text-civic-navy">{card.title}</h3>
            <p className="text-sm text-ink leading-relaxed flex-1">
              {card.explanation}
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-3 items-start">
              <Info size={16} className="text-blue-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-0.5">Key Fact</p>
                <p className="text-xs text-blue-900 font-medium">{card.fact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
