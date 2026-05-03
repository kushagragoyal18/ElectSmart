import { createContext, useContext, useEffect, useState } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, trackEvent } from '../firebase';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }

    // Set persistence to local (keeps user logged in after refresh)
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error('Auth persistence error:', error);
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        trackEvent('login_success', { uid: currentUser.uid });
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (!auth) {
      throw new Error('Firebase authentication is not configured.');
    }

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      trackEvent('login_attempt', { method: 'google', status: 'success' });
      return result.user;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      trackEvent('login_attempt', { method: 'google', status: 'error', error: error.message });
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) {
      return;
    }

    try {
      await signOut(auth);
      trackEvent('logout', { status: 'success' });
    } catch (error) {
      console.error('Logout Error:', error);
      trackEvent('logout', { status: 'error', error: error.message });
    }
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
