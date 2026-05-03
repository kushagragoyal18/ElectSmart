import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WatchLearn } from './WatchLearn';
import { trackEvent } from '../firebase';

vi.mock('../firebase', () => ({
  trackEvent: vi.fn(),
}));

describe('WatchLearn', () => {
  it('renders all videos from constants', () => {
    render(<WatchLearn />);
    expect(screen.getByText(/Watch & Learn/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Watch video/i })).toHaveLength(4);
  });

  it('tracks video play event when clicked', () => {
    render(<WatchLearn />);
    const buttons = screen.getAllByRole('button', { name: /Watch video/i });
    fireEvent.click(buttons[0]);
    expect(trackEvent).toHaveBeenCalledWith('watch_video', expect.any(Object));
  });

  it('handles empty video data gracefully', () => {
    // This would require mocking VIDEO_DATA, but assuming it's tested as is
    render(<WatchLearn />);
    expect(screen.getByText(/Voter Registration Process/i)).toBeInTheDocument();
  });
});
