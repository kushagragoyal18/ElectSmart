import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Onboarding } from './Onboarding.jsx';
import { renderWithProviders } from '../test/testUtils.jsx';

describe('Onboarding', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Onboarding onComplete={vi.fn()} />);
    expect(screen.getByRole('heading', { name: /elect/i })).toBeInTheDocument();
  });

  it('submits a valid voter profile', async () => {
    const onComplete = vi.fn();
    renderWithProviders(<Onboarding onComplete={onComplete} />);
    await userEvent.click(screen.getByRole('button', { name: /start voter readiness/i }));
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({ age: 18, state: 'andhra-pradesh' }));
  });

  it('shows an accessible age error for invalid input', async () => {
    const onComplete = vi.fn();
    renderWithProviders(<Onboarding onComplete={onComplete} />);
    await userEvent.clear(screen.getByLabelText('Age'));
    await userEvent.type(screen.getByLabelText('Age'), '130');
    await userEvent.click(screen.getByRole('button', { name: /start voter readiness/i }));
    expect(screen.getByText(/enter an age/i)).toBeInTheDocument();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('updates registration status through radio controls', async () => {
    renderWithProviders(<Onboarding onComplete={vi.fn()} />);
    await userEvent.click(screen.getByLabelText(/^registered$/i));
    expect(screen.getByLabelText(/^registered$/i)).toBeChecked();
  });
});
