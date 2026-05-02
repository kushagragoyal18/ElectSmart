import { CalendarDays, Landmark, MapPin, ShieldCheck, UsersRound } from 'lucide-react';
import { getStateName } from '../data/elections.js';
import { formatDate } from '../utils/date.js';
import { ProgressBar } from './ProgressBar.jsx';

export function ElectionSummary({ profile, election, countdown, readiness }) {
  return (
    <section className="rounded-xl border border-eci-sky-border bg-eci-sky-bg p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded bg-eci-blue px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            <ShieldCheck size={12} aria-hidden="true" />
            Voter Information
          </p>
          <h1 className="mt-3 text-3xl font-black text-eci-blue">{election.nextElection.title}</h1>
          <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
            <span className="inline-flex items-center gap-2 font-medium">
              <MapPin size={17} className="text-eci-teal" aria-hidden="true" />
              {getStateName(profile.state)}
            </span>
            <span className="inline-flex items-center gap-2 font-medium">
              <CalendarDays size={17} className="text-eci-teal" aria-hidden="true" />
              {formatDate(election.nextElection.date)}
            </span>
            <span className="inline-flex items-center gap-2 font-medium">
              <Landmark size={17} className="text-eci-teal" aria-hidden="true" />
              {election.nextElection.type}
            </span>
            <span className="inline-flex items-center gap-2 font-medium">
              <UsersRound size={17} className="text-eci-teal" aria-hidden="true" />
              {election.assemblySeats ? `${election.assemblySeats} Assembly seats` : `${election.lokSabhaSeats} Lok Sabha seat${election.lokSabhaSeats > 1 ? 's' : ''}`}
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-[#bae6fd] bg-white px-8 py-5 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">Countdown</p>
          <p className="text-5xl font-black text-eci-blue leading-none">{countdown}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2">Days Remaining</p>
        </div>
      </div>
      <div className="mt-6">
        <ProgressBar value={readiness} />
      </div>
      <div className="mt-5 rounded-xl border border-eci-sky-border bg-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-eci-blue">Election Statistics</p>
        <div className="mt-3 grid gap-4 text-sm text-ink sm:grid-cols-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Phase</span>
            <span className="font-bold">{election.nextElection.phase}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Year</span>
            <span className="font-bold">{election.nextElection.year}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Status</span>
            <span className="font-bold capitalize">{election.nextElection.dateStatus}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
