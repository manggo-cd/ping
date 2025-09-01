const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan('dev'));
app.use(express.json());     // parse JSON bodies
app.use(cors());             // not strictly needed if you use the Vite proxy, but harmless

// Simple healthcheck
app.get('/healthz', (_req, res) => res.send('ok'));

// GET /api/ping -> return server time
app.get('/api/ping', (_req, res) => {
  res.json({
    ok: true,
    from: 'server',
    time: new Date().toISOString()
  });
});

// POST /api/echo { "message": "hello" } -> echoes back
app.post('/api/echo', (req, res) => {
  const message = req.body?.message ?? '';
  res.json({
    ok: true,
    received: message,
    length: message.length,
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
