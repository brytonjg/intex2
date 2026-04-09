import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import VoiceBrandPage from '../../../../pages/admin/social/VoiceBrandPage';
import { renderWithProviders } from '../../../helpers/renderWithProviders';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string) => {
    if (url.includes('voice-guide')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          orgDescription: 'A nonprofit org',
          toneDescription: 'Warm and hopeful',
          preferredTerms: '{}',
          avoidedTerms: '{}',
          structuralRules: 'End with hope',
          visualRules: 'No faces',
        }),
      });
    }
    if (url.includes('talking-points')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { contentTalkingPointId: 1, text: 'We provide 24/7 care', topic: 'safehouse_model', usageCount: 3, isActive: true },
        ]),
      });
    }
    if (url.includes('hashtag-sets')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { hashtagSetId: 1, name: 'Cause tags', category: 'cause', pillar: 'all', platform: 'instagram', hashtags: '["#endtrafficking"]' },
        ]),
      });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  }));
});

describe('VoiceBrandPage', () => {
  it('renders the page title', async () => {
    renderWithProviders(<VoiceBrandPage />);
    await waitFor(() => {
      expect(screen.getByText('Voice & Brand')).toBeInTheDocument();
    });
  });

  it('shows three tabs', async () => {
    renderWithProviders(<VoiceBrandPage />);
    await waitFor(() => {
      expect(screen.getByText('Voice Guide')).toBeInTheDocument();
      expect(screen.getByText(/Talking Points/)).toBeInTheDocument();
      expect(screen.getByText(/Hashtags/)).toBeInTheDocument();
    });
  });

  it('shows voice guide form by default', async () => {
    renderWithProviders(<VoiceBrandPage />);
    await waitFor(() => {
      expect(screen.getByText('Organization Description')).toBeInTheDocument();
      expect(screen.getByText('Tone & Voice')).toBeInTheDocument();
    });
  });

  it('shows save button', async () => {
    renderWithProviders(<VoiceBrandPage />);
    await waitFor(() => {
      expect(screen.getByText('Save Voice Guide')).toBeInTheDocument();
    });
  });
});
