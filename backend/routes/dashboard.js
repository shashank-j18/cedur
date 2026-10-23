import express from 'express';
import { z } from 'zod';
import repo from '../db/index.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const employeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional().default(''),
  department: z.string().default('Operations'),
  designation: z.string().default('Associate'),
  monthlySalary: z.number().min(0).default(35000),
  status: z.string().default('active'),
  todayAttendance: z.string().default('present'),
});

// 1. Dashboard Overview Stats (Protected)
router.get('/stats', requireAuth, async (req, res) => {
  try {
    const companyId = req.user.companyId || 1;
    const stats = await repo.getDashboardStats(companyId);
    return res.json({
      user: req.user,
      stats,
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    return res.status(500).json({ message: 'Failed to retrieve dashboard statistics.' });
  }
});

// 2. List Employees (Protected)
router.get('/employees', requireAuth, async (req, res) => {
  try {
    const companyId = req.user.companyId || 1;
    const employees = await repo.listEmployees(companyId);
    return res.json({ employees });
  } catch (err) {
    console.error('List employees error:', err);
    return res.status(500).json({ message: 'Failed to retrieve employees list.' });
  }
});

// 3. Add Employee (Protected)
router.post('/employees', requireAuth, async (req, res) => {
  try {
    const parseResult = employeeSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const companyId = req.user.companyId || 1;
    const randomCode = `YB-${Math.floor(100 + Math.random() * 900)}`;

    const newEmp = await repo.createEmployee({
      companyId,
      employeeCode: randomCode,
      ...parseResult.data,
      dateOfJoining: new Date().toISOString().split('T')[0],
    });

    return res.status(201).json({
      message: 'Employee added successfully',
      employee: newEmp,
    });
  } catch (err) {
    console.error('Create employee error:', err);
    return res.status(500).json({ message: 'Failed to create employee.' });
  }
});

export default router;
