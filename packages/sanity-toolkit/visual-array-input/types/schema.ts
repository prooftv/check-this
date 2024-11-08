import type { ObjectDefinition, ObjectOptions } from 'sanity';

/**
 * Pass any of the properties of Sanity object types described here: https://www.sanity.io/docs/object-type
 */
export interface BlockSchemaDefinition extends Omit<ObjectDefinition, 'options'> {
  options?: BlockOptions;
}

// @todo support variants
export interface BlockOptions extends ObjectOptions {
  /**
   * Which group this variant will be displayed in within the Block Wizard UI.
   */
  group?: string;
  /**
   * Which tags this variant will be displayed for within the Block Wizard UI.
   */
  tags?: Array<string>;
  /**
   * URl to an image, video or GIF that shows what this block variant looks like.
   */
  assetUrl?: string;
  /**
   * What initial value to use for this variant when creating the block.
   * Allows for quick creation of blocks with given fields filled in.
   *
   * @example
   * {
   *   centeredTitle: true,
   *   bg: "dark"
   * }
   */
  initialValue?: Record<string, unknown>;
}
