import type { SortOrdering, SortOrderingItem } from 'sanity';

export interface OrderingOptions {
  title?: SortOrdering['title'];
  name?: SortOrdering['name'];
  i18n?: SortOrdering['i18n'];
  field?: SortOrderingItem['field'];
  direction?: SortOrderingItem['direction'];
}

function createSortOrdering(
  defaultTitle: SortOrdering['title'],
  defaultName: SortOrdering['name'],
  defaultField: SortOrderingItem['field'],
  defaultDirection: SortOrderingItem['direction'],
  options: OrderingOptions = {},
): SortOrdering {
  return {
    title: options.title ?? defaultTitle,
    name: options.name ?? defaultName,
    i18n: options.i18n,
    by: [
      {
        field: options.field ?? defaultField,
        direction: options.direction ?? defaultDirection,
      },
    ],
  };
}

export function orderByPathname(options: OrderingOptions = {}): SortOrdering {
  return createSortOrdering('URL', 'url', 'pathname.current', 'asc', options);
}

export function orderByTitle(options: OrderingOptions = {}): SortOrdering {
  return createSortOrdering('Title', 'title', 'title', 'asc', options);
}

export function orderByPublishedDate(options: OrderingOptions = {}): SortOrdering {
  return createSortOrdering('Published Date', 'publishedDate', 'publishedAt', 'desc', options);
}

export function orderByCreationDate(options: OrderingOptions = {}): SortOrdering {
  return createSortOrdering('Creation Date', 'creationDate', '_createdAt', 'desc', options);
}

export function orderByLastModifiedDate(options: OrderingOptions = {}): SortOrdering {
  return createSortOrdering(
    'Last Modified Date',
    'lastModifiedDate',
    '_updatedAt',
    'desc',
    options,
  );
}

export function orderByAuthorName(options: OrderingOptions = {}): SortOrdering {
  return createSortOrdering('Author Name', 'authorName', 'author.name', 'asc', options);
}

export function orderByCategory(options: OrderingOptions = {}): SortOrdering {
  return createSortOrdering('Category', 'category', 'category.name', 'asc', options);
}

export function orderByRating(options: OrderingOptions = {}): SortOrdering {
  return createSortOrdering('Rating', 'rating', 'rating', 'desc', options);
}

export function orderByPrice(options: OrderingOptions = {}): SortOrdering {
  return createSortOrdering('Price', 'price', 'price', 'desc', options);
}
