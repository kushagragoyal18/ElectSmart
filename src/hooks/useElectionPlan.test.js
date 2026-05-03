import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useElectionPlan } from './useElectionPlan';
import { REGISTRATION_STATUS } from '../constants';

describe('useElectionPlan', () => {
  it('calculates plan for registered voter', () => {
    const profile = {
      state: 'delhi',
      age: 25,
      registrationStatus: REGISTRATION_STATUS.REGISTERED
    };
    const { result } = renderHook(() => useElectionPlan(profile));
    expect(result.current.readiness).toBeGreaterThan(50);
    expect(result.current.planState).toBe('registered');
  });

  it('calculates plan for unregistered voter', () => {
    const profile = {
      state: 'delhi',
      age: 25,
      registrationStatus: REGISTRATION_STATUS.NOT_REGISTERED
    };
    const { result } = renderHook(() => useElectionPlan(profile));
    expect(result.current.planState).toBe('unregistered');
  });

  it('handles underage profile', () => {
    const profile = {
      state: 'delhi',
      age: 15,
      registrationStatus: REGISTRATION_STATUS.NOT_REGISTERED
    };
    const { result } = renderHook(() => useElectionPlan(profile));
    expect(result.current.planState).toBe('underage');
  });
});
