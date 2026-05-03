import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressBar } from './ProgressBar.jsx';

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    render(<ProgressBar value={40} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('exposes accessible progress values', () => {
    render(<ProgressBar value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('clamps values above 100', () => {
    render(<ProgressBar value={140} />);
    expect(screen.getByText(/100% ready/i)).toBeInTheDocument();
  });
});
