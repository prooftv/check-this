import { TrashIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { DeletedDocIdInputComponent } from '../components/DeletedDocIdInputComponent';
import { DeletionLogItemComponent } from '../components/DeletionLogItemComponent';
import { DeletionLogInputComponentFn } from '../components/DeletionLogInputComponent';

interface Options {
  liveEdit?: boolean;
  apiVersion?: string;
}

export function recyclingBinDocument(
  schemaName: string,
  { liveEdit = true, apiVersion = '2024-10-24' }: Options = {},
) {
  return defineType({
    name: schemaName,
    title: 'Recycling Bin: Deleted Document Log',
    type: 'document',
    icon: TrashIcon,
    liveEdit: liveEdit, // whether to skip a draft version of this document
    // Fieldset to "hide away" the deletedDocIds array from view unless we need them
    fieldsets: [
      {
        name: 'deletedDocIdLogs',
        title: 'All Deleted Doc Id Logs',
        options: {
          collapsible: true,
          collapsed: true,
        },
      },
    ],
    fields: [
      // * Main log for restoring documents
      defineField({
        name: 'deletedDocLogs',
        title: 'Deleted Doc Logs',
        type: 'array',
        readOnly: true,
        options: {
          sortable: false,
        },
        components: {
          input: DeletionLogInputComponentFn({ apiVersion }),
        },
        description:
          'Log of deleted documents. All items have the revision ID as the _key value and might have already been restored again.',
        of: [
          defineArrayMember({
            type: 'object',
            name: 'log',
            title: 'Log',
            readOnly: true,
            components: {
              item: DeletionLogItemComponent,
            },
            fields: [
              defineField({
                name: 'docId',
                title: 'Doc Id',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'deletedAt',
                title: 'Deleted At',
                type: 'datetime',
                validation: (Rule) => Rule.required(),
              }),
              defineField({
                name: 'type',
                title: 'Type',
                type: 'string',
              }),
              defineField({
                name: 'documentTitle',
                title: 'Document Title',
                type: 'string',
                validation: (Rule) => Rule.required(),
              }),
            ],
          }),
        ],
      }),
      // Backup of all deleted doc ids
      defineField({
        name: 'deletedDocIds',
        title: 'Deleted Doc Ids',
        type: 'array',
        readOnly: true,
        options: {
          sortable: false,
        },
        components: {
          input: (props: { renderDefault: (arg0: any) => any }) =>
            // Remove the `Add Item` button below the Array input
            props.renderDefault({ ...props, arrayFunctions: () => null }),
        },
        fieldset: 'deletedDocIdLogs',
        of: [
          defineArrayMember({
            name: 'deletedDocId',
            type: 'string',
            readOnly: true,
            components: {
              input: DeletedDocIdInputComponent,
            },
            validation: (Rule) => Rule.required(),
          }),
        ],
      }),
      // title for the document (will be set during creation via CLI)
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        hidden: true,
      }),
    ],
  });
}
