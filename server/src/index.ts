import 'dotenv/config';
import { createServer } from 'node:http';
import express from 'express';
import { WebSocketServer } from 'ws';
import * as pty from 'node-pty';
import { verifyToken } from './auth.js';

const app = express();

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', async (ws, req) => {
  const url = new URL(req.url ?? '', `http://${req.headers.host}`);
  const token = url.searchParams.get('token');

  if (!token) {
    ws.close(4001, 'Missing token');
    return;
  }

  try {
    const { userId } = await verifyToken(token);
    console.log(`Terminal session started for user ${userId}`);
  } catch {
    ws.close(4001, 'Unauthorized');
    return;
  }

  const shell = pty.spawn('bash', [], {
    name: 'xterm-256color',
    cols: 80,
    rows: 24,
    env: process.env as Record<string, string>,
  });

  shell.onData((data) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(data);
    }
  });

  shell.onExit(() => {
    ws.close();
  });

  ws.on('message', (raw) => {
    const msg = raw.toString();
    try {
      const parsed = JSON.parse(msg);
      if (parsed.type === 'resize') {
        shell.resize(parsed.cols, parsed.rows);
        return;
      }
    } catch {
      // Not JSON — treat as keystroke input
    }
    shell.write(msg);
  });

  ws.on('close', () => {
    shell.kill();
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
