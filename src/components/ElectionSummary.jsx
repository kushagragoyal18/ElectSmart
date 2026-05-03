import { CalendarDays, Landmark, MapPin, ShieldCheck, UsersRound } from 'lucide-react';
import PropTypes from 'prop-types';
import { getStateName } from '../data/elections.js';
import { formatDate } from '../utils/date.js';
import { ProgressBar } from './ProgressBar.jsx';

/** Summarizes the selected election and voter readiness state. */
export function ElectionSummary({ profile, election, countdown, readiness }) {
  return (
    <section className="rounded-xl border border-eci-saffron/20 bg-white p-6 shadow-soft relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 tricolor-bar" />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded bg-[#000080] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            <ShieldCheck size={12} aria-hidden="true" />
            Voter Information
          </p>
          <h1 className="mt-3 text-3xl font-black text-[#000080]">{election.nextElection.title}</h1>
          <div className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
            <span className="inline-flex items-center gap-2 font-bold text-ink">
              <MapPin size={17} className="text-eci-saffron" aria-hidden="true" />
              {getStateName(profile.state)}
            </span>
            <span className="inline-flex items-center gap-2 font-bold text-ink">
              <CalendarDays size={17} className="text-eci-saffron" aria-hidden="true" />
              {formatDate(election.nextElection.date)}
            </span>
            <span className="inline-flex items-center gap-2 font-bold text-ink">
              <Landmark size={17} className="text-eci-saffron" aria-hidden="true" />
              {election.nextElection.type}
            </span>
            <span className="inline-flex items-center gap-2 font-bold text-ink">
              <UsersRound size={17} className="text-eci-saffron" aria-hidden="true" />
              {election.assemblySeats ? `${election.assemblySeats} Assembly seats` : `${election.lokSabhaSeats} Lok Sabha seat${election.lokSabhaSeats > 1 ? 's' : ''}`}
            </span>
          </div>
        </div>
        <div className="rounded-xl border-2 border-eci-saffron bg-eci-saffron/5 px-8 py-5 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-eci-saffron mb-1">Countdown</p>
          <p className="text-5xl font-black text-[#000080] leading-none">{countdown}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-2">Days Remaining</p>
        </div>
      </div>
      <div className="mt-6">
        <ProgressBar value={readiness} />
      </div>
      <div className="mt-5 rounded-xl border border-slate-100 bg-[#f8f9fa] p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#000080]">Election Statistics</p>
        <div className="mt-3 grid gap-4 text-sm text-ink sm:grid-cols-3">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Phase</span>
            <span className="font-bold text-lg">{election.nextElection.phase}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Year</span>
            <span className="font-bold text-lg">{election.nextElection.year}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Status</span>
            <span className="font-bold text-lg capitalize text-eci-green">{election.nextElection.dateStatus}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

ElectionSummary.propTypes = {
  profile: PropTypes.shape({
    state: PropTypes.string.isRequired,
  }).isRequired,
  election: PropTypes.shape({
    assemblySeats: PropTypes.number,
    lokSabhaSeats: PropTypes.number,
    nextElection: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      phase: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      dateStatus: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  countdown: PropTypes.number.isRequired,
  readiness: PropTypes.number.isRequired,
};
