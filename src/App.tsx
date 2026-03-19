import { useEffect } from 'react';
import { SignIn, useAuth, useClerk } from '@clerk/react';

export default function App() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();

  useEffect(() => {
    if (isLoaded) {
      document.documentElement.style.visibility = '';
    }
  }, [isLoaded]);

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f13 0%, #1a1030 50%, #0f0f13 100%)',
      }}>
        <SignIn />
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => signOut()}
        style={{
          position: 'fixed', top: 12, right: 12, zIndex: 10000,
          background: 'rgba(0,0,0,0.65)', color: '#fff',
          font: '13px/1 sans-serif', padding: '6px 14px',
          borderRadius: 6, border: 'none', cursor: 'pointer',
        }}
      >
        Logout
      </button>

      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to the POC</h1>
          <p>A proof-of-concept deployment — live on the web, ready to test from any device.</p>
          <a href="#features" className="btn">See Features</a>
        </div>
      </header>

      <section id="features" className="features">
        <h2>What's included</h2>
        <div className="grid">
          <div className="card">
            <div className="icon">⚡</div>
            <h3>Fast</h3>
            <p>Served from a global CDN with no server-side rendering overhead — loads instantly on any network.</p>
          </div>
          <div className="card">
            <div className="icon">🔒</div>
            <h3>Secure</h3>
            <p>HTTPS by default with automatic TLS certificates managed by Render, so your connection is always encrypted.</p>
          </div>
          <div className="card">
            <div className="icon">📱</div>
            <h3>Mobile-ready</h3>
            <p>Fully responsive layout that adapts to any screen size — test it right now from your phone.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 POC · Deployed on Render</p>
      </footer>

      <div style={{
        position: 'fixed', bottom: 8, right: 8, zIndex: 10000,
        background: 'rgba(0,0,0,0.55)', color: '#fff',
        font: '11px/1 monospace', padding: '4px 8px', borderRadius: 4,
      }}>
        v14
      </div>
    </>
  );
}
