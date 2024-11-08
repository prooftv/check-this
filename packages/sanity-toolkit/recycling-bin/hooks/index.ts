import { useClient, type SanityClient } from 'sanity';
import groq from 'groq';
import { PERSPECTIVE } from '../../studio/constants/perspectives';

interface Options {
  apiVersion?: string;
}

export function useRecyclingBin({ apiVersion = '2024-10-24' }: Options) {
  const client = useClient({ apiVersion }).withConfig({
    perspective: PERSPECTIVE.PREVIEW_DRAFTS,
  });

  /** Fetches unique deleted documents from the recycling bin. */
  async function getExistingDocs(recycledDocumentIDs: Array<string | undefined>) {
    if (!recycledDocumentIDs.length) return [];

    const query = groq`*[_id in $docIds]{ 'docId': _id }`;

    try {
      return await client.fetch<Array<{ docId: string }>>(query, {
        docIds: recycledDocumentIDs,
      });
    } catch (err) {
      console.error('Failed to fetch existing documents:', err);
      return [];
    }
  }

  /** Cleans the Recycling Bin by removing the references to the deleted documents forever. */
  async function cleanUp(documentId: string, recycledDocumentIDs: Array<string | undefined>) {
    if (!documentId || !recycledDocumentIDs.length) return;

    const existingDocs = await getExistingDocs(recycledDocumentIDs);
    if (!existingDocs.length) return;

    const itemsToUnset = existingDocs.map(
      (item) => `deletedDocLogs[docId == "${item.docId}"]`,
    );

    client
      .patch(documentId)
      .unset(itemsToUnset)
      .commit()
      .catch((err) => console.error('Failed to clean up logs:', err));
  }

  return {
    cleanUp,
  };
}
