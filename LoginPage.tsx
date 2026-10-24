import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // If already authenticated, redirect to dashboard or intended route
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleDemoFill = () => {
    setEmail('komal.ajbe@example.com');
    setPassword('FreshLoop2026!');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      showToast('success', 'Welcome Back', 'Successfully signed into your FreshLoop account.');
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Authentication failed. Please verify your credentials.');
      showToast('error', 'Login Failed', res.error || 'Unable to sign in.');
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
            Welcome Back
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Access your active subscription, deliveries, and dietary preferences.
          </p>
        </div>

        {/* Quick Demo Autofill Button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleDemoFill}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-forest-900/5 hover:bg-forest-900/10 border border-forest-900/10 text-xs font-semibold text-forest-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-citrus-500" />
              <span>Fill Test Sample (komal.ajbe@example.com)</span>
            </div>
            <span className="text-[10px] uppercase font-mono text-citrus-600">Quick Fill</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 leading-relaxed">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-citrus-500 transition-colors"
              />
            </div>
          </div>

          {/* Password with Visibility Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-semibold text-citrus-600 hover:text-citrus-700"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
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

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-forest-900/20 text-citrus-500 focus:ring-citrus-500"
            />
            <label htmlFor="remember" className="text-xs text-charcoal-600 cursor-pointer select-none">
              Keep me signed in on this device
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-all shadow-md disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating with Supabase...</span>
            ) : (
              <>
                <span>Sign In To Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 text-citrus-400" />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-forest-900/10 text-center text-xs text-charcoal-600">
          <span>Don't have an account yet? </span>
          <Link to="/signup" className="font-semibold text-citrus-600 hover:text-citrus-700 underline">
            Create an Account
          </Link>
        </div>

        {/* Security Note */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-charcoal-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real Supabase Auth Integration</span>
        </div>
      </div>
    </div>
  );
};
