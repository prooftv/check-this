/**
 * The URL prefixes added to certain documents.
 * Changing these will not change any document pathnames that store this prefix in their pathname
 * field—a migration is also needed to update these.
 */
export enum URL_PREFIX {
  ARTICLES = '/articles',
}
