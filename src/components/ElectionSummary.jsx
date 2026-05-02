import { CalendarDays, Landmark, MapPin, ShieldCheck, UsersRound } from 'lucide-react';
import { getStateName } from '../data/elections.js';
import { formatDate } from '../utils/date.js';
import { ProgressBar } from './ProgressBar.jsx';

export function ElectionSummary({ profile, election, countdown, readiness }) {
  return (
    <section className="premium-card overflow-hidden p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold uppercase tracking-wide text-civic-blue">
            <ShieldCheck size={15} aria-hidden="true" />
            Your election plan
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink">{election.nextElection.title}</h1>
          <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
            <span className="inline-flex items-center gap-2">
              <MapPin size={17} aria-hidden="true" />
              {getStateName(profile.state)}
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={17} aria-hidden="true" />
              {formatDate(election.nextElection.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Landmark size={17} aria-hidden="true" />
              {election.nextElection.type}
            </span>
            <span className="inline-flex items-center gap-2">
              <UsersRound size={17} aria-hidden="true" />
              {election.assemblySeats ? `${election.assemblySeats} Assembly seats` : `${election.lokSabhaSeats} Lok Sabha seat${election.lokSabhaSeats > 1 ? 's' : ''}`}
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-civic-line bg-slate-50 px-6 py-5 text-center shadow-inner">
          <p className="text-sm font-semibold text-muted">Countdown</p>
          <p className="text-4xl font-extrabold text-civic-navy">{countdown}</p>
          <p className="text-sm font-semibold text-muted">days left</p>
        </div>
      </div>
      <div className="mt-6">
        <ProgressBar value={readiness} />
      </div>
      <div className="mt-5 rounded-lg border border-civic-line bg-white p-4">
        <p className="text-sm font-bold text-ink">Election timeline</p>
        <div className="mt-3 grid gap-3 text-sm text-muted sm:grid-cols-3">
          <span>Phase: {election.nextElection.phase}</span>
          <span>Year: {election.nextElection.year}</span>
          <span className="capitalize">Date status: {election.nextElection.dateStatus}</span>
        </div>
      </div>
    </section>
  );
}
