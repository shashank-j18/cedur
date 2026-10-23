import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BRAND_NAME, 
  TAGLINE, 
  TAGLINE_SECONDARY, 
  STATUTORY_STANDARDS 
} from '../config/brand.js';
import { API_ENDPOINTS } from '../config.js';
import { 
  Calculator, 
  ShieldCheck, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Briefcase, 
  Factory, 
  Store, 
  Stethoscope, 
  Truck, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Send, 
  AlertCircle,
  Smartphone,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  // Demo Form State with Honeypot
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    employeeCount: '1-25',
    message: '',
    hp_website: '', // Honeypot
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [feedback, setFeedback] = useState('');

  // Active FAQ Accordion index
  const [activeFaq, setActiveFaq] = useState(0);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFeedback('');

    try {
      const res = await fetch(API_ENDPOINTS.demo, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setFormStatus('success');
        setFeedback(data.message || 'Demo request submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          companyName: '',
          employeeCount: '1-25',
          message: '',
          hp_website: '',
        });
      } else {
        setFormStatus('error');
        setFeedback(data.message || 'Submission failed. Please check the entered fields.');
      }
    } catch (err) {
      setFormStatus('error');
      setFeedback('Unable to reach server. Please ensure the backend is running.');
    }
  };

  const benefits = [
    {
      title: "Zero Compliance Penalties",
      desc: "Auto-computed EPF (12%), ESIC (0.75%/3.25%), State Professional Tax across 28+ states, and TDS under the New or Old tax regime.",
      icon: ShieldCheck,
      badge: "100% Statutory Compliant",
    },
    {
      title: "1-Click Monthly Salary Slips",
      desc: "Generate monthly pay runs in under 60 seconds with bank-ready payout files (NEFT/RTGS) and instant WhatsApp & email pay slip delivery.",
      icon: Calculator,
      badge: "Fast & Accurate",
    },
    {
      title: "GPS Geofenced Attendance",
      desc: "Eliminate expensive biometric fingerprint scanners. Employees punch in via mobile within approved GPS radii with selfie validation.",
      icon: MapPin,
      badge: "Zero Hardware Costs",
    },
    {
      title: "Modern Employee Self-Service",
      desc: "Empower your team to download Form 16, request leaves, track reimbursement claims, and declare tax investments from their phones.",
      icon: Users,
      badge: "Delightful UX",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Add or Import Employees",
      desc: "Bulk upload your workforce roster via Excel template or send self-onboarding links to new joiners.",
    },
    {
      step: "02",
      title: "Configure Statutory Salary Structure",
      desc: "Set Basic, HRA, Special Allowance, and toggle EPF/ESIC/PT compliance with pre-configured Indian formulas.",
    },
    {
      step: "03",
      title: "Sync Attendance & Leaves",
      desc: "Attendance from biometric devices or the geofenced mobile app automatically calculates paid days and loss of pay.",
    },
    {
      step: "04",
      title: "1-Click Payroll Run & Disburse",
      desc: "Approve draft payroll, download the bank upload file, and generate automated ECR chalans for EPFO and ESIC filing.",
    },
  ];

  const industries = [
    { name: "IT & Tech Startups", desc: "Multi-regime TDS, remote WFH attendance, and ESOP tracking", icon: Briefcase },
    { name: "Manufacturing & Industrial", desc: "Shift rosters, overtime, contractor billing, and factory ESIC rules", icon: Factory },
    { name: "Retail & Multi-Store Chains", desc: "Geofenced check-in across multiple store locations and store manager approvals", icon: Store },
    { name: "Healthcare & Clinics", desc: "Night shift allowances, locum staff payroll, and 24/7 attendance schedules", icon: Stethoscope },
    { name: "Logistics & Field Operations", desc: "Live route attendance, travel reimbursement claims, and instant expense proofs", icon: Truck },
    { name: "Professional Services & Agencies", desc: "Project timesheet tracking, client billable hours, and statutory bonus", icon: Building2 },
  ];

  const faqs = [
    {
      q: "Does YourBrand support both the New and Old Tax Regimes for TDS?",
      a: "Yes. YourBrand natively supports the default New Tax Regime (Section 115BAC with ₹75,000 standard deduction) as well as the Old Tax Regime. Employees can submit chapter VI-A deductions (80C, 80D, HRA) through their self-service portal, and our engine automatically calculates exact monthly TDS liabilities.",
    },
    {
      q: "Can we use mobile geofencing instead of physical biometric fingerprint machines?",
      a: "Absolutely. With our Geofence Attendance module, you define a virtual radius (e.g. 50 meters) around your office, retail store, or warehouse. Employees clock in using their smartphones with GPS coordinates and optional selfie verification. No expensive hardware scanners required.",
    },
    {
      q: "How does YourBrand handle multi-state Professional Tax (PT)?",
      a: "India has different PT slabs and filing cycles across states (such as Karnataka, Maharashtra, Telangana, Tamil Nadu, and West Bengal). YourBrand has built-in tax matrices for all 28+ states and automatically assigns the correct PT deduction based on the employee's work location.",
    },
    {
      q: "Are EPFO and ESIC monthly chalans generated automatically?",
      a: "Yes! At the end of every payroll cycle, YourBrand outputs the exact ECR (Electronic Challan cum Return) text file required by the EPFO portal and the monthly ESIC contribution file ready for upload without manual formatting.",
    },
    {
      q: "Is employee data stored securely within India?",
      a: "Yes. All data is encrypted in transit using TLS 1.3 and at rest with AES-256 encryption. Our infrastructure complies with Indian Digital Personal Data Protection (DPDP) Act 2023 regulations and data localization mandates.",
    },
    {
      q: "How long does it take to migrate from Excel or our old payroll software?",
      a: "Most Indian SMEs with 10 to 200 employees migrate completely within 1 to 2 business days. Our bulk spreadsheet import maps previous salary components, employee master data, and leave balances in a single upload.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-slate-50 to-white pt-14 pb-20 lg:pt-20 lg:pb-28">
        
        {/* Subtle Decorative Background Circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-brand-200/30 via-sky-200/20 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-200 shadow-sm text-xs font-semibold text-brand-700 mb-6 animate-in fade-in slide-in-from-top-3 duration-200">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Designed specifically for Indian SMEs & Growing Enterprises</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
              1-Click Payroll & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-sky-600">Zero-Error Statutory Compliance</span> for India
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Automate EPF, ESIC, Professional Tax, and TDS deductions without manual spreadsheets. Track real-time attendance with mobile geofencing and delight your employees with self-service pay slips.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <a href="#demo-form" className="btn-primary w-full sm:w-auto text-base py-3.5 px-8 shadow-md">
                <span>Book a Guided Demo</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/products" className="btn-secondary w-full sm:w-auto text-base py-3.5 px-8">
                Explore All 8 Products
              </Link>
            </div>

            {/* Trust Points (Clearly Stated, Honest Metrics) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-200/80 text-left">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/70 shadow-sm">
                <p className="text-2xl font-black text-slate-900">100%</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Statutory Compliant (EPF, ESI, PT, TDS)</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/70 shadow-sm">
                <p className="text-2xl font-black text-brand-600">₹0</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Biometric Hardware Required</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/70 shadow-sm">
                <p className="text-2xl font-black text-slate-900">&lt; 60s</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Average Monthly Payroll Processing</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-200/70 shadow-sm">
                <p className="text-2xl font-black text-sky-600">28+</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">State & UT PT Slabs Built-in</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BENEFITS SECTION (4 Cards) */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="section-container">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-brand mb-3">Why Indian Businesses Choose {BRAND_NAME}</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Replace fragmented spreadsheets with an integrated workforce engine
            </h2>
            <p className="text-slate-600 text-base mt-3">
              Designed from ground up around Indian labour laws, local banking formats, and modern workplace mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => {
              const IconComponent = b.icon;
              return (
                <div key={i} className="card-premium flex flex-col justify-between group hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 mb-2 block">
                      {b.badge}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {b.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. HOW IT WORKS (4 Steps) */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-slate mb-3">Simple 4-Step Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              From employee onboarding to salary disbursement in 4 steps
            </h2>
            <p className="text-slate-600 text-base mt-3">
              A frictionless monthly cycle that saves HR managers and business owners over 15 hours every month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-card flex flex-col justify-between relative">
                <div>
                  <div className="text-3xl font-black text-brand-600/30 mb-4 font-mono">
                    {s.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Fully Automated</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. INDUSTRIES SERVED */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="section-container">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="badge-brand mb-3">Versatile Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tailored for diverse Indian industry operational models
            </h2>
            <p className="text-slate-600 text-base mt-3">
              Whether you have desktop developers, warehouse crews, retail staff, or field sales executives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => {
              const IconComponent = ind.icon;
              return (
                <div key={i} className="p-6 rounded-2xl border border-slate-200 hover:border-brand-500/50 hover:bg-brand-50/20 transition-all flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {ind.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. FEATURE OVERVIEW PREVIEW */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="section-container">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <span className="badge-brand bg-brand-500/20 text-brand-300 border-brand-500/30 mb-4">
                Unified Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                All 8 Essential HR & Payroll Modules in One Connected Dashboard
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed mb-6">
                No more synchronizing disparate software for leave requests, biometric punch machines, and tax spreadsheets. YourBrand links attendance directly to your salary register.
              </p>

              <div className="space-y-3 mb-8">
                {STATUTORY_STANDARDS.map((std, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>{std}</span>
                  </div>
                ))}
              </div>

              <Link to="/products" className="btn-primary text-sm">
                <span>View Product Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-4">
                
                {/* Visual Mock Salary Slip Card */}
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                    <div>
                      <p className="text-xs font-bold text-white">Sample Employee Salary Slip</p>
                      <p className="text-[11px] text-slate-400">Month: October 2026 | Mode: Direct Bank Transfer</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Disbursed
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-400 text-[11px]">Earnings</p>
                      <p className="text-slate-300 mt-1">Basic Pay: ₹45,000</p>
                      <p className="text-slate-300">HRA: ₹22,500</p>
                      <p className="text-slate-300">Special Allowance: ₹12,500</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[11px]">Deductions</p>
                      <p className="text-slate-300 mt-1">EPF (12%): ₹1,800</p>
                      <p className="text-slate-300">TDS (Sec 192): ₹4,200</p>
                      <p className="text-slate-300">Prof. Tax (PT): ₹200</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">Net Take Home:</span>
                    <span className="text-base font-extrabold text-brand-400">₹73,800</span>
                  </div>
                </div>

                {/* Geofence Attendance Visual Mock */}
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">Live Geofenced Punch Verified</p>
                    <p className="text-[11px] text-slate-400">Indiranagar Office Hub (Radius: 40m) • 09:28 AM IST</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">Present</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. INTEGRATIONS & SECURITY STRIP */}
      <section className="py-12 bg-slate-100 border-b border-slate-200">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Security & Banking Compatibility</p>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Compatible with all leading Indian Banks, Tally, Zoho, and EPFO / ESIC Portals
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-700">
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">ICICI / HDFC / SBI Bank Uploads</span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">Tally XML & Excel Sync</span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">AES-256 Bit Encryption</span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">Indian DPDP 2023 Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-white">
        <div className="section-container max-w-4xl">
          
          <div className="text-center mb-14">
            <span className="badge-brand mb-3">Got Questions?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Everything you need to know about setting up Indian HR, payroll, and statutory deductions.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-brand-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/faqs" className="text-xs font-semibold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1">
              <span>View full knowledge base and compliance FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 8. CONTACT / DEMO FORM SECTION (WITH HONEYPOT) */}
      <section id="demo-form" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="section-container max-w-5xl">
          
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Context Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-brand-700 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-4">
                  Guided Walkthrough
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Schedule your customized 20-minute product demo
                </h3>
                <p className="text-brand-100 text-xs sm:text-sm mt-3 leading-relaxed">
                  See how YourBrand handles your exact company pay structure, state PT calculations, and employee self-service setup.
                </p>

                <div className="mt-8 space-y-4 text-xs text-brand-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-300 shrink-0" />
                    <span>Free sample payroll audit for your business</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-300 shrink-0" />
                    <span>Zero commitment, no credit card required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-300 shrink-0" />
                    <span>Answer questions on PF/ESI compliance</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 text-xs text-brand-200">
                Prefer email? Reach us directly at <span className="text-white font-semibold underline">support@yourbrand.example.com</span>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7 p-8 sm:p-10">
              <h4 className="text-xl font-bold text-slate-900 mb-1">Request Demo Consultation</h4>
              <p className="text-slate-500 text-xs mb-6">Fill out your details below and a specialist will reach out within 2 hours.</p>

              <form onSubmit={handleDemoSubmit} className="space-y-4">
                
                {/* Honeypot Spam Defense Field - Hidden from humans */}
                <input
                  type="text"
                  name="hp_website"
                  value={formData.hp_website}
                  onChange={handleFormChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Ramesh Iyer"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleFormChange}
                      placeholder="e.g. Apex Tech India"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employee Count *</label>
                  <select
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleFormChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600 bg-white"
                  >
                    <option value="1-15">1 to 15 Employees</option>
                    <option value="16-50">16 to 50 Employees</option>
                    <option value="51-150">51 to 150 Employees</option>
                    <option value="151-500">151 to 500 Employees</option>
                    <option value="500+">500+ Employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Requirements or Challenges (Optional)</label>
                  <textarea
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="e.g. Currently using Excel, need geofencing for 25 field technicians in Bangalore and Mumbai..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>

                {feedback && (
                  <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${formStatus === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                    {formStatus === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
                    <span>{feedback}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn-primary w-full py-3.5 text-sm"
                >
                  {formStatus === 'submitting' ? (
                    'Submitting Demo Request...'
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  Protected with encrypted spam filtering. We respect your contact privacy.
                </p>
              </form>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
