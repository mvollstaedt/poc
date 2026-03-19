import { vi } from 'vitest';

export const useAuth = vi.fn().mockReturnValue({
  isLoaded: true,
  isSignedIn: true,
  getToken: vi.fn().mockResolvedValue('mock-token'),
});

export const useClerk = vi.fn().mockReturnValue({
  signOut: vi.fn(),
});

export function SignIn(props: Record<string, unknown>) {
  return <div data-testid="clerk-sign-in" data-props={JSON.stringify(props)} />;
}

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
