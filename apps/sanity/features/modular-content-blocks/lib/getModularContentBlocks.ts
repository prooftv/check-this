import { innerOnlyBlocks, outerOnlyBlocks } from './blockSchemas';
import { getModularBlocksFn } from '@pkg/modular-content-blocks/sanity/schema/getModularContentBlocks';

const { getModularBlocks: getModularBlocksPkg } = getModularBlocksFn(
  innerOnlyBlocks,
  outerOnlyBlocks,
);

export function getModularBlocks(opts = {}) {
  return getModularBlocksPkg(opts);
}
