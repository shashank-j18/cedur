import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BRAND_NAME, CURRENCY } from '../config/brand.js';
import { 
  Users, 
  Calculator, 
  Calendar, 
  Clock, 
  UserCheck, 
  Smartphone, 
  Receipt, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  HelpCircle,
  FileSpreadsheet,
  FileCheck
} from 'lucide-react';

const productsData = {
  'hr-software': {
    title: 'HR Software & Central Employee Database',
    tagline: 'Single source of truth for your entire Indian workforce',
    badge: 'Core HR & Records',
    icon: Users,
    overview: 'Ditch disorganized spreadsheets and paper files. Store complete employee lifecycle data—from digital onboarding checklists to education documents, Aadhaar/PAN compliance vault, and automated organizational hierarchy charts.',
    features: [
      {
        title: 'Digital Onboarding Checklists',
        desc: 'Send paperless onboarding links before day one. New joiners securely upload identity proofs, bank account details, and previous employment letters.'
      },
      {
        title: 'Statutory Document Locker',
        desc: 'Encrypted storage for Aadhaar, PAN, Form 11 (EPF declaration), Form 1 (ESIC registration), and signed company policies.'
      },
      {
        title: 'Automated HR Letter Generation',
        desc: 'Generate branded Offer Letters, Appointment Letters, Increment Letters, and Experience/Relieving Certificates in one click using dynamic templates.'
      },
      {
        title: 'Visual Organizational Directory',
        desc: 'Real-time interactive org chart displaying reporting lines, departments, designations, and team structures.'
      },
      {
        title: 'Custom Employee Custom Fields',
        desc: 'Capture company-specific metadata such as asset serial numbers, emergency contacts, blood group, or workstation IDs.'
      },
      {
        title: 'Separation & Exit Workflows',
        desc: 'Structured offboarding with automated asset clearance, handover sign-offs, and final settlement (FnF) synchronization.'
      }
    ],
    complianceNote: 'Meets Indian Digital Personal Data Protection (DPDP) Act 2023 mandates with role-based access control and audit trails for all sensitive employee data.',
  },
  'payroll-software': {
    title: 'Indian Payroll & Statutory Compliance Software',
    tagline: '1-click error-free salary runs with automated EPF, ESI, TDS, & PT',
    badge: 'Payroll & Tax Engine',
    icon: Calculator,
    overview: 'Built specifically around the complexities of Indian statutory regulations. Automatically computes basic pay, HRA, special allowances, EPF splits (12% to EPF & EPS), ESIC, State Professional Tax, and Section 192 TDS under both the New and Old tax regimes.',
    features: [
      {
        title: 'Automated 1-Click Monthly Pay Runs',
        desc: 'Process payroll for hundreds of employees in under a minute with real-time recalculations based on verified attendance and approved leaves.'
      },
      {
        title: 'Pre-Configured Statutory Deductions',
        desc: 'EPFO (12% basic contribution + EPS ₹1,250 cap + EDLI), ESIC (0.75%/3.25% under ₹21k gross), and State PT slabs for 28+ states and union territories.'
      },
      {
        title: 'Dual Tax Regime TDS Engine',
        desc: 'Calculates monthly TDS automatically under Section 115BAC (default New Regime) or Old Regime with Chapter VI-A investment proofs.'
      },
      {
        title: 'Bank-Ready Payout Files',
        desc: 'Download instant NEFT, RTGS, and IMPS batch payment files pre-formatted for ICICI, HDFC, SBI, Axis, Kotak, and other major Indian banks.'
      },
      {
        title: 'Automated WhatsApp & Email Salary Slips',
        desc: 'Distribute password-protected PDF salary slips directly to employee emails and WhatsApp numbers as soon as payroll is locked.'
      },
      {
        title: 'One-Click EPFO & ESIC Returns',
        desc: 'Export monthly ECR text files and ESIC contribution schedules ready for direct upload to government portals without manual re-entry.'
      }
    ],
    complianceNote: 'Automatically updates whenever Ministry of Finance or EPFO amends contribution ceilings, tax slabs, or standard deductions.',
  },
  'leave-management': {
    title: 'Leave & Time-Off Management System',
    tagline: 'Customizable leave policies with multi-tier approval hierarchies',
    badge: 'Leave Policies & Accruals',
    icon: Calendar,
    overview: 'Create transparent leave policies tailored to your state shops & establishment rules or factory acts. Handle Earned Leave (EL/PL), Casual Leave (CL), Sick Leave (SL), Maternity Leave, and Compensatory Offs with automated Loss of Pay (LOP) calculations.',
    features: [
      {
        title: 'Multi-Level Approval Hierarchies',
        desc: 'Route leave requests automatically to reporting managers, department heads, and HR with single-click email approvals.'
      },
      {
        title: 'Automated Accruals & Carry Forward',
        desc: 'Configure monthly, quarterly, or annual leave accruals with automated leave encashment limits and lapse rules.'
      },
      {
        title: 'Sandwich Rule & Weekend Handling',
        desc: 'Flexible rules to count or exclude intervening weekends and public holidays based on company employment policies.'
      },
      {
        title: 'Direct Loss of Pay (LOP) Payroll Sync',
        desc: 'Unapproved leaves or excess absences automatically calculate LOP days and deduct proportionally during the monthly payroll run.'
      },
      {
        title: 'Multi-State Holiday Calendars',
        desc: 'Assign localized state festival holidays (e.g. Pongal in Tamil Nadu, Durga Puja in West Bengal, Maharashtra Day) to corresponding office locations.'
      },
      {
        title: 'Compensatory Off (Comp-Off) Workflows',
        desc: 'Grant and track comp-off credits for employees working on designated weekends or national holidays.'
      }
    ],
    complianceNote: 'Enforces statutory state minimum leave quotas as prescribed by respective State Shops & Commercial Establishments Acts.',
  },
  'attendance-management': {
    title: 'Attendance & Shift Management Software',
    tagline: 'Track real-time hours, overtime, and shift rosters seamlessly',
    badge: 'Shift & Time Tracking',
    icon: Clock,
    overview: 'Bridge physical biometric device logs, web clock-ins, and shift schedules into an accurate monthly attendance register. Eliminate manual reconciliation and stop attendance fraud.',
    features: [
      {
        title: 'Biometric Scanner Device Sync',
        desc: 'Seamless API integration with popular biometric fingerprint, face recognition, and RFID card machines across branches.'
      },
      {
        title: 'Rotational Shift Planning & Rostering',
        desc: 'Design rotational day, evening, and night shifts with automated shift allowance calculations and roster change notifications.'
      },
      {
        title: 'Late Mark & Early Departure Policies',
        desc: 'Define grace periods (e.g., 15 minutes) and automated rules like "3 late marks equal half-day deduction".'
      },
      {
        title: 'Overtime (OT) Calculation',
        desc: 'Compute standard and double-rate overtime hours based on Indian Factories Act or company agreements with manager sign-offs.'
      },
      {
        title: 'Attendance Regularization Workflows',
        desc: 'Employees can submit attendance correction requests with explanations for missed punches, subject to manager review.'
      },
      {
        title: 'Live Real-Time Workforce Dashboard',
        desc: 'Instant birds-eye view of who is present, working from home, on leave, or absent across all office locations.'
      }
    ],
    complianceNote: 'Generates Statutory Form B (Attendance Register) and Form D (Register of Overtime) for state labour audits.',
  },
  'employee-self-service': {
    title: 'Employee Self-Service (ESS) Portal',
    tagline: 'A modern, empowering mobile & web portal your team will actually love',
    badge: 'Self-Service & Transparency',
    icon: UserCheck,
    overview: 'Give your team instant self-service access to their salary slips, tax computation sheets, leave balances, and company announcements. Dramatically reduce repetitive queries to your HR desk.',
    features: [
      {
        title: 'Instant Salary Slip & Form 16 Downloads',
        desc: 'Employees can view and download all past salary slips and annual Form 16 Part A & B in secure password-protected PDFs.'
      },
      {
        title: 'Income Tax Declaration Portal',
        desc: 'Compare estimated take-home under New vs Old tax regimes. Submit 80C, 80D, home loan interest, and rent receipts with proof uploads.'
      },
      {
        title: 'Leave & Comp-Off Requests',
        desc: 'Apply for leaves in seconds, check available balances across leave categories, and see upcoming team holidays.'
      },
      {
        title: 'Reimbursement Claim Tracking',
        desc: 'Submit travel, food, and client entertainment bills with camera photo capture and track payment disbursement status.'
      },
      {
        title: 'Company Directory & Peer Recognition',
        desc: 'Search team contact information, celebrate peer work anniversaries, and view official company holiday notices.'
      },
      {
        title: 'Profile & Document Updates',
        desc: 'Update bank details, emergency contacts, and personal addresses with HR verification workflows.'
      }
    ],
    complianceNote: 'Secured with two-factor authentication (2FA) and personal data privacy safeguards.',
  },
  'mobile-app': {
    title: 'Mobile App for iOS & Android',
    tagline: 'Carry your entire HR and attendance portal in your pocket',
    badge: 'iOS & Android Native App',
    icon: Smartphone,
    overview: 'Designed for modern hybrid, deskless, and remote workforces. Enables instant geofenced punch-in, push notifications for approvals, salary credit alerts, and offline punch caching.',
    features: [
      {
        title: 'Single-Tap Mobile Clock-In',
        desc: 'Clock in and out from smartphones within authorized geofenced coordinates with GPS location stamps.'
      },
      {
        title: 'Real-Time Push Notifications',
        desc: 'Instant notifications when leaves are approved, expenses cleared, or monthly salary slips are published.'
      },
      {
        title: 'Manager Quick Actions',
        desc: 'Team leaders can approve or reject leave requests and regularization claims on the go in one tap.'
      },
      {
        title: 'Offline Punch Caching',
        desc: 'Punches recorded in low-network areas (like basements or remote sites) sync automatically once internet connectivity restores.'
      },
      {
        title: 'Face & Biometric Device Authentication',
        desc: 'Fast, secure login using mobile Face ID or fingerprint recognition.'
      },
      {
        title: 'Company Broadcast Notices',
        desc: 'Publish urgent office announcements, festival greetings, and policy updates directly to mobile devices.'
      }
    ],
    complianceNote: 'GPS tracking only triggers during active punch actions, fully respecting employee off-duty privacy.',
  },
  'expense-reimbursement': {
    title: 'Expense & Travel Reimbursement Module',
    tagline: 'Fast-track employee claims with paperless bill submission',
    badge: 'Expense Management',
    icon: Receipt,
    overview: 'Eliminate lost paper receipts and chaotic spreadsheets. Allow employees to photograph invoices, extract GST numbers, submit mileage logs, and receive reimbursement payouts alongside regular payroll.',
    features: [
      {
        title: 'Mobile Camera Receipt Capture',
        desc: 'Snap pictures of food, travel, accommodation, and fuel bills on the spot for automatic digital archiving.'
      },
      {
        title: 'GST Invoice Parsing',
        desc: 'Extract merchant name, date, invoice total, and vendor GSTIN to ensure clean input tax credit for your finance team.'
      },
      {
        title: 'Per-Diem & Mileage Rates',
        desc: 'Set standard per-kilometer fuel reimbursement rates for two-wheelers and four-wheelers with Google Maps route tracking.'
      },
      {
        title: 'Multi-Level Manager Approval',
        desc: 'Customizable limits (e.g. claims above ₹5,000 require VP sign-off before reaching Finance).'
      },
      {
        title: 'Unified Payroll Disbursement',
        desc: 'Approved reimbursement balances can be disbursed directly with the monthly salary run or via separate bank files.'
      },
      {
        title: 'Expense Category Analytics',
        desc: 'Track department-wise spend on travel, client meals, software tools, and office supplies in real time.'
      }
    ],
    complianceNote: 'Includes full digital audit trail of bill proofs required under Section 37 of the Income Tax Act.',
  },
  'geofence-attendance': {
    title: 'Geofence Attendance & Field Staff GPS Tracking',
    tagline: 'Virtual perimeter validation with selfie verification for multi-location teams',
    badge: 'Geofence & Mobility',
    icon: MapPin,
    overview: 'Ideal for construction sites, retail stores, sales executives, and distributed branches. Define authorized GPS radius boundaries so employees can only punch in when physically on site—eliminating proxy punching without expensive scanners.',
    features: [
      {
        title: 'Custom Virtual Boundary Radius',
        desc: 'Define precise geofence perimeters (from 20 meters to 1000 meters) around multiple offices, warehouses, or customer sites.'
      },
      {
        title: 'Selfie Punch with Anti-Spoofing',
        desc: 'Requires employees to capture a live selfie when clocking in, preventing buddy punching and proxy attendance.'
      },
      {
        title: 'Multi-Location Check-In for Field Sales',
        desc: 'Sales reps and service engineers can check into dynamic client meeting spots with geocoded visit logs.'
      },
      {
        title: 'Zero Hardware Investment',
        desc: 'Save ₹15,000 to ₹50,000 per branch on biometric hardware scanners, maintenance contracts, and SIM cards.'
      },
      {
        title: 'Live Location & Shift Mapping',
        desc: 'Managers can view which job sites or stores are adequately staffed at any minute of the workday.'
      },
      {
        title: 'Automatic Loss of Pay Linking',
        desc: 'Punches recorded outside approved coordinates are flagged for managerial regularization or marked as unauthorized.'
      }
    ],
    complianceNote: 'GDPR and Indian privacy compliant: GPS coordinates are recorded strictly at punch timestamps, never tracking employees after hours.',
  },
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = productsData[slug];

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const IconComponent = product.icon;

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Product Hero */}
      <section className="bg-gradient-to-b from-brand-50/60 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200/80">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200 text-xs font-semibold text-brand-700 shadow-sm mb-6">
              <IconComponent className="w-4 h-4 text-brand-600" />
              <span>{product.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {product.title}
            </h1>

            <p className="text-lg sm:text-xl text-brand-700 font-medium mb-6">
              {product.tagline}
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10">
              {product.overview}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary py-3 px-7 text-sm w-full sm:w-auto">
                <span>Book a Guided Walkthrough</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/pricing" className="btn-secondary py-3 px-7 text-sm w-full sm:w-auto">
                View Pricing Plans
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="py-20 bg-white">
        <div className="section-container">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-brand mb-2">Key Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Engineered for simplicity, reliability, and precision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feat, idx) => (
              <div 
                key={idx} 
                className="card-premium flex flex-col justify-between group hover:border-brand-500/40"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-brand-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Integrated with Payroll</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Compliance Callout Banner */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="section-container max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-400">Statutory & Regulatory Assurance</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {product.complianceNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product CTA */}
      <section className="py-16 bg-slate-50">
        <div className="section-container max-w-3xl text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
            See {product.title} in action with your company data
          </h3>
          <p className="text-slate-600 text-sm mb-8">
            Our product specialist will set up a sandbox demonstrating how your exact attendance policies, leave quotas, or salary structures operate inside YourBrand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary py-3.5 px-8 text-sm w-full sm:w-auto">
              Request Live Demo
            </Link>
            <Link to="/products" className="btn-secondary py-3.5 px-8 text-sm w-full sm:w-auto">
              Browse Other Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
