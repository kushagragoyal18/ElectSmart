import { getElectionByState } from '../data/elections.js';
import { daysUntil } from '../utils/date.js';
import { buildRoadmap, getNextAction, getPlanState, getReadiness } from '../utils/roadmap.js';

/** Derives all election planning data for a voter profile. */
export function useElectionPlan(profile) {
  const election = profile ? getElectionByState(profile.state) : null;
  const steps = profile && election ? buildRoadmap(profile, election) : [];
  const nextAction = getNextAction(steps);
  const readiness = getReadiness(steps);
  const countdown = election ? Math.max(daysUntil(election.nextElection.date), 0) : 0;
  const planState = profile && election ? getPlanState(profile, election) : null;

  return {
    election,
    steps,
    nextAction,
    readiness,
    countdown,
    planState,
  };
}
