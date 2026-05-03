import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SmartAssistant } from './SmartAssistant.jsx';
import { renderWithProviders, sampleAction, sampleElection, sampleProfile } from '../test/testUtils.jsx';

describe('SmartAssistant', () => {
  const renderAssistant = () => renderWithProviders(
    <SmartAssistant profile={sampleProfile} election={sampleElection} nextAction={sampleAction} planState="registered" />,
  );

  it('renders the initial assistant message', () => {
    renderAssistant();
    expect(screen.getByText(/assistant/i)).toBeInTheDocument();
  });

  it('responds to quick replies', async () => {
    renderAssistant();
    await userEvent.click(screen.getByRole('button', { name: /ask assistant: how do i register/i }));
    expect(await screen.findByText(/register/i)).toBeInTheDocument();
  });

  it('ignores empty submissions', async () => {
    renderAssistant();
    expect(screen.getByRole('button', { name: /send assistant message/i })).toBeDisabled();
  });
});
