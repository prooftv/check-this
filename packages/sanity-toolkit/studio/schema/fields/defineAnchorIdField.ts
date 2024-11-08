import { defineField } from 'sanity';
import { isSlug } from '../validation';

/**
 * Helper function to define an Anchor ID field for a section or other element.
 */
export function defineAnchorIdField({ type = 'section' }: { type?: string } = {}) {
  return defineField({
    title: 'Anchor ID',
    name: 'anchorId',
    type: 'string',
    description: `Add an Anchor ID to this ${type} to enable links to scroll directly to it.`,
    validation: (rule) => rule.custom(isSlug()),
  });
}
