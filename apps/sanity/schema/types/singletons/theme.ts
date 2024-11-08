import { defineField, defineType } from 'sanity';
import { LuSettings2 } from 'react-icons/lu';
import { DOCUMENT, SINGLETON } from '@pkg/common/constants/schemaTypes';

export const theme = defineType({
  name: SINGLETON.THEME,
  title: 'Theme',
  type: 'document',
  icon: LuSettings2,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      hidden: true,
      initialValue: 'Active Theme',
    }),
    defineField({
      title: 'Active Announcements',
      name: 'activeAnnouncements',
      description:
        'Select the announcements to display at the top of all pages. Remove all to show no announcements. Announcements outside their start and end dates will not be shown.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: DOCUMENT.ANNOUNCEMENT },
        },
      ],
    }),
    // @todo add active header and footer nav
    // defineField({
    //   title: 'Main navigation',
    //   name: 'mainNavigation',
    //   description: 'Select main navigation',
    //   type: 'reference',
    //   to: { type: DOCUMENT.NAVIGATION_HEADER },
    //   validation: (rule) => rule.required(),
    // }),
    // defineField({
    //   title: 'Footer navigation',
    //   name: 'mainFooter',
    //   description: 'Select menu for main footer navigation',
    //   type: 'reference',
    //   to: { type: DOCUMENT.NAVIGATION_FOOTER },
    //   validation: (rule) => rule.required(),
    // }),
  ],
});
