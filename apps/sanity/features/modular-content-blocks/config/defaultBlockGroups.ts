import type {
  ConfigItem,
  ConfigItemGroups,
} from '@pkg/sanity-toolkit/visual-array-input/types';
import { TbGridPattern } from 'react-icons/tb';
import { PiLego } from 'react-icons/pi';
import { Image, SanityClient } from 'sanity';
import { DOCUMENT, OBJECT } from '@pkg/common/constants/schemaTypes';
import { defineQuery } from 'groq';
import { FaRecycle } from 'react-icons/fa';
import imageUrlBuilder from '@sanity/image-url';
import { WIZARD_GROUPS } from '@/features/modular-content-blocks/constants';
import { WIZARD_ITEMS } from '@pkg/sanity-toolkit/visual-array-input/constants';
import { SiHiveBlockchain } from 'react-icons/si';
import { GrClone } from 'react-icons/gr';

export interface ReusableBlockDocument {
  _id: string;
  _type: string;
  title?: string;
  image?: Image;
  content?: ModularContentBlocks;
}

export type ModularContentBlocks = Array<ModularBlock> | null;

export interface ModularBlock {
  _type: OBJECT;
  _key: string;

  [key: string]: unknown;
}

const coreSectionPatternsQuery = defineQuery(`*[_type == "${DOCUMENT.CONFIG_CORE_SECTION}"]`);

const reusableBlocksQuery = defineQuery(`*[_type == "${DOCUMENT.CONFIG_REUSABLE_BLOCK}"]`);

async function reusableBlocksItems<
  ResponseType extends Array<ReusableBlockDocument> = Array<ReusableBlockDocument>,
>(client: SanityClient, query: string) {
  const blocks = await client.fetch<ResponseType>(query);

  return reusableBlocksToConfigItems(blocks, client);
}

export const itemGroups: ConfigItemGroups = [
  {
    name: WIZARD_GROUPS.CORE_SECTION_PATTERNS,
    title: 'Section Patterns',
    description:
      'Section Patterns are pre-made groups of Outer and Inner blocks that are commonly used across the site. They allow for fast page creation, without adding all the Inner blocks yourself.',
    icon: TbGridPattern,
    items: async ({ client }) => reusableBlocksItems(client, coreSectionPatternsQuery),
  },
  {
    name: WIZARD_GROUPS.DEFAULT,
    title: 'Blocks',
    description:
      'The modular content blocks used to build pages. Use these to build sections on this page or add more content to existing sections.',
    icon: PiLego,
    default: true,
    items: WIZARD_ITEMS.FROM_SCHEMA,
  },
  {
    name: WIZARD_GROUPS.REUSABLE,
    title: 'Reusable Blocks',
    description:
      'Reusable blocks can be created once and then quickly inserted into any page, e.g. to quickly scaffold landing pages',
    icon: GrClone,
    items: async ({ client }) => reusableBlocksItems(client, reusableBlocksQuery),
  },
  {
    name: WIZARD_GROUPS.NICHE,
    title: 'Niche Blocks',
    description:
      'Niche blocks are created for specific purposes, and should almost never be needed otherwise',
    icon: SiHiveBlockchain,
    items: WIZARD_ITEMS.FROM_SCHEMA,
  },
];

function reusableBlocksToConfigItems(
  reusableBlocks: Array<ReusableBlockDocument>,
  client: SanityClient,
) {
  const builder = imageUrlBuilder(client);

  return reusableBlocks.map((blockDoc) => ({
    title: blockDoc.title ?? 'Unnamed Block',
    icon: FaRecycle,
    assetUrl: blockDoc.image && builder.image(blockDoc.image).width(600).url(),
    itemsToAdd:
      blockDoc.content?.map((block) => ({
        type: block._type,
        initialValue: block,
      })) ?? [],
  })) satisfies Array<ConfigItem>;
}
