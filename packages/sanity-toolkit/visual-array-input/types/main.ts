import type { ElementType } from 'react';
import type { ArrayOfObjectsInputProps } from 'sanity';
import { WIZARD_ITEMS } from '../constants';

interface ItemToAdd {
  initialValue?: Record<string, unknown>;
  type: string;
}

/** The type of function that is called to add the items */
export type AddItemCallbackFn = (
  items: UserOnItemAddArray | UserOnItemAddObject,
  index: number,
) => void;

/** A function to call when item is added */
export type UserOnItemAddFn = ({
  index,
  inputProps,
  addItems,
}: {
  index: number;
  inputProps: ArrayOfObjectsInputProps;
  /** A hook back into the original add items call for Array or Object. Use this if you need to generate your items programatically before adding, after it's been selected */
  addItems: AddItemCallbackFn;
}) => void;
/** An array of objects to add when item is added */
export type UserOnItemAddArray = Array<ItemToAdd>;
/** An object to add when item is added */
export type UserOnItemAddObject = ItemToAdd;

/**
 * onItemAdd can be a function, an object or an array of objects.
 * If a function, will call it and do nothing else (except close the item picker).
 * If an object or an array of objects, will insert them in an appropriate position in the array.
 */
export type OnItemAdd = UserOnItemAddFn | UserOnItemAddArray | UserOnItemAddObject;

export interface Item {
  title: string;
  icon?: ElementType;
  tags?: Array<string>;
  variants: Array<{
    variantTitle: string; // If only 1 variant, repeat item title as variant title. It won't be used/displayed. If 2, must be set
    variantAssetUrl?: string; // The image or video to display in the item picker. Can be a file or a URL
    itemsToAdd: OnItemAdd;
  }>;
}

export interface ItemGroup {
  name: string;
  title?: string;
  description?: string;
  default?: boolean;
  icon?: ElementType;
  items: Array<Item>;
}

export type ItemGroups = Array<ItemGroup>;

export type OnItemAddFn = ({ itemsToAdd }: { itemsToAdd: OnItemAdd }) => void;
