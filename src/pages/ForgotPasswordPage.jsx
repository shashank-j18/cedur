import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../config/brand.js';
import { API_ENDPOINTS } from '../config.js';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch(API_ENDPOINTS.forgotPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setStatus('success');
      setMessage(data.message || 'If an account exists, a password reset link has been dispatched.');
    } catch (err) {
      setStatus('error');
      setMessage('Failed to submit reset request. Please check your network.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
      <div className="section-container max-w-md w-full">
        
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-card">
          
          <Link to="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            Reset Password
          </h1>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Enter your registered work email and we will dispatch a secure link to create a new password.
          </p>

          {status === 'success' ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reset Link Dispatched</span>
              </div>
              <p className="leading-relaxed">
                {message}
              </p>
              <p className="text-[11px] text-emerald-700 border-t border-emerald-200/60 pt-2">
                (In local development, the reset link & token have been logged to the backend terminal console.)
              </p>
              <Link to="/login" className="btn-primary w-full text-center py-2.5 text-xs mt-3 block">
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              {message && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full py-3 text-sm font-bold shadow-md"
              >
                {status === 'loading' ? 'Sending Link...' : 'Dispatch Reset Link'}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
