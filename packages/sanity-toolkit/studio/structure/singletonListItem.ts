import type {
  ListItemBuilder,
  StructureBuilder,
  StructureResolverContext,
} from 'sanity/structure';
import type { SingletonListItem } from '../types';
import { singletonDocId } from '../singletons/structure';

/**
 * Helper function to create a ListItem in your Structure for a Singleton.
 *
 * Import this function into your app, and pass in the `defaultViews`, then export it and use
 * it in your application structure.
 *
 * e.g.
 *   import { singletonListItem as singletonListItemPkg } from '@pkg/sanity-toolkit/structure/singletonListItem';
 *
 *   export function singletonListItem(S: StructureBuilder, context: StructureContext, options: SingletonListItem) {
 *     return singletonListItemPkg(S, context, { ...options, defaultViews: defaultViews(S, { documentId, schemaType, ...context }) });
 *   }
 */
export function singletonListItem(
  S: StructureBuilder,
  context: StructureResolverContext,
  { title, viewTitle, schemaType, icon, isPrivate, defaultViews }: SingletonListItem,
): ListItemBuilder {
  const documentId = singletonDocId(schemaType, isPrivate);

  const { schema } = context;
  const documentSchema = schema.get(schemaType);

  const itemTitle = title ?? documentSchema?.title ?? 'Unnamed';

  const views =
    typeof defaultViews == 'function' ? defaultViews(documentId, schemaType) : defaultViews;

  return S.listItem()
    .id(documentId)
    .title(itemTitle)
    .icon(icon ?? documentSchema?.icon)
    .schemaType(schemaType)
    .child(
      S.editor()
        .id(documentId)
        .title(viewTitle ?? itemTitle)
        .schemaType(schemaType)
        .documentId(documentId)
        .views(views ?? []),
    );
}
