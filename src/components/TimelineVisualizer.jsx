import { Calendar, CheckCircle2, Circle } from 'lucide-react';
import PropTypes from 'prop-types';
import { useTranslation } from '../hooks/useTranslation.js';
import { formatDate, isPast } from '../utils/date.js';

/** Displays election milestones in chronological order. */
export function TimelineVisualizer({ election = null }) {
  const { t } = useTranslation();

  if (!election || !election.timeline) return null;

  const milestones = [
    { 
      label: t('milestone_announcement'), 
      date: election.timeline.announcement,
      description: 'ECI officially announces the election schedule and MCC begins.'
    },
    { 
      label: t('milestone_deadline'), 
      date: election.timeline.registration,
      description: 'The final date to submit your voter registration or correction forms.'
    },
    { 
      label: t('milestone_nomination'), 
      date: election.timeline.nomination,
      description: 'Candidates file their official nomination papers and affidavits.'
    },
    { 
      label: t('milestone_campaign'), 
      date: election.timeline.campaign,
      description: 'Active political campaigning and public meetings period.'
    },
    { 
      label: t('milestone_polling'), 
      date: election.timeline.polling,
      description: 'Citizens cast their votes at their respective polling stations.'
    },
    { 
      label: t('milestone_counting'), 
      date: election.timeline.counting,
      description: 'Votes from EVMs and postal ballots are tallied securely.'
    },
    { 
      label: t('milestone_result'), 
      date: election.timeline.results,
      description: 'Official declaration of winning candidates and party positions.'
    },
  ];

  return (
    <section className="premium-card p-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-eci-saffron text-white shadow-sm">
          <Calendar size={22} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-ink">{t('timeline_title')}</h2>
          <p className="text-sm text-muted">Key milestones for {election.name}.</p>
        </div>
      </div>

      <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
        {milestones.map((milestone, index) => {
          const past = isPast(milestone.date);
          const current = !past && (index === 0 || isPast(milestones[index - 1].date));
          
          return (
            <div key={index} className="relative group">
              <div className={`absolute -left-[30px] top-1 p-0.5 rounded-full bg-white z-10 transition-all ${
                past ? 'text-eci-green' : current ? 'text-eci-saffron' : 'text-slate-300'
              }`}>
                {past ? (
                  <CheckCircle2 size={18} fill="currentColor" className="text-white" />
                ) : (
                  <div className={`w-[18px] h-[18px] rounded-full border-4 ${
                    current ? 'border-eci-saffron bg-eci-saffron' : 'border-slate-200 bg-white'
                  }`} />
                )}
              </div>
              
              <div className={`transition-opacity ${!past && !current ? 'opacity-60' : 'opacity-100'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${
                  current ? 'text-eci-saffron' : 'text-slate-500'
                }`}>
                  {formatDate(milestone.date)}
                </p>
                <h3 className={`font-bold mt-1 ${
                  current ? 'text-civic-navy text-lg' : 'text-ink'
                }`}>
                  {milestone.label}
                </h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

TimelineVisualizer.propTypes = {
  election: PropTypes.shape({
    name: PropTypes.string,
    timeline: PropTypes.shape({
      announcement: PropTypes.string,
      registration: PropTypes.string,
      nomination: PropTypes.string,
      campaign: PropTypes.string,
      polling: PropTypes.string,
      counting: PropTypes.string,
      results: PropTypes.string,
    }),
  }),
};
