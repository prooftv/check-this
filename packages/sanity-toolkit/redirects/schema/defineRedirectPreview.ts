import { REDIRECT_TYPE } from '../types';

interface Prepare {
  linkType?: REDIRECT_TYPE;
  externalTo?: string;
  internalTo?: string;
  from?: string;
  isPermanent?: boolean;
}

export function defineRedirectPreview() {
  return {
    select: {
      linkType: 'link.linkType',
      externalTo: 'link.external',
      internalTo: 'link.internal.title',
      from: 'from',
      isPermanent: 'isPermanent',
    },
    prepare({ linkType, externalTo, internalTo, isPermanent, from }: Prepare) {
      let title = 'New Redirect';
      const to = linkType === REDIRECT_TYPE.DIRECT_PAGE ? internalTo : externalTo;

      if (from ?? to) {
        title = `${from ?? '?'} → ${to ?? '?'}`;
      }

      return {
        title,
        subtitle: isPermanent ? 'Permanent (308)' : 'Temporary (307)',
      };
    },
  };
}
