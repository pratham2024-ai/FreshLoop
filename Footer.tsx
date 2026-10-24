import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck, RefreshCw, Leaf, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('error', 'Invalid Email', 'Please provide a valid email address to subscribe.');
      return;
    }
    setSubscribed(true);
    showToast('success', 'Subscribed to Seasonal Dispatch', 'You will receive our weekly culinary notes & rotating menus.');
    setEmail('');
  };

  return (
    <footer className="bg-forest-950 text-ivory-100 pt-16 pb-12 border-t border-forest-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-forest-900/60 mb-12">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-forest-900/80 flex items-center justify-center text-citrus-400 flex-shrink-0 border border-forest-800">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-ivory-50">100% Organic & Non-GMO</h4>
              <p className="text-xs text-sage-300 mt-1 leading-relaxed">
                Directly partnered with certified regenerative regional growers and cold-pressed producers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-forest-900/80 flex items-center justify-center text-citrus-400 flex-shrink-0 border border-forest-800">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-ivory-50">The Zero-Waste Return Loop</h4>
              <p className="text-xs text-sage-300 mt-1 leading-relaxed">
                Insulated thermal bags and ice-packs are retrieved, sanitized, and reused across our circular network.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-forest-900/80 flex items-center justify-center text-citrus-400 flex-shrink-0 border border-forest-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-ivory-50">Sterile Central Cloud Kitchens</h4>
              <p className="text-xs text-sage-300 mt-1 leading-relaxed">
                HACCP certified temperature-controlled prep rooms ensuring blast-chilled freshness.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-forest-900/60">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-citrus-500 flex items-center justify-center text-white font-bold">
                FL
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-ivory-50">
                Fresh<span className="text-citrus-400 font-sans font-light">Loop</span>
              </span>
            </Link>
            <p className="text-sm text-sage-300 max-w-sm leading-relaxed">
              Elevating daily nutrition into a restorative, culinary ritual. Chef-cooked balanced meals delivered chilled in sustainable returnable packaging.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-forest-900 text-citrus-400 border border-forest-800 text-xs font-mono">
                Prototype v1.0 • Supabase & Razorpay Ready
              </span>
            </div>
          </div>

          {/* Quick Links: Plans & Food */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-ivory-50 uppercase tracking-wider mb-4">
              Explore Menu
            </h5>
            <ul className="space-y-2.5 text-xs text-sage-300">
              <li>
                <Link to="/plans" className="hover:text-citrus-400 transition-colors">
                  All Meal Plans
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-citrus-400 transition-colors">
                  Rotating Weekly Menu
                </Link>
              </li>
              <li>
                <Link to="/plans/balanced-daily-meals" className="hover:text-citrus-400 transition-colors">
                  Balanced Daily Plan
                </Link>
              </li>
              <li>
                <Link to="/plans/vegetarian-fresh-plan" className="hover:text-citrus-400 transition-colors">
                  Vegetarian Fresh Plan
                </Link>
              </li>
              <li>
                <Link to="/plans/high-protein-plan" className="hover:text-citrus-400 transition-colors">
                  High Protein Athletic
                </Link>
              </li>
              <li>
                <Link to="/plans/weight-management-plan" className="hover:text-citrus-400 transition-colors">
                  Weight Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-ivory-50 uppercase tracking-wider mb-4">
              Company
            </h5>
            <ul className="space-y-2.5 text-xs text-sage-300">
              <li>
                <Link to="/how-it-works" className="hover:text-citrus-400 transition-colors">
                  How FreshLoop Works
                </Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-citrus-400 transition-colors">
                  Our Culinary Story
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-citrus-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-citrus-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-citrus-400 transition-colors">
                  Admin Demo Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h5 className="font-serif text-sm font-semibold text-ivory-50 uppercase tracking-wider mb-4">
              Weekly Dispatch
            </h5>
            <p className="text-xs text-sage-300 mb-3 leading-relaxed">
              Curated seasonal recipes, chef notes, and weekly menu drops.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-forest-900 border border-forest-800 rounded-xl text-citrus-300 text-xs">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-forest-900/80 border border-forest-800 rounded-xl px-3.5 py-2.5 text-xs text-ivory-50 placeholder-charcoal-400 focus:outline-none focus:border-citrus-500 transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-citrus-500 hover:bg-citrus-600 text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-sage-400 block">
                  No spam. Pause or unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sage-400">
          <p className="text-center md:text-left leading-relaxed max-w-xl">
            <span className="text-ivory-200">Disclaimer:</span> Nutritional values, calorie counts, and macro estimates displayed across this platform are illustrative and for general lifestyle awareness. They do not constitute personalized medical or dietetic prescriptions.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>© {new Date().getFullYear()} FreshLoop Technologies.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
