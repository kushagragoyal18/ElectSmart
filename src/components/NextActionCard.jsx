import { ArrowUpRight, Sparkles } from 'lucide-react';
import PropTypes from 'prop-types';
import { trackEvent } from '../firebase.js';

/**
 * Highlights the next recommended voter action.
 * @param {Object} props
 * @param {Object} props.action - The next action object.
 */
export function NextActionCard({ action = null }) {
  if (!action) return null;

  /**
   * Tracks when a user clicks the primary action button.
   */
  const handleActionClick = () => {
    trackEvent('next_action_click', { action_title: action.title });
  };

  return (
    <section className="relative overflow-hidden rounded-lg border border-civic-blue bg-civic-navy p-6 text-white shadow-soft">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-white/10" aria-hidden="true" />
      <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-100">
        <Sparkles size={17} aria-hidden="true" />
        Your next step
      </div>
      <h2 className="text-2xl font-extrabold">{action.title}</h2>
      <p className="mt-3 leading-7 text-blue-50">{action.description}</p>
      {action.urgency && (
        <p className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white border border-white/20">
          {action.urgency}
        </p>
      )}
      <a
        href={action.actionUrl}
        target="_blank"
        rel="noreferrer"
        onClick={handleActionClick}
        className="interactive-card mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-civic-navy hover:bg-blue-50 transition-all active:scale-95 shadow-lg"
        aria-label={`Perform action: ${action.actionLabel} for ${action.title}`}
      >
        {action.actionLabel}
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </section>
  );
}

NextActionCard.propTypes = {
  action: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urgency: PropTypes.string,
    actionUrl: PropTypes.string.isRequired,
    actionLabel: PropTypes.string.isRequired,
  }),
};
