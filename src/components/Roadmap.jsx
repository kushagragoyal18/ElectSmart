import { CheckCircle2, Clock3, LockKeyhole } from 'lucide-react';
import PropTypes from 'prop-types';

const statusConfig = {
  completed: {
    label: 'COMPLETED',
    icon: CheckCircle2,
    className: 'border-[#138808]/20 bg-[#138808]/5 text-[#138808]',
  },
  pending: {
    label: 'PENDING',
    icon: Clock3,
    className: 'border-[#FF9933]/20 bg-[#FF9933]/5 text-[#FF9933]',
  },
  locked: {
    label: 'LOCKED',
    icon: LockKeyhole,
    className: 'border-slate-200 bg-slate-50 text-slate-400',
  },
};

/** Lists the user's personalized voter readiness steps. */
export function Roadmap({ steps }) {
  return (
    <section className="bg-white rounded-xl border border-eci-yellow-border p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-1.5 bg-eci-blue rounded-full" />
        <div>
          <h2 className="text-xl font-bold text-eci-blue uppercase tracking-tight">Your Voter Roadmap</h2>
          <p className="text-xs font-bold text-muted uppercase tracking-widest">Personalized Action Items</p>
        </div>
      </div>
      <div className="space-y-4">
        {steps.length === 0 && <p className="text-sm text-muted">No roadmap steps are available yet.</p>}
        {steps.map((step) => {
          const config = statusConfig[step.status];
          const Icon = config.icon;
          return (
            <article
              key={step.id}
              className={`rounded-xl border p-5 transition-all ${
                step.priority 
                  ? 'border-eci-blue bg-eci-sky-bg shadow-sm' 
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-ink text-lg">{step.title}</h3>
                    {step.priority && (
                      <span className="bg-eci-blue text-[10px] text-white px-2 py-0.5 rounded font-black uppercase tracking-tighter">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted font-medium">{step.description}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border ${config.className}`}
                >
                  <Icon size={14} aria-hidden="true" />
                  {config.label}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

Roadmap.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['completed', 'pending', 'locked']).isRequired,
    priority: PropTypes.bool,
  })).isRequired,
};
