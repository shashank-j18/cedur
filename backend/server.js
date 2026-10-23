import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import leadsRoutes from './routes/leads.js';
import blogRoutes from './routes/blog.js';
import dashboardRoutes from './routes/dashboard.js';
import { csrfProtection } from './middleware/csrf.js';
import { getDbStatus } from './db/index.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];
if (process.env.APP_URL) {
  allowedOrigins.push(process.env.APP_URL);
}

// CORS with credentials for httpOnly session cookies
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CSRF Protection
app.use(csrfProtection);

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: getDbStatus(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Cedur HR & Payroll API Server running on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});

export default app;
