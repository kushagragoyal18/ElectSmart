import { ArrowUpRight, Sparkles } from 'lucide-react';

export function NextActionCard({ action }) {
  if (!action) return null;

  return (
    <section className="relative overflow-hidden rounded-lg border border-civic-blue bg-civic-navy p-6 text-white shadow-soft">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-white/10" />
      <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-100">
        <Sparkles size={17} aria-hidden="true" />
        Your next step
      </div>
      <h2 className="text-2xl font-extrabold">{action.title}</h2>
      <p className="mt-3 leading-7 text-blue-50">{action.description}</p>
      {action.urgency && (
        <p className="mt-4 inline-flex rounded-full bg-white/12 px-3 py-1 text-sm font-bold text-white">
          {action.urgency}
        </p>
      )}
      <a
        href={action.actionUrl}
        target="_blank"
        rel="noreferrer"
        className="interactive-card mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-civic-navy hover:bg-blue-50"
      >
        {action.actionLabel}
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </section>
  );
}
