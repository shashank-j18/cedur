import repo from '../db/index.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.session_token || req.headers['authorization']?.replace(/^Bearer\s+/i, '');

    if (!token) {
      return res.status(401).json({ message: 'Authentication required. Please log in.' });
    }

    const session = await repo.getSession(token);
    if (!session) {
      return res.status(401).json({ message: 'Session expired or invalid. Please log in again.' });
    }

    const user = await repo.getUserById(session.userId);
    if (!user) {
      return res.status(401).json({ message: 'User account not found.' });
    }

    // Attach user and session to request
    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      companyId: user.companyId,
    };
    req.session = session;

    next();
  } catch (err) {
    console.error('requireAuth middleware error:', err);
    return res.status(500).json({ message: 'Internal authentication error.' });
  }
}

export async function optionalAuth(req, res, next) {
  try {
    const token = req.cookies?.session_token || req.headers['authorization']?.replace(/^Bearer\s+/i, '');
    if (token) {
      const session = await repo.getSession(token);
      if (session) {
        const user = await repo.getUserById(session.userId);
        if (user) {
          req.user = {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            companyId: user.companyId,
          };
          req.session = session;
        }
      }
    }
  } catch (err) {
    // Ignore error for optional auth
  }
  next();
}
