export function ProgressBar({ value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-ink">Voting readiness</span>
        <span className="font-bold text-civic-blue">{value}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner" role="progressbar" aria-valuenow={value}>
        <div className="h-full rounded-full bg-civic-green transition-all duration-700 ease-out" style={{ width: `${value}%` }} />
      </div>
      <p className="mt-2 text-sm text-muted">You are {value}% ready to vote.</p>
    </div>
  );
}
