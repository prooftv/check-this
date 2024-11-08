import { defineField, defineType } from 'sanity';
import { OBJECT, SINGLETON } from '@pkg/common/constants/schemaTypes';
import { LuUnlink } from 'react-icons/lu';
import { defineSeoFields, SEO_FIELDSET } from '@pkg/sanity-toolkit/seo';
import { seoFieldset } from '@pkg/sanity-toolkit/seo';
import { withFieldset, withGroup } from '@pkg/sanity-toolkit/studio/schema/utilities';
import {
  FIELD_GROUPS,
  GROUP_CONTENT,
  GROUP_META,
  GROUP_SEO,
} from '@pkg/sanity-toolkit/studio/constants/fieldGroups';

export const notFound404 = defineType({
  name: SINGLETON.CONFIG_404,
  title: '404 Page',
  type: 'document',
  icon: LuUnlink,

  fieldsets: [seoFieldset()],

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true, // Field is needed for the Presentation view, or title shows a weird string of chars
    }),
    defineField({
      name: 'content',
      title: 'Modular Content',
      type: OBJECT.MODULAR_OUTER_BLOCKS,
      validation: (rule) => rule.required().warning('404 Page has no content'),
    }),

    ...withFieldset(SEO_FIELDSET, [...defineSeoFields()]),
  ],
});
