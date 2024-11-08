import React from 'react';
import { type Image, useClient } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';
import google from './GoogleSearchResult.module.css';

interface Props {
  favicon?: null | Image;
  siteTitle?: null | string;
  pageUrl?: null | string;
  pageTitle?: null | string;
  description?: null | string;
  width?: number;
}

export function GoogleSearchResult({
  favicon,
  siteTitle,
  pageUrl,
  pageTitle,
  description,
  width = 580,
}: Props) {
  const sanityClient = useClient({ apiVersion: '2024-04-26' });
  const imageBuilder = imageUrlBuilder(sanityClient);
  const urlFor = (source: Image) => imageBuilder.image(source);

  return (
    <div className={google.googleWrapper} style={{ width }}>
      <div className={google.googleUrlBar}>
        <div className={google.googleFaviconContainer}>
          {favicon ? (
            <img
              className={google.googleFaviconImage}
              alt="google search"
              src={urlFor(favicon).width(52).height(52).url()}
            />
          ) : (
            <span />
          )}
        </div>
        <div>
          <div className={google.googleSiteTitle}>{siteTitle}</div>
          <div className={google.googleUrl}>{pageUrl}</div>
        </div>
      </div>
      <div className={google.googleTitle}>{pageTitle}</div>

      {description && <div className={google.googleDesc}>{description}</div>}
    </div>
  );
}
