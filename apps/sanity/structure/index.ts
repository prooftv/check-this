import type {
  ListItemBuilder,
  StructureResolver,
  StructureResolverContext,
} from 'sanity/structure';
import { CogIcon, ImagesIcon, InfoOutlineIcon } from '@sanity/icons';
import { GrArticle } from 'react-icons/gr';
import { PiBookOpenText, PiMegaphone } from 'react-icons/pi';
import { IoMdPricetags } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { DOCUMENT, SINGLETON } from '@pkg/common/constants/schemaTypes';
import {
  placeholder,
  publishStatusListItems,
  singletonListItem,
} from '@pkg/sanity-toolkit/studio/structure';
import { skeletonKey } from '@pkg/sanity-toolkit/studio/structure/skeletonKey';
import { isDeveloperOrAdmin } from '@pkg/sanity-toolkit/studio/utilities/roles';
import { LuUnlink } from 'react-icons/lu';
import { FaUserPen } from 'react-icons/fa6';
import { defaultViews } from '@/structure/defaultViews';

// Add anything we need available to all structure functions to this type (such as locale)
export type StructureContext = StructureResolverContext;

/**
 * When creating a new document type, it will appear automatically in the root list in the CMS.
 * Once you've handled where you'd like it to appear, it can be removed from the root list by adding it to this constant.
 * This is a failsafe to ensure when new types are added they can be immediately seen without further configuration.
 */
const DOCUMENT_TYPES_IN_STRUCTURE: Array<string> = [
  DOCUMENT.PAGE,
  DOCUMENT.ARTICLE,

  DOCUMENT.AUTHOR,

  DOCUMENT.TAXONOMY_CATEGORY,
  DOCUMENT.TAXONOMY_TAG,

  SINGLETON.THEME,
  SINGLETON.CONFIG_SEO,
  SINGLETON.CONFIG_404,

  SINGLETON.RECYCLING_BIN,

  DOCUMENT.CONFIG_REDIRECT,
  DOCUMENT.CONFIG_REUSABLE_BLOCK,
  DOCUMENT.CONFIG_CORE_SECTION,

  DOCUMENT.ANNOUNCEMENT,
  DOCUMENT.NAVIGATION_HEADER,
  DOCUMENT.NAVIGATION_FOOTER,

  DOCUMENT.MEDIA_TAG,
];

