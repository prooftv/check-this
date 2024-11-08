import { useClient } from 'sanity';
import { useEffect, useState } from 'react';
import { SINGLETON } from '@pkg/common/constants/schemaTypes';
import { WITH_SITE_TITLE } from '@pkg/sanity-toolkit/seo';
import { ConfigSeoSocial } from '@/types';

const initialSiteConfigSeo: ConfigSeoSocial = { withSiteTitle: WITH_SITE_TITLE.APPEND };

interface Options {
  apiVersion?: string;
}

export function useSiteConfigSeo({
  apiVersion = '2024-10-31',
}: Options): [ConfigSeoSocial, boolean] {
  const sanityClient = useClient({ apiVersion });
  const [siteConfigSeo, setSiteConfigSeo] = useState<ConfigSeoSocial>({
    ...initialSiteConfigSeo,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let shouldUpdateSeo = true;

    async function getSiteConfigSeo() {
      let seo = await sanityClient.fetch<ConfigSeoSocial | null>(`
        *[_type == "${SINGLETON.CONFIG_SEO}"][0] {
          siteTitle,
          siteUrl,
          withSiteTitle,
          titleSeparator,
          pageTitle,
          metaDescription,
          "socialImage": socialImage.asset,
          favicon,
        }
      `);

      if (!seo) {
        // In case default SEO data hasn't been set, returned data would be null
        seo = { ...initialSiteConfigSeo };
      }

      if (shouldUpdateSeo) {
        // Ensure we only update once with latest call, even if useEffect runs multiple times quickly
        setSiteConfigSeo(seo);
        setLoading(false);
      }
    }

    getSiteConfigSeo().catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      shouldUpdateSeo = false;
    };
  }, [sanityClient, initialSiteConfigSeo]);

  return [siteConfigSeo, loading];
}
