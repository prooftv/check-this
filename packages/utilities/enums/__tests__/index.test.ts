import { describe, expect, it } from 'vitest';
import { enumValues } from '../index';

describe('enumValues', () => {
  it('extracts enum values correctly', () => {
    enum TestEnum {
      A = 'ValueA',
      B = 'ValueB',
      C = 'ValueC',
    }

    const values = enumValues(TestEnum);
    expect(values).toEqual(['ValueA', 'ValueB', 'ValueC']);
  });

  it('handles numeric enums', () => {
    enum NumericEnum {
      A = 1,
      B = 2,
      C = 3,
    }

    const values = enumValues(NumericEnum);
    expect(values).toEqual(['A', 'B', 'C']);
  });

  it('handles mixed enums', () => {
    enum MixedEnum {
      A = 'ValueA',
      B = 1,
      C = 'ValueC',
    }

    const values = enumValues(MixedEnum);
    expect(values).toEqual(['B', 'ValueA', 'ValueC']);
  });
});
