import { defineField, type Rule } from 'sanity';
import { defineSuperStringField } from '../../studio/studioComponents/superFields/string/defineSuperStringField';
import { defineSuperTextField } from '../../studio/studioComponents/superFields/text/defineSuperTextField';
import { SEO_FIELD } from '../constants';

export const metaTitleTitle = 'Title for search & social sharing (meta title)';
export const metaDescriptionTitle =
  'Short Paragraph for search & social sharing (meta description)';
export const socialImageTitle = 'Social Image';

export interface Options {
  titleMinLengthRecommend?: number;
  titleMaxLengthRecommend?: number;
  descriptionMinLengthRecommend?: number;
  descriptionMaxLengthRecommend?: number;
}

const defaultSettings: Options = {
  titleMinLengthRecommend: 15,
  titleMaxLengthRecommend: 70,
  descriptionMinLengthRecommend: 15,
  descriptionMaxLengthRecommend: 160,
};

export function defineSeoFields(options: Options = {}) {
  const opts = {
    ...defaultSettings,
    ...options,
  };

  return [
    defineSuperStringField({
      title: metaTitleTitle,
      name: SEO_FIELD.PAGE_TITLE,
      description:
        'Make it as enticing as possible to capture users in Google + social feeds. If it matches the Site Title, only one will be displayed to prevent duplication.',
      options: {
        minLength: opts.titleMinLengthRecommend,
        maxLength: opts.titleMaxLengthRecommend,
      },
      validation: createValidationRules(
        opts.titleMinLengthRecommend,
        opts.titleMaxLengthRecommend,
      ),
    }),
    defineSuperTextField({
      title: metaDescriptionTitle,
      name: SEO_FIELD.META_DESCRIPTION,
      description:
        'Optional, highly encouraged to capture more visitors from Google and social.',
      rows: 2,
      options: {
        minLength: opts.descriptionMinLengthRecommend,
        maxLength: opts.descriptionMaxLengthRecommend,
      },
      validation: createValidationRules(
        opts.descriptionMinLengthRecommend,
        opts.descriptionMaxLengthRecommend,
      ),
    }),
    defineField({
      title: socialImageTitle,
      name: SEO_FIELD.SOCIAL_IMAGE,
      type: 'image',
      description:
        'Choose a beautiful and inviting, high-res image (1080p or even 4k). This will show when sharing on social media or in WhatsApp. Recommended size: 1200x630 (PNG, JPG or WebP)',
    }),
  ];
}

function createValidationRules<RuleType extends Rule>(minLength?: number, maxLength?: number) {
  return (rule: RuleType) => [
    ...(minLength
      ? [
          rule
            .min(minLength)
            .warning(`Should be at least ${minLength} characters long for maximum effect.`),
        ]
      : []),
    ...(maxLength
      ? [
          rule
            .max(maxLength)
            .warning(`Should be less than ${maxLength} characters long for maximum effect.`),
        ]
      : []),
  ];
}
