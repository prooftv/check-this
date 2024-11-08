import type { StructureBuilder, ListBuilder } from 'sanity/structure';
import { CircleIcon } from '@sanity/icons';
import type { ComponentType, ReactNode } from 'react';

export function placeholder(
  S: StructureBuilder,
  title: string,
  icon?: ComponentType | ReactNode,
  children?: ListBuilder,
) {
  return S.listItem()
    .title(title)
    .icon(icon ?? CircleIcon)
    .child(children ?? S.list().title(title));
}
