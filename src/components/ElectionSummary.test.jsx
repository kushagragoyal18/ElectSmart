import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ElectionSummary } from './ElectionSummary.jsx';
import { sampleElection, sampleProfile } from '../test/testUtils.jsx';

describe('ElectionSummary', () => {
  it('renders without crashing', () => {
    render(<ElectionSummary profile={sampleProfile} election={sampleElection} countdown={12} readiness={50} />);
    expect(screen.getByText(/andhra pradesh assembly election/i)).toBeInTheDocument();
  });

  it('shows countdown and readiness integration', () => {
    render(<ElectionSummary profile={sampleProfile} election={sampleElection} countdown={12} readiness={50} />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  it('renders Lok Sabha seat grammar for single seat', () => {
    const election = { ...sampleElection, assemblySeats: undefined, lokSabhaSeats: 1 };
    render(<ElectionSummary profile={sampleProfile} election={election} countdown={0} readiness={0} />);
    expect(screen.getByText(/1 lok sabha seat$/i)).toBeInTheDocument();
  });
});
