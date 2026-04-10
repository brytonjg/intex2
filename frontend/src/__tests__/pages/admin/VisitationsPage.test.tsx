import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VisitationsPage from '../../../pages/admin/VisitationsPage';
import { renderWithProviders } from '../../helpers/renderWithProviders';

describe('VisitationsPage', () => {
  it('renders the page title', async () => {
    renderWithProviders(<VisitationsPage />);
    await waitFor(() => {
      expect(screen.getByText('Home Visitations')).toBeInTheDocument();
    });
  });

  it('loads visitation data', async () => {
    renderWithProviders(<VisitationsPage />);
    await waitFor(() => {
      expect(screen.getByText('LS-0001')).toBeInTheDocument();
    });
  });

  it('renders New Visit link', () => {
    renderWithProviders(<VisitationsPage />);
    expect(screen.getByText('New Visit')).toBeInTheDocument();
  });
});
