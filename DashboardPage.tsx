import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Truck, 
  RefreshCw, 
  Sparkles, 
  ArrowRight, 
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { OrderTimeline } from '../components/dashboard/OrderTimeline';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const DashboardPage: React.FC = () => {
  const { user, isSubscriptionPaused, orders, addresses } = useAuth();
  const { showToast } = useToast();
  const [rated, setRated] = useState<number | null>(null);

  const activeOrder = orders[0];
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

  const handleRate = (star: number) => {
    setRated(star);
    showToast('success', 'Feedback Recorded', `Thank you for rating today's meal ${star} stars! This guides tomorrow's prep.`);
  };

  return (
    <DashboardLayout
      activeTabTitle="Subscriber Dashboard"
      activeTabDescription="Monitor your active meal cycle, upcoming deliveries, and nutritional cadence."
    >
      <div className="space-y-8">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-forest-900/10 shadow-editorial">
            <span className="text-[11px] font-mono uppercase text-charcoal-400 font-semibold block">
              Active Meal Tier
            </span>
            <h3 className="font-serif text-xl font-bold text-forest-900 mt-1">
              Balanced Daily
            </h3>
            <span className="inline-block mt-2 text-xs font-semibold text-citrus-600 bg-citrus-50 px-2 py-0.5 rounded">
              2 Meals / 5 Days
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-forest-900/10 shadow-editorial">
            <span className="text-[11px] font-mono uppercase text-charcoal-400 font-semibold block">
              Next Doorstep Drop
            </span>
            <h3 className="font-serif text-xl font-bold text-forest-900 mt-1">
              {isSubscriptionPaused ? 'Deliveries Paused' : 'Tomorrow, 7:15 AM'}
            </h3>
            <span className="text-xs text-charcoal-500 mt-2 block">
              Morning Slot (6:30 – 8:30 AM)
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-forest-900/10 shadow-editorial">
            <span className="text-[11px] font-mono uppercase text-charcoal-400 font-semibold block">
              Total Plates Enjoyed
            </span>
            <h3 className="font-serif text-xl font-bold text-forest-900 mt-1 font-mono">
              38 Meals
            </h3>
            <span className="text-xs text-emerald-700 font-semibold mt-2 block">
              ~24 Hours Saved
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-forest-900/10 shadow-editorial">
            <span className="text-[11px] font-mono uppercase text-charcoal-400 font-semibold block">
              Circular Loop Return
            </span>
            <h3 className="font-serif text-xl font-bold text-forest-900 mt-1 font-mono">
              14 Totes
            </h3>
            <span className="text-xs text-charcoal-500 mt-2 block">
              Zero Plastic Waste
            </span>
          </div>
        </div>

        {/* Live Delivery Status Timeline Card */}
        {activeOrder ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forest-900/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-citrus-600 font-semibold block">
                  Active Dispatch • Order {activeOrder.orderNumber}
                </span>
                <h3 className="font-serif text-2xl font-bold text-forest-900 mt-1">
                  Today’s Delivery Status
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard/orders"
                  className="text-xs font-semibold text-citrus-600 hover:text-citrus-700 underline"
                >
                  View Full Timeline Details
                </Link>
              </div>
            </div>

            {/* Visual Timeline Component */}
            <OrderTimeline
              status={isSubscriptionPaused ? 'placed' : activeOrder.status}
              estimatedArrival={isSubscriptionPaused ? 'Paused by subscriber' : activeOrder.estimatedArrival}
            />

            <div className="p-4 rounded-2xl bg-ivory-50 border border-forest-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-charcoal-700">
                <MapPin className="w-4 h-4 text-citrus-600 flex-shrink-0" />
                <span>Delivering to: <strong>{activeOrder.addressSummary}</strong></span>
              </div>
              <span className="text-charcoal-500 font-mono">Courier: Eco-Transit Electric Fleet #04</span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-forest-900/10 shadow-editorial text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-forest-900/5 text-citrus-500 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest-900">
              Welcome to Your FreshLoop Portal
            </h3>
            <p className="text-xs text-charcoal-600 max-w-md mx-auto">
              You haven't scheduled a meal plan subscription yet. Choose a chef-crafted plan to start your weekly deliveries.
            </p>
            <div className="pt-2">
              <Link
                to="/plans"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest-900 text-ivory-50 text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
              >
                <span>Select a Meal Plan</span>
                <ArrowRight className="w-3.5 h-3.5 text-citrus-400" />
              </Link>
            </div>
          </div>
        )}

        {/* Today's Plated Dish Preview & Meal Rating Interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-semibold">
                Today’s Featured Dish in Chilled Tote
              </span>
              <span className="badge-tag bg-forest-900 text-ivory-50 text-[10px]">Lunch Plate</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <div className="w-full sm:w-44 aspect-square rounded-2xl overflow-hidden bg-ivory-200 flex-shrink-0 shadow-sm">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
                  alt="Mediterranean Zaatar Chicken"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-xl font-bold text-forest-900">
                  Mediterranean Za’atar Grilled Chicken & Quinoa
                </h4>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Organic chicken breast, tri-color quinoa, roasted cherry tomatoes, and Greek labneh crema.
                </p>
                <div className="flex items-center gap-3 text-xs font-mono text-charcoal-500 pt-1">
                  <span>540 kcal</span>
                  <span>•</span>
                  <span>44g protein</span>
                  <span>•</span>
                  <span>Reheat: 90 secs</span>
                </div>
              </div>
            </div>

            {/* Rate Meal Interaction */}
            <div className="pt-4 border-t border-forest-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-charcoal-700">How was today’s lunch?</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRate(star)}
                    className="p-1 hover:scale-110 transition-transform"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        (rated && star <= rated) ? 'fill-citrus-500 text-citrus-500' : 'text-charcoal-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Shortcuts & Pause Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-forest-900/10 shadow-editorial space-y-4">
              <h4 className="font-serif text-xl font-bold text-forest-900">Quick Actions</h4>
              
              <div className="space-y-2 text-xs font-semibold">
                <Link
                  to="/dashboard/subscription"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-ivory-50 hover:bg-ivory-100 border border-forest-900/10 text-charcoal-800 transition-colors"
                >
                  <span>Change Meal Cadence or Calorie Tier</span>
                  <ArrowRight className="w-3.5 h-3.5 text-citrus-600" />
                </Link>

                <Link
                  to="/dashboard/addresses"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-ivory-50 hover:bg-ivory-100 border border-forest-900/10 text-charcoal-800 transition-colors"
                >
                  <span>Update Morning Delivery Address</span>
                  <ArrowRight className="w-3.5 h-3.5 text-citrus-600" />
                </Link>

                <Link
                  to="/menu"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-ivory-50 hover:bg-ivory-100 border border-forest-900/10 text-charcoal-800 transition-colors"
                >
                  <span>Inspect Upcoming Weekly Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 text-citrus-600" />
                </Link>
              </div>
            </div>

            {/* Cutoff Reminder Box */}
            <div className="p-4 rounded-2xl bg-citrus-50 border border-citrus-200 text-xs text-citrus-900 space-y-1">
              <strong className="block font-bold">Daily Sourcing Cutoff: 8:00 PM</strong>
              <p className="text-[11px] leading-relaxed text-citrus-800">
                Any address changes, day skips, or pause toggles made before 8:00 PM take effect on tomorrow morning's fresh cook cycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
