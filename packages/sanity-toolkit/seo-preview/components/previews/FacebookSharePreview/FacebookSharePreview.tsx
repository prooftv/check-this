import imageUrlBuilder from '@sanity/image-url';
import preview from '../Preview.module.css';
import facebook from './FacebookSharePreview.module.css';
import { type Image, useClient } from 'sanity';

interface Props {
  shareImage?: null | Image;
  siteTitle?: null | string;
  siteUrl?: null | string;
  pageUrl?: null | string;
  pageTitle?: null | string;
  metaDescription?: null | string;
  width?: number;
}

export function FacebookSharePreview({
  shareImage,
  siteUrl,
  pageUrl,
  pageTitle,
  metaDescription,
  width = 580,
}: Props) {
  const sanityClient = useClient({ apiVersion: '2024-04-26' });
  const imageBuilder = imageUrlBuilder(sanityClient);
  const urlFor = (source: Image) => imageBuilder.image(source);

  const shareUrl = siteUrl ? siteUrl.split('://')[1] : '';

  // const canShowPreview = !!pageTitle;

  return (
    <div className={facebook.facebookWrapper} style={{ width }}>
      <div className={facebook.facebookImageContainer}>
        {shareImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="share on facebook"
            className={facebook.facebookCardImage}
            src={urlFor(shareImage).width(1200).height(630).url()}
          />
        ) : (
          <span className={preview.imagePlaceholder} />
        )}
      </div>
      <div className={facebook.facebookCardContent}>
        <div className={facebook.facebookCardUrl}>{shareUrl}</div>
        <div className={facebook.facebookCardTitle}>
          <a href={pageUrl ?? '#'} target="_blank" rel="noreferrer">
            {pageTitle}
          </a>
        </div>
        {metaDescription && (
          <div className={facebook.facebookCardDescription}>{metaDescription}</div>
        )}
      </div>
    </div>
  );
}
