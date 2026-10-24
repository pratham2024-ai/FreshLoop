import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  ShoppingBag, 
  MapPin, 
  LogOut, 
  PauseCircle, 
  PlayCircle,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTabTitle: string;
  activeTabDescription?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTabTitle,
  activeTabDescription
}) => {
  const { user, isSubscriptionPaused, toggleSubscriptionPause, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handlePauseResume = () => {
    toggleSubscriptionPause();
    if (isSubscriptionPaused) {
      showToast('success', 'Subscription Resumed', 'Your deliveries are active again for scheduled delivery dates.');
    } else {
      showToast('info', 'Subscription Paused', 'No orders will be cooked or dispatched until you resume.');
    }
  };

  const handleLogout = () => {
    logout();
    showToast('info', 'Logged Out', 'You have been signed out of your account.');
    navigate('/');
  };

  const dashboardLinks = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Subscription', path: '/dashboard/subscription', icon: CalendarDays },
    { name: 'Order History & Status', path: '/dashboard/orders', icon: ShoppingBag },
    { name: 'Delivery Addresses', path: '/dashboard/addresses', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-ivory-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-forest-900 text-ivory-50 flex items-center justify-center font-serif text-2xl font-bold overflow-hidden shadow-sm flex-shrink-0">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
              ) : (
                user?.fullName?.[0] || 'K'
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
                  {user?.fullName || 'Valued Subscriber'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                  <UserCheck className="w-3 h-3" />
                  <span>Member</span>
                </span>
              </div>
              <p className="text-xs text-charcoal-500 mt-1">
                {user?.email} • Member since {user?.createdAt || '2026'}
              </p>
            </div>
          </div>

          {/* Subscription Status & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-ivory-100 border border-forest-900/10 text-xs flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isSubscriptionPaused ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />
              <span className="font-semibold text-charcoal-800">
                Status: {isSubscriptionPaused ? 'Paused' : 'Active Delivery'}
              </span>
            </div>

            <button
              onClick={handlePauseResume}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-semibold transition-all shadow-sm ${
                isSubscriptionPaused
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-ivory-100 hover:bg-ivory-200 text-charcoal-700 border border-forest-900/15'
              }`}
            >
              {isSubscriptionPaused ? (
                <>
                  <PlayCircle className="w-4 h-4" />
                  <span>Resume Deliveries</span>
                </>
              ) : (
                <>
                  <PauseCircle className="w-4 h-4 text-amber-600" />
                  <span>Pause Deliveries</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 text-charcoal-500 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Responsive Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-forest-900/10 shadow-editorial sticky top-24">
              <span className="text-[11px] uppercase font-mono tracking-wider text-charcoal-400 px-3 block mb-3 font-semibold">
                Account Navigation
              </span>
              <nav className="space-y-1">
                {dashboardLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end={link.path === '/dashboard'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-forest-900 text-ivory-50 shadow-sm'
                            : 'text-charcoal-600 hover:text-forest-900 hover:bg-ivory-100'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-forest-900/10 px-3">
                <div className="flex items-center gap-2 text-[11px] text-charcoal-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Client-Side Security Prototype</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Content Area */}
          <main className="lg:col-span-9">
            <div className="mb-6">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
                {activeTabTitle}
              </h2>
              {activeTabDescription && (
                <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                  {activeTabDescription}
                </p>
              )}
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
