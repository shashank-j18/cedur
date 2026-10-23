import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config.js';
import { Lock, KeyRound, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setStatus('error');
      setMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      const res = await fetch(API_ENDPOINTS.resetPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Password reset successfully!');
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to reset password. The token may be expired or invalid.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to connect to the authentication server.');
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
            Create New Password
          </h1>
          <p className="text-xs text-slate-500 mb-6">
            Enter your reset token and your new password.
          </p>

          {status === 'success' ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-3">
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password Reset Successfully</span>
              </div>
              <p className="leading-relaxed">
                {message}
              </p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="btn-primary w-full text-center py-2.5 text-xs mt-3 block"
              >
                Proceed to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reset Token *</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste 48-character reset token"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-600 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Password (8+ chars) *</label>
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
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
                {status === 'loading' ? 'Updating Password...' : 'Save New Password'}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
