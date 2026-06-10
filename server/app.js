const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const tourRoutes = require('./routes/tours');

const app = express();

const allowedOrigins = [
  'https://www.sracholidays.com',
  'https://sracholidays.com',
  'http://localhost:3000',
  'http://localhost:5173'
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    // Secure CORS Check: Allow exact whitelisted domains or valid project-specific Vercel preview subdomains.
    // This prevents malicious-site.vercel.app from accessing backend resources under the credentials mode.
    const isAllowedOrigin = allowedOrigins.includes(origin);
    const isVercelPreview = /^https:\/\/srac-holidays-[a-zA-Z0-9-]+\.vercel\.app$/.test(origin) || origin === 'https://srac-holidays.vercel.app';
    if (isAllowedOrigin || isVercelPreview) {
      return callback(null, true);
    }
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  }, 
  methods: ['GET', 'HEAD', 'OPTIONS'],
  credentials: true 
}));
app.use(express.json());


const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60, // Limit general API requests to 60 requests per minute per IP as per CLAUDE.md
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
app.use('/api/tours', tourRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Global error handler — hide technical details from clients
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
