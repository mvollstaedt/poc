import { useClerk } from '@clerk/react';

export default function LogoutButton() {
  const { signOut } = useClerk();

  return (
    <button className="logout-button" onClick={() => signOut()}>
      Logout
    </button>
  );
}
