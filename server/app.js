const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const tourRoutes = require('./routes/tours');

const app = express();

app.use(helmet());
app.use(cors({ origin: ['http://localhost:3000', 'https://sracholidays.vercel.app'], credentials: true }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
app.use('/api/tours', tourRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
