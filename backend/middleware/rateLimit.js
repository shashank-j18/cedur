import rateLimit from 'express-rate-limit';

// Strict rate limiter for login and password reset (10 requests per 15 minutes)
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.',
  },
});

// General form submission limiter (20 requests per 15 minutes)
export const formRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many submissions received. Please wait a few moments before trying again.',
  },
});
