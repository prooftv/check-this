import {
  resolveActionsPipeline,
  modifyAction,
} from '@pkg/sanity-toolkit/studio/actions/resolver';
import { changePublishText } from '@pkg/sanity-toolkit/studio/actions/changePublishText';
import { DOCUMENT } from '@pkg/common/constants/schemaTypes';
import { setDateFieldToCurrent } from '@pkg/sanity-toolkit/studio/actions/setDateFieldToCurrent';
import { setReadingTime } from '@pkg/sanity-toolkit/studio/actions/setReadingTime';
import { getArticleContentLength } from '@/features/generic/utilities/getArticleContentLength';

// See: https://www.sanity.io/docs/document-actions

export const documentActions = resolveActionsPipeline([
  /** Add list of modifiers here, defined using `defineActionModifier()` or `defineNewAction()` */
  modifyAction({
    actions: ['publish'],
    handler: (action) => changePublishText(action, 'Update'), // Use "Update" if document already published
  }),
  modifyAction({
    actions: ['publish'],
    schemaTypes: [DOCUMENT.ARTICLE],
    handler: (action) => setDateFieldToCurrent(action),
  }),
  modifyAction({
    actions: ['publish'],
    schemaTypes: [DOCUMENT.ARTICLE],
    handler: (action) => setReadingTime(action, getArticleContentLength), // Use "Update" if document already published
  }),
]);
