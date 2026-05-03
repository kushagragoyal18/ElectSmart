import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MapsLocator } from './MapsLocator.jsx';
import { sampleElection } from '../test/testUtils.jsx';

describe('MapsLocator', () => {
  it('renders without crashing', () => {
    render(<MapsLocator election={sampleElection} />);
    expect(screen.getByText(/polling booth locator/i)).toBeInTheDocument();
  });

  it('uses Google Maps embed for the iframe', () => {
    render(<MapsLocator election={sampleElection} />);
    expect(screen.getByTitle(/google maps polling booth/i)).toHaveAttribute('src', expect.stringContaining('google.com/maps'));
  });

  it('renders an external Google Maps link', () => {
    render(<MapsLocator election={sampleElection} />);
    expect(screen.getByRole('link', { name: /open polling booth/i })).toHaveAttribute('href', expect.stringContaining('google.com/maps/search'));
  });
});
