import type { Image } from 'sanity';

/**
 * The SEO Data once it has been combined from a page and the site config fallbacks.
 * Used in the SEO Preview pane.
 */
export interface SeoDataCombined {
  siteUrl?: string | null;
  siteTitle?: string | null;
  pageUrl?: string | null;
  pageTitle?: string | null;
  metaDescription?: string | null;
  shareImage?: Image | null;
  favicon?: Image | null;
}
