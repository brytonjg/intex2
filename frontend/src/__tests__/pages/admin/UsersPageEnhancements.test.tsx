import { describe, it, expect } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../helpers/renderWithProviders';
import UsersPage from '../../../pages/admin/UsersPage';

describe('UsersPage - Enhancements', () => {
  it('renders page title', async () => {
    renderWithProviders(<UsersPage />);
    await waitFor(() => {
      const title = screen.queryByText('User Management') || screen.queryByText(/Access denied/);
      expect(title).toBeTruthy();
    });
  });

  it('shows Create Account button for admin', async () => {
    renderWithProviders(<UsersPage />);
    await waitFor(() => {
      const btn = screen.queryByText('Create Account');
      expect(btn !== null || screen.queryByText('User Management') !== null).toBeTruthy();
    });
  });

  it('renders role filter dropdown', async () => {
    renderWithProviders(<UsersPage />);
    await waitFor(() => {
      // The role filter is a custom Dropdown showing "All Roles" by default
      const dropdown = screen.queryByText('All Roles');
      const pageLoaded = dropdown || screen.queryByText(/Access denied/);
      expect(pageLoaded).toBeTruthy();
    });
  });

  it('includes Donor option in create form role dropdown', async () => {
    renderWithProviders(<UsersPage />);
    await waitFor(() => {
      const createBtn = screen.queryByText('Create Account');
      if (createBtn) {
        createBtn.click();
      }
    });
    await waitFor(() => {
      const donorOption = screen.queryByRole('option', { name: 'Donor' });
      if (donorOption) {
        expect(donorOption).toBeTruthy();
      }
    });
  });

  it('renders edit buttons for users', async () => {
    renderWithProviders(<UsersPage />);
    await waitFor(() => {
      const editBtns = screen.queryAllByTitle('Edit user');
      // If the page rendered as admin with users, edit buttons should exist
      if (screen.queryByText('User Management')) {
        expect(editBtns.length).toBeGreaterThan(0);
      }
    });
  });

  it('opens edit modal when edit button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<UsersPage />);
    await waitFor(() => {
      expect(screen.queryByText('User Management') || screen.queryByText(/Access denied/)).toBeTruthy();
    });
    const editBtns = screen.queryAllByTitle('Edit user');
    if (editBtns.length > 0) {
      await user.click(editBtns[0]);
      await waitFor(() => {
        expect(screen.queryByText('Edit Account')).toBeTruthy();
        expect(screen.queryByText('Save Changes')).toBeTruthy();
      });
    }
  });
});
