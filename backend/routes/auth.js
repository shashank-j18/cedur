import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { z } from 'zod';
import repo from '../db/index.js';
import { emailService } from '../services/emailService.js';
import { loginRateLimiter } from '../middleware/rateLimit.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Input Validation Schemas via Zod
const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid work email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  companyName: z.string().min(2, 'Company name is required'),
  employeeCountRange: z.string().optional().default('1-25'),
  phone: z.string().optional().default(''),
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(10, 'Valid reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Helper to set secure httpOnly cookie
function setSessionCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('session_token', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });
}

// 1. REGISTER
router.post('/register', async (req, res) => {
  try {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { fullName, email, password, companyName, employeeCountRange, phone } = parseResult.data;

    // Check if user already exists
    const existing = await repo.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'An account with this email address already exists. Please log in.' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create Company
    const company = await repo.createCompany({
      name: companyName,
      employeeCountRange,
      phone,
    });

    // Create User
    const user = await repo.createUser({
      companyId: company.id,
      email,
      passwordHash,
      fullName,
      role: 'admin',
    });

    // Create default employee record for the company admin
    await repo.createEmployee({
      companyId: company.id,
      userId: user.id,
      employeeCode: 'EMP-001',
      firstName: fullName.split(' ')[0] || fullName,
      lastName: fullName.split(' ').slice(1).join(' ') || 'Admin',
      email: user.email,
      phone: phone || '',
      department: 'Executive',
      designation: 'Director / Founder',
      dateOfJoining: new Date().toISOString().split('T')[0],
      monthlySalary: 100000,
      status: 'active',
      todayAttendance: 'present',
    });

    // Create session
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await repo.createSession({ userId: user.id, token, expiresAt });

    setSessionCookie(res, token);

    // Dispatch welcome email stub
    const appUrl = process.env.APP_URL || 'http://localhost:5173';
    emailService.sendWelcomeVerificationEmail({
      toEmail: user.email,
      fullName: user.fullName,
      verificationUrl: `${appUrl}/verify-email?token=${token}`,
    });

    return res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        companyName: company.name,
      },
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Internal server error during registration.' });
  }
});

// 2. LOGIN (Rate Limited)
router.post('/login', loginRateLimiter, async (req, res) => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parseResult.data;

    const user = await repo.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Create session
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await repo.createSession({ userId: user.id, token, expiresAt });

    setSessionCookie(res, token);

    return res.json({
      message: 'Logged in successfully.',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        companyId: user.companyId,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error during login.' });
  }
});

// 3. LOGOUT
router.post('/logout', async (req, res) => {
  try {
    const token = req.cookies?.session_token || req.headers['authorization']?.replace(/^Bearer\s+/i, '');
    if (token) {
      await repo.deleteSession(token);
    }
    res.clearCookie('session_token', { path: '/' });
    return res.json({ message: 'Logged out successfully.' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ message: 'Failed to log out.' });
  }
});

// 4. ME (CURRENT USER)
router.get('/me', requireAuth, async (req, res) => {
  return res.json({
    user: req.user,
  });
});

// 5. FORGOT PASSWORD
router.post('/forgot-password', loginRateLimiter, async (req, res) => {
  try {
    const parseResult = forgotPasswordSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { email } = parseResult.data;
    const user = await repo.getUserByEmail(email);

    if (user) {
      const resetToken = crypto.randomBytes(24).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour validity
      await repo.createPasswordResetToken({ userId: user.id, token: resetToken, expiresAt });

      const appUrl = process.env.APP_URL || 'http://localhost:5173';
      const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;
      await emailService.sendPasswordResetEmail({ toEmail: user.email, resetToken, resetUrl });
    }

    // Always return generic success to prevent email enumeration attacks
    return res.json({
      message: 'If an account exists with that email, a password reset link has been dispatched.',
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ message: 'Internal server error processing reset request.' });
  }
});

// 6. RESET PASSWORD
router.post('/reset-password', async (req, res) => {
  try {
    const parseResult = resetPasswordSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { token, password } = parseResult.data;
    const tokenRecord = await repo.getValidPasswordResetToken(token);

    if (!tokenRecord) {
      return res.status(400).json({ message: 'Invalid or expired password reset token. Please request a new link.' });
    }

    const newHash = await bcrypt.hash(password, 10);
    await repo.updateUserPassword(tokenRecord.userId, newHash);
    await repo.markPasswordResetTokenUsed(token);

    return res.json({ message: 'Password has been reset successfully! You can now log in with your new credentials.' });
  } catch (err) {
    console.error('Reset password error:', err);
    return res.status(500).json({ message: 'Internal server error resetting password.' });
  }
});

export default router;
