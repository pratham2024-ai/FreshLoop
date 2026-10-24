import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Sliders, 
  PauseCircle, 
  PlayCircle, 
  Check, 
  AlertCircle, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { BASE_MEAL_PLANS } from '../data/plans';

export const MySubscriptionPage: React.FC = () => {
  const { isSubscriptionPaused, toggleSubscriptionPause } = useAuth();
  const { config, selectedPlan, updateConfig, setPlanById } = useCart();
  const { showToast } = useToast();

  const [dietaryNotes, setDietaryNotes] = useState(config.allergiesNote || 'No bell peppers, extra olive oil on side.');
  const [skippedDates, setSkippedDates] = useState<string[]>(['2026-10-24']);

  const toggleSkipDate = (dateStr: string) => {
    if (skippedDates.includes(dateStr)) {
      setSkippedDates(skippedDates.filter((d) => d !== dateStr));
      showToast('success', 'Date Restored', `Deliveries scheduled for ${dateStr}.`);
    } else {
      setSkippedDates([...skippedDates, dateStr]);
      showToast('info', 'Delivery Skipped', `No meals will be dispatched on ${dateStr}. Credit saved.`);
    }
  };

  const handleSaveNotes = () => {
    updateConfig({ allergiesNote: dietaryNotes });
    showToast('success', 'Preferences Updated', 'Your dietary instructions have been relayed to the kitchen chefs.');
  };

  // Generate upcoming 7 dates for skipping interaction
  const upcomingDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() + 86400000 * (i + 1));
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      formatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  return (
    <DashboardLayout
      activeTabTitle="My Subscription"
      activeTabDescription="Configure your active meal plan, pause deliveries, or skip specific calendar dates."
    >
      <div className="space-y-8">
        {/* Main Plan Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-900/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-citrus-600 font-semibold block">
                Active Membership
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 mt-1">
                {selectedPlan.name}
              </h3>
              <p className="text-xs text-charcoal-600 mt-1">
                Renews every {config.durationWeeks} weeks • ₹{selectedPlan.pricePerMeal} base meal rate
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleSubscriptionPause}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm ${
                  isSubscriptionPaused
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                }`}
              >
                {isSubscriptionPaused ? (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    <span>Resume Subscription</span>
                  </>
                ) : (
                  <>
                    <PauseCircle className="w-4 h-4 text-amber-700" />
                    <span>Pause Subscription</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Current Config Attributes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-ivory-50 border border-forest-900/5">
              <span className="text-charcoal-400 font-mono uppercase text-[10px] block">Meal Frequency</span>
              <p className="font-bold text-forest-900 text-sm mt-0.5">{config.mealsPerDay} Meals / Day</p>
              <span className="text-charcoal-500 mt-1 block">Lunch & Evening Dinner</span>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-50 border border-forest-900/5">
              <span className="text-charcoal-400 font-mono uppercase text-[10px] block">Weekly Schedule</span>
              <p className="font-bold text-forest-900 text-sm mt-0.5">{config.daysPerWeek} Days / Week</p>
              <span className="text-charcoal-500 mt-1 block">Monday through Friday</span>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-50 border border-forest-900/5">
              <span className="text-charcoal-400 font-mono uppercase text-[10px] block">Delivery Window</span>
              <p className="font-bold text-forest-900 text-sm mt-0.5 capitalize">{config.selectedDeliverySlot} Slot</p>
              <span className="text-charcoal-500 mt-1 block">6:30 AM – 8:30 AM</span>
            </div>
          </div>
        </div>

        {/* Skip Specific Delivery Dates Calendar Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-xl font-bold text-forest-900">
                Upcoming Delivery Calendar
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Traveling or dining out? Tap any date below to skip delivery. Your meal credit rolls over automatically.
              </p>
            </div>
            <span className="text-[11px] font-mono text-citrus-600 bg-citrus-50 px-2.5 py-1 rounded-md border border-citrus-200">
              Cutoff: 8:00 PM previous day
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5 pt-2">
            {upcomingDays.map((day) => {
              const isSkipped = skippedDates.includes(day.iso);
              return (
                <button
                  key={day.iso}
                  type="button"
                  onClick={() => toggleSkipDate(day.iso)}
                  className={`p-3.5 rounded-2xl text-center border transition-all ${
                    isSkipped
                      ? 'bg-rose-50 border-rose-300 text-rose-800'
                      : 'bg-ivory-50 border-forest-900/10 hover:border-forest-900/25 text-charcoal-800'
                  }`}
                >
                  <span className="text-xs font-mono font-bold uppercase block">{day.dayName}</span>
                  <span className="text-[11px] block mt-0.5 font-medium">{day.formatted}</span>
                  <span
                    className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSkipped ? 'bg-rose-200 text-rose-900' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isSkipped ? 'Skipped' : 'Scheduled'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Change Plan Tier */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-4">
          <h3 className="font-serif text-xl font-bold text-forest-900">
            Switch Subscription Tier
          </h3>
          <p className="text-xs text-charcoal-600">
            Select another plan archetype for your next billing cycle:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {BASE_MEAL_PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setPlanById(p.id);
                  showToast('success', 'Plan Tier Updated', `Switched active plan to ${p.name}.`);
                }}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  selectedPlan.id === p.id
                    ? 'border-citrus-500 bg-citrus-50/40 ring-1 ring-citrus-500'
                    : 'border-forest-900/10 hover:border-forest-900/20 bg-ivory-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-bold text-sm text-forest-900">{p.name}</span>
                  {selectedPlan.id === p.id && <Check className="w-4 h-4 text-citrus-600" />}
                </div>
                <p className="text-[11px] text-charcoal-500 line-clamp-2">{p.tagline}</p>
                <span className="font-mono text-xs font-bold text-forest-900 block mt-2">
                  ₹{p.pricePerMeal} / meal
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Kitchen Dietary Instructions Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-4">
          <h3 className="font-serif text-xl font-bold text-forest-900">
            Permanent Kitchen Notes & Food Exclusions
          </h3>
          <p className="text-xs text-charcoal-600">
            These guidelines are printed directly on our morning chef prep tickets for your account.
          </p>

          <textarea
            rows={3}
            value={dietaryNotes}
            onChange={(e) => setDietaryNotes(e.target.value)}
            className="w-full p-4 rounded-2xl border border-forest-900/10 bg-ivory-50 text-xs text-charcoal-900 focus:outline-none focus:border-citrus-500"
          />

          <button
            onClick={handleSaveNotes}
            className="px-6 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-colors shadow-sm"
          >
            Save Kitchen Instructions
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
