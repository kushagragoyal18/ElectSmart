import { getElectionByState } from '../data/elections.js';
import { useMemo } from 'react';
import { buildRoadmap, getNextAction, getReadiness, getPlanState } from '../utils/roadmap.js';
import { daysUntil } from '../utils/date.js';

/**
 * Hook to compute election milestones and voter readiness based on profile and election data.
 * @param {Object} profile - User's voter profile.
 * @param {Object} election - Election data for the user's state.
 * @returns {Object} Calculated plan metrics including readiness score, countdown, and next action.
 */
export function useElectionPlan(profile, election) {
  const steps = useMemo(() => buildRoadmap(profile, election), [profile, election]);
  const nextAction = useMemo(() => getNextAction(steps), [steps]);
  const readiness = useMemo(() => getReadiness(steps), [steps]);
  const daysUntilElection = useMemo(() => (election ? daysUntil(election.nextElection.date) : 0), [election]);
  const planState = useMemo(() => (profile && election ? getPlanState(profile, election) : null), [profile, election]);


  return {
    steps,
    nextAction,
    readiness,
    daysUntilElection,
    planState,
  };
}
