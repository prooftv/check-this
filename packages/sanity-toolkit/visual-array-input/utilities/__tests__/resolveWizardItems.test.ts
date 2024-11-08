import { describe, it, expect } from 'vitest';
import { resolveWizardItems } from '../resolveWizardItems';
import { WIZARD_ITEMS } from '../../constants';
import type { ArrayOfObjectsInputProps } from 'sanity';
import type { ConfigItem, ConfigItemGroups } from '../../types';

describe('resolveWizardItems', () => {
  it('should return unmodified groups when not using FROM_SCHEMA', () => {
    const configItemGroups: ConfigItemGroups = [
      {
        name: 'test-group',
        title: 'Test Group',
        items: [
          {
            title: 'Test Item',
            itemsToAdd: [{ type: 'test' }],
          },
        ],
      },
    ];

    const props = {
      schemaType: {
        of: [
          {
            name: 'testSchema',
            jsonType: 'object',
            fields: [
              {
                name: 'title',
                type: {
                  name: 'testField1',
                  jsonType: 'string',
                  initialValue: 'Default Title',
                },
              },
              { name: 'tags', type: { name: 'testField2', jsonType: 'array', of: [] } },
              {
                name: 'metadata',
                type: {
                  name: 'testField3',
                  jsonType: 'object',
                  fields: [],
                  to: [],
                },
              },
            ],
          },
        ],
      },
    } as ArrayOfObjectsInputProps;

    const result = resolveWizardItems(configItemGroups, props);
    expect(result).toEqual(configItemGroups);
  });

  it('should resolve items from schema when using FROM_SCHEMA', () => {
    const configItemGroups: ConfigItemGroups = [
      {
        name: 'content',
        title: 'Content',
        default: true,
        items: WIZARD_ITEMS.FROM_SCHEMA,
      },
    ];

    const mockSchemaType = {
      of: [
        {
          name: 'text',
          title: 'Text Block',
          jsonType: 'object',
          icon: () => null,
          options: {
            tags: ['text'],
            assetUrl: 'test.jpg',
            initialValue: { text: 'Hello' },
          },
        },
        {
          name: 'image',
          title: 'Image Block',
          jsonType: 'object',
          options: {
            group: 'content',
          },
        },
        // This one should be filtered out as it's not an object
        {
          name: 'string',
          jsonType: 'string',
        },
      ],
    };

    const props = {
      schemaType: mockSchemaType,
    } as ArrayOfObjectsInputProps;

    const result = resolveWizardItems(configItemGroups, props);

    expect(result).toEqual([
      {
        name: 'content',
        title: 'Content',
        default: true,
        items: [
          {
            title: 'Text Block',
            icon: expect.any(Function),
            tags: ['text'],
            assetUrl: 'test.jpg',
            itemsToAdd: [
              {
                type: 'text',
                initialValue: { text: 'Hello' },
              },
            ],
          },
          {
            title: 'Image Block',
            tags: [],
            itemsToAdd: [
              {
                type: 'image',
              },
            ],
          },
        ],
      },
    ]);
  });

  it('should handle blocks with missing titles', () => {
    const configItemGroups: ConfigItemGroups = [
      {
        name: 'content',
        title: 'Content',
        default: true,
        items: WIZARD_ITEMS.FROM_SCHEMA,
      },
    ];

    const mockSchemaType = {
      of: [
        {
          name: 'untitled',
          jsonType: 'object',
        },
      ],
    };

    const props = {
      schemaType: mockSchemaType,
    } as ArrayOfObjectsInputProps;

    const result = resolveWizardItems(configItemGroups, props);

    expect((result[0]?.items as Array<ConfigItem>)?.[0]?.title).toBe('Unnamed block');
  });

  it('should respect group assignments in block options', () => {
    const configItemGroups: ConfigItemGroups = [
      {
        name: 'media',
        title: 'Media',
        items: WIZARD_ITEMS.FROM_SCHEMA,
      },
      {
        name: 'content',
        title: 'Content',
        default: true,
        items: WIZARD_ITEMS.FROM_SCHEMA,
      },
    ];

    const mockSchemaType = {
      of: [
        {
          name: 'text',
          title: 'Text Block',
          jsonType: 'object',
          options: {
            group: 'content',
          },
        },
        {
          name: 'image',
          title: 'Image Block',
          jsonType: 'object',
          options: {
            group: 'media',
          },
        },
      ],
    };

    const props = {
      schemaType: mockSchemaType,
    } as ArrayOfObjectsInputProps;

    const result = resolveWizardItems(configItemGroups, props);

    expect(result[0]?.items).toHaveLength(1); // media group
    expect((result[0]?.items as Array<ConfigItem>)?.[0]?.title).toBe('Image Block');
    expect(result[1]?.items).toHaveLength(1); // content group
    expect((result[1]?.items as Array<ConfigItem>)?.[0]?.title).toBe('Text Block');
  });
});
