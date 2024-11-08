import { Flex, Heading, Text } from '@sanity/ui';
import type { ItemGroup } from '../../types';

export function ItemGroupHeading({
  itemGroup,
  showDescription = true,
}: Readonly<{ itemGroup: ItemGroup; showDescription?: boolean }>) {
  const IconComponent = itemGroup.icon;

  return (
    <>
      <Heading size={2}>
        <Flex align="center" gap={3}>
          {IconComponent && (
            <IconComponent size={20} style={{ marginTop: showDescription ? '-11px' : '0' }} />
          )}
          <div>
            {itemGroup.title}
            {showDescription && itemGroup.description && <Text>{itemGroup.description}</Text>}
          </div>
        </Flex>
      </Heading>
    </>
  );
}
