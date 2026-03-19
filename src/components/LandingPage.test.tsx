import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

vi.mock('@clerk/react');

describe('LandingPage', () => {
  it('renders the hero with a heading and call-to-action', () => {
    // Act
    render(<LandingPage />);

    // Assert
    expect(
      screen.getByRole('heading', { name: /welcome to the poc/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /see features/i }),
    ).toBeInTheDocument();
  });

  it('renders all three feature cards', () => {
    // Act
    render(<LandingPage />);

    // Assert
    expect(screen.getByRole('heading', { name: /fast/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /secure/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /mobile-ready/i }),
    ).toBeInTheDocument();
  });

  it('renders the footer with copyright information', () => {
    // Act
    render(<LandingPage />);

    // Assert
    expect(screen.getByText(/2026 POC/)).toBeInTheDocument();
  });

  it('renders a logout button', () => {
    // Act
    render(<LandingPage />);

    // Assert
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });
});
