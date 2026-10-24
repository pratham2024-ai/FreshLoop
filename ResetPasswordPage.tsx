import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { updatePassword } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password || password.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    const res = await updatePassword(password);
    setLoading(false);

    if (res.success) {
      setSuccess(true);
      showToast('success', 'Password Updated', 'Your password has been securely reset. You can now sign in.');
    } else {
      setError(res.error || 'Failed to update password. Your recovery link may have expired.');
      showToast('error', 'Reset Failed', res.error || 'Could not reset password.');
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-forest-900/10 shadow-editorial">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-forest-900 flex items-center justify-center text-ivory-50 font-bold text-sm">
              FL
            </div>
            <span className="font-serif text-2xl font-bold text-forest-900">
              Fresh<span className="text-citrus-500 font-sans font-light">Loop</span>
            </span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Set New Password
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Choose a new strong password to secure your FreshLoop account.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4 py-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-900">
              Password Reset Complete
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              Your new password is now active. You can proceed to log into your customer portal.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-forest-900 text-ivory-50 text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
              >
                <span>Proceed to Sign In</span>
                <ArrowRight className="w-3.5 h-3.5 text-citrus-400" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            {/* New Password */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                New Password (min 6 chars)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-citrus-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-citrus-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 p-1"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-all shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Updating Password...</span>
              ) : (
                <>
                  <span>Save New Password</span>
                  <ArrowRight className="w-3.5 h-3.5 text-citrus-400" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-charcoal-600">
          <Link to="/login" className="font-semibold text-citrus-600 hover:text-citrus-700 underline">
            Back to Sign In
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-charcoal-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted Session Reset</span>
        </div>
      </div>
    </div>
  );
};
