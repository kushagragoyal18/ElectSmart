import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { ERRORS } from '../constants';
import { trackEvent } from '../firebase';

/**
 * Standard Error Boundary to catch UI crashes and show a fallback.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    trackEvent('app_error', { 
      message: error.message, 
      component: this.props.componentName || 'unknown' 
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="p-8 text-center bg-red-50 rounded-2xl border-2 border-red-200 m-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-2xl font-black text-red-900 mb-2">Something went wrong</h2>
          <p className="text-red-700 mb-6 font-medium">{ERRORS.GENERIC_ERROR}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg"
          >
            <RefreshCcw size={18} />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  componentName: PropTypes.string,
};
