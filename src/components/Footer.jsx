import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BRAND_NAME, 
  TAGLINE, 
  SUPPORT_EMAIL, 
  SUPPORT_PHONE, 
  OFFICE_ADDRESS, 
  SOCIAL_LINKS 
} from '../config/brand.js';
import { API_ENDPOINTS } from '../config.js';
import { productsList } from './Navbar.jsx';
import { ShieldCheck, Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [feedback, setFeedback] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch(API_ENDPOINTS.newsletter, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          email,
          hp_field: honeypot, // Honeypot spam defense
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFeedback(data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        setStatus('error');
        setFeedback(data.message || 'Subscription failed. Please check your email.');
      }
    } catch (err) {
      setStatus('error');
      setFeedback('Unable to connect to the server. Please try again.');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="section-container">
        
        {/* Top Newsletter & Brand Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-850 rounded-2xl p-8 sm:p-10 border border-slate-700/60 shadow-xl mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="badge-brand bg-brand-500/10 text-brand-300 border-brand-500/30 mb-3">
                Indian Compliance Bulletin
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Stay updated on EPF, ESIC, and TDS regulation changes
              </h3>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Get our monthly digest on Indian labour law amendments, financial year-end payroll deadlines, and tax slab updates delivered straight to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                {/* Honeypot field - visually hidden */}
                <input
                  type="text"
                  name="hp_field"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary py-3 px-6 text-xs whitespace-nowrap"
                  >
                    {status === 'loading' ? (
                      'Subscribing...'
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {feedback && (
                  <div className={`text-xs flex items-center gap-1.5 mt-1 ${status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {status === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
                    <span>{feedback}</span>
                  </div>
                )}
                <span className="text-[11px] text-slate-500">
                  Zero spam. Unsubscribe at any time.
                </span>
              </form>
            </div>

          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-14">
          
          {/* Col 1: Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-600 flex items-center justify-center text-white font-black text-lg">
                CE
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Ce<span className="text-brand-400">dur</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              {TAGLINE}
            </p>
            
            <div className="flex flex-col gap-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>{OFFICE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href={`tel:${SUPPORT_PHONE.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">{SUPPORT_PHONE}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white transition-colors">{SUPPORT_EMAIL}</a>
              </div>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Products</h4>
            <ul className="flex flex-col gap-2 text-xs">
              {productsList.slice(0, 5).map(p => (
                <li key={p.id}>
                  <Link to={p.href} className="text-slate-400 hover:text-white transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Products & Features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Features</h4>
            <ul className="flex flex-col gap-2 text-xs">
              {productsList.slice(5).map(p => (
                <li key={p.id}>
                  <Link to={p.href} className="text-slate-400 hover:text-white transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/pricing" className="text-slate-400 hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company & Legal</h4>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-white transition-colors">
                  Compliance Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact & Demo
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-slate-400 hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy (DPDP 2023)
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Security Note */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>256-bit SSL Encryption | Indian Data Privacy Compliant</span>
          </div>

          <div className="flex items-center gap-4">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
