import { CheckCircle2, Clock3, LockKeyhole } from 'lucide-react';

const statusConfig = {
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    className: 'border-green-200 bg-green-50 text-civic-green',
  },
  pending: {
    label: 'Pending',
    icon: Clock3,
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  locked: {
    label: 'Locked',
    icon: LockKeyhole,
    className: 'border-red-200 bg-red-50 text-red-700',
  },
};

export function Roadmap({ steps }) {
  return (
    <section className="premium-card p-5">
      <div className="mb-5">
        <h2 className="text-xl font-extrabold text-ink">Dynamic roadmap</h2>
        <p className="mt-1 text-sm text-muted">Only relevant actions are shown for your profile.</p>
      </div>
      <div className="space-y-3">
        {steps.map((step) => {
          const config = statusConfig[step.status];
          const Icon = config.icon;
          return (
            <article
              key={step.id}
              className={`interactive-card rounded-lg border p-4 ${
                step.priority ? 'border-civic-blue bg-blue-50/70' : 'border-civic-line bg-white'
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-bold text-ink">{step.title}</h3>
                  {step.priority && (
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-civic-blue">Priority action</p>
                  )}
                  <p className="mt-1 text-sm leading-6 text-muted">{step.description}</p>
                </div>
                <span
                  className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${config.className}`}
                >
                  <Icon size={15} aria-hidden="true" />
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
