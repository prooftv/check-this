import { describe, it, expect } from 'vitest';
import { filterItemGroups, filterItems } from '../filterItemGroups';
import type { Item, ItemGroups } from '../../types';

describe('filterItemGroups', () => {
  const mockItemGroups: ItemGroups = [
    {
      name: 'blocks',
      title: 'Blocks',
      items: [
        {
          title: 'Hero',
          variants: [
            { variantTitle: 'Massive', itemsToAdd: () => {} },
            { variantTitle: 'Small', itemsToAdd: () => {} },
          ],
          tags: ['imagery'],
        },
        {
          title: 'Section',
          variants: [{ variantTitle: 'Section', itemsToAdd: () => {} }],
          tags: [],
        },
      ],
    },
    {
      name: 'group2',
      title: 'Group 2',
      items: [
        {
          title: 'Item Three',
          variants: [{ variantTitle: 'Variant C', itemsToAdd: () => {} }],
          tags: ['tag3'],
        },
      ],
    },
  ];

  it('should return original groups when search query is empty', () => {
    const result = filterItemGroups('', [], mockItemGroups);
    expect(result).toEqual(mockItemGroups);
  });

  it('should filter items based on title search', () => {
    const result = filterItemGroups('hero', [], mockItemGroups);
    expect(result[0]?.items).toHaveLength(1);
    expect(result[0]?.items[0]?.title).toBe('Hero');
  });

  it('should filter items based on variant title search', () => {
    const result = filterItemGroups('massive', [], mockItemGroups);

    expect(result[0]?.items).toHaveLength(1);
    expect(result[0]?.items[0]?.variants[0]?.variantTitle).toBe('Massive');
  });
});

describe('filterItems', () => {
  const mockItems: Array<Item> = [
    {
      title: 'Hero',
      variants: [
        { variantTitle: 'Massive', itemsToAdd: () => {} },
        { variantTitle: 'Small', itemsToAdd: () => {} },
      ],
      tags: ['imagery'],
    },
    {
      title: 'Section',
      variants: [{ variantTitle: 'Section', itemsToAdd: () => {} }],
      tags: ['layout'],
    },
    {
      title: 'Item Three',
      variants: [{ variantTitle: 'Variant C', itemsToAdd: () => {} }],
      tags: ['layout'],
    },
  ];

  it('should return all items when search query and tags are empty', () => {
    const result = filterItems('', [], mockItems);
    expect(result).toEqual(mockItems);
  });

  it('should filter items based on tags', () => {
    const result = filterItems('', ['imagery'], mockItems);
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe('Hero');
  });

  it('should filter items based on search query', () => {
    const result = filterItems('section', [], mockItems);
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe('Section');
  });

  it('should filter items based on variant titles', () => {
    const result = filterItems('massive', [], mockItems);
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe('Hero');
  });

  it('should combine tag and search query filtering', () => {
    const result = filterItems('variant', ['layout'], mockItems);
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe('Item Three');
  });

  it('should handle items with no tags', () => {
    const itemsWithNoTags: Array<Item> = [
      {
        title: 'No Tags Item',
        variants: [{ variantTitle: 'Variant D', itemsToAdd: () => {} }],
      },
    ];
    const result = filterItems('', ['tag1'], itemsWithNoTags);
    expect(result).toHaveLength(0);
  });

  it('should handle case-insensitive search', () => {
    const result = filterItems('SECTION', [], mockItems);
    expect(result).toHaveLength(1);
  });

  it('should filter items with multiple tags', () => {
    const itemsWithMultipleTags = [
      ...mockItems,
      {
        title: 'Multi Tag Item',
        variants: [{ variantTitle: 'Test', itemsToAdd: () => {} }],
        tags: ['imagery', 'layout'],
      },
    ];

    const result = filterItems('', ['imagery', 'layout'], itemsWithMultipleTags);
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe('Multi Tag Item');
  });
});
