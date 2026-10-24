import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const SignUpPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [verificationPending, setVerificationPending] = useState(false);

  const { signup, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required.';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) errs.phone = '10-digit mobile number required.';
    if (!password || password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    if (!agreed) errs.agreed = 'Please accept the service terms and dietary disclosure.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('error', 'Form Incomplete', 'Please check highlighted fields.');
      return;
    }

    setLoading(true);
    const res = await signup(fullName, email, phone, password);
    setLoading(false);

    if (res.success) {
      if (res.requiresEmailConfirmation) {
        setVerificationPending(true);
        showToast('info', 'Verification Required', 'Please check your email to activate your account.');
      } else {
        showToast('success', 'Account Created', `Welcome to FreshLoop, ${fullName}!`);
        navigate('/dashboard');
      }
    } else {
      showToast('error', 'Sign Up Issue', res.error || 'Failed to create account.');
      setErrors((prev) => ({ ...prev, form: res.error || 'Registration failed.' }));
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 border border-forest-900/10 shadow-editorial">
        {/* Header */}
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
            Start Your Culinary Membership
          </h1>
          <p className="text-xs text-charcoal-600 mt-1">
            Create an account to manage meal schedules, pauses, and morning drop-offs.
          </p>
        </div>

        {verificationPending ? (
          <div className="text-center space-y-4 py-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-citrus-100 text-citrus-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest-900">
              Check Your Inbox
            </h3>
            <p className="text-xs text-charcoal-600 leading-relaxed max-w-sm mx-auto">
              We have sent an activation link to <strong className="text-forest-900">{email}</strong>. Please confirm your email address to complete registration and sign in.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-forest-900 text-ivory-50 text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
              >
                <span>Proceed to Sign In</span>
                <ArrowRight className="w-3.5 h-3.5 text-citrus-400" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.form && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 leading-relaxed">
                {errors.form}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Komal Sharma"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                    errors.fullName ? 'border-rose-500 bg-rose-50/30' : 'border-forest-900/10 bg-ivory-50 focus:border-citrus-500'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500 bg-rose-50/30' : 'border-forest-900/10 bg-ivory-50 focus:border-citrus-500'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 00000"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                      errors.phone ? 'border-rose-500 bg-rose-50/30' : 'border-forest-900/10 bg-ivory-50 focus:border-citrus-500'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                Create Password * (min 6 chars)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                    errors.password ? 'border-rose-500 bg-rose-50/30' : 'border-forest-900/10 bg-ivory-50 focus:border-citrus-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-rose-600 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                    errors.confirmPassword ? 'border-rose-500 bg-rose-50/30' : 'border-forest-900/10 bg-ivory-50 focus:border-citrus-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-[11px] text-rose-600 mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms & Disclosure Agreement */}
            <div className="pt-2">
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 rounded border-forest-900/20 text-citrus-500 focus:ring-citrus-500"
                />
                <label htmlFor="terms" className="text-[11px] text-charcoal-600 leading-relaxed cursor-pointer select-none">
                  I agree to the FreshLoop membership guidelines, return packaging loop protocol, and acknowledge that nutrition estimates are illustrative.
                </label>
              </div>
              {errors.agreed && <p className="text-[11px] text-rose-600 mt-1">{errors.agreed}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-citrus-500 hover:bg-citrus-600 text-white text-xs font-semibold transition-all shadow-warm disabled:opacity-50"
            >
              {loading ? (
                <span>Registering Account in Supabase...</span>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-forest-900/10 text-center text-xs text-charcoal-600">
          <span>Already have an active account? </span>
          <Link to="/login" className="font-semibold text-citrus-600 hover:text-citrus-700 underline">
            Sign In Here
          </Link>
        </div>

        {/* Security Note */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-charcoal-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real Supabase Email Auth</span>
        </div>
      </div>
    </div>
  );
};
