import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import html2canvas from 'html2canvas';
import { ShareCard } from './ShareCard.jsx';
import { renderWithProviders, sampleAction, sampleProfile } from '../test/testUtils.jsx';

vi.mock('html2canvas', () => ({
  default: vi.fn(() => Promise.resolve({ toDataURL: () => 'data:image/png;base64,test' })),
}));

describe('ShareCard', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ShareCard profile={sampleProfile} readiness={80} nextAction={sampleAction} />);
    expect(screen.getByText(/voter readiness/i)).toBeInTheDocument();
  });

  it('downloads the card through html2canvas', async () => {
    renderWithProviders(<ShareCard profile={sampleProfile} readiness={80} nextAction={sampleAction} />);
    await userEvent.click(screen.getByRole('button', { name: /download readiness/i }));
    expect(html2canvas).toHaveBeenCalled();
  });

  it('handles browser share when available', async () => {
    const share = vi.fn();
    Object.defineProperty(navigator, 'share', { configurable: true, value: share });
    renderWithProviders(<ShareCard profile={sampleProfile} readiness={80} nextAction={sampleAction} />);
    await userEvent.click(screen.getByRole('button', { name: /share readiness/i }));
    expect(share).toHaveBeenCalled();
  });
});