export const structure: StructureResolver = (S, ctx) => {
  // Add anything we need available to all structure functions to this variable (such as locale)
  const context: StructureContext = ctx;

  const singletonDefaultViews = (documentId: string, schemaType: string) =>
    defaultViews(S, { documentId, schemaType, ...context });

  // See: https://www.sanity.io/docs/structure-builder-reference
  return S.list()
    .title('Content')
    .items([
      placeholder(S, 'Guide', InfoOutlineIcon),
      S.divider(),

      S.documentTypeListItem(DOCUMENT.PAGE)
        .title('Pages')
        .child(
          S.documentTypeList(DOCUMENT.PAGE).defaultOrdering([
            { field: 'pathname.current', direction: 'asc' },
          ]),
        ),
      S.divider(),

      S.listItem()
        .title('Articles')
        .icon(GrArticle)
        .child(
          S.list()
            .title('Articles')
            .items(
              publishStatusListItems(S, context, {
                schemaType: DOCUMENT.ARTICLE,
                title: 'Articles',
              }),
            ),
        ),
      S.divider(),

      placeholder(S, 'Authors', FaUserPen),
      // S.documentTypeListItem(DOCUMENT.AUTHOR)
      //   .title('Authors')
      //   .child(
      //     S.documentTypeList(DOCUMENT.AUTHOR).defaultOrdering([
      //       { field: 'name', direction: 'asc' },
      //     ]),
      //   ),
      placeholder(S, 'Taxonomies', IoMdPricetags),
      // S.listItem()
      //   .title('Taxonomies')
      //   .icon(IoMdPricetags)
      //   .child(
      //     S.list()
      //       .title('Taxonomies')
      //       .items([
      //         S.documentTypeListItem(DOCUMENT.TAXONOMY_CATEGORY)
      //           .title('Categories')
      //           .child(
      //             S.documentTypeList(DOCUMENT.TAXONOMY_CATEGORY).defaultOrdering([
      //               { field: 'title', direction: 'asc' },
      //             ]),
      //           ),
      //         S.documentTypeListItem(DOCUMENT.TAXONOMY_TAG)
      //           .title('Tags')
      //           .child(
      //             S.documentTypeList(DOCUMENT.TAXONOMY_TAG).defaultOrdering([
      //               { field: 'title', direction: 'asc' },
      //             ]),
      //           ),
      //       ]),
      //   ),
      S.divider(),

      placeholder(S, 'Modular Content', PiBookOpenText),
      // S.listItem()
      //   .id('modular-content')
      //   .title('Modular Content')
      //   .icon(PiBookOpenText)
      //   .child(
      //     S.list()
      //       .id('modular-content')
      //       .title('Modular Content')
      //       .items([
      //         S.documentTypeListItem(DOCUMENT.CONFIG_CORE_SECTION).title('Section Patterns'),
      //         S.documentTypeListItem(DOCUMENT.CONFIG_REUSABLE_BLOCK).title('Reusable Blocks'),
      //       ]),
      //   ),
      S.divider(),

      singletonListItem(S, context, {
        title: '404 Not Found',
        schemaType: SINGLETON.CONFIG_404,
      }),

      S.listItem()
        .title('Announcement Bar')
        .icon(PiMegaphone)
        .child(
          S.list()
            .title('Announcement Bar')
            .items([
              S.documentTypeListItem(DOCUMENT.ANNOUNCEMENT).title('Announcements'),
              S.divider(),
              singletonListItem(S, context, {
                title: 'Site Config: Active Theme',
                viewTitle: 'Active Theme',
                schemaType: SINGLETON.THEME,
              }),
            ]),
        ),

      placeholder(S, 'Navigation Menus', GiHamburgerMenu),
      // S.listItem()
      //   .title('Navigation Menus')
      //   .icon(GiHamburgerMenu)
      //   .child(
      //     S.list()
      //       .title('Navigation Menus')
      //       .items([
      //         S.documentTypeListItem(DOCUMENT.NAVIGATION_HEADER).title('Headers'),
      //         S.documentTypeListItem(DOCUMENT.NAVIGATION_FOOTER).title('Footers'),
      //         S.divider(),
      //         singletonListItem(S, context, {
      //           title: 'Site Config: Active Theme',
      //           viewTitle: 'Active Theme',
      //           schemaType: SINGLETON.THEME,
      //         }),
      //       ]),
      //   ),
      S.listItem()
        .title('Site Config')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Config')
            .items([
              // singletonListItem(S, context, {
              //   title: 'Active Theme',
              //   schemaType: SINGLETON.THEME,
              // }),
              // S.divider(),
              // placeholder(S, 'Fallback Images', ImagesIcon),
              S.documentTypeListItem(DOCUMENT.CONFIG_REDIRECT).title('Redirects'),
              singletonListItem(S, context, {
                title: 'SEO + Social Sharing',
                schemaType: SINGLETON.CONFIG_SEO,
                defaultViews: singletonDefaultViews,
              }),
            ]),
        ),
      S.divider(),
      singletonListItem(S, context, {
        title: 'Recycling Bin',
        viewTitle: 'Recycling Bin',
        schemaType: SINGLETON.RECYCLING_BIN,
        isPrivate: true,
      }),
      S.divider(),

      // Add a Skeleton Key for developers to see all document types easily
      ...(context.currentUser && isDeveloperOrAdmin(context.currentUser)
        ? [skeletonKey(S, context), S.divider()]
        : []),

      // Automatically add new document types to the root pane
      ...S.documentTypeListItems().filter((listItem: ListItemBuilder) => {
        const listItemId = listItem.getId();

        return listItemId
          ? !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItemId.toString())
          : undefined;
      }),
    ]);
};
