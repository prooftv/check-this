import { CiBarcode } from 'react-icons/ci';
import { BsBlockquoteLeft } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';

export enum FIELD_GROUPS {
  META = 'meta',
  CONTENT = 'content',
  SEO = 'seo',
}

export const GROUP_META = { title: 'Meta', name: FIELD_GROUPS.META, icon: CiBarcode } as const;

export const GROUP_CONTENT = {
  title: 'Content',
  name: FIELD_GROUPS.CONTENT,
  icon: BsBlockquoteLeft,
} as const;

export const GROUP_SEO = {
  title: 'SEO',
  name: FIELD_GROUPS.SEO,
  icon: IoSearchOutline,
} as const;
