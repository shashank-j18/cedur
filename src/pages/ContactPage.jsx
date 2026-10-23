import React, { useState } from 'react';
import { 
  BRAND_NAME, 
  SUPPORT_EMAIL, 
  SALES_EMAIL, 
  SUPPORT_PHONE, 
  OFFICE_ADDRESS 
} from '../config/brand.js';
import { API_ENDPOINTS } from '../config.js';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    employeeCount: '1-25',
    message: '',
    hp_website: '', // Honeypot field
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
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
        setStatus('success');
        setFeedback(data.message || 'Thank you! Your message has been received.');
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
        setStatus('error');
        setFeedback(data.message || 'Submission error. Please verify your inputs.');
      }
    } catch (err) {
      setStatus('error');
      setFeedback('Unable to reach backend server. Please verify your connection.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="section-container">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="badge-brand mb-3">Connect With Us</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            We're Here to Help Your Team Succeed
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
            Have questions about statutory compliance, migrating your payroll, or custom plans? Our Bangalore-based team is ready to assist.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto mb-16">
          
          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="card-premium">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Our Registered Office</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
                {OFFICE_ADDRESS}
              </p>
              <span className="text-[11px] font-semibold text-slate-400">Visits by prior appointment</span>
            </div>

            <div className="card-premium">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Email Us Directly</h3>
              <p className="text-xs text-slate-500 mb-2">Support: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-600 font-semibold hover:underline">{SUPPORT_EMAIL}</a></p>
              <p className="text-xs text-slate-500">Sales: <a href={`mailto:${SALES_EMAIL}`} className="text-brand-600 font-semibold hover:underline">{SALES_EMAIL}</a></p>
            </div>

            <div className="card-premium">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Call Our Advisory Desk</h3>
              <p className="text-sm font-semibold text-brand-600 mb-1">{SUPPORT_PHONE}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Monday - Saturday: 9:00 AM – 7:00 PM IST</span>
              </p>
            </div>

          </div>

          {/* Right Contact Form with Honeypot */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message or Request a Demo</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">Our compliance specialist will respond within 2 business hours.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Hidden Honeypot Field */}
              <input
                type="text"
                name="hp_website"
                value={formData.hp_website}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ananya Rao"
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
                    onChange={handleChange}
                    placeholder="ananya@company.com"
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
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Orion Labs India"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Team Size</label>
                <select
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">How can we help? (Optional)</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your current HR or payroll setup, upcoming migration timeline, or specific questions..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                />
              </div>

              {feedback && (
                <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${status === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}>
                  {status === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
                  <span>{feedback}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full py-3.5 text-sm"
              >
                {status === 'submitting' ? 'Submitting Form...' : 'Send Message'}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
