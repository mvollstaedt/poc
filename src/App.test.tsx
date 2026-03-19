import { render, screen } from '@testing-library/react';
import { useAuth } from '@clerk/react';
import App from './App';

vi.mock('@clerk/react');

describe('App', () => {
  afterEach(() => {
    vi.mocked(useAuth).mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
    } as ReturnType<typeof useAuth>);
  });

  it('renders nothing while auth is loading', () => {
    // Setup
    vi.mocked(useAuth).mockReturnValue({
      isLoaded: false,
      isSignedIn: false,
    } as ReturnType<typeof useAuth>);

    // Act
    const { container } = render(<App />);

    // Assert
    expect(container.firstChild).toBeNull();
  });

  it('shows sign-in page when user is not authenticated', () => {
    // Setup
    vi.mocked(useAuth).mockReturnValue({
      isLoaded: true,
      isSignedIn: false,
    } as ReturnType<typeof useAuth>);

    // Act
    render(<App />);

    // Assert
    expect(screen.getByTestId('clerk-sign-in')).toBeInTheDocument();
  });

  it('shows landing page when user is authenticated', () => {
    // Setup
    vi.mocked(useAuth).mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
    } as ReturnType<typeof useAuth>);

    // Act
    render(<App />);

    // Assert
    expect(
      screen.getByRole('heading', { name: /welcome to the poc/i }),
    ).toBeInTheDocument();
  });

  it('unhides the document once auth has loaded', () => {
    // Setup
    document.documentElement.style.visibility = 'hidden';
    vi.mocked(useAuth).mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
    } as ReturnType<typeof useAuth>);

    // Act
    render(<App />);

    // Assert
    expect(document.documentElement.style.visibility).toBe('');
  });
});
