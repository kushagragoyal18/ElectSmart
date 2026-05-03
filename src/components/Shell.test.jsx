import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Shell } from './Shell';
import { VoterProfileProvider } from '../context/VoterProfileContext';
import { AuthProvider } from '../context/AuthContext';

// Mock components and contexts if needed
vi.mock('../firebase', () => ({
  auth: {},
  db: {},
  storage: {},
  trackEvent: vi.fn(),
  getFirebaseAnalytics: vi.fn(),
}));

describe('Shell', () => {
  it('renders children and skip link', () => {
    render(
      <AuthProvider>
        <VoterProfileProvider>
          <Shell>
            <div data-testid="child">Test Content</div>
          </Shell>
        </VoterProfileProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/Skip to main content/i)).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('shows sign in button when no user', () => {
    render(
      <AuthProvider>
        <VoterProfileProvider>
          <Shell />
        </VoterProfileProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/Sign In with Google/i)).toBeInTheDocument();
  });
});
