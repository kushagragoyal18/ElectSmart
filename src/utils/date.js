const MS_PER_DAY = 1000 * 60 * 60 * 24;

/** Returns the number of calendar days until a YYYY-MM-DD date. */
export function daysUntil(dateString) {
  const today = new Date();
  const target = new Date(`${dateString}T00:00:00`);
  return Math.ceil((target - today) / MS_PER_DAY);
}

/** Returns whether a YYYY-MM-DD date is before today. */
export function isPast(dateString) {
  return daysUntil(dateString) < 0;
}

/** Formats a YYYY-MM-DD date for Indian English readers. */
export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${dateString}T00:00:00`));
}
