import type { ComponentType, ReactNode } from 'react';
import type { View, ViewBuilder } from 'sanity/structure';

export interface SingletonListItem {
  schemaType: string;
  title?: string;
  viewTitle?: string;
  icon?: ComponentType | ReactNode;
  isPrivate?: boolean;
  defaultViews?:
    | Array<View | ViewBuilder>
    | ((documentId: string, schemaType: string) => Array<View | ViewBuilder>);
}
