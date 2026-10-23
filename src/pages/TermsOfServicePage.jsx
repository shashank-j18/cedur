import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, SUPPORT_EMAIL } from '../config/brand.js';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
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
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="badge-slate text-[10px]">SaaS Subscription Agreement</span>
              <p className="text-xs text-slate-400 mt-0.5">Last updated: {lastUpdated}</p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-slate max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-6">
            
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
              <p>
                By creating an account, accessing, or subscribing to {BRAND_NAME} ("Service"), you agree to be legally bound by these Terms of Service. If you are accepting these terms on behalf of an employer, company, or legal entity, you represent and warrant that you possess the full legal authority to bind that entity to this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. Provision of Service & Availability</h2>
              <p>
                {BRAND_NAME} grants you a non-exclusive, non-transferable, revocable subscription license to access the HR, attendance, and payroll modules during the term of your active subscription. We target an uptime service level of 99.9% for our cloud application, excluding scheduled maintenance announced at least 48 hours in advance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. Employer Responsibilities & Accuracy of Statutory Data</h2>
              <p>
                While {BRAND_NAME} automates mathematical calculations based on prevailing Indian statutory laws (including EPF, ESIC, Professional Tax, and Income Tax TDS), the employer remains solely responsible for:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 my-2">
                <li>Providing accurate employee master data, PAN numbers, bank details, and salary components.</li>
                <li>Verifying final draft payroll figures before approving bank disbursements or filing government returns.</li>
                <li>Ensuring compliance with local employment contracts and state-specific standing orders.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">4. Customer Data Ownership & Confidentiality</h2>
              <p>
                You retain all rights, title, and ownership in and to all data uploaded into {BRAND_NAME} ("Customer Data"). We do not sell, rent, or monetize your employee records. We process your data strictly to deliver the agreed SaaS features and generate required compliance filings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">5. Fees, Invoicing & Taxes</h2>
              <p>
                Subscription fees are billed in Indian Rupees (INR) based on your active employee bracket and selected billing frequency (monthly or annual). Fees are exclusive of applicable Goods and Services Tax (GST at 18%), which will be added to your invoice with proper GSTIN tax credit details.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">6. Subscription Cancellation & Data Export</h2>
              <p>
                You may cancel your subscription at any time via your account settings. Upon cancellation, you retain the right to export all historical salary registers, employee masters, and attendance reports in Excel/CSV formats for 30 calendar days before account decommissioning.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">7. Governing Law & Jurisdiction</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.
              </p>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
