import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BRAND_NAME } from '../config/brand.js';
import { API_ENDPOINTS } from '../config.js';
import { Lock, Mail, ArrowRight, AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFillDemo = () => {
    setEmail('admin@cedur.com');
    setPassword('Password123!');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Unable to connect to the authentication server.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
      <div className="section-container max-w-md w-full">
        
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-card">
          
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-600 flex items-center justify-center text-white font-black text-xl">
                CE
              </div>
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Sign In to {BRAND_NAME}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Access your workforce dashboard, attendance, and payroll runs
            </p>
          </div>

          {/* Quick Demo Credentials Autofill Banner */}
          <div className="mb-6 p-3 rounded-xl bg-brand-50 border border-brand-200 text-xs flex items-center justify-between">
            <div>
              <p className="font-bold text-brand-900">Demo Credentials Available</p>
              <p className="text-brand-700 text-[11px]">admin@cedur.com • Password123!</p>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 rounded-lg bg-brand-600 text-white font-semibold text-[11px] hover:bg-brand-700 shadow-sm"
            >
              Autofill
            </button>
          </div>

          {/* Login Form */}
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-[11px] font-semibold text-brand-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600"
                />
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
              className="btn-primary w-full py-3 text-sm font-bold shadow-md"
            >
              {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </button>

          </form>

          {/* Footer Link */}
          <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an organization account yet?{' '}
            <Link to="/register" className="font-bold text-brand-600 hover:underline">
              Start Free Trial
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
