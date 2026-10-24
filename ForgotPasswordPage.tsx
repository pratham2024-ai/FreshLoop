import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { sendPasswordReset } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid registered email address.');
      return;
    }

    setLoading(true);
    const res = await sendPasswordReset(email);
    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      showToast('success', 'Reset Link Dispatched', 'Check your inbox for password recovery instructions.');
    } else {
      setError(res.error || 'Unable to send password reset email.');
      showToast('error', 'Reset Failed', res.error || 'Failed to dispatch recovery email.');
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-forest-900/10 shadow-editorial">
        <div className="mb-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-forest-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Reset Your Password
          </h1>
          <p className="text-xs text-charcoal-600 mt-2 leading-relaxed">
            Enter the email address associated with your FreshLoop account. We will send you a secure verification link.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-900">
              Recovery Link Sent
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              If an account exists for <strong className="text-forest-900">{email}</strong>, you will receive an email shortly with instructions to reset your password.
            </p>
            <div className="pt-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-forest-900 text-ivory-50 text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
              >
                <span>Return to Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                Account Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-citrus-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-all shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Generating Token...</span>
              ) : (
                <>
                  <span>Send Recovery Email</span>
                  <ArrowRight className="w-3.5 h-3.5 text-citrus-400" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
