import { defineField } from 'sanity';
import { PAGE_VISIBILITY } from '../constants';

export function defineVisibilityField() {
  return defineField({
    title: 'Page Visibility',
    name: 'pageVisibility',
    type: 'string',
    description:
      '"Hidden" will stop this page showing in search results + sitemaps. This setting only takes effect when this page is published - it will be inaccessible until then',
    initialValue: PAGE_VISIBILITY.PUBLIC,
    options: {
      layout: 'radio',
      list: [
        { title: 'Public', value: PAGE_VISIBILITY.PUBLIC },
        { title: 'Hidden (noindex)', value: PAGE_VISIBILITY.HIDDEN },
      ],
    },
  });
}

export function visibilityPreview(visibility: string = 'public') {
  return visibility.charAt(0).toUpperCase() + visibility.slice(1);
}
