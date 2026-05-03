import PropTypes from 'prop-types';

/** Displays a bounded voter readiness percentage. */
export function ProgressBar({ value }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-ink">Voting readiness</span>
        <span className="font-bold text-civic-blue">{safeValue}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}>
        <div 
          className="h-full rounded-full transition-all duration-700 ease-out" 
          style={{ 
            width: `${safeValue}%`,
            background: 'linear-gradient(to right, #FF9933, #FFFFFF, #138808)'
          }} 
        />
      </div>
      <p className="mt-2 text-sm text-muted">You are {safeValue}% ready to vote.</p>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
};
