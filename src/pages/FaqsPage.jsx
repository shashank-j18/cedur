import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../config/brand.js';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';

export default function FaqsPage() {
  const [activeTab, setActiveTab] = useState('statutory');
  const [openIdx, setOpenIdx] = useState(0);

  const faqCategories = {
    statutory: {
      label: 'Statutory Compliance & Taxes',
      items: [
        {
          q: 'How does YourBrand compute EPF deductions?',
          a: 'For employees with a monthly Basic + DA wage up to ₹15,000, EPF is calculated at 12% for the employee share and 12% for the employer share. The employer share is automatically partitioned into 8.33% for the Employee Pension Scheme (EPS capped at ₹1,250) and 3.67% to the EPF account, alongside mandatory 0.5% EDLI and 0.5% admin charges.',
        },
        {
          q: 'What are the ESIC contribution rates and applicability rules?',
          a: 'ESIC applies to organizations with 10 or more workers where an employee’s gross monthly wage does not exceed ₹21,000 (or ₹25,000 for employees with physical disabilities). YourBrand calculates 0.75% of gross wages as employee contribution and 3.25% as employer contribution, generating monthly return statements ready for the ESIC portal.',
        },
        {
          q: 'How is State Professional Tax (PT) determined for multi-state offices?',
          a: 'Professional Tax rates and deduction frequencies differ by state. For example, Karnataka deducts ₹200/month for gross salaries above ₹15,000; Maharashtra deducts ₹200 for 11 months and ₹300 in February; while Delhi currently levies no Professional Tax. YourBrand detects each employee\'s assigned work state and automatically applies the statutory tax matrix.',
        },
        {
          q: 'Does YourBrand generate Form 16 Part A and Part B?',
          a: 'Yes. At the end of the financial year, YourBrand compiles all monthly TDS deductions, PAN validations, and investment declarations into government-approved Form 16 Part A (TRACES import format) and Part B ready for digital distribution.',
        },
      ],
    },
    payroll: {
      label: 'Payroll Processing & Banking',
      items: [
        {
          q: 'Can we generate direct payout files for our bank?',
          a: 'Yes. YourBrand generates standardized batch salary payout files formatted for ICICI Corporate Banking, HDFC CMS, State Bank of India, Axis Bank, Kotak Mahindra, and standard NEFT/RTGS CSV templates.',
        },
        {
          q: 'How are salary slips delivered to employees?',
          a: 'Once payroll is reviewed and locked by the HR administrator, password-protected PDF salary slips are dispatched automatically via email and WhatsApp. Employees can also download them from the mobile app and self-service portal at any time.',
        },
        {
          q: 'Can we handle bonuses, reimbursements, and ad-hoc incentives?',
          a: 'Yes. You can add one-time performance bonuses, statutory bonus payments, arrears, or approved travel expense reimbursements to any monthly cycle. They are itemized clearly on the payslip with corresponding tax implications calculated.',
        },
      ],
    },
    attendance: {
      label: 'Attendance & Geofencing',
      items: [
        {
          q: 'How does mobile GPS geofencing work for attendance?',
          a: 'Administrators define a geofence radius (e.g. 50 meters) around approved workplace coordinates. When an employee attempts to punch in from the YourBrand mobile app, their device GPS coordinates are validated against the approved perimeter. If valid, the punch is marked with a live selfie.',
        },
        {
          q: 'Can we connect physical biometric fingerprint devices?',
          a: 'Yes. YourBrand offers biometric bridge connectors that sync seamlessly with popular eSSL, ZKTeco, and Realtime biometric fingerprint and facial recognition scanners over local network or cloud APIs.',
        },
        {
          q: 'How does missed attendance affect salary calculations?',
          a: 'Unapproved absences or attendance days exceeding allowed leave balances automatically convert into Loss of Pay (LOP) days. The monthly payroll engine deducts LOP on a pro-rata basis according to the number of calendar or working days in that month.',
        },
      ],
    },
    migration: {
      label: 'Migration & Support',
      items: [
        {
          q: 'How hard is it to switch from Excel to YourBrand?',
          a: 'It typically takes under 2 business days. We provide simple Excel templates to import your current employee master records, active CTC structures, and year-to-date TDS calculations.',
        },
        {
          q: 'What kind of support is included?',
          a: 'All plans include email support with defined response SLAs. Growth and Enterprise plans also include phone and live chat support during Indian business hours, as well as assistance during financial year-end Form 16 generation.',
        },
      ],
    },
  };

  const currentItems = faqCategories[activeTab].items;

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="section-container max-w-4xl">
        
        <div className="text-center mb-12">
          <span className="badge-brand mb-3">Knowledge Base</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            Detailed answers regarding Indian labour laws, statutory calculations, mobile attendance, and bank transfers.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {Object.entries(faqCategories).map(([key, cat]) => (
            <button
              key={key}
              type="button"
              onClick={() => { setActiveTab(key); setOpenIdx(0); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activeTab === key ? 'bg-brand-600 text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3 mb-16">
          {currentItems.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-card transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span>{item.q}</span>
                {openIdx === idx ? (
                  <ChevronUp className="w-5 h-5 text-brand-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-6 pt-2 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/40">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 text-center shadow-xl">
          <h3 className="text-xl font-bold mb-2">Have a specific statutory or payroll question?</h3>
          <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto">
            Our compliance desk is happy to review your current salary breakups and answer state-specific labour compliance questions.
          </p>
          <Link to="/contact" className="btn-primary py-3 px-6 text-xs inline-flex">
            <span>Speak with a Compliance Specialist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
