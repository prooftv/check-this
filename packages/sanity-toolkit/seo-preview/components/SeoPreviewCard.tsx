import preview from './previews/Preview.module.css';
import { IntentLink } from 'sanity/router';

interface Props {
  children: React.ReactNode;
  loading: boolean;
  canShowPreview: boolean;
  type: string;
  Icon: React.ComponentType<{ className?: string }>;
  intent?: {
    id: string;
    type: string;
  };
}

export function SeoPreviewCard({
  loading,
  canShowPreview,
  children,
  Icon,
  type,
  intent,
}: Props) {
  const loadingHtml = (
    <div>
      <strong>Loading</strong>
    </div>
  );
  const previewHtml = <div className={preview.seoItemCard}>{children}</div>;
  const cantShowPreviewHtml = (
    <div style={{ color: 'black' }}>
      <strong>Not enough data to show preview</strong>
      <p>
        Please add a title or image, and fill out your SEO fields first, on this content or in{' '}
        <IntentLink intent="edit" params={intent}>
          Site Config &gt; SEO + Social.
        </IntentLink>
      </p>
    </div>
  );

  const outputHtml = loading
    ? loadingHtml
    : !canShowPreview
      ? cantShowPreviewHtml
      : previewHtml;

  return (
    <div className={preview.seoItem}>
      <h3 className={preview.seoItemTitle}>
        <Icon className={preview.seoItemLogo} />
        {type} preview
      </h3>
      <div className={preview.seoItemContent}>{outputHtml}</div>
    </div>
  );
}
