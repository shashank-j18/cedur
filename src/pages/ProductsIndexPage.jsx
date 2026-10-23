import React from 'react';
import { Link } from 'react-router-dom';
import { productsList } from '../components/Navbar.jsx';
import { BRAND_NAME } from '../config/brand.js';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function ProductsIndexPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="section-container">
        
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-brand mb-3">{BRAND_NAME} Product Suite</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Complete HR & Payroll Platform for Indian SMEs
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
            Eight interconnected modules working in perfect harmony to handle everything from employee onboarding and attendance tracking to monthly statutory compliance and salary slips.
          </p>
        </div>

        {/* 8 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
          {productsList.map((product) => {
            const IconComponent = product.icon;
            return (
              <div 
                key={product.id} 
                className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-card hover:shadow-xl hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors shadow-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="badge-slate text-[11px]">Enterprise Grade</span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {product.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={product.href}
                    className="btn-primary text-xs py-2.5 px-5 group-hover:shadow-md"
                  >
                    <span>Explore Module Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs text-slate-400 font-medium">Included in all plans</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Ready to streamline your workforce operations?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Experience how our 8 integrated modules automate salary calculations, attendance, and statutory tax filings.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary py-3.5 px-8 text-sm w-full sm:w-auto">
              Schedule a Guided Demo
            </Link>
            <Link to="/pricing" className="btn-secondary py-3.5 px-8 text-sm w-full sm:w-auto text-slate-900">
              View Pricing Slabs
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
