import { Text } from '@sanity/ui';
import type { Item, OnItemAddFn } from '../../types';
import { ItemGridCardWrapper } from './ItemGridCardWrapper';
import { ItemAssetWrapper } from './ItemAssetWrapper';

interface Props {
  item: Item;
  onItemAdd: OnItemAddFn;
}

export function ItemGridCard({ item, onItemAdd }: Readonly<Props>) {
  // @todo support multiple variants
  const itemVariant = item.variants[0];

  if (!itemVariant) return;

  const itemTitle = item.title;

  return (
    <ItemGridCardWrapper
      data-has-asset={!!itemVariant.variantAssetUrl}
      onClick={() => {
        // @todo Support inserting by index
        onItemAdd({ itemsToAdd: itemVariant.itemsToAdd });
      }}
    >
      <Text>{itemTitle}</Text>
      <ItemAssetWrapper assetUrl={itemVariant.variantAssetUrl} icon={item.icon} />
    </ItemGridCardWrapper>
  );
}
