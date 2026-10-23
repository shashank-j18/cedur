import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, SUPPORT_EMAIL, OFFICE_ADDRESS } from '../config/brand.js';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="section-container max-w-4xl">
        
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-card">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="badge-brand text-[10px]">DPDP Act 2023 Compliant</span>
              <p className="text-xs text-slate-400 mt-0.5">Last updated: {lastUpdated}</p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">
            
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Overview & Scope</h2>
              <p>
                {BRAND_NAME} ("we", "us", or "our") provides human resource management, automated payroll calculation, attendance verification, and statutory compliance software for employers operating in India. This Privacy Policy outlines how we collect, store, process, and protect digital personal data under the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and applicable Information Technology Rules.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. Roles: Data Fiduciary vs Data Processor</h2>
              <p>
                When an employer subscribes to {BRAND_NAME} and inputs workforce records, the employer acts as the <strong>Data Fiduciary</strong>, determining the purposes and lawful grounds for processing employee data. {BRAND_NAME} operates strictly as a <strong>Data Processor</strong>, handling employee personal data solely on behalf of and according to the instructions of the employer.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. Categories of Data We Process</h2>
              <p>Depending on which modules your employer activates, we may process:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 my-2">
                <li><strong>Identity & Demographic Data:</strong> Full name, date of birth, gender, marital status, photograph, blood group, emergency contact details.</li>
                <li><strong>Statutory & Financial Identifiers:</strong> Permanent Account Number (PAN), masked Aadhaar number (in accordance with UIDAI masking guidelines), Universal Account Number (UAN) for EPF, ESIC insurance number, and bank account details for salary transfers.</li>
                <li><strong>Compensation & Tax Data:</strong> Monthly salary structure, allowances, Chapter VI-A investment declarations (80C, 80D), rent receipts, and Form 16 Part B tax deductions.</li>
                <li><strong>Attendance & GPS Geofence Data:</strong> Timestamps of work shifts, punch locations, GPS coordinates captured exclusively at the moment of attendance check-in/out, and optional live verification selfies. We do not continuously monitor employee locations outside active punch events.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">4. Purpose of Data Processing</h2>
              <p>Data collected via {BRAND_NAME} is used exclusively to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 my-2">
                <li>Compute accurate monthly salary disbursements and generate encrypted payslips.</li>
                <li>Calculate statutory deductions required by Indian law (EPF, ESIC, Professional Tax, and Income Tax TDS under Section 192).</li>
                <li>Generate compliant return files (ECR text files, ESIC schedules, Form 24Q TDS summaries).</li>
                <li>Authenticate employees accessing the self-service web portal and mobile applications.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">5. Data Storage, Localization & Security</h2>
              <p>
                All databases, documents, and backups are hosted in secure enterprise cloud data centers located physically within the territory of India (AWS Mumbai Region). Data is encrypted in transit using Transport Layer Security (TLS 1.3) and encrypted at rest with AES-256 standard encryption.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">6. Rights of Data Principals</h2>
              <p>
                Under the DPDP Act 2023, employees (Data Principals) have the right to access summaries of personal data processed, request correction of inaccurate records, and seek grievance redressal through their employer's HR administrator or our appointed Grievance Officer.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">7. Grievance Redressal Officer</h2>
              <p>
                In accordance with Indian Information Technology rules and the DPDP Act, questions or formal grievances may be addressed to:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-2 text-xs">
                <p className="font-bold text-slate-900">Grievance Redressal Officer</p>
                <p className="text-slate-600 mt-0.5">{BRAND_NAME} Data Compliance Desk</p>
                <p className="text-slate-600">{OFFICE_ADDRESS}</p>
                <p className="text-slate-600">Email: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 font-semibold">{SUPPORT_EMAIL}</a></p>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
