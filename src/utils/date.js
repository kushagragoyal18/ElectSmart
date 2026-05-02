export function daysUntil(dateString) {
  const today = new Date();
  const target = new Date(`${dateString}T00:00:00`);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((target - today) / msPerDay);
}

export function isPast(dateString) {
  return daysUntil(dateString) < 0;
}

export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${dateString}T00:00:00`));
}
