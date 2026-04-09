import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import SocialQueuePage from '../../../../pages/admin/social/SocialQueuePage';
import { renderWithProviders } from '../../../helpers/renderWithProviders';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
    if (url.includes('queue-count')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ draftCount: 2, readyCount: 1 }),
      });
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        {
          automatedPostId: 1,
          content: 'Test draft post about art therapy',
          contentPillar: 'safehouse_life',
          source: 'auto_generated',
          status: 'draft',
          platform: 'instagram',
          scheduledAt: null,
          createdAt: '2026-04-08T12:00:00Z',
        },
      ]),
    });
  }));
});

describe('SocialQueuePage', () => {
  it('renders the page title', async () => {
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => {
      expect(screen.getByText('Social Media Queue')).toBeInTheDocument();
    });
  });

  it('shows generate button', async () => {
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => {
      expect(screen.getByText('Generate Posts')).toBeInTheDocument();
    });
  });

  it('renders draft post cards after loading', async () => {
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => {
      expect(screen.getByText(/art therapy/i)).toBeInTheDocument();
    });
  });

  it('shows pillar badge on cards', async () => {
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => {
      expect(screen.getByText('Safehouse Life')).toBeInTheDocument();
    });
  });

  it('shows approve button for drafts', async () => {
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => {
      expect(screen.getByText('Approve')).toBeInTheDocument();
    });
  });
});
