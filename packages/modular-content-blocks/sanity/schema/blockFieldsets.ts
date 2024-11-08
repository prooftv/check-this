import { BLOCK_FIELDSETS } from '../../constants';

export function outerBlockFieldsets() {
  return [
    ...blockFieldsets(),
    {
      name: BLOCK_FIELDSETS.MEDIA,
      title: 'Block Media',
      description: 'Media configuration for this block, such as image or video',
      options: { collapsible: true, collapsed: false },
    },
  ];
}

export function innerBlockFieldsets() {
  return blockFieldsets();
}

function blockFieldsets() {
  return [
    {
      name: BLOCK_FIELDSETS.META,
      title: 'Block Meta',
      description: 'Configuration and attributes for this block',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ];
}
