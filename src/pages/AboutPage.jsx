import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME, OFFICE_ADDRESS, SUPPORT_EMAIL } from '../config/brand.js';
import { ShieldCheck, Heart, Users, Target, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      title: 'Compliance-First Engineering',
      desc: 'Indian statutory regulations are complex and constantly evolving. We build every calculation formula—from Section 192 TDS to state-specific PT slabs—with zero compromise on regulatory rigor.',
      icon: ShieldCheck,
    },
    {
      title: 'Transparency & Accuracy',
      desc: 'No black-box math. Every employee payslip and employer chalan breakdown shows clear line-by-line calculations so business owners understand every rupee deducted and matched.',
      icon: Target,
    },
    {
      title: 'Built for the Real Workplace',
      desc: 'Whether your workforce consists of software developers working from home, retail employees in suburban stores, or factory crews working rotational shifts, our tools fit your operational reality.',
      icon: Users,
    },
    {
      title: 'Data Sovereignty & Security',
      desc: 'We store your workforce records securely within India in full compliance with the Digital Personal Data Protection (DPDP) Act 2023, protected by 256-bit encryption.',
      icon: Heart,
    },
  ];

  // Clearly marked sample leadership team that user can easily replace
  const sampleTeam = [
    {
      name: '[Founder / CEO Placeholder]',
      role: 'Chief Executive Officer',
      bio: 'Over 12 years of enterprise SaaS and Indian payroll systems experience.',
    },
    {
      name: '[Co-Founder / CTO Placeholder]',
      role: 'Chief Technology Officer',
      bio: 'Architect of scalable high-availability cloud platforms and security pipelines.',
    },
    {
      name: '[Head of Compliance Placeholder]',
      role: 'Head of Labour Laws & Compliance',
      bio: 'Former consultant specializing in EPFO, ESIC, and corporate labour court compliance.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="section-container">
        
        {/* Mission Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-brand mb-3">Our Mission</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Democratizing Enterprise-Grade HR & Payroll for Indian SMEs
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            For decades, small and medium enterprises across India were stuck choosing between error-prone manual spreadsheets or bloated, expensive enterprise software. We built {BRAND_NAME} to give every growing Indian business a lightning-fast, 100% compliant workforce management engine.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The Principles That Guide Our Platform
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => {
              const IconComponent = v.icon;
              return (
                <div key={i} className="card-premium flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Team (Clearly Marked Sample Section) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-card mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="badge-slate mb-2">Team & Leadership</span>
            <h2 className="text-2xl font-extrabold text-slate-900">The People Behind {BRAND_NAME}</h2>
            <p className="text-slate-500 text-xs mt-1">
              (Sample section: You can replace these placeholders with your actual team members or advisors)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleTeam.map((member, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 mx-auto flex items-center justify-center font-bold text-xl mb-4">
                  CE
                </div>
                <h4 className="text-base font-bold text-slate-900">{member.name}</h4>
                <p className="text-xs font-semibold text-brand-600 mt-0.5 mb-2">{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Headquarters & Contact Callout */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl">
          <h3 className="text-2xl font-extrabold mb-3">Headquartered in Bengaluru, India</h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            Located in {OFFICE_ADDRESS}. We work closely with local HR leaders, chartered accountants, and company secretaries across India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary py-3 px-6 text-xs w-full sm:w-auto">
              Get in Touch with Our Team
            </Link>
            <Link to="/pricing" className="btn-secondary py-3 px-6 text-xs w-full sm:w-auto text-slate-900">
              Explore Our Plans
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
