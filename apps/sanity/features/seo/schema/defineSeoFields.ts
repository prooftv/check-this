import { defineSeoFields as toolkitDefineSeoFields } from '@pkg/sanity-toolkit/seo/schema/defineSeoFields';
import { sanitySettings } from '@pkg/common/config/sanity';

/**
 * Define SEO fields for our Sanity application.
 * Based on the toolkit's SEO fields, re-exported with any customisations we want to make.
 */
export function defineSeoFields() {
  return [
    ...toolkitDefineSeoFields({
      titleMinLengthRecommend: sanitySettings.seo.titleMinLengthRecommend,
      titleMaxLengthRecommend: sanitySettings.seo.titleMaxLengthRecommend,
      descriptionMinLengthRecommend: sanitySettings.seo.descriptionMinLengthRecommend,
      descriptionMaxLengthRecommend: sanitySettings.seo.descriptionMaxLengthRecommend,
    }),
  ];
}
