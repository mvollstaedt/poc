import { useEffect } from 'react';
import { useAuth } from '@clerk/react';
import SignInPage from './components/SignInPage';
import LandingPage from './components/LandingPage';

export default function App() {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      document.documentElement.style.visibility = '';
    }
  }, [isLoaded]);

  if (!isLoaded) return null;
  if (!isSignedIn) return <SignInPage />;
  return <LandingPage />;
}
