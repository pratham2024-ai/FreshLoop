import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { pricing } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Meal Plans', path: '/plans' },
    { name: 'Weekly Menu', path: '/menu' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Our Story', path: '/story' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-ivory-50/95 backdrop-blur-md shadow-sm border-b border-forest-900/10 py-3.5'
          : 'bg-ivory-50 border-b border-forest-900/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="FreshLoop Home">
            <div className="w-9 h-9 rounded-full bg-forest-900 flex items-center justify-center text-ivory-50 group-hover:bg-forest-800 transition-colors shadow-sm">
              {/* Custom botanical loop emblem */}
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10" />
                <path d="M12 2a10 10 0 0 1 7.07 17.07" stroke="#E06D28" strokeWidth="2.5" />
                <circle cx="12" cy="12" r="3" fill="#E06D28" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-forest-900 leading-none">
                Fresh<span className="text-citrus-500 font-sans font-light">Loop</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-charcoal-400 font-medium">
                Chef Subscriptions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive(link.path)
                    ? 'text-forest-900 font-semibold'
                    : 'text-charcoal-600 hover:text-forest-900'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-citrus-500 rounded-full animate-in fade-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Admin link for easy reviewer access */}
            <Link
              to="/admin"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-charcoal-500 hover:text-forest-900 bg-forest-900/5 hover:bg-forest-900/10 rounded-full transition-colors"
              title="View Admin Portal Demo"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-citrus-600" />
              <span>Admin Demo</span>
            </Link>

            {/* Account / Dashboard Link */}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-ivory-200/60 transition-colors text-charcoal-700 text-xs sm:text-sm font-medium border border-forest-900/10"
              >
                <div className="w-7 h-7 rounded-full bg-forest-700 text-ivory-50 flex items-center justify-center font-bold text-xs uppercase overflow-hidden">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
                  ) : (
                    user?.fullName?.[0] || 'K'
                  )}
                </div>
                <span className="hidden sm:inline-block max-w-[100px] truncate">
                  {user?.fullName ? user.fullName.split(' ')[0] : 'Member'}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-charcoal-700 hover:text-forest-900 px-3 py-2 rounded-lg hover:bg-ivory-200/50 transition-colors"
              >
                <User className="w-4 h-4 text-charcoal-500" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Subscription CTA / Checkout Button */}
            <Link
              to="/checkout"
              className="relative inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-forest-900 text-ivory-50 text-xs sm:text-sm font-semibold hover:bg-forest-800 transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingBag className="w-4 h-4 text-citrus-400" />
              <span className="hidden xs:inline">Build Plan</span>
              <span className="xs:hidden">Plan</span>
              {pricing.totalMeals > 0 && (
                <span className="hidden md:inline-flex items-center justify-center bg-citrus-500 text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold">
                  {pricing.totalMeals} meals
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal-700 hover:text-forest-900 rounded-lg hover:bg-ivory-200/60 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-forest-950/40 backdrop-blur-sm z-50 animate-in fade-in">
          <div className="bg-ivory-50 border-b border-forest-900/10 px-6 py-6 shadow-2xl max-h-[calc(100vh-65px)] overflow-y-auto">
            <nav className="flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400">Navigation</span>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-serif py-1 flex items-center justify-between ${
                    isActive(link.path)
                      ? 'text-forest-900 font-bold'
                      : 'text-charcoal-700 hover:text-forest-900'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-charcoal-300" />
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-forest-900/10 flex flex-col gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400">Account & Portal</span>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-between py-2 text-forest-900 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-citrus-500" />
                        <span>Customer Dashboard</span>
                      </div>
                      <span className="text-xs text-charcoal-500">{user?.fullName}</span>
                    </Link>
                    <Link
                      to="/dashboard/orders"
                      className="py-1 text-sm text-charcoal-600 hover:text-forest-900 pl-6"
                    >
                      My Orders & Timeline
                    </Link>
                    <Link
                      to="/dashboard/subscription"
                      className="py-1 text-sm text-charcoal-600 hover:text-forest-900 pl-6"
                    >
                      Manage Subscription
                    </Link>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link
                      to="/login"
                      className="text-center py-2.5 px-4 rounded-xl border border-forest-900/20 text-forest-900 font-medium text-sm hover:bg-ivory-200/50"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="text-center py-2.5 px-4 rounded-xl bg-forest-900 text-ivory-50 font-medium text-sm hover:bg-forest-800"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                <Link
                  to="/admin"
                  className="mt-2 flex items-center justify-between p-3 rounded-xl bg-forest-900/5 text-charcoal-700 text-sm font-medium"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-citrus-600" />
                    <span>Admin Operations Portal</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-forest-900 text-white px-2 py-0.5 rounded">
                    Demo
                  </span>
                </Link>
              </div>

              <div className="pt-6 border-t border-forest-900/10">
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-citrus-500 text-white font-semibold text-sm shadow-warm"
                >
                  <span>Build Your Meal Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
