/**
 * List of all the schema types we use in Sanity, as constants.
 * This allows us to refer to them by their constant symbol, rather than a magic string, in both
 * the Sanity Studio app, and the web app.
 *
 * See: @/docs/repo-architecture/about-constants.md
 *
 * !!!!!!                         !!!!!!!!                              !!!!!! //
 * DO NOT CHANGE THE VALUES OF THESE CONSTANTS WITHOUT CAREFUL CONSIDERATION.  //
 *     CHANGING THE VALUES WILL CAUSE CONTENT TO DISAPPEAR FROM THE CMS        //
 * !!!!!!                         !!!!!!!!                              !!!!!! //
 *
 * This is because these constants are the Sanity `_type` values. If they change, you must also migrate
 * your content to change its `_type` to the new value. If you have no content yet, change them all you like.
 */

export enum DOCUMENT {
  PAGE = 'page',

  ARTICLE = 'article',

  AUTHOR = 'author',

  TAXONOMY_CATEGORY = 'category',
  TAXONOMY_TAG = 'tag',

  CONFIG_REDIRECT = 'config.redirect',
  CONFIG_CORE_SECTION = 'config.coreSection',
  CONFIG_REUSABLE_BLOCK = 'config.reusableBlock',

  ANNOUNCEMENT = 'announcement',
  NAVIGATION_HEADER = 'navigation.header',
  NAVIGATION_FOOTER = 'navigation.footer',

  MEDIA_TAG = 'media.tag', // Added by the Sanity Media Plugin
}

export enum OBJECT {
  MODULAR_OUTER_BLOCKS = 'modularContentBlocks.outer',
  MODULAR_INNER_BLOCKS = 'modularContentBlocks.inner',

  MODULAR_OUTER_BLOCK_SECTION = 'modularContentBlocks.outer.section',

  MODULAR_INNER_BLOCK_RAW_HTML = 'modularContentBlocks.inner.rawHtml',
}

export enum SINGLETON {
  THEME = 'theme',
  CONFIG_SEO = 'config.seo',
  CONFIG_404 = 'config.404',
  RECYCLING_BIN = 'recycling.bin',
}
