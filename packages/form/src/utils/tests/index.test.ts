import { describe, it, expect } from 'vitest';
import { toCompareName, isFieldChange } from '..';

describe('toCompareName', () => {
  it('should convert string to compare name', () => {
    expect(toCompareName('a')).toBe('a');
    expect(toCompareName(['a', 'b', 'c'])).toBe('a.b.c');
  });

  it('match changed field key', () => {
    expect(isFieldChange({ a: 1 }, 'a')).toBe(true);
    expect(isFieldChange({ a: { b: { c: 1 } } }, 'a.b')).toBe(true);
    expect(isFieldChange({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(true);
  });
});
