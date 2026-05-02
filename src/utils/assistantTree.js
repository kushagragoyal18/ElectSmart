export const assistantTree = {
  start: {
    message: ({ profile, planState, nextAction }) => {
      if (!planState.isEligible) {
        return `Thanks for sharing that you are ${profile.age}. You are not eligible to vote yet, but I can help you understand when to return and what to prepare.`;
      }

      if (planState.electionPassed) {
        return 'This election date has passed. Let us shift from election-day prep to keeping your voter record ready for the next cycle.';
      }

      if (planState.registrationDeadlineMissed && !planState.isRegistered) {
        return 'The registration deadline for this election appears to have passed. That is frustrating, but you still have useful options: check official correction windows and prepare for the next roll update.';
      }

      return `I looked at your profile. The smartest next move is: ${nextAction.title.toLowerCase()}. What would you like help with?`;
    },
    options: [
      { label: 'Registration', next: 'registration' },
      { label: 'Check my status', next: 'statusCheck' },
      { label: 'Polling booth', next: 'booth' },
      { label: 'Candidates', next: 'candidates' },
      { label: 'Documents', next: 'documents' },
      { label: 'Voting day', next: 'votingDay' },
      { label: 'Deadline', next: 'deadline' },
    ],
  },
  registration: {
    message: ({ profile, election, planState }) => {
      if (!planState.isEligible) {
        return `You will need to wait until you are 18 to register. For now, bookmark the portal and keep basic identity and address documents ready.`;
      }

      if (profile.registrationStatus === 'registered') {
        return 'Good, you are past the biggest hurdle. I would not register again; I would verify your record and booth assignment instead.';
      }

      if (profile.registrationStatus === 'unsure') {
        return 'Before registering, search your voter record. If you are already listed, verifying details is safer than creating a duplicate application.';
      }

      if (planState.registrationDeadlineMissed) {
        return `The deadline passed on ${election.registration.deadline}. Check the official portal for special revision, correction windows, or the next registration cycle.`;
      }

      if (planState.urgentRegistration) {
        return `This is the priority. You have ${planState.deadlineDays} day(s) before the registration deadline, so start the application today and save the acknowledgement number.`;
      }

      return `Let's get registration done first. Complete it before ${election.registration.deadline}; after that, your roadmap becomes much simpler.`;
    },
    options: [
      { label: 'Open registration portal', action: 'registration' },
      { label: 'Search voter record', next: 'statusCheck' },
      { label: 'What comes after?', next: 'afterRegistration' },
    ],
  },
  statusCheck: {
    message: ({ profile }) =>
      profile.registrationStatus === 'registered'
        ? 'Since you marked yourself registered, use the portal to confirm your name, constituency, and voter ID details. Tiny spelling issues are worth fixing early.'
        : 'Search by your details first. If a record appears, verify it. If not, move to registration and keep your application acknowledgement.',
    options: [
      { label: 'Verify on portal', action: 'verify' },
      { label: 'Registration help', next: 'registration' },
    ],
  },
  afterRegistration: {
    message: 'Once registration is submitted, do three things: save the acknowledgement, check your voter record after it updates, and locate your booth before polling week.',
    options: [
      { label: 'Find booth', next: 'booth' },
      { label: 'Documents', next: 'documents' },
    ],
  },
  booth: {
    message: ({ profile, planState }) => {
      if (!planState.isEligible) return 'Booth assignment comes later, after you are eligible and registered.';
      if (profile.registrationStatus === 'registered') {
        return 'Use the locator now, then save the route and a backup travel plan. Polling day is easier when the location is already familiar.';
      }
      return 'Your exact booth is assigned after registration. For now, registration or status search should come first.';
    },
    options: [
      { label: 'Open Google Maps', action: 'maps' },
      { label: 'Registration help', next: 'registration' },
    ],
  },
  documents: {
    message: ({ planState }) =>
      planState.isEligible
        ? 'Keep one accepted photo ID ready, and make sure the name roughly matches your voter record. If there is a mismatch, verify early.'
        : 'You can still prepare documents now: photo ID, address proof, and date-of-birth proof will make future registration smoother.',
    options: [
      { label: 'Verify voter record', action: 'verify' },
      { label: 'Voting day help', next: 'votingDay' },
    ],
  },
  candidates: {
    message: ({ planState }) =>
      planState.isEligible
        ? 'Before voting, review candidate affidavits and official constituency notices. I would compare candidates on declared assets, cases, education, and local priorities.'
        : 'Candidate research is still useful civic learning. When you become eligible, this step helps you vote with confidence instead of relying on last-minute noise.',
    options: [
      { label: 'Open official portal', action: 'verify' },
      { label: 'Voting day help', next: 'votingDay' },
    ],
  },
  votingDay: {
    message: ({ profile, planState }) => {
      if (!planState.isEligible) return 'On voting day, only eligible registered voters can cast a vote. For now, focus on eligibility and future registration.';
      if (profile.registrationStatus !== 'registered') {
        return 'Voting-day steps unlock after registration. First register or search your voter record, then locate your booth.';
      }
      return 'On polling day, carry ID, reach your booth during polling hours, cast your vote on the EVM, and briefly verify the VVPAT slip before leaving.';
    },
    options: [
      { label: 'Find booth', next: 'booth' },
      { label: 'VVPAT help', next: 'vvpat' },
    ],
  },
  vvpat: {
    message: 'After you press the EVM button, the VVPAT window shows a slip briefly. Check that the candidate symbol matches your choice, then let the slip drop into the sealed box.',
    options: [
      { label: 'Documents', next: 'documents' },
      { label: 'Start over', next: 'start' },
    ],
  },
  deadline: {
    message: ({ election, planState }) => {
      if (planState.electionPassed) {
        return `Polling day for ${election.nextElection.title} has passed. Use the official portal for the next schedule and keep your voter record updated.`;
      }

      if (planState.registrationDeadlineMissed) {
        return `Registration closed on ${election.registration.deadline}. Polling day is ${election.nextElection.date}. Check whether any official correction or special revision window is available.`;
      }

      return `Your current election is ${election.nextElection.title}. Registration deadline: ${election.registration.deadline}. Polling day: ${election.nextElection.date}.`;
    },
    options: [
      { label: 'Next step', action: 'nextAction' },
      { label: 'Start over', next: 'start' },
    ],
  },
};

export function resolveAssistantMessage(node, context) {
  return typeof node.message === 'function' ? node.message(context) : node.message;
}
