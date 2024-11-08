import { defineField } from 'sanity';

/**
 * Helper function to define an internal title field.
 */
export function defineInternalTitleField() {
  return defineField({
    name: 'title',
    title: 'Title',
    type: 'string',
    description:
      'Internal use only. Helps identify this page when adding links or browsing the CMS',
    validation: (rule) => rule.required(),
  });
}
