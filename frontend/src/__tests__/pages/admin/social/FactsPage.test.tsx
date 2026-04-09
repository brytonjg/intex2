import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import FactsPage from '../../../../pages/admin/social/FactsPage';
import { renderWithProviders } from '../../../helpers/renderWithProviders';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
    if (url.includes('/facts') && !url.includes('candidates')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { contentFactId: 1, factText: '79% of victims are under 18', sourceName: 'UNICEF', sourceUrl: 'https://unicef.org', category: 'trafficking_stats', pillar: 'the_problem', usageCount: 3 },
          { contentFactId: 2, factText: 'Art therapy reduces PTSD by 35%', sourceName: 'Journal', sourceUrl: null, category: 'rehabilitation', pillar: 'the_solution', usageCount: 0 },
        ]),
      });
    }
    if (url.includes('candidates')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { contentFactCandidateId: 1, factText: 'Candidate fact', sourceName: 'Source', category: 'regional', status: 'pending' },
        ]),
      });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  }));
});

describe('FactsPage', () => {
  it('renders the page title', async () => {
    renderWithProviders(<FactsPage />);
    await waitFor(() => {
      expect(screen.getByText('Fact Database')).toBeInTheDocument();
    });
  });

  it('shows curated facts tab with count', async () => {
    renderWithProviders(<FactsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Curated Facts/)).toBeInTheDocument();
    });
  });

  it('shows candidates tab with badge', async () => {
    renderWithProviders(<FactsPage />);
    await waitFor(() => {
      expect(screen.getByText(/Candidates/)).toBeInTheDocument();
    });
  });

  it('renders fact cards with source', async () => {
    renderWithProviders(<FactsPage />);
    await waitFor(() => {
      expect(screen.getByText(/79% of victims/)).toBeInTheDocument();
      expect(screen.getByText('UNICEF')).toBeInTheDocument();
    });
  });

  it('shows add fact button', async () => {
    renderWithProviders(<FactsPage />);
    await waitFor(() => {
      expect(screen.getByText('Add Fact')).toBeInTheDocument();
    });
  });

  it('shows research button', async () => {
    renderWithProviders(<FactsPage />);
    await waitFor(() => {
      expect(screen.getByText('Research')).toBeInTheDocument();
    });
  });
});
