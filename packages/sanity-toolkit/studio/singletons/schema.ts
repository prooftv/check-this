import { defineField } from 'sanity';
import { isDeveloperOrAdmin } from '../utilities/roles';

/**
 * When searching for documents, Sanity will search on the document content.
 * However, Singleton's often do not contain content that describes what you're looking for.
 * For example, the SEO + Social Singleton should appear in searches for SEO, but it doesn't.
 *
 * Therefore, we add a hidden Title field to Singletons to allow them to better appear in global search.
 *
 * You may still customise the Preview for your Singleton to choose how it appears in the search box.
 *
 * If a Singleton document was created before this field was added, it will have no value. If it has no value,
 * it will not be hidden, so that a value can be added.
 *
 * Import this function into your app, change any of the values as needed, then use your function
 * across your application.
 */
export function defineSingletonTitle(title: string, name = 'title') {
  return defineField({
    title: '[Dev] Singleton Title',
    description:
      'Title for this Singleton which is indexed in global search. Shown only to Admins and Developers',
    name,
    type: 'string',
    initialValue: title,
    readOnly: ({ currentUser }) => !isDeveloperOrAdmin(currentUser),
    hidden: ({ currentUser }) => !isDeveloperOrAdmin(currentUser),
  });
}
