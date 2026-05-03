import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EducationCards } from './EducationCards';
import { trackEvent } from '../firebase';

vi.mock('../firebase', () => ({
  trackEvent: vi.fn(),
}));

describe('EducationCards', () => {
  it('renders education categories', () => {
    render(<EducationCards />);
    expect(screen.getByText(/Electoral Education/i)).toBeInTheDocument();
    expect(screen.getByText(/How EVMs Work/i)).toBeInTheDocument();
  });

  it('tracks card interaction', () => {
    render(<EducationCards />);
    const card = screen.getByText(/How EVMs Work/i);
    fireEvent.click(card);
    expect(trackEvent).toHaveBeenCalledWith('view_education_card', expect.any(Object));
  });

  it('is accessible with keyboard', () => {
    render(<EducationCards />);
    const card = screen.getByRole('button', { name: /How EVMs Work/i });
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(trackEvent).toHaveBeenCalled();
  });
});
