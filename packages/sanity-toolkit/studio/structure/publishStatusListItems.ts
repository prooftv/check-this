import type {
  StructureBuilder,
  StructureResolverContext,
  Divider,
  ListItemBuilder,
} from 'sanity/structure';

export enum EXCLUDE {
  ALL = 'all',
  PUBLISHED = 'published',
  MODIFIED = 'modified',
  DRAFT = 'draft',
}

export function publishStatusListItems(
  S: StructureBuilder,
  _context: StructureResolverContext,
  {
    schemaType,
    title,
    exclude,
  }: { schemaType: string; title: string; exclude?: Array<EXCLUDE> },
) {
  const docTypeSlug = title.toLowerCase();

  const ifNot = ifNotWith(exclude);

  return [
    ...ifNot(EXCLUDE.ALL, [
      S.documentTypeListItem(schemaType).id(`all-${docTypeSlug}`).title(`All ${title}`),
      S.divider(),
    ]),

    ...ifNot(EXCLUDE.PUBLISHED, [
      S.documentTypeListItem(schemaType)
        .id(`published-${docTypeSlug}`)
        .title(`Published`)
        .child(
          S.documentTypeList(schemaType)
            .title(`Published`)
            .filter(`_type == "${schemaType}" && !(_id in path("drafts.**"))`), // Documents that have a Published version
        ),
    ]),

    ...ifNot(EXCLUDE.MODIFIED, [
      S.documentTypeListItem(schemaType)
        .id(`modified-${docTypeSlug}`)
        .title(`Modified`)
        .child(
          S.documentTypeList(schemaType).title(`Modified`).filter(
            // Published documents that have draft versions not yet published
            `_type == "${schemaType}" && count(*[_id in [^._id, "drafts." + ^._id]]) > 1`,
          ),
        ),
    ]),

    ...ifNot(EXCLUDE.DRAFT, [
      S.documentTypeListItem(schemaType)
        .id(`draft-${docTypeSlug}`)
        .title(`Draft`)
        .child(
          S.documentTypeList(schemaType).title(`Draft`).filter(
            // Draft documents that have no published version
            `_type == "${schemaType}" && _id in path("drafts.**") && count(*[^._id == "drafts." + _id]) == 0`,
          ),
        ),
    ]),
  ];
}

function ifNotWith(exclude?: Array<EXCLUDE>) {
  return function ifNot(excludeTest: EXCLUDE, structure: Array<ListItemBuilder | Divider>) {
    return exclude?.includes(excludeTest) ? [] : structure;
  };
}
