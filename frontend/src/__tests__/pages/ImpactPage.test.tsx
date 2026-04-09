import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import ImpactPage from '../../pages/ImpactPage';
import { renderWithProviders } from '../helpers/renderWithProviders';

describe('ImpactPage', () => {
  it('renders the page headline', () => {
    renderWithProviders(<ImpactPage />);
    expect(screen.getByText(/Every number represents/)).toBeInTheDocument();
  });

  it('loads and shows impact summary stats', async () => {
    renderWithProviders(<ImpactPage />);
    await waitFor(() => {
      expect(screen.getByText('Girls served')).toBeInTheDocument();
    });
  });

  it('renders what your donation provides section', () => {
    renderWithProviders(<ImpactPage />);
    expect(screen.getByText(/What your donation provides/)).toBeInTheDocument();
  });

  it('renders impact cards with amounts', () => {
    renderWithProviders(<ImpactPage />);
    expect(screen.getByText('$500')).toBeInTheDocument();
    expect(screen.getByText('$2,000')).toBeInTheDocument();
    expect(screen.getByText('$8,000')).toBeInTheDocument();
  });

  it('renders stories section', () => {
    renderWithProviders(<ImpactPage />);
    expect(screen.getByText('Stories of hope')).toBeInTheDocument();
  });

  it('renders donate CTA', () => {
    renderWithProviders(<ImpactPage />);
    expect(screen.getByText(/Donate Now/)).toBeInTheDocument();
  });
});
