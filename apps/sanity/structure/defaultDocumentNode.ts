import { DefaultDocumentNodeResolver } from 'sanity/structure';
import { defaultViews } from '@/structure/defaultViews';

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, context) => {
  return S.document().views(defaultViews(S, context));
};
