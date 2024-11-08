import { describe, it, expect, vi } from 'vitest';
import { changePublishText } from '../changePublishText';
import { type DocumentActionComponent } from 'sanity';
import { renderHook, waitFor } from '@testing-library/react';

describe('changePublishText', () => {
  const mockProps = {
    id: 'test-id',
    type: 'test-type',
    draft: {
      _id: 'drafts.67910e85-2584-47db-b416-4483e1c98dd5',
      _type: 'page',
      _rev: '9c84cc98-b57e-4875-a365-b978709e3cc4',
      _createdAt: '2024-10-18T12:28:47Z',
      _updatedAt: '2024-10-18T12:28:47Z',
    },
    published: null,
    transactionSyncLock: null,
    liveEdit: false,
    ready: true,
    onComplete: () => {},
  };

  it('should return "Publish" label if the document is not published', () => {
    const originalPublishAction: DocumentActionComponent = vi.fn().mockReturnValue({
      label: 'Publish',
      onHandle: vi.fn(),
    });

    const PublishAndUpdateDate = changePublishText(originalPublishAction);

    const { result } = renderHook(() => PublishAndUpdateDate(mockProps));

    expect(result.current?.label).toBe('Publish');
  });

  it('should return "Update" label if the document is published', async () => {
    const props = {
      ...mockProps,
      published: {
        ...mockProps.draft,
        _id: mockProps.draft._id.replace('drafts.', ''),
      },
    };

    const originalPublishAction: DocumentActionComponent = vi.fn().mockReturnValue({
      label: 'Publish',
      onHandle: vi.fn(),
    });

    const PublishAndUpdateDate = changePublishText(originalPublishAction);

    const { result } = renderHook(() => PublishAndUpdateDate(props));

    await waitFor(() => {
      expect(result.current?.label).toBe('Update');
    });
  });
});
