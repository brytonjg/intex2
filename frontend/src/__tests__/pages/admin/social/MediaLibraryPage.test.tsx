import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import MediaLibraryPage from '../../../../pages/admin/social/MediaLibraryPage';
import { renderWithProviders } from '../../../helpers/renderWithProviders';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
    if (url.includes('/api/admin/social/media')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { mediaLibraryItemId: 1, filePath: '/test.jpg', thumbnailPath: '/test_thumb.jpg', caption: 'Art therapy', activityType: 'art_therapy', usedCount: 2, uploadedAt: '2026-04-08T12:00:00Z' },
          { mediaLibraryItemId: 2, filePath: '/test2.jpg', thumbnailPath: '/test2_thumb.jpg', caption: 'Movie night', activityType: 'daily_life', usedCount: 0, uploadedAt: '2026-04-07T12:00:00Z' },
        ]),
      });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  }));
});

describe('MediaLibraryPage', () => {
  it('renders the page title', async () => {
    renderWithProviders(<MediaLibraryPage />);
    await waitFor(() => {
      expect(screen.getByText('Media Library')).toBeInTheDocument();
    });
  });

  it('shows photo count', async () => {
    renderWithProviders(<MediaLibraryPage />);
    await waitFor(() => {
      expect(screen.getByText('2 photos available')).toBeInTheDocument();
    });
  });

  it('renders photo cards with captions', async () => {
    renderWithProviders(<MediaLibraryPage />);
    await waitFor(() => {
      expect(screen.getByText('Art therapy')).toBeInTheDocument();
      expect(screen.getByText('Movie night')).toBeInTheDocument();
    });
  });

  it('shows activity type labels', async () => {
    renderWithProviders(<MediaLibraryPage />);
    await waitFor(() => {
      expect(screen.getByText('Art Therapy')).toBeInTheDocument();
      expect(screen.getByText('Daily Life')).toBeInTheDocument();
    });
  });

  it('shows usage count badge', async () => {
    renderWithProviders(<MediaLibraryPage />);
    await waitFor(() => {
      expect(screen.getByText('Used 2x')).toBeInTheDocument();
    });
  });

  it('has activity type filter', async () => {
    renderWithProviders(<MediaLibraryPage />);
    await waitFor(() => {
      expect(screen.getByDisplayValue('All types')).toBeInTheDocument();
    });
  });
});
