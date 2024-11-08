import { defineField } from 'sanity';

/**
 * Define a page reference field to be used in page links.
 * Pass in all schema types that should be allowed as internal links.
 * These will appear in the dropdown when selecting a reference.
 * You can do this in your application by importing this function and passing in the types, then exporting
 * the resulting function.
 */
export function pageReferenceFieldFn(internalLinkTypes: Array<string>) {
  const definePageReferenceField = ({ name = 'reference' }: { name?: string } = {}) =>
    defineField({
      name,
      title: 'Page',
      type: 'reference',
      to: internalLinkTypes.map((docType) => ({ type: docType })),
    });

  return definePageReferenceField;
}
