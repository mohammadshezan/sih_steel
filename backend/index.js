// Main entry for backend API
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectMongo } = require('./utils/db');
const { verifyToken } = require('./middleware/auth');
const app = express();
const PORT = process.env.PORT || 5001;

// Security and parsers
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));

// Basic rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 });
app.use(limiter);

// Enforce JWT on all API routes except open paths (temporary whitelist for dev UI)
app.use((req, res, next) => {
  const openPrefixes = ['/api/auth'];
  const openExact = [
    '/',
    '/healthz',
    '/api/iot/rake',
    '/api/alerts/list',
    '/api/reports/metrics',
    '/api/demand/inventory',
    '/api/demand/customer'
  ];
  const isOpenPrefix = openPrefixes.some((p) => req.originalUrl.startsWith(p));
  const isOpenExact = openExact.includes(req.path);
  if (isOpenPrefix || isOpenExact) return next();
  return verifyToken(req, res, next);
});

// Modular routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/demand', require('./routes/demand'));
app.use('/api/rake', require('./routes/rake'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/route', require('./routes/route'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/iot', require('./routes/iot'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/sustainability', require('./routes/sustainability'));
app.use('/api/plant', require('./routes/plant'));
app.use('/api/maintenance', require('./routes/maintenance'));

app.get('/', (req, res) => {
  res.send('Steel Logistics Backend API Running');
});

// Health endpoint
app.get('/healthz', (req, res) => res.json({ ok: true }));

// Start server after DB connects
connectMongo()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.warn('MongoDB connection failed, continuing to start server. Some endpoints may be limited. Error:', err.message);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  });
