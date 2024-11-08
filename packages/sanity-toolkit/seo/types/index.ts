import type { Image } from 'sanity';
import { SEO_FIELD } from '../constants';

/**
 * The SEO fields defined for all pages, and for the global SEO fallback.
 */
export interface SeoFields {
  [SEO_FIELD.PAGE_TITLE]?: string | null;
  [SEO_FIELD.META_DESCRIPTION]?: string | null;
  [SEO_FIELD.SOCIAL_IMAGE]?: Image | null;
  pathname?: { current: string };
}
