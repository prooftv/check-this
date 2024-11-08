import { describe, it, expect, vi } from 'vitest';
import type { ConfigItem, ConfigItemGroups } from '../../types';
import { resolveCallableItemGroups } from '../useItemGroups';

describe('resolveCallableItemGroups', () => {
  const mockClient = {
    fetch: vi.fn(),
  } as any;

  const staticItems: ConfigItem[] = [
    { title: 'Static Item 1', itemsToAdd: () => {} },
    { title: 'Static Item 2', itemsToAdd: () => {} },
  ];

  const callableItems: ConfigItem[] = [
    { title: 'Callable Item 1', itemsToAdd: () => {} },
    { title: 'Callable Item 2', itemsToAdd: () => {} },
  ];

  it('should handle a mix of static and callable item groups', async () => {
    const itemGroups: ConfigItemGroups = [
      {
        name: 'static-group',
        title: 'Static Group',
        items: staticItems,
      },
      {
        name: 'callable-group',
        title: 'Callable Group',
        items: async ({ client }) => {
          return callableItems;
        },
      },
    ];

    const result = await resolveCallableItemGroups(itemGroups, { client: mockClient });

    expect(result).toHaveLength(2);
    expect(result[0]?.items).toEqual(staticItems);
    expect(result[1]?.items).toEqual(callableItems);
  });

  it('should handle groups with only static items', async () => {
    const itemGroups: ConfigItemGroups = [
      {
        name: 'static-group-1',
        title: 'Static Group 1',
        items: staticItems,
      },
      {
        name: 'static-group-2',
        title: 'Static Group 2',
        items: [...staticItems],
      },
    ];

    const result = await resolveCallableItemGroups(itemGroups, { client: mockClient });

    expect(result).toHaveLength(2);
    expect(result[0]?.items).toEqual(staticItems);
    expect(result[1]?.items).toEqual(staticItems);
  });

  it('should handle failed callable groups by returning empty arrays', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const itemGroups: ConfigItemGroups = [
      {
        name: 'static-group',
        title: 'Static Group',
        items: staticItems,
      },
      {
        name: 'error-group',
        title: 'Error Group',
        items: async () => {
          throw new Error('Failed to fetch items');
        },
      },
    ];

    const result = await resolveCallableItemGroups(itemGroups, { client: mockClient });

    expect(result).toHaveLength(2);
    expect(result[0]?.items).toEqual(staticItems);
    expect(result[1]?.items).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('should handle synchronous callable groups', async () => {
    const itemGroups: ConfigItemGroups = [
      {
        name: 'sync-callable-group',
        title: 'Sync Callable Group',
        items: ({ client }) => callableItems,
      },
    ];

    const result = await resolveCallableItemGroups(itemGroups, { client: mockClient });

    expect(result).toHaveLength(1);
    expect(result[0]?.items).toEqual(callableItems);
  });

  it('should resolve multiple callable groups in parallel', async () => {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const itemGroups: ConfigItemGroups = [
      {
        name: 'callable-group-1',
        title: 'Callable Group 1',
        items: async () => {
          await delay(2);
          return callableItems;
        },
      },
      {
        name: 'callable-group-2',
        title: 'Callable Group 2',
        items: async () => {
          await delay(1);
          return [...callableItems, { title: 'Extra Item', itemsToAdd: () => {} }];
        },
      },
    ];

    const result = await resolveCallableItemGroups(itemGroups, { client: mockClient });

    expect(result).toHaveLength(2);
    expect(result[0]?.items).toHaveLength(2);
    expect(result[1]?.items).toHaveLength(3);
  });
});
