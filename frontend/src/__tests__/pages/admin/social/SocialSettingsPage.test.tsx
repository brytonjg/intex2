import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import SocialSettingsPage from '../../../../pages/admin/social/SocialSettingsPage';
import { renderWithProviders } from '../../../helpers/renderWithProviders';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
      postsPerWeek: 10,
      platformsActive: '["instagram","facebook"]',
      timezone: 'Asia/Manila',
      recyclingEnabled: true,
      dailyGenerationTime: '06:00',
      notificationMethod: 'in_app',
      notificationEmail: '',
      pillarRatioSafehouseLife: 30,
      pillarRatioTheProblem: 25,
      pillarRatioTheSolution: 20,
      pillarRatioDonorImpact: 15,
      pillarRatioCallToAction: 10,
    }),
  });
  }));
});

describe('SocialSettingsPage', () => {
  it('renders the page title', async () => {
    renderWithProviders(<SocialSettingsPage />);
    await waitFor(() => {
      expect(screen.getByText('Social Media Settings')).toBeInTheDocument();
    });
  });

  it('shows save button', async () => {
    renderWithProviders(<SocialSettingsPage />);
    await waitFor(() => {
      expect(screen.getByText('Save Changes')).toBeInTheDocument();
    });
  });

  it('shows pillar distribution section', async () => {
    renderWithProviders(<SocialSettingsPage />);
    await waitFor(() => {
      expect(screen.getByText('Safehouse Life')).toBeInTheDocument();
      expect(screen.getByText('The Problem')).toBeInTheDocument();
      expect(screen.getByText('Call to Action')).toBeInTheDocument();
    });
  });

  it('shows recycling toggle', async () => {
    renderWithProviders(<SocialSettingsPage />);
    await waitFor(() => {
      expect(screen.getByText('Content Recycling')).toBeInTheDocument();
    });
  });

  it('shows platform checkboxes', async () => {
    renderWithProviders(<SocialSettingsPage />);
    await waitFor(() => {
      expect(screen.getByText('Instagram')).toBeInTheDocument();
      expect(screen.getByText('Facebook')).toBeInTheDocument();
      expect(screen.getByText('Twitter')).toBeInTheDocument();
    });
  });
});
