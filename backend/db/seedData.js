import bcrypt from 'bcryptjs';

// Pre-hashed 'Password123!' with bcrypt 10 rounds
export const DEFAULT_ADMIN_PASSWORD_HASH = bcrypt.hashSync('Password123!', 10);

export const sampleCompany = {
  id: 1,
  name: "Acme Innovations India Pvt Ltd",
  employeeCountRange: "26-100",
  phone: "+91 80 4567 8900",
  gstin: "29AABCU9603R1ZM",
  pan: "AABCU9603R",
  createdAt: new Date().toISOString(),
};

export const sampleAdminUser = {
  id: 1,
  companyId: 1,
  email: "admin@cedur.com",
  passwordHash: DEFAULT_ADMIN_PASSWORD_HASH,
  fullName: "Shashank Verma",
  role: "admin",
  isVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const sampleEmployees = [
  {
    id: 1,
    companyId: 1,
    userId: 1,
    employeeCode: "CD-001",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    department: "Engineering",
    designation: "Tech Lead",
    dateOfJoining: "2023-04-15",
    monthlySalary: 125000,
    status: "active",
    todayAttendance: "present",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    companyId: 1,
    userId: null,
    employeeCode: "CD-002",
    firstName: "Priya",
    lastName: "Nair",
    email: "priya.nair@example.com",
    phone: "+91 98765 43211",
    department: "Human Resources",
    designation: "Senior HR Specialist",
    dateOfJoining: "2023-06-01",
    monthlySalary: 85000,
    status: "active",
    todayAttendance: "present",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    companyId: 1,
    userId: null,
    employeeCode: "CD-003",
    firstName: "Amit",
    lastName: "Verma",
    email: "amit.verma@example.com",
    phone: "+91 98765 43212",
    department: "Product",
    designation: "Product Designer",
    dateOfJoining: "2023-09-10",
    monthlySalary: 75000,
    status: "active",
    todayAttendance: "wfh",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    companyId: 1,
    userId: null,
    employeeCode: "CD-004",
    firstName: "Sneha",
    lastName: "Patel",
    email: "sneha.patel@example.com",
    phone: "+91 98765 43213",
    department: "Engineering",
    designation: "Frontend Engineer",
    dateOfJoining: "2024-01-15",
    monthlySalary: 68000,
    status: "active",
    todayAttendance: "present",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    companyId: 1,
    userId: null,
    employeeCode: "CD-005",
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@example.com",
    phone: "+91 98765 43214",
    department: "Sales & Operations",
    designation: "Operations Manager",
    dateOfJoining: "2024-03-01",
    monthlySalary: 72000,
    status: "active",
    todayAttendance: "on_leave",
    createdAt: new Date().toISOString(),
  },
];

export const sampleBlogPosts = [
  {
    id: 1,
    title: "Complete Guide to EPF & ESIC Compliance for Indian SMEs (2025-2026)",
    slug: "epf-esic-compliance-guide-indian-smes",
    category: "Statutory Compliance",
    author: "Cedur Editorial Team",
    readTime: "7 min read",
    summary: "A practical breakdown of Employee Provident Fund (EPF) and Employee State Insurance (ESIC) calculation rules, wage ceilings, and employer contributions for fast-growing Indian businesses.",
    content: `Running payroll for an Indian business requires strict adherence to statutory rules laid down by the Ministry of Labour and Employment. Two of the most critical monthly deductions are the Employee Provident Fund (EPF) and the Employees' State Insurance (ESI).

### 1. Employee Provident Fund (EPF) Rules
Under the EPF Act, 1952, any enterprise with 20 or more employees must register with the EPFO.
- **Wage Ceiling**: EPF calculation is mandatory for employees earning a basic wage + DA up to ₹15,000 per month. For employees earning higher, contributions can either be capped at ₹15,000 or calculated on actual basic pay based on company policy.
- **Employee Share**: 12% of Basic + Dearness Allowance (DA).
- **Employer Share**: 12% total, split into:
  - 8.33% directed to the Employee Pension Scheme (EPS) (capped at ₹1,250/month).
  - 3.67% directed to the EPF.
  - Plus 0.5% for EDLI (Employees' Deposit Linked Insurance) and 0.5% EPF Admin charges.

### 2. Employee State Insurance (ESIC) Rules
The ESI Act covers factories and commercial establishments with 10 or more employees (or 20 depending on state rules):
- **Eligibility Limit**: Applicable to employees whose gross monthly wages are up to ₹21,000 (or ₹25,000 for persons with disabilities).
- **Rates**:
  - Employee Contribution: 0.75% of Gross Wages.
  - Employer Contribution: 3.25% of Gross Wages.
- **Due Date**: Must be deposited by the 15th of the subsequent calendar month on the ESIC portal.

### 3. How Modern Payroll Software Prevents Non-Compliance
Manually calculating split percentages across fluctuating employee attendance and leaves is prone to penalties of up to 100% of the arrears plus interest. Modern payroll systems like Cedur automatically compute accurate monthly chalans (ECR text files) ready for single-click upload directly to the Shram Suvidha and EPFO portals.`,
    publishedAt: "2025-08-10T00:00:00.000Z",
    createdAt: "2025-08-10T00:00:00.000Z",
  },
  {
    id: 2,
    title: "New Tax Regime vs Old Tax Regime: TDS Deduction Guide for Employers",
    slug: "new-vs-old-tax-regime-tds-payroll-guide",
    category: "Payroll & Taxation",
    author: "Cedur Tax & Compliance Desk",
    readTime: "6 min read",
    summary: "How Indian payroll teams must calculate monthly TDS deductions under Section 192, default New Tax Regime rules, and handling employee declarations.",
    content: `Section 192 of the Income Tax Act mandates that every employer deducting Tax at Source (TDS) on salaries must calculate the employee's estimated annual tax liability and deduct the tax in equal monthly installments.

### 1. The Default Regime Shift
Under Finance Act reforms, the **New Tax Regime (Section 115BAC)** is the default tax regime for all salaried individuals. However, employees retain the choice to opt for the Old Tax Regime at the start of each financial year by submitting a formal declaration to their employer.

### 2. Key Differences in Payroll Computation
- **New Tax Regime**: Offers lower, streamlined tax slabs (with standard deduction of ₹75,000), but eliminates common chapter VI-A deductions like 80C (PPF/ELSS), 80D (Health Insurance), and HRA exemption.
- **Old Tax Regime**: Offers higher tax rates but allows comprehensive exemptions including House Rent Allowance (HRA under Sec 10(13A)), Leave Travel Concession (LTC), Home Loan Interest (Sec 24), and Section 80C/80D deductions.

### 3. Handling Employee Tax Declarations Seamlessly
Payroll administrators often face a chaotic rush in December and January collecting rent receipts and insurance proofs. An Employee Self-Service (ESS) portal allows team members to submit investment declarations digitally, upload proofs, and preview their revised monthly take-home salary in real time.`,
    publishedAt: "2025-09-02T00:00:00.000Z",
    createdAt: "2025-09-02T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Why Geofence & Biometric Attendance is Transforming Indian SME Operations",
    slug: "geofence-attendance-transforming-indian-smes",
    category: "Attendance & Operations",
    author: "Cedur Product Team",
    readTime: "5 min read",
    summary: "How multi-location Indian businesses eliminate buddy punching, streamline overtime calculations, and sync field-staff attendance with 1-click salary slips.",
    content: `For Indian SMEs managing retail stores, manufacturing units, client sites, or hybrid workforces, tracking attendance through physical biometric fingerprint machines or paper registers creates friction, maintenance costs, and payroll bottlenecks.

### 1. What is Geofenced Mobile Attendance?
Geofencing uses smartphone GPS coordinates and virtual perimeter boundaries (e.g., within 50 meters of the office or warehouse). Employees can only check in or check out from the Cedur mobile app when physically present within the approved geographical radius.

### 2. Benefits for Indian Workplaces
- **Zero Hardware Investment**: No costly biometric scanners to maintain or replace.
- **Real-Time Visibility**: Field salespeople, logistics staff, and warehouse managers can clock in from assigned customer locations or distribution hubs with selfie verification.
- **Zero Buddy Punching**: Facial recognition and GPS metadata verify identity and location concurrently.
- **Direct Payroll Synchronization**: Loss of Pay (LOP), late-coming penalties, compensatory offs, and overtime hours flow straight into the month-end payroll calculation without manual spreadsheet reconciliations.`,
    publishedAt: "2025-10-05T00:00:00.000Z",
    createdAt: "2025-10-05T00:00:00.000Z",
  },
];
