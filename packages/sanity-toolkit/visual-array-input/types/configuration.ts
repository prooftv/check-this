import type { Item, ItemGroup, OnItemAdd } from './main';
import type { ArrayOfObjectsInputProps, SanityClient } from 'sanity';
import { WIZARD_ITEMS } from '../constants';

export type ConfigBaseItem = Pick<Item, 'title' | 'icon' | 'tags'>;

export interface ConfigItemWithoutVariants extends ConfigBaseItem {
  assetUrl?: string;
  itemsToAdd: OnItemAdd;
}

export type ConfigItemWithVariants = ConfigBaseItem & Pick<Item, 'variants'>;

export type ConfigItem = ConfigItemWithVariants | ConfigItemWithoutVariants;

type ConfigItemGroupBase = Omit<ItemGroup, 'items'>;

/* 1. Regular static items */
export type ConfigItemGroupNotCallable = ConfigItemGroupBase & {
  items: Array<ConfigItem>;
};

/* 2. Special cases for wizard items, e.g. generate items from the array input props schema */
export type ConfigItemGroupGeneratable = ConfigItemGroupBase & {
  items: WIZARD_ITEMS;
};

/* 3. A function that returns: 1. Array of items or 2. a Promise that resolves to an Array of items */
export type ConfigItemGroupCallable = ConfigItemGroupBase & {
  items: ({
    client,
  }: {
    client: SanityClient;
  }) => Array<ConfigItem> | Promise<Array<ConfigItem>>;
};

export type ConfigItemGroup =
  | ConfigItemGroupNotCallable
  | ConfigItemGroupGeneratable
  | ConfigItemGroupCallable;

export type ConfigItemGroups = Array<ConfigItemGroup>;
