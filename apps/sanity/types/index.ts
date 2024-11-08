import { WITH_SITE_TITLE } from '@pkg/sanity-toolkit/seo';
import { Image } from 'sanity';
import type { SeoFields as ToolkitSeoFields } from '@pkg/sanity-toolkit/seo/types';

/**
 * The SEO fields defined for all pages, and for the global SEO fallback.
 */
export interface SeoFields extends ToolkitSeoFields {
  pathname?: { current: string };
}

/**
 * The SEO fields defined in Site Config > SEO + Social
 */
export interface ConfigSeoSocial extends SeoFields {
  siteTitle?: string | null;
  siteUrl?: string | null;
  withSiteTitle?: WITH_SITE_TITLE;
  titleSeparator?: string;

  favicon?: Image | null;
}
