/**
 * Lightweight CSRF Protection Middleware
 * Protects state-changing HTTP methods (POST, PUT, DELETE, PATCH).
 * Validates Origin/Referer headers or custom request header X-Requested-With / X-CSRF-Protection.
 */
export function csrfProtection(req, res, next) {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (safeMethods.includes(req.method)) {
    return next();
  }

  // Allow server-to-server or test requests if origin is not present and custom header is supplied
  const origin = req.headers['origin'];
  const referer = req.headers['referer'];
  const customHeader = req.headers['x-requested-with'] || req.headers['x-csrf-protection'];

  // In development, localhost origins are allowed
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000',
  ];

  if (process.env.APP_URL) {
    allowedOrigins.push(process.env.APP_URL);
  }

  if (customHeader) {
    return next();
  }

  if (origin && (allowedOrigins.some(o => origin.startsWith(o)) || process.env.NODE_ENV !== 'production')) {
    return next();
  }

  if (referer && (allowedOrigins.some(o => referer.startsWith(o)) || process.env.NODE_ENV !== 'production')) {
    return next();
  }

  // Pass through with notice if developing locally
  if (process.env.NODE_ENV !== 'production') {
    return next();
  }

  return res.status(403).json({ message: 'CSRF validation failed: Invalid request origin.' });
}
