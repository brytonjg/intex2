import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import PhotoUploadPage from '../../../../pages/admin/social/PhotoUploadPage';
import { renderWithProviders } from '../../../helpers/renderWithProviders';

describe('PhotoUploadPage', () => {
  it('renders the page title', () => {
    renderWithProviders(<PhotoUploadPage />);
    expect(screen.getByRole('heading', { name: 'Upload Photo' })).toBeInTheDocument();
  });

  it('shows the upload area', () => {
    renderWithProviders(<PhotoUploadPage />);
    expect(screen.getByText(/Tap to take a photo/)).toBeInTheDocument();
  });

  it('shows activity type dropdown', () => {
    renderWithProviders(<PhotoUploadPage />);
    expect(screen.getByDisplayValue('Daily Life')).toBeInTheDocument();
  });

  it('shows consent checkbox', () => {
    renderWithProviders(<PhotoUploadPage />);
    expect(screen.getByText(/consent/i)).toBeInTheDocument();
  });

  it('submit button is disabled without photo and consent', () => {
    renderWithProviders(<PhotoUploadPage />);
    const btns = screen.getAllByText('Upload Photo');
    const submitBtn = btns.find(el => el.closest('button'))?.closest('button');
    expect(submitBtn).toBeDisabled();
  });
});
