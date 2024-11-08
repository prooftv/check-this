import { describe, it, expect } from 'vitest';
import { formatConfigItemGroups } from '../formatConfigItemGroups';
import type { ConfigItemGroupNotCallable } from '../../types';

describe('formatConfigItemGroups', () => {
  it('should handle empty groups array', () => {
    const result = formatConfigItemGroups([]);
    expect(result).toEqual([]);
  });

  it('should handle items that already have variants', () => {
    const input: Array<ConfigItemGroupNotCallable> = [
      {
        name: 'testGroup',
        title: 'Test Group',
        items: [
          {
            title: 'Item with variants',
            variants: [
              {
                variantTitle: 'Variant 1',
                variantAssetUrl: 'test-url-1',
                itemsToAdd: () => [{ type: 'test' }],
              },
            ],
          },
        ],
      },
    ];

    const result = formatConfigItemGroups(input);
    expect(result).toEqual(input);
  });

  it('should transform items without variants into items with variants', () => {
    const input: Array<ConfigItemGroupNotCallable> = [
      {
        name: 'testGroup',
        title: 'Test Group',
        items: [
          {
            title: 'Single Item',
            assetUrl: 'test-url',
            itemsToAdd: [{ type: 'test' }],
          },
        ],
      },
    ];

    const expected = [
      {
        name: 'testGroup',
        title: 'Test Group',
        items: [
          {
            title: 'Single Item',
            variants: [
              {
                variantTitle: 'Single Item',
                variantAssetUrl: 'test-url',
                itemsToAdd: [{ type: 'test' }],
              },
            ],
          },
        ],
      },
    ];

    const result = formatConfigItemGroups(input);
    expect(result).toEqual(expected);
  });

  it('should handle mixed items with and without variants', () => {
    const input: Array<ConfigItemGroupNotCallable> = [
      {
        name: 'mixedGroup',
        title: 'Mixed Group',
        items: [
          {
            title: 'Item without variants',
            assetUrl: 'test-url-1',
            itemsToAdd: [{ type: 'test' }],
          },
          {
            title: 'Item with variants',
            variants: [
              {
                variantTitle: 'Variant 1',
                variantAssetUrl: 'test-url-2',
                itemsToAdd: [{ type: 'test' }],
              },
            ],
          },
        ],
      },
    ];

    const expected = [
      {
        name: 'mixedGroup',
        title: 'Mixed Group',
        items: [
          {
            title: 'Item without variants',
            variants: [
              {
                variantTitle: 'Item without variants',
                variantAssetUrl: 'test-url-1',
                itemsToAdd: [{ type: 'test' }],
              },
            ],
          },
          {
            title: 'Item with variants',
            variants: [
              {
                variantTitle: 'Variant 1',
                variantAssetUrl: 'test-url-2',
                itemsToAdd: [{ type: 'test' }],
              },
            ],
          },
        ],
      },
    ];

    const result = formatConfigItemGroups(input);
    expect(result).toEqual(expected);
  });

  it('should handle groups with non-array items (async loading case)', () => {
    const input = [
      {
        name: 'asyncGroup',
        title: 'Async Group',
        items: () => [], // Simulating async loading state
      },
    ];

    const result = formatConfigItemGroups(input);
    expect(result).toEqual([
      {
        title: 'Async Group',
        name: 'asyncGroup',
        items: [],
      },
    ]);
  });
});
