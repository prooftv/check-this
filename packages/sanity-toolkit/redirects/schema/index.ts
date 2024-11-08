import { defineType } from 'sanity';
import { TbArrowElbowRight } from 'react-icons/tb';
import { defineRedirectFields } from './defineRedirectFields';
import { defineRedirectPreview } from './defineRedirectPreview';

interface Options {
  schemaName: string;
  internalLinkTypes: Array<string>;
}

export function redirects({ schemaName, internalLinkTypes }: Options) {
  return defineType({
    title: 'Redirect',
    name: schemaName,
    type: 'document',
    icon: TbArrowElbowRight,
    fields: defineRedirectFields(internalLinkTypes),
    preview: defineRedirectPreview(),
  });
}
