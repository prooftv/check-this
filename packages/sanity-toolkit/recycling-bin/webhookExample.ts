/**
 * This is an example of the webhook that must be added in manage.sanity.io for the Recycling Bin to work.
 *
 * You should be able to copy this from this shareable link: https://www.sanity.io/manage/webhooks/share?name=Deleted%20Document%20Webhook&description=Webhook%20for%20storing%20deleted%20documents%20in%20the%20trash%20can%20for%20retrieval&url=https%3A%2F%2F%7BPROJECT_ID%7D.api.sanity.io%2Fv2024-10-31%2Fdata%2Fmutate%2Fproduction&on=delete&filter=_type%20in%20%5B%27page%27%2C%20%27article%27%2C%20%27policyInstrument%27%2C%20%27publication%27%2C%20%27tool%27%2C%20%27topic%27%2C%20%27policyDocument%27%2C%20%27author%27%2C%20%27organisation%27%2C%20%27region%27%2C%20%27taxonomies.annualReportSection%27%2C%20%27taxonomies.speciesType%27%2C%20%27taxonomies.habitat%27%2C%20%27taxonomies.conservationActions%27%2C%20%27taxonomies.threat%27%2C%20%27taxonomies.publicationType%27%2C%20%27taxonomies.policyType%27%2C%20%27config.coreSection%27%2C%20%27config.reusableBlock%27%2C%20%27navigation.header%27%2C%20%27navigation.footer%27%2C%20%27endOfPageSignpost%27%5D%0A&projection=%7B%0A%20%20%22mutations%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22patch%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22query%22%3A%20%22*%5B_type%20%3D%3D%20%27recycling.bin%27%20%26%26%20_id%20%3D%3D%20%27singleton-recycling.bin%27%5D%22%2C%0A%20%20%20%20%20%20%20%20%22setIfMissing%22%3A%20%7B%27deletedDocIds%27%3A%20%5B%5D%7D%2C%0A%20%20%20%20%20%20%20%20%22insert%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22before%22%3A%20%22deletedDocIds%5B0%5D%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22items%22%3A%20%5B_id%5D%0A%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22patch%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22query%22%3A%20%22*%5B_type%20%3D%3D%20%27recycling.bin%27%20%26%26%20_id%20%3D%3D%20%27singleton-recycling.bin%27%5D%22%2C%0A%0A%20%20%20%20%20%20%20%20%22setIfMissing%22%3A%20%7B%27deletedDocLogs%27%3A%20%5B%5D%7D%2C%0A%20%20%20%20%20%20%20%20%22insert%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22before%22%3A%20%22deletedDocLogs%5B0%5D%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22items%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22docId%22%3A%20_id%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22deletedAt%22%3A%20now()%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20_type%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22documentTitle%22%3A%20coalesce(title%2C%20name)%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22_key%22%3A%20_rev%0A%20%20%20%20%20%20%20%20%20%20%7D%5D%2C%0A%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%5D%0A%7D%0A&httpMethod=POST&apiVersion=v2021-03-25&includeDrafts=&headers=%7B%7D
 * If you do, you'll need to add the HTTP Headers, as these are not shared in the link.
 */
import groq from 'groq';

const webhookExample = {
  name: 'Deleted Document Webhook',
  description: 'Webhook for storing deleted documents in the trash can for retrieval',
  url: 'https://{YOUR_PROJECT_ID}.api.sanity.io/v2024-10-31/data/mutate/production',
  dataset: 'production',
  triggerOn: 'delete',
  filter:
    "_type in ['page', 'article', 'author', 'taxonomies.category', 'taxonomies.tag', 'config.coreSection', 'config.reusableBlock', 'navigation.header', 'navigation.footer', 'announcement']",
  projection: groq`{
    mutations: [
      {
        patch: {
          query: "*[_type == 'recycling.bin' && _id == 'singleton-recycling.bin']",
          setIfMissing: { deletedDocIds: [] },
          insert: {
            before: 'deletedDocIds[0]',
            items: [_id],
          },
        },
      },
      {
        patch: {
          query: "*[_type == 'recycling.bin' && _id == 'singleton-recycling.bin']",

          setIfMissing: { deletedDocLogs: [] },
          insert: {
            before: 'deletedDocLogs[0]',
            items: [
              {
                docId: _id,
                deletedAt: now(),
                type: _type,
                documentTitle: coalesce(title, name),
                _key: _rev,
              },
            ],
          },
        },
      },
    ],
  }`,
  status: 'enableWebhook',
  advancedSettings: {
    httpMethod: 'POST',
    httpHeaders: [{ name: 'Authorization', value: 'Bearer {YOUR_WRITABLE_API_TOKEN}' }],
    apiVersion: 'v2021-03-25',
    drafts: false,
    secret: undefined,
  },
};
