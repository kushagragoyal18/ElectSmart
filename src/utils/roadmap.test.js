import { describe, it, expect } from 'vitest';
import { calculateRoadmap } from './roadmap';
import { REGISTRATION_STATUS } from '../constants';

describe('roadmap utils', () => {
  it('generates correct steps for registered voter', () => {
    const profile = { age: 25, registrationStatus: REGISTRATION_STATUS.REGISTERED };
    const election = { timeline: { polling: '2024-05-20' } };
    const steps = calculateRoadmap(profile, election);
    expect(steps.some(s => s.id === 'verify-roll')).toBe(true);
    expect(steps.find(s => s.id === 'verify-roll').status).toBe('pending');
  });

  it('generates correct steps for unregistered voter', () => {
    const profile = { age: 25, registrationStatus: REGISTRATION_STATUS.NOT_REGISTERED };
    const election = { timeline: { polling: '2024-05-20' } };
    const steps = calculateRoadmap(profile, election);
    expect(steps.some(s => s.id === 'register')).toBe(true);
    expect(steps.find(s => s.id === 'register').status).toBe('pending');
  });
});
