import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Quiz } from './Quiz.jsx';
import { renderWithProviders } from '../test/testUtils.jsx';

describe('Quiz', () => {
  it('renders the start state', () => {
    renderWithProviders(<Quiz />);
    expect(screen.getByText(/ready to test/i)).toBeInTheDocument();
  });

  it('starts the quiz from the button', async () => {
    renderWithProviders(<Quiz />);
    await userEvent.click(screen.getByRole('button', { name: /start quiz/i }));
    expect(screen.getByText(/minimum voting age/i)).toBeInTheDocument();
  });

  it('advances after an answer is selected', async () => {
    renderWithProviders(<Quiz />);
    await userEvent.click(screen.getByRole('button', { name: /start quiz/i }));
    await userEvent.click(screen.getByRole('button', { name: /answer 18 years/i }));
    expect(screen.getByText(/evm stand for/i)).toBeInTheDocument();
  });

  it('shows results and allows retry', async () => {
    renderWithProviders(<Quiz />);
    await userEvent.click(screen.getByRole('button', { name: /start quiz/i }));
    for (const label of [/answer 18 years/i, /answer electronic voting machine/i, /answer 1950/i, /answer to provide/i, /answer immediately/i]) {
      await userEvent.click(screen.getByRole('button', { name: label }));
    }
    expect(screen.getByText('5/5')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /retry quiz/i }));
    expect(screen.getByText(/minimum voting age/i)).toBeInTheDocument();
  });
});
