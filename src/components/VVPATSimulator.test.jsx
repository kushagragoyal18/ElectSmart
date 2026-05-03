import { act, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { VVPATSimulator } from './VVPATSimulator.jsx';
import { renderWithProviders } from '../test/testUtils.jsx';

describe('VVPATSimulator', () => {
  it('renders without crashing', () => {
    renderWithProviders(<VVPATSimulator />);
    expect(screen.getByText(/evm & vvpat simulation/i)).toBeInTheDocument();
  });

  it('moves through voting, printing, and success states', async () => {
    vi.useFakeTimers();
    renderWithProviders(<VVPATSimulator />);
    fireEvent.click(screen.getByRole('button', { name: /vote for aditya/i }));
    expect(screen.getByText(/recording vote/i)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1500));
    expect(screen.getByText(/voter verifiable paper audit trail/i)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(7000));
    expect(screen.getByText(/vote cast successfully/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('resets after a completed simulated vote', async () => {
    vi.useFakeTimers();
    renderWithProviders(<VVPATSimulator />);
    fireEvent.click(screen.getByRole('button', { name: /vote for aditya/i }));
    act(() => vi.advanceTimersByTime(8500));
    fireEvent.click(screen.getByRole('button', { name: /reset vvpat/i }));
    expect(screen.getByText(/waiting for ballot selection/i)).toBeInTheDocument();
    vi.useRealTimers();
  });
});
