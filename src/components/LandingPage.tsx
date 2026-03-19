import LogoutButton from './LogoutButton';
import BuildBadge from './BuildBadge';
import TerminalPanel from './TerminalPanel';

export default function LandingPage() {
  return (
    <>
      <LogoutButton />

      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to the POC</h1>
          <p>
            A proof-of-concept deployment — live on the web, ready to test from
            any device.
          </p>
          <a href="#features" className="btn">
            See Features
          </a>
        </div>
      </header>

      <section id="features" className="features">
        <h2>What's included</h2>
        <div className="grid">
          <div className="card">
            <div className="icon">⚡</div>
            <h3>Fast</h3>
            <p>
              Served from a global CDN with no server-side rendering overhead —
              loads instantly on any network.
            </p>
          </div>
          <div className="card">
            <div className="icon">🔒</div>
            <h3>Secure</h3>
            <p>
              HTTPS by default with automatic TLS certificates managed by
              Render, so your connection is always encrypted.
            </p>
          </div>
          <div className="card">
            <div className="icon">📱</div>
            <h3>Mobile-ready</h3>
            <p>
              Fully responsive layout that adapts to any screen size — test it
              right now from your phone.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 POC · Deployed on Render</p>
      </footer>

      <TerminalPanel />
      <BuildBadge />
    </>
  );
}
