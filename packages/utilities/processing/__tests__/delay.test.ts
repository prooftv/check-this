import { describe, it, expect } from 'vitest';
import { delay } from '../delay';

describe('delay', () => {
  it('should resolve after specified time', async () => {
    const startTime = Date.now();
    const delayTime = 5;

    await delay(delayTime);
    const endTime = Date.now();
    const elapsed = endTime - startTime;

    // Allow for small timing variations
    expect(elapsed).toBeGreaterThanOrEqual(delayTime - 1);
  });

  it('should resolve with provided value', async () => {
    const value = { test: 'data' };
    const result = await delay(1, value);

    expect(result).toBe(value);
  });

  it('should resolve with undefined if no value provided', async () => {
    const result = await delay(1);

    expect(result).toBeUndefined();
  });

  it('should work with zero delay', async () => {
    const value = 'test';
    const result = await delay(0, value);

    expect(result).toBe(value);
  });
});
