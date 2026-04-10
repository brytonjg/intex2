import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../helpers/renderWithProviders';
import CaseConferencesPage from '../../../pages/admin/CaseConferencesPage';

describe('CaseConferencesPage', () => {
  it('renders the page title', async () => {
    renderWithProviders(<CaseConferencesPage />);
    await waitFor(() => {
      expect(screen.getByText('Case Conferences')).toBeInTheDocument();
    });
  });

  it('renders a New Conference button', async () => {
    renderWithProviders(<CaseConferencesPage />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /new conference/i })).toBeInTheDocument();
    });
  });

  it('shows form fields when New Conference is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CaseConferencesPage />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /new conference/i })).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /new conference/i }));

    await waitFor(() => {
      expect(screen.getByText('Safehouse')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Notes (optional)')).toBeInTheDocument();
    });
  });
});
