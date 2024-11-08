import type { Item, ItemGroups } from '../types';
import { tokenize } from '../../studio/utilities/strings';

export function filterItemGroups(
  searchQuery: string,
  searchTags: Array<string>,
  itemGroups: ItemGroups,
) {
  const tokens = tokenize(searchQuery);

  if (tokens.length <= 0 && searchTags.length <= 0) {
    return itemGroups;
  }

  return itemGroups
    .map((itemGroup) => ({
      ...itemGroup,
      items: filterItems(searchQuery, searchTags, itemGroup.items),
    }))
    .filter((group) => group.items.length > 0);
}

export function filterItems(
  searchQuery: string,
  searchTags: Array<string>,
  items: Array<Item>,
) {
  const tokens = tokenize(searchQuery.toLowerCase());

  let filteredItems = items;
  if (searchTags.length > 0) {
    filteredItems = items.filter((item) =>
      searchTags.every((tag) => (item.tags ?? []).includes(tag)),
    );
  }

  // If no search tokens, return the tag-filtered results
  if (tokens.length <= 0) {
    return filteredItems;
  }

  return filteredItems.filter((item) => {
    const title = tokenize(item.title?.toLowerCase() ?? '');
    const variantTitles = item.variants
      .map((variant) => tokenize(variant.variantTitle.toLowerCase()))
      .flat();

    const allTokens = [...title, ...variantTitles];

    return tokens.every((searchToken) =>
      allTokens.some((token) => token.includes(searchToken)),
    );
  });
}
