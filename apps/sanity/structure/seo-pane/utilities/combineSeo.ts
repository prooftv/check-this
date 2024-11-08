import { WITH_SITE_TITLE } from '@pkg/sanity-toolkit/seo';
import { ConfigSeoSocial, SeoFields } from '@/types';
import { SeoDataCombined } from '@/structure/seo-pane/types';

/**
 * Combines the default seo data from Site Config: SEO + Social, with seo data from
 * an individual page.
 */
export function combineSeo(
  defaultSeo: ConfigSeoSocial,
  pageSeo: SeoFields,
  pathname = '',
): SeoDataCombined {
  let pageTitle = pageSeo.pageTitle ?? defaultSeo.pageTitle;

  if (defaultSeo.withSiteTitle && pageTitle !== defaultSeo.siteTitle && defaultSeo.siteTitle) {
    if (defaultSeo.withSiteTitle === WITH_SITE_TITLE.PREPEND) {
      pageTitle = `${defaultSeo.siteTitle} ${defaultSeo.titleSeparator} ${pageTitle}`;
    }
    if (defaultSeo.withSiteTitle === WITH_SITE_TITLE.APPEND) {
      pageTitle = `${pageTitle} ${defaultSeo.titleSeparator} ${defaultSeo.siteTitle}`;
    }
  }

  return {
    favicon: defaultSeo.favicon,
    siteUrl: defaultSeo.siteUrl ?? '',
    shareImage: pageSeo.socialImage ?? defaultSeo.socialImage, // meta share image OR default share image
    siteTitle: defaultSeo.siteTitle ?? '',
    pageUrl: `${defaultSeo.siteUrl}${pathname}`,
    pageTitle: pageTitle ?? '',
    metaDescription: pageSeo.metaDescription ?? defaultSeo.metaDescription ?? '',
  };
}
