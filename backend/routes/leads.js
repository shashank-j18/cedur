import express from 'express';
import { z } from 'zod';
import repo from '../db/index.js';
import { emailService } from '../services/emailService.js';
import { formRateLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid work email'),
  phone: z.string().min(8, 'Please provide a valid phone number'),
  companyName: z.string().min(2, 'Company name is required'),
  employeeCount: z.string().min(1, 'Please specify employee count'),
  message: z.string().optional().default(''),
  // Honeypot field - must be empty from genuine human browsers
  hp_website: z.string().optional().default(''),
});

const newsletterSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  hp_field: z.string().optional().default(''),
});

// 1. Contact & Demo Request Form
router.post('/demo', formRateLimiter, async (req, res) => {
  try {
    const parseResult = leadSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { name, email, phone, companyName, employeeCount, message, hp_website } = parseResult.data;

    // Honeypot spam defense: if bot filled hidden field, silently return success without database pollution
    if (hp_website && hp_website.trim().length > 0) {
      console.warn('[Honeypot Triggered] Spam bot submission discarded silently.');
      return res.status(200).json({
        message: 'Thank you! Your demo request has been received. Our compliance specialist will contact you shortly.',
      });
    }

    // Save lead to database
    const lead = await repo.createLead({
      name,
      email,
      phone,
      companyName,
      employeeCount,
      message,
      source: 'website_demo_request',
    });

    // Send internal alert
    await emailService.sendLeadNotification({ lead });

    return res.status(201).json({
      message: 'Thank you! Your demo request has been received. Our compliance specialist will contact you within 2 business hours.',
      leadId: lead.id,
    });
  } catch (err) {
    console.error('Lead submission error:', err);
    return res.status(500).json({ message: 'Internal server error processing demo request.' });
  }
});

// 2. Newsletter Subscription
router.post('/newsletter', formRateLimiter, async (req, res) => {
  try {
    const parseResult = newsletterSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { email, hp_field } = parseResult.data;

    // Honeypot spam defense
    if (hp_field && hp_field.trim().length > 0) {
      return res.status(200).json({ message: 'Thank you for subscribing to our Indian compliance bulletin!' });
    }

    await repo.createNewsletterSubscriber(email);

    return res.status(201).json({
      message: 'Thank you for subscribing! You will receive our monthly Indian payroll compliance bulletin.',
    });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ message: 'Internal server error subscribing to newsletter.' });
  }
});

export default router;
