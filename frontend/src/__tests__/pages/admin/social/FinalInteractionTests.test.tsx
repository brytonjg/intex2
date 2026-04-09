import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SocialQueuePage from '../../../../pages/admin/social/SocialQueuePage';
import MediaLibraryPage from '../../../../pages/admin/social/MediaLibraryPage';
import SocialCalendarPage from '../../../../pages/admin/social/SocialCalendarPage';
import VoiceBrandPage from '../../../../pages/admin/social/VoiceBrandPage';
import FactsPage from '../../../../pages/admin/social/FactsPage';
import { renderWithProviders } from '../../../helpers/renderWithProviders';

function setupMocks() {
  vi.stubGlobal('fetch', vi.fn().mockImplementation((url: string, opts?: RequestInit) => {
    if (url.includes('queue-count')) return Promise.resolve({ ok: true, json: () => Promise.resolve({ draftCount: 1, readyCount: 1 }) });
    if (url.includes('status=ready_to_publish')) return Promise.resolve({ ok: true, json: () => Promise.resolve([
      { automatedPostId: 10, content: 'Ready post', contentPillar: 'safehouse_life', source: 'auto_generated', status: 'ready_to_publish', platform: 'instagram', scheduledAt: null, engagementLikes: null, createdAt: '2026-04-08T12:00:00Z' },
    ]) });
    if (url.includes('status=published')) return Promise.resolve({ ok: true, json: () => Promise.resolve([
      { automatedPostId: 20, content: 'Published post', contentPillar: 'the_problem', source: 'auto_generated', status: 'published', platform: 'facebook', scheduledAt: null, engagementLikes: null, engagementShares: null, engagementComments: null, createdAt: '2026-04-07T12:00:00Z' },
    ]) });
    if (url.includes('status=draft') || (url.includes('/posts') && !url.includes('status='))) return Promise.resolve({ ok: true, json: () => Promise.resolve([
      { automatedPostId: 1, content: 'Draft post', contentPillar: 'safehouse_life', source: 'auto_generated', status: 'draft', platform: 'instagram', scheduledAt: null, engagementLikes: null, createdAt: '2026-04-08T12:00:00Z' },
    ]) });
    if (url.includes('/media') && !url.includes('upload')) return Promise.resolve({ ok: true, json: () => Promise.resolve([
      { mediaLibraryItemId: 1, filePath: '/t.jpg', thumbnailPath: '/t_thumb.jpg', caption: 'Test photo', activityType: 'art_therapy', usedCount: 1, uploadedAt: '2026-04-08T12:00:00Z' },
    ]) });
    if (url.includes('calendar')) return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    if (url.includes('voice-guide')) return Promise.resolve({ ok: true, json: () => Promise.resolve({ orgDescription: 'Test', toneDescription: 'Warm', preferredTerms: '{}', avoidedTerms: '{}', structuralRules: '', visualRules: '' }) });
    if (url.includes('talking-points')) return Promise.resolve({ ok: true, json: () => Promise.resolve([{ contentTalkingPointId: 1, text: 'Test TP', topic: 'general', usageCount: 0, isActive: true }]) });
    if (url.includes('hashtag-sets')) return Promise.resolve({ ok: true, json: () => Promise.resolve([{ hashtagSetId: 1, name: 'Test', category: 'cause', pillar: 'all', platform: 'all', hashtags: '["#t"]' }]) });
    if (url.includes('/facts') && !url.includes('candidates')) return Promise.resolve({ ok: true, json: () => Promise.resolve([{ contentFactId: 1, factText: 'Fact 1', sourceName: 'Src', category: 'trafficking_stats', pillar: 'the_problem', usageCount: 0 }]) });
    if (url.includes('candidates')) return Promise.resolve({ ok: true, json: () => Promise.resolve([{ contentFactCandidateId: 1, factText: 'Candidate', sourceName: 'Src', category: 'regional', status: 'pending' }]) });
    if (opts?.method === 'PATCH' || opts?.method === 'POST' || opts?.method === 'PUT' || opts?.method === 'DELETE') return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  }));
}

