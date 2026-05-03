import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NextActionCard } from './NextActionCard.jsx';
import { sampleAction } from '../test/testUtils.jsx';

describe('NextActionCard', () => {
  it('renders without crashing', () => {
    render(<NextActionCard action={sampleAction} />);
    expect(screen.getByText(/register to vote/i)).toBeInTheDocument();
  });

  it('renders nothing for empty action state', () => {
    const { container } = render(<NextActionCard action={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('links to the provided action URL', () => {
    render(<NextActionCard action={sampleAction} />);
    expect(screen.getByRole('link', { name: /open action/i })).toHaveAttribute('href', sampleAction.actionUrl);
  });
});
