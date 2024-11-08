import type { StructureBuilder } from 'sanity/structure';
import { BiSearch } from 'react-icons/bi';
import { SeoPreviewPaneFn } from './components/SeoPreviewPane';
import { appConfig } from '@/config/app';
import { SINGLETON } from '@pkg/common/constants/schemaTypes';
import { singletonDocId } from '@pkg/sanity-toolkit/studio/singletons';

export function seoPreviewPane(S: StructureBuilder) {
  const SeoPreviewPane = SeoPreviewPaneFn({
    apiVersion: appConfig.apiVersion,
    configSeo: {
      id: singletonDocId(SINGLETON.CONFIG_SEO),
      type: SINGLETON.CONFIG_SEO,
    },
  });

  return S.view.component(SeoPreviewPane).title('SEO Preview').icon(BiSearch);
}
