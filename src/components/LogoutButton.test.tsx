import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useClerk } from '@clerk/react';
import LogoutButton from './LogoutButton';

vi.mock('@clerk/react');

describe('LogoutButton', () => {
  it('renders a button labeled "Logout"', () => {
    // Act
    render(<LogoutButton />);

    // Assert
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('calls signOut when the user clicks the button', async () => {
    // Setup
    const signOut = vi.fn();
    vi.mocked(useClerk).mockReturnValue({ signOut } as ReturnType<
      typeof useClerk
    >);
    const user = userEvent.setup();

    // Act
    render(<LogoutButton />);
    await user.click(screen.getByRole('button', { name: /logout/i }));

    // Assert
    expect(signOut).toHaveBeenCalledOnce();
  });
});
