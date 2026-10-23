# Cedur - HR & Payroll Platform for Indian SMEs

An original full-stack Human Resources and Payroll SaaS platform built specifically for Indian businesses. Automates statutory compliance (EPF, ESIC, Professional Tax, TDS under Section 192), GPS geofenced mobile attendance, leave approvals, and employee self-service.

---

## Key Modules & Features

1. **Indian Payroll Engine**:
   - 1-click monthly salary processing.
   - EPF calculation (12% split between EPF & EPS with ₹1,250 cap, EDLI, and admin charges).
   - ESIC calculation (0.75% employee + 3.25% employer contributions).
   - State Professional Tax (PT matrices for 28+ states and union territories).
   - Section 192 TDS deduction supporting both the default New Tax Regime (Section 115BAC) and Old Tax Regime with Chapter VI-A investment declarations.
   - Bank-ready batch disbursement files (ICICI, HDFC, SBI, Axis, Kotak, NEFT/RTGS).
   - Automatic Electronic Challan cum Return (ECR) text generation for EPFO and ESIC filing.

2. **Workforce & Core HR**:
   - Centralized employee directory with Aadhaar/PAN compliance vault.
   - Digital onboarding checklists.
   - Dynamic HR letter generation (offer, increment, relieving certificates).

3. **Leave & Attendance**:
   - Multi-level leave approval hierarchies and sandwich rule controls.
   - Biometric fingerprint/face scanner API synchronization.
   - Rotational shift rostering, late-mark rules, and overtime (OT) tracking.
   - Automatic Loss of Pay (LOP) payroll linkage.

4. **GPS Geofence Attendance**:
   - Virtual perimeter check-in (20m to 1000m radius) with live selfie validation.
   - Zero physical biometric hardware investment required.
   - Ideal for multi-store retail, factories, and field sales teams.

5. **Employee Self-Service (ESS)**:
   - Password-protected PDF salary slip downloads.
   - Annual Form 16 Part A and Part B downloads.
   - Online tax declarations with proof uploads.
   - Leave and expense reimbursement claim tracker.

6. **Enterprise Security & Compliance**:
   - Full alignment with Indian Digital Personal Data Protection (DPDP) Act 2023.
   - In-transit TLS 1.3 and at-rest AES-256 encryption.
   - Local database hosting within India (AWS Mumbai).

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, React Router DOM.
- **Backend**: Node.js, Express.js, Zod validation, bcryptjs password hashing, cookie-parser, express-rate-limit.
- **Database & ORM**: Neon Serverless PostgreSQL with Drizzle ORM (`@neondatabase/serverless`, `drizzle-orm`).
  *(Includes resilient in-memory fallback store when running locally without active Neon credentials).*

---

## Getting Started

### 1. Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
APP_URL=http://localhost:5173
JWT_SECRET=your-random-32-character-secret-key-for-sessions

# Neon PostgreSQL Connection String (from https://console.neon.tech)
DATABASE_URL=postgresql://user:password@ep-name.region.aws.neon.tech/neondb?sslmode=require
```

**Frontend (`.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Database Migrations & Seeding (Neon Postgres)

```bash
cd backend

# Push schema directly to Neon Postgres
npm run db:push

# Seed admin user, sample company, sample employees, and blog posts
npm run db:seed
```

### 4. Running the Development Servers

```bash
# Terminal 1: Run frontend (from root directory)
npm run dev

# Terminal 2: Run backend (from backend directory)
cd backend
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

### 5. Default Credentials

- **Admin Email**: `admin@cedur.com`
- **Password**: `Password123!`

---

## Brand Customization

To customize branding parameters, edit `src/config/brand.js`:
- `BRAND_NAME`: Brand display name.
- `TAGLINE`: Headline and pitch.
- `PRIMARY_COLOR`: Theme palette accent.
- `SUPPORT_EMAIL`, `SUPPORT_PHONE`, `OFFICE_ADDRESS`: Contact touchpoints.
- `LOGO_PATH`: Place your custom logo in `public/images/logo.svg`.
