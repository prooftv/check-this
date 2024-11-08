import type { BlockOptions, ConfigItem, ConfigItemGroup, ConfigItemGroups } from '../types';
import { WIZARD_ITEMS } from '../constants';
import type { ArrayOfObjectsInputProps } from 'sanity';

export function resolveWizardItems(
  configItemGroups: ConfigItemGroups,
  props: ArrayOfObjectsInputProps,
) {
  return configItemGroups.map((itemGroup) => {
    if (itemGroup.items === WIZARD_ITEMS.FROM_SCHEMA) {
      return {
        ...itemGroup,
        items: resolveItemsFromSchema(itemGroup, props),
      };
    }

    return itemGroup;
  });
}

function resolveItemsFromSchema(itemGroup: ConfigItemGroup, props: ArrayOfObjectsInputProps) {
  const blocks = props.schemaType.of.filter((type) => type.jsonType === 'object');

  return blocks.reduce<Array<ConfigItem>>((acc, block) => {
    const blockOptions = block.options as undefined | BlockOptions;

    const groupContainsBlock =
      blockOptions?.group === itemGroup.name ||
      (typeof blockOptions?.group === 'undefined' && itemGroup.default);

    if (!groupContainsBlock) {
      return acc;
    }

    const configItem: ConfigItem = {
      title: block.title ?? 'Unnamed block',
      icon: block.icon,
      tags: blockOptions?.tags ?? [],
      assetUrl: blockOptions?.assetUrl,
      itemsToAdd: [
        {
          type: block.name,
          initialValue: blockOptions?.initialValue ?? undefined,
        },
      ],
    };

    return [...acc, configItem];
  }, []);
}
