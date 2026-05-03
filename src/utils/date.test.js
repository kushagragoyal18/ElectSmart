import { describe, it, expect } from 'vitest';
import { formatDate, isPast } from './date';

describe('date utils', () => {
  it('formatDate formats date strings correctly', () => {
    expect(formatDate('2024-05-20')).toBe('May 20, 2024');
  });

  it('isPast correctly identifies past dates', () => {
    const pastDate = '2020-01-01';
    const futureDate = '2099-01-01';
    expect(isPast(pastDate)).toBe(true);
    expect(isPast(futureDate)).toBe(false);
  });
});
