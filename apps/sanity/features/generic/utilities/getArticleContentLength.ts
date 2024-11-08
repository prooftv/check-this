import type { SanityDocument } from 'sanity';
import { ModularBlock } from '@/features/modular-content-blocks/config/defaultBlockGroups';
import { OBJECT } from '@pkg/common/constants/schemaTypes';
import { toPlainText } from '@portabletext/toolkit';

export function getArticleContentLength(draft: SanityDocument | null) {
  if (!draft) {
    return 0;
  }

  const content = draft.content as Array<ModularBlock & { content?: Array<ModularBlock> }>;

  return content.reduce<number>((acc, block) => {
    // An outer block with no inner blocks
    if (!block.content) {
      return acc;
    }

    // An outer block that has inner blocks
    const innerBlocksLength = block.content.reduce<number>((innerAcc, block) => {
      let contentLength = 0;

      if (block._type === OBJECT.MODULAR_INNER_BLOCK_RAW_HTML) {
        // @todo generate types for the blocks and use them here
        // @ts-expect-error block.content is of type unknown
        contentLength = toPlainText(block.content?.code).length;
      }

      return innerAcc + contentLength;
    }, 0);

    return acc + innerBlocksLength;
  }, 0);
}
