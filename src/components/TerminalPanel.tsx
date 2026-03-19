import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';

export default function TerminalPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { getToken } = useAuth();
  const termRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const fitRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!isOpen || !termRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
      theme: {
        background: '#0f0f13',
        foreground: '#e8e8f0',
        cursor: '#6c63ff',
        selectionBackground: 'rgba(108, 99, 255, 0.3)',
        black: '#1a1a24',
        brightBlack: '#9090a8',
      },
    });

    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.open(termRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitRef.current = fitAddon;

    let ws: WebSocket;

    getToken().then((token) => {
      ws = new WebSocket(`${WS_URL}?token=${token}`);
      wsRef.current = ws;

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: 'resize',
            cols: term.cols,
            rows: term.rows,
          }),
        );
      };

      ws.onmessage = (event) => {
        term.write(event.data);
      };

      ws.onclose = () => {
        term.write('\r\n\x1b[90m— session ended —\x1b[0m\r\n');
      };
    });

    term.onData((data) => {
      wsRef.current?.send(data);
    });

    term.onResize(({ cols, rows }) => {
      wsRef.current?.send(JSON.stringify({ type: 'resize', cols, rows }));
    });

    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ws?.close();
      wsRef.current = null;
      term.dispose();
      xtermRef.current = null;
      fitRef.current = null;
    };
  }, [isOpen, getToken]);

  return (
    <div className="terminal-panel">
      <div className="terminal-header" onClick={() => setIsOpen(!isOpen)}>
        <span>Terminal</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>
      {isOpen && <div className="terminal-container" ref={termRef} />}
    </div>
  );
}
