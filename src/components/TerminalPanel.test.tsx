import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@clerk/react');

vi.mock('@xterm/xterm', () => ({
  Terminal: class {
    cols = 80;
    rows = 24;
    loadAddon = vi.fn();
    open = vi.fn();
    write = vi.fn();
    onData = vi.fn();
    onResize = vi.fn();
    dispose = vi.fn();
  },
}));

vi.mock('@xterm/addon-fit', () => ({
  FitAddon: class {
    fit = vi.fn();
  },
}));

vi.mock('@xterm/addon-web-links', () => ({
  WebLinksAddon: class {},
}));

vi.mock('@xterm/xterm/css/xterm.css', () => ({}));

import TerminalPanel from './TerminalPanel';

describe('TerminalPanel', () => {
  it('renders the terminal header with toggle button', () => {
    render(<TerminalPanel />);

    expect(screen.getByText('Terminal')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument();
  });

  it('does not render the terminal container when closed', () => {
    const { container } = render(<TerminalPanel />);

    expect(
      container.querySelector('.terminal-container'),
    ).not.toBeInTheDocument();
  });

  it('renders the terminal container when opened', async () => {
    const user = userEvent.setup();
    const { container } = render(<TerminalPanel />);

    await user.click(screen.getByRole('button', { name: /open/i }));

    expect(container.querySelector('.terminal-container')).toBeInTheDocument();
  });

  it('hides the terminal container when closed again', async () => {
    const user = userEvent.setup();
    const { container } = render(<TerminalPanel />);

    await user.click(screen.getByRole('button', { name: /open/i }));
    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(
      container.querySelector('.terminal-container'),
    ).not.toBeInTheDocument();
  });
});
