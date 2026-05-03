import { ChevronRight, Info } from 'lucide-react';
import { EDUCATION_CARDS } from '../constants.js';
import { trackEvent } from '../firebase.js';

/**
 * Renders interactive education cards about electoral processes.
 * Allows users to learn about EVMs, MCC, and other key concepts.
 */
export function EducationCards() {
  /**
   * Tracks when a user interacts with an education card.
   * @param {string} title - Title of the card viewed.
   */
  const handleCardClick = (title) => {
    trackEvent('view_education_card', { card_title: title });
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-eci-green text-white shadow-sm">
          <Info size={22} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-ink">Electoral Education</h2>
          <p className="text-sm text-muted">Learn how democracy works in India.</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {EDUCATION_CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.title)}
            aria-label={`Learn more about ${card.title}`}
            className="group flex flex-col text-left rounded-2xl border border-slate-100 bg-white p-6 shadow-soft transition-all hover:border-eci-green hover:shadow-lg active:scale-95"
          >
            <h3 className="text-lg font-black text-ink group-hover:text-eci-green transition-colors">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted font-medium">{card.explanation}</p>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-50 w-full">
              <span className="text-[10px] font-bold uppercase tracking-widest text-eci-green">Official Fact</span>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-eci-green transition-colors" />
            </div>
            <p className="mt-2 text-[11px] italic text-ink font-bold leading-tight">{card.fact}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