describe('Queue Tab Switching', () => {
  beforeEach(() => setupMocks());

  it('clicking Ready tab loads ready posts', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => expect(screen.getByText('Ready')).toBeInTheDocument());
    await user.click(screen.getByText('Ready'));
    await waitFor(() => expect(screen.getByText(/Ready post/)).toBeInTheDocument());
  });

  it('clicking Published tab loads published posts', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => expect(screen.getByText('Published')).toBeInTheDocument());
    await user.click(screen.getByText('Published'));
    await waitFor(() => expect(screen.getByText(/Published post/)).toBeInTheDocument());
  });

  it('published tab shows Log Engagement button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => expect(screen.getByText('Published')).toBeInTheDocument());
    await user.click(screen.getByText('Published'));
    await waitFor(() => expect(screen.getByText('Log Engagement')).toBeInTheDocument());
  });
});

describe('Queue Engagement Form', () => {
  beforeEach(() => setupMocks());

  it('clicking Log Engagement shows number inputs', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => expect(screen.getByText('Published')).toBeInTheDocument());
    await user.click(screen.getByText('Published'));
    await waitFor(() => expect(screen.getByText('Log Engagement')).toBeInTheDocument());
    await user.click(screen.getByText('Log Engagement'));
    expect(screen.getByPlaceholderText('Likes')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Shares')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Comments')).toBeInTheDocument();
  });
});

describe('Media Library Delete', () => {
  beforeEach(() => setupMocks());

  it('delete button exists on photo cards', async () => {
    renderWithProviders(<MediaLibraryPage />);
    await waitFor(() => expect(screen.getByText('Test photo')).toBeInTheDocument());
    // Delete button is hidden by CSS hover, but exists in DOM
    const deleteBtn = screen.getByTitle('Delete photo');
    expect(deleteBtn).toBeInTheDocument();
  });
});

describe('Calendar Navigation', () => {
  beforeEach(() => setupMocks());

  it('has navigation arrows', async () => {
    renderWithProviders(<SocialCalendarPage />);
    await waitFor(() => expect(screen.getByText('Social Calendar')).toBeInTheDocument());
    // Find the nav buttons (they contain SVG chevrons)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('clicking Today button appears after navigation', async () => {
    const user = userEvent.setup();
    renderWithProviders(<SocialCalendarPage />);
    await waitFor(() => expect(screen.getByText('Social Calendar')).toBeInTheDocument());
    // Click the left arrow (first button in weekNav)
    const navButtons = screen.getAllByRole('button');
    await user.click(navButtons[0]); // Left arrow
    await waitFor(() => expect(screen.getByText('Today')).toBeInTheDocument());
  });
});

describe('Voice & Brand Interactions', () => {
  beforeEach(() => setupMocks());

  it('save voice guide calls PUT', async () => {
    const user = userEvent.setup();
    renderWithProviders(<VoiceBrandPage />);
    await waitFor(() => expect(screen.getByText('Save Voice Guide')).toBeInTheDocument());
    await user.click(screen.getByText('Save Voice Guide'));
    await waitFor(() => {
      const calls = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls;
      const putCall = calls.find((c: [string, RequestInit?]) => c[1]?.method === 'PUT');
      expect(putCall).toBeTruthy();
    });
  });

  it('add talking point shows after clicking tab + typing', async () => {
    const user = userEvent.setup();
    renderWithProviders(<VoiceBrandPage />);
    await waitFor(() => expect(screen.getByText(/Talking Points/)).toBeInTheDocument());
    await user.click(screen.getByText(/Talking Points/));
    await waitFor(() => expect(screen.getByPlaceholderText(/New talking point/)).toBeInTheDocument());
  });
});

describe('Facts Page Interactions', () => {
  beforeEach(() => setupMocks());

  it('add fact form appears and accepts input', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FactsPage />);
    await waitFor(() => expect(screen.getByText('Add Fact')).toBeInTheDocument());
    await user.click(screen.getByText('Add Fact'));
    const textarea = screen.getByPlaceholderText(/fact or statistic/i);
    expect(textarea).toBeInTheDocument();
    await user.type(textarea, 'New test fact');
    expect(textarea).toHaveValue('New test fact');
  });

  it('candidates tab shows pending candidates', async () => {
    const user = userEvent.setup();
    renderWithProviders(<FactsPage />);
    await waitFor(() => expect(screen.getByText(/Candidates/)).toBeInTheDocument());
    await user.click(screen.getByText(/Candidates/));
    await waitFor(() => expect(screen.getByText('Candidate')).toBeInTheDocument());
  });
});

describe('AdminLayout Navigation', () => {
  it('queue page renders social media heading', async () => {
    renderWithProviders(<SocialQueuePage />);
    await waitFor(() => {
      expect(screen.getByText('Social Media Queue')).toBeInTheDocument();
    });
  });
});
