import { render } from '@testing-library/react';
import { VoterProfileProvider } from '../context/VoterProfileContext.jsx';

export const sampleProfile = {
  state: 'andhra-pradesh',
  age: 24,
  registrationStatus: 'registered',
};

export const sampleElection = {
  name: 'Andhra Pradesh',
  assemblySeats: 175,
  pollingSearch: 'polling booth Andhra Pradesh',
  registration: {
    deadline: '2029-03-15',
    portal: 'https://voters.eci.gov.in/',
  },
  nextElection: {
    title: 'Andhra Pradesh Assembly Election',
    date: '2029-04-15',
    type: 'Assembly',
    phase: 'Single phase',
    year: 2029,
    dateStatus: 'estimated',
  },
  timeline: {
    announcement: '2029-02-01',
    registration: '2029-03-15',
    nomination: '2029-03-20',
    campaign: '2029-03-25',
    polling: '2029-04-15',
    counting: '2029-04-20',
    results: '2029-04-21',
  },
};

export const sampleAction = {
  id: 'register',
  title: 'Register to vote',
  description: 'Complete your voter registration.',
  urgency: 'Soon',
  actionLabel: 'Register now',
  actionUrl: 'https://voters.eci.gov.in/',
};

export const sampleSteps = [
  {
    id: 'eligibility',
    title: 'Confirm voter eligibility',
    description: 'You meet the age requirement.',
    status: 'completed',
    priority: false,
  },
  {
    id: 'register',
    title: 'Register to vote',
    description: 'Complete registration before the deadline.',
    status: 'pending',
    priority: true,
  },
  {
    id: 'documents',
    title: 'Prepare voting documents',
    description: 'Keep voter ID ready.',
    status: 'locked',
    priority: false,
  },
];

export function renderWithProviders(ui) {
  localStorage.clear();
  return render(<VoterProfileProvider>{ui}</VoterProfileProvider>);
}
