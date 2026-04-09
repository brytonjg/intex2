import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import SocialCalendarPage from '../../../../pages/admin/social/SocialCalendarPage';
import { renderWithProviders } from '../../../helpers/renderWithProviders';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    });
  }));
});

describe('SocialCalendarPage', () => {
  it('renders the page title', async () => {
    renderWithProviders(<SocialCalendarPage />);
    await waitFor(() => {
      expect(screen.getByText('Social Calendar')).toBeInTheDocument();
    });
  });

  it('shows week navigation', async () => {
    renderWithProviders(<SocialCalendarPage />);
    await waitFor(() => {
      // Should show day names
      expect(screen.getByText('Mon')).toBeInTheDocument();
      expect(screen.getByText('Fri')).toBeInTheDocument();
    });
  });

  it('renders 7 day columns', async () => {
    renderWithProviders(<SocialCalendarPage />);
    await waitFor(() => {
      expect(screen.getByText('Sun')).toBeInTheDocument();
      expect(screen.getByText('Tue')).toBeInTheDocument();
      expect(screen.getByText('Thu')).toBeInTheDocument();
    });
  });
});
