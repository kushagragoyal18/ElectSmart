import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Roadmap } from './Roadmap.jsx';
import { sampleSteps } from '../test/testUtils.jsx';

describe('Roadmap', () => {
  it('renders without crashing', () => {
    render(<Roadmap steps={sampleSteps} />);
  });

  it('shows provided roadmap steps', () => {
    render(<Roadmap steps={sampleSteps} />);
    expect(screen.getByText(/register to vote/i)).toBeInTheDocument();
  });

  it('shows an empty state when there are no steps', () => {
    render(<Roadmap steps={[]} />);
    expect(screen.getByText(/no roadmap steps/i)).toBeInTheDocument();
  });
});
