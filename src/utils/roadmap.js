import { daysUntil, formatDate, isPast } from './date.js';
import { GOOGLE_MAPS_SEARCH_BASE_URL, MIN_VOTER_AGE } from '../constants.js';

/** Builds normalized plan-state flags from a profile and election record. */
export function getPlanState(profile, election) {
  if (!profile || !election) return null;

  const age = Number(profile.age);
  const isEligible = age >= MIN_VOTER_AGE;
  const isRegistered = profile.registrationStatus === 'registered';
  const isUnsure = profile.registrationStatus === 'unsure';
  const deadlineDays = daysUntil(election.registration.deadline);
  const electionDays = daysUntil(election.nextElection.date);

  return {
    age,
    isEligible,
    isRegistered,
    isUnsure,
    deadlineDays,
    electionDays,
    registrationDeadlineMissed: deadlineDays < 0,
    electionPassed: electionDays < 0,
    urgentRegistration: deadlineDays >= 0 && deadlineDays <= 14,
  };
}

/** Returns the roadmap status for registration-related work. */
function getRegistrationStatus(planState) {
  if (!planState.isEligible) return 'locked';
  if (planState.isRegistered) return 'completed';
  if (planState.isUnsure) return 'locked';
  if (planState.registrationDeadlineMissed) return 'locked';
  return 'pending';
}

/** Returns whether the voter still needs to register. */
function requiresRegistration(planState) {
  return planState.isEligible && !planState.isRegistered && !planState.isUnsure;
}

/** Builds the personalized voter readiness roadmap. */
export function buildRoadmap(profile, election) {
  if (!profile || !election) return [];

  const planState = getPlanState(profile, election);
  const registrationStatus = getRegistrationStatus(planState);

  const steps = [
    {
      id: 'eligibility',
      title: 'Confirm voter eligibility',
      description: planState.isEligible
        ? 'You meet the age requirement. Now focus on registration and booth details.'
        : 'You are not eligible yet. Save the registration portal and return when you turn 18.',
      status: planState.isEligible ? 'completed' : 'locked',
      priority: !planState.isEligible,
      actionLabel: 'Check eligibility rules',
      actionUrl: election.registration.portal,
    },
    {
      id: 'register',
      title: 'Register to vote',
      description: planState.registrationDeadlineMissed
        ? `The registration deadline passed on ${formatDate(election.registration.deadline)}. Check the official portal for correction windows or the next roll update.`
        : `Complete registration before ${formatDate(election.registration.deadline)}. ${planState.urgentRegistration ? 'This is urgent.' : ''}`,
      status: registrationStatus,
      priority: requiresRegistration(planState),
      urgency: planState.registrationDeadlineMissed
        ? 'Deadline missed'
        : `${planState.deadlineDays} day(s) until registration deadline`,
      hidden: planState.isRegistered,
      actionLabel: planState.registrationDeadlineMissed ? 'Check options' : 'Register now',
      actionUrl: election.registration.portal,
    },
    {
      id: 'registration-check',
      title: 'Check if you are already registered',
      description: 'Search your voter record before starting a new registration. It can prevent duplicate applications.',
      status: planState.isUnsure ? 'pending' : 'completed',
      priority: planState.isEligible && planState.isUnsure,
      hidden: !planState.isUnsure,
      actionLabel: 'Search voter record',
      actionUrl: election.registration.portal,
    },
    {
      id: 'voter-id',
      title: 'Get voter ID',
      description: 'Download or verify your EPIC/voter ID details once your registration appears in the roll.',
      status: planState.isRegistered ? 'pending' : 'locked',
      priority: planState.isEligible && planState.isRegistered,
      urgency: 'Confirm before polling week',
      actionLabel: 'Open voter portal',
      actionUrl: election.registration.portal,
    },
    {
      id: 'polling-booth',
      title: 'Find your polling booth',
      description: 'Locate your assigned polling station and plan your route.',
      status: planState.isRegistered ? 'pending' : 'locked',
      priority: false,
      actionLabel: 'Open booth locator',
      actionUrl: `${GOOGLE_MAPS_SEARCH_BASE_URL}/${encodeURIComponent(election.pollingSearch)}`,
    },
    {
      id: 'candidates',
      title: 'Know candidates',
      description: 'Review candidate affidavits, constituency information, and official updates before polling week.',
      status: planState.isEligible && !planState.electionPassed ? 'pending' : 'locked',
      priority: false,
      actionLabel: 'View official portal',
      actionUrl: election.registration.portal,
    },
    {
      id: 'documents',
      title: 'Prepare voting documents',
      description: 'Keep voter ID or an accepted photo identity document ready.',
      status: planState.isRegistered ? 'pending' : 'locked',
      priority: false,
      actionLabel: 'View document list',
      actionUrl: election.registration.portal,
    },
    {
      id: 'cast-vote',
      title: 'Cast vote',
      description: `Vote during the official polling window for ${election.nextElection.title}.`,
      status: planState.isRegistered && !planState.electionPassed ? 'pending' : 'locked',
      priority: planState.isRegistered && planState.electionDays <= 7 && !planState.electionPassed,
      urgency: `${Math.max(planState.electionDays, 0)} day(s) until polling`,
      actionLabel: 'Find polling booth',
      actionUrl: `${GOOGLE_MAPS_SEARCH_BASE_URL}/${encodeURIComponent(election.pollingSearch)}`,
    },
    {
      id: 'vvpat',
      title: 'Verify VVPAT',
      description: 'After pressing the EVM button, check the VVPAT slip briefly to confirm your vote selection.',
      status: planState.isRegistered && planState.electionDays <= 0 ? 'pending' : 'locked',
      priority: false,
      actionLabel: 'Learn voting steps',
      actionUrl: election.registration.portal,
    },
    {
      id: 'missed-election',
      title: 'Plan for the next election cycle',
      description: 'This election date has passed. Keep your voter record active and watch for the next announced schedule.',
      status: 'pending',
      priority: planState.electionPassed,
      hidden: !planState.electionPassed,
      actionLabel: 'Check latest schedule',
      actionUrl: election.registration.portal,
    },
  ];

  return steps.filter((step) => !step.hidden);
}

/** Selects the highest-priority next action from roadmap steps. */
export function getNextAction(steps) {
  return steps.find((step) => step.priority) ?? steps.find((step) => step.status === 'pending') ?? steps[0];
}

/** Calculates readiness from completed actionable roadmap steps. */
export function getReadiness(steps) {
  if (!steps.length) return 0;
  const actionable = steps.filter((step) => step.status !== 'locked');
  if (!actionable.length) return 0;
  const completed = actionable.filter((step) => step.status === 'completed').length;
  return Math.round((completed / actionable.length) * 100);
}
