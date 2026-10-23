import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BRAND_NAME } from '../config/brand.js';
import { API_ENDPOINTS } from '../config.js';
import { Lock, Mail, User, Building, Phone, Users, AlertCircle, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    employeeCountRange: '1-25',
    password: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (formData.password.length < 8) {
      setStatus('error');
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      const res = await fetch(API_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Registration failed. Please check your details.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Unable to connect to the registration server.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
      <div className="section-container max-w-lg w-full">
        
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-card">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-600 flex items-center justify-center text-white font-black text-xl">
                CE
              </div>
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Start Your 14-Day Free Trial
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Full access to Indian payroll, attendance, and employee self-service
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Aditi Sen"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="aditi@company.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile / Phone *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Legal Name *</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Sen Tech Pvt Ltd"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Team Size</label>
                <select
                  name="employeeCountRange"
                  value={formData.employeeCountRange}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600 bg-white"
                >
                  <option value="1-25">1 to 25 Employees</option>
                  <option value="26-75">26 to 75 Employees</option>
                  <option value="76-150">76 to 150 Employees</option>
                  <option value="150+">150+ Employees</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password (8+ chars) *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full py-3.5 text-sm font-bold shadow-md"
            >
              {status === 'loading' ? 'Creating Company Account...' : 'Create Account & Open Dashboard'}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              By registering, you agree to our{' '}
              <Link to="/terms-of-service" className="underline hover:text-slate-600">Terms of Service</Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="underline hover:text-slate-600">Privacy Policy</Link>.
            </p>

          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-600 hover:underline">
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
