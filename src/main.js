// Clerk is loaded via CDN script tag in index.html (window.Clerk is the pre-initialized instance)
const clerk = window.Clerk;

(async () => {
  try {
    await clerk.load();
    console.log('[clerk] loaded, user:', clerk.user);

    if (clerk.user) {
      const logoutBtn = document.getElementById('logout-btn');
      logoutBtn.style.display = '';
      logoutBtn.addEventListener('click', () => clerk.signOut());
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
