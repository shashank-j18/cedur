import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, CURRENCY } from '../config/brand.js';
import { Check, HelpCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [employeeRange, setEmployeeRange] = useState('1-25'); // '1-25' | '26-75' | '76-150' | '150+'

  // Sample placeholder pricing per employee / month in INR
  const planTiers = {
    '1-25': {
      starter: { monthly: 45, annual: 36, baseFee: 999 },
      growth: { monthly: 75, annual: 60, baseFee: 1499 },
      enterprise: { monthly: 120, annual: 95, baseFee: 2999 },
    },
    '26-75': {
      starter: { monthly: 40, annual: 32, baseFee: 1499 },
      growth: { monthly: 65, annual: 52, baseFee: 1999 },
      enterprise: { monthly: 110, annual: 88, baseFee: 3999 },
    },
    '76-150': {
      starter: { monthly: 35, annual: 28, baseFee: 1999 },
      growth: { monthly: 55, annual: 44, baseFee: 2499 },
      enterprise: { monthly: 95, annual: 76, baseFee: 4999 },
    },
    '150+': {
      starter: { monthly: 30, annual: 24, baseFee: 2499 },
      growth: { monthly: 48, annual: 38, baseFee: 3499 },
      enterprise: { monthly: 85, annual: 68, baseFee: 5999 },
    },
  };

  const currentPrices = planTiers[employeeRange];

  const plans = [
    {
      name: 'Starter',
      badge: 'For Small Teams & Seed Startups',
      description: 'Essential HR, 1-click payroll processing, and basic statutory compliance.',
      price: isAnnual ? currentPrices.starter.annual : currentPrices.starter.monthly,
      baseFee: currentPrices.starter.baseFee,
      popular: false,
      cta: 'Start 14-Day Free Trial',
      ctaLink: '/register',
      features: [
        'Up to selected employee bracket',
        'Automated Monthly Payroll Calculations',
        'EPF (12%) & ESIC Challan Generation',
        'State Professional Tax (PT) Automation',
        'Standard Biometric Device Sync',
        'Web Employee Self-Service (ESS)',
        'Email & WhatsApp Payslip Delivery',
        'Standard Email Support (24-hour SLA)',
      ],
      notIncluded: [
        'GPS Geofenced Mobile Attendance',
        'Expense & Travel Claims OCR',
        'Dedicated Compliance Account Manager',
      ],
    },
    {
      name: 'Growth',
      badge: 'Most Popular for Scaling Indian SMEs',
      description: 'Full workforce automation with mobile geofencing, expense claims, and multi-shift rosters.',
      price: isAnnual ? currentPrices.growth.annual : currentPrices.growth.monthly,
      baseFee: currentPrices.growth.baseFee,
      popular: true,
      cta: 'Start 14-Day Free Trial',
      ctaLink: '/register',
      features: [
        'Everything in Starter Plan, plus:',
        'GPS Geofenced Attendance with Live Selfie Punch',
        'Multi-Location Store & Branch Support',
        'Rotational Shift & Overtime (OT) Rules',
        'Employee Expense & Travel Reimbursement with GST OCR',
        'Dual Tax Regime TDS Simulator (New vs Old)',
        'Form 16 Part A & Part B Generation',
        'Priority Phone & Chat Support (4-hour SLA)',
      ],
      notIncluded: [
        'Custom ERP & Tally API Integrations',
        'Dedicated On-Premise Biometric Server Sync',
      ],
    },
    {
      name: 'Enterprise',
      badge: 'For Multi-Unit Businesses & Factories',
      description: 'Tailored compliance, custom ERP accounting sync, and dedicated payroll account managers.',
      price: isAnnual ? currentPrices.enterprise.annual : currentPrices.enterprise.monthly,
      baseFee: currentPrices.enterprise.baseFee,
      popular: false,
      cta: 'Talk to Sales',
      ctaLink: '/contact',
      features: [
        'Everything in Growth Plan, plus:',
        'Unlimited Employees & Multi-Entity Subsidiaries',
        'Custom Accounting Integrations (SAP, Oracle, Zoho, Tally)',
        'Contractor & Gig Worker Payroll Module',
        'Labor Law Audit Assistance & Mock Inspection Reviews',
        'Custom Approval Hierarchies & Matrix Roles',
        'Dedicated Implementation Specialist & Account Manager',
        '99.9% Uptime SLA Guarantee',
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="section-container">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="badge-brand mb-3">Transparent & Scalable Pricing</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simple Plans That Grow With Your Workforce
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            All prices are shown in Indian Rupees (₹). No hidden onboarding charges, no setup lock-ins.
          </p>
        </div>

        {/* Interactive Employee Count Selector */}
        <div className="max-w-xl mx-auto mb-10 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-card">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 text-center mb-3">
            Select Your Team Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: '1-25', label: '1 - 25' },
              { id: '26-75', label: '26 - 75' },
              { id: '76-150', label: '76 - 150' },
              { id: '150+', label: '150+' },
            ].map(tier => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setEmployeeRange(tier.id)}
                className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all ${employeeRange === tier.id ? 'bg-brand-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <span className={`text-xs sm:text-sm font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
            Monthly Billing
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-slate-200 p-1 relative transition-colors focus:outline-none"
            aria-label="Toggle annual discount"
          >
            <div className={`w-5 h-5 rounded-full bg-brand-600 shadow-md transition-transform duration-200 ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Save 20%
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${p.popular ? 'bg-white border-2 border-brand-500 shadow-2xl scale-[1.02] z-10' : 'bg-white border border-slate-200 shadow-card hover:shadow-lg'}`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <span className="text-xs font-semibold text-brand-600">{p.badge}</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 mb-2">{p.name}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 min-h-[40px]">
                  {p.description}
                </p>

                {/* Price Display */}
                <div className="py-4 border-y border-slate-100 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {CURRENCY}{p.price}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      / employee / month
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    + {CURRENCY}{p.baseFee}/mo platform base fee (billed {isAnnual ? 'annually' : 'monthly'})
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {p.notIncluded.map((notFeat, nfIdx) => (
                    <li key={nfIdx} className="flex items-start gap-2.5 text-xs text-slate-400 line-through">
                      <span className="w-4 h-4 text-slate-300 shrink-0 text-center font-bold">×</span>
                      <span>{notFeat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  to={p.ctaLink}
                  className={`w-full py-3.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${p.popular ? 'btn-primary' : 'btn-secondary border-slate-300'}`}
                >
                  <span>{p.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <p className="text-[10px] text-slate-400 text-center mt-2.5">
                  14 days free trial. No credit card required.
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Sample Pricing Disclaimer */}
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 text-center">
          <span className="font-bold">Note on sample pricing:</span> All subscription rates, base fees, and brackets shown above are placeholders for demo purposes and can be easily adjusted to match your exact business model in the project configuration.
        </div>

      </div>
    </div>
  );
}
