import { Clerk } from '@clerk/clerk-js';

const CLERK_KEY = 'pk_test_c2VsZWN0LWdvcGhlci04MS5jbGVyay5hY2NvdW50cy5kZXYk';

(async () => {
  try {
    const clerk = new Clerk(CLERK_KEY);
    await clerk.load();
    console.log('[clerk] loaded, user:', clerk.user);

    if (clerk.user) {
      document.documentElement.style.visibility = '';
    } else {
      const signInDiv = document.getElementById('clerk-sign-in');
      signInDiv.style.display = 'flex';
      document.documentElement.style.visibility = '';
      console.log('[clerk] mounting sign-in');
      clerk.mountSignIn(signInDiv, { afterSignInUrl: window.location.href });
    }
  } catch (err) {
    console.error('[clerk] error message:', err && err.message);
    console.error('[clerk] error status:', err && err.status);
    console.error('[clerk] error codes:', err && err.errors && JSON.stringify(err.errors));
    console.error('[clerk] error toString:', String(err));
    document.documentElement.style.visibility = '';
  }
})();
