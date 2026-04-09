import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SocialQueuePage from '../../../../pages/admin/social/SocialQueuePage';
import PhotoUploadPage from '../../../../pages/admin/social/PhotoUploadPage';
import SocialSettingsPage from '../../../../pages/admin/social/SocialSettingsPage';
import VoiceBrandPage from '../../../../pages/admin/social/VoiceBrandPage';
import FactsPage from '../../../../pages/admin/social/FactsPage';
import { renderWithProviders } from '../../../helpers/renderWithProviders';

// Default mock that handles all social media API calls
function setupMocks(overrides: Record<string, unknown> = {}) {
  vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string, opts?: RequestInit) => {
    // Queue page
    if (url.includes('queue-count')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ draftCount: 1, readyCount: 1 }) });
    }
    if (url.includes('status=draft') || url.includes('status=ready_to_publish') || url.includes('status=published')) {
      const status = url.includes('draft') ? 'draft' : url.includes('ready') ? 'ready_to_publish' : 'published';
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{
          automatedPostId: 1, content: 'Test post content', contentPillar: 'safehouse_life',
          source: 'auto_generated', status, platform: 'instagram', scheduledAt: null,
          engagementLikes: status === 'published' ? 42 : null,
          engagementShares: status === 'published' ? 5 : null,
          engagementComments: status === 'published' ? 3 : null,
          createdAt: '2026-04-08T12:00:00Z',
        }]),
      });
    }
    // Approve/reject/snooze/publish
    if (opts?.method === 'PATCH') {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ automatedPostId: 1, status: 'scheduled' }) });
    }
    // Generate
    if (url.includes('/generate') && opts?.method === 'POST') {
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ generated: 2, posts: [] }) });
    }
    // Voice guide
    if (url.includes('voice-guide')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          orgDescription: 'Test org', toneDescription: 'Warm', preferredTerms: '{}',
          avoidedTerms: '{}', structuralRules: '', visualRules: '',
        }),
      });
    }
    // Talking points
    if (url.includes('talking-points')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ contentTalkingPointId: 1, text: 'Test point', topic: 'general', usageCount: 0, isActive: true }]),
      });
    }
    // Hashtag sets
    if (url.includes('hashtag-sets')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ hashtagSetId: 1, name: 'Test set', category: 'cause', pillar: 'all', platform: 'all', hashtags: '["#test"]' }]),
      });
    }
    // Facts
    if (url.includes('/facts') && !url.includes('candidates')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ contentFactId: 1, factText: 'Test fact', sourceName: 'Source', category: 'trafficking_stats', pillar: 'the_problem', usageCount: 0 }]),
      });
    }
    // Fact candidates
    if (url.includes('candidates')) {
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    }
    // Settings
    if (url.includes('settings')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          postsPerWeek: 10, platformsActive: '["instagram"]', timezone: 'UTC',
          recyclingEnabled: true, dailyGenerationTime: '06:00', notificationMethod: 'in_app',
          notificationEmail: '', pillarRatioSafehouseLife: 30, pillarRatioTheProblem: 25,
          pillarRatioTheSolution: 20, pillarRatioDonorImpact: 15, pillarRatioCallToAction: 10,
        }),
      });
    }
    // Default
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  }));
}

describe('Queue Page Interactions', () => {
  beforeEach(() => setupMocks());

  it('clicking approve calls the approve endpoint', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => expect(screen.getByText('Approve')).toBeInTheDocument());
    await user.click(screen.getByText('Approve'));
    // Verify PATCH was called
    const calls = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls;
    const approveCall = calls.find((c: string[]) => c[0]?.includes('/approve'));
    expect(approveCall).toBeTruthy();
  });

  it('clicking edit shows textarea', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => expect(screen.getByText('Edit')).toBeInTheDocument());
    await user.click(screen.getByText('Edit'));
    expect(screen.getByDisplayValue('Test post content')).toBeInTheDocument();
  });

  it('generate button triggers API call', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => expect(screen.getByText('Generate Posts')).toBeInTheDocument());
    await user.click(screen.getByText('Generate Posts'));
    const calls = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls;
    const genCall = calls.find((c: string[]) => c[0]?.includes('/generate'));
    expect(genCall).toBeTruthy();
  });
});

describe('Photo Upload Interactions', () => {
  beforeEach(() => setupMocks());

  it('submit button stays disabled without consent', async () => {
    renderWithProviders(<PhotoUploadPage />);
    const btns = screen.getAllByText('Upload Photo');
    const submitBtn = btns.find(el => el.closest('button'))?.closest('button');
    expect(submitBtn).toBeDisabled();
  });
});

describe('Settings Page Interactions', () => {
  beforeEach(() => setupMocks());

  it('clicking save calls the PUT endpoint', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SocialSettingsPage />);
    await waitFor(() => expect(screen.getByText('Save Changes')).toBeInTheDocument());
    await user.click(screen.getByText('Save Changes'));
    await waitFor(() => {
      const calls = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls;
      const saveCall = calls.find((c: [string, RequestInit?]) => c[1]?.method === 'PUT');
      expect(saveCall).toBeTruthy();
    });
  });
});

describe('Voice & Brand Tab Switching', () => {
  beforeEach(() => setupMocks());

  it('switching to Talking Points tab shows points list', async () => {
    const user = userEvent.setup();
    renderWithProviders(<VoiceBrandPage />);
    await waitFor(() => expect(screen.getByText(/Talking Points/)).toBeInTheDocument());
    await user.click(screen.getByText(/Talking Points/));
    await waitFor(() => {
      expect(screen.getByText('Test point')).toBeInTheDocument();
    });
  });

  it('switching to Hashtags tab shows hashtag sets', async () => {
    const user = userEvent.setup();
    renderWithProviders(<VoiceBrandPage />);
    await waitFor(() => expect(screen.getByText(/Hashtags/)).toBeInTheDocument());
    await user.click(screen.getByText(/Hashtags/));
    await waitFor(() => {
      expect(screen.getByText('Test set')).toBeInTheDocument();
    });
  });
});

describe('Facts Page Tab Switching', () => {
  beforeEach(() => setupMocks());

  it('shows curated facts by default', async () => {
    renderWithProviders(<FactsPage />);
    await waitFor(() => {
      expect(screen.getByText('Test fact')).toBeInTheDocument();
    });
  });

  it('switching to candidates tab works', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FactsPage />);
    await waitFor(() => expect(screen.getByText(/Candidates/)).toBeInTheDocument());
    await user.click(screen.getByText(/Candidates/));
    await waitFor(() => {
      expect(screen.getByText(/No pending candidates/)).toBeInTheDocument();
    });
  });

  it('clicking Add Fact shows the form', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FactsPage />);
    await waitFor(() => expect(screen.getByText('Add Fact')).toBeInTheDocument());
    await user.click(screen.getByText('Add Fact'));
    expect(screen.getByPlaceholderText(/fact or statistic/i)).toBeInTheDocument();
  });
});

describe('Error States', () => {
  it('queue page shows error on API failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => {
      expect(screen.getByText(/failed|error/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
