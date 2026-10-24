import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Flame, 
  Clock, 
  Sparkles, 
  HelpCircle,
  Leaf
} from 'lucide-react';
import { BASE_MEAL_PLANS, calculatePlanPricing } from '../data/plans';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { fetchMealPlans } from '../services/mealPlans';
import { MealPlan } from '../types';

export const PlanDetailPage: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { updateConfig, setPlanById } = useCart();
  const { showToast } = useToast();

  const [plans, setPlans] = useState<MealPlan[]>(BASE_MEAL_PLANS);

  React.useEffect(() => {
    let isMounted = true;
    fetchMealPlans().then((res) => {
      if (isMounted) setPlans(res.plans);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const plan = plans.find(
    (p) => p.slug === planId || p.id === planId
  ) || BASE_MEAL_PLANS.find((p) => p.slug === planId || p.id === planId) || BASE_MEAL_PLANS[0];

  // Local configuration state for this specific plan
  const [mealsPerDay, setMealsPerDay] = useState<number>(plan.defaultMealsPerDay);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(plan.defaultDaysPerWeek);
  const [durationWeeks, setDurationWeeks] = useState<number>(plan.recommendedDurationWeeks);

  const pricing = calculatePlanPricing(
    plan.pricePerMeal,
    mealsPerDay,
    daysPerWeek,
    durationWeeks
  );

  const handleStartSubscription = () => {
    setPlanById(plan.id);
    updateConfig({
      mealsPerDay,
      daysPerWeek,
      durationWeeks,
      dietaryPreference: plan.category
    });
    showToast('success', 'Plan Configured', `Configured ${plan.name} for ${pricing.totalMeals} meals.`);
    navigate('/checkout');
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation link */}
        <div className="mb-6">
          <Link
            to="/plans"
            className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-600 hover:text-forest-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Meal Plans</span>
          </Link>
        </div>

        {/* Plan Editorial Header & Photography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="badge-tag bg-forest-900 text-ivory-50">
                {plan.category.replace('-', ' ')}
              </span>
              {plan.badge && (
                <span className="badge-tag bg-citrus-100 text-citrus-700">
                  {plan.badge}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 tracking-tight leading-tight">
              {plan.name}
            </h1>

            <p className="font-serif italic text-lg sm:text-xl text-forest-800">
              "{plan.tagline}"
            </p>

            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
              {plan.description}
            </p>

            {/* Target Audience Note */}
            <div className="p-4 rounded-2xl bg-white border border-forest-900/10 text-xs">
              <strong className="text-forest-900 block mb-1">Recommended For:</strong>
              <p className="text-charcoal-600 leading-relaxed">{plan.targetAudience}</p>
            </div>

            {/* Dietary Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {plan.dietaryTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-ivory-100 border border-forest-900/10 text-xs font-medium text-forest-900"
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-ivory-200">
              <ImageWithFallback
                src={plan.image}
                fallbackSrc={plan.fallbackImage}
                alt={plan.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 p-4 rounded-2xl bg-white border border-forest-900/10 shadow-sm flex items-center justify-between text-xs">
              <span className="text-charcoal-500">Est. Energy Density:</span>
              <span className="font-mono font-bold text-forest-900">{plan.sampleCaloriesRange}</span>
            </div>
          </div>
        </div>

        {/* Benefits & Sample Day Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Plan Specific Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-forest-900">
              Key Nutritional & Culinary Benefits
            </h3>

            <div className="space-y-4">
              {plan.benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-forest-900/10 shadow-sm flex items-start gap-3.5"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-forest-900 text-sm">{b.title}</h4>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Daily Rotation */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-forest-900">
              Illustrative Daily Menu Rotation
            </h3>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-citrus-600 block mb-1">
                  Breakfast Plate (Optional)
                </span>
                <h4 className="font-serif font-bold text-forest-900 text-base">
                  {plan.sampleMenu.breakfast}
                </h4>
                <p className="text-xs text-charcoal-500 mt-0.5">Freshly baked, high-fiber start.</p>
              </div>

              <div className="pt-4 border-t border-forest-900/10">
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-citrus-600 block mb-1">
                  Midday Nourish Lunch
                </span>
                <h4 className="font-serif font-bold text-forest-900 text-base">
                  {plan.sampleMenu.lunch}
                </h4>
                <p className="text-xs text-charcoal-500 mt-0.5">Balanced energy with zero 3 PM slump.</p>
              </div>

              <div className="pt-4 border-t border-forest-900/10">
                <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-citrus-600 block mb-1">
                  Restorative Evening Dinner
                </span>
                <h4 className="font-serif font-bold text-forest-900 text-base">
                  {plan.sampleMenu.dinner}
                </h4>
                <p className="text-xs text-charcoal-500 mt-0.5">Light, nutrient-dense digestive ease.</p>
              </div>

              <div className="pt-4 border-t border-forest-900/10 text-[11px] text-charcoal-400">
                Rotating weekly with over 40 distinct chef recipes.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Live Subscription Configurator Card */}
        <div className="bg-forest-900 text-ivory-50 rounded-3xl p-8 sm:p-12 shadow-2xl border border-forest-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-citrus-400 font-semibold block mb-2">
              Configure Your Subscription
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold">
              Personalize {plan.name}
            </h3>
            <p className="text-xs sm:text-sm text-sage-300 mt-2">
              Choose your meal frequency, weekly cadence, and subscription duration to unlock savings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Meals per day */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-sage-300 block mb-2">
                  Meals Per Day
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setMealsPerDay(num)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                        mealsPerDay === num
                          ? 'bg-citrus-500 text-white shadow-warm'
                          : 'bg-forest-950/60 text-sage-200 hover:bg-forest-800'
                      }`}
                    >
                      {num} {num === 1 ? 'Meal' : 'Meals'} / day
                    </button>
                  ))}
                </div>
              </div>

              {/* Days per week */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-sage-300 block mb-2">
                  Days Per Week
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[5, 6, 7].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setDaysPerWeek(days)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                        daysPerWeek === days
                          ? 'bg-citrus-500 text-white shadow-warm'
                          : 'bg-forest-950/60 text-sage-200 hover:bg-forest-800'
                      }`}
                    >
                      {days} Days {days === 5 ? '(Mon-Fri)' : days === 6 ? '(Mon-Sat)' : '(Full Week)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscription duration */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-sage-300 block mb-2">
                  Billing Duration
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { weeks: 1, label: '1 Week', tag: 'Standard' },
                    { weeks: 2, label: '2 Weeks', tag: '5% Off' },
                    { weeks: 4, label: '4 Weeks', tag: '10% Off' },
                  ].map((item) => (
                    <button
                      key={item.weeks}
                      type="button"
                      onClick={() => setDurationWeeks(item.weeks)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all relative ${
                        durationWeeks === item.weeks
                          ? 'bg-citrus-500 text-white shadow-warm'
                          : 'bg-forest-950/60 text-sage-200 hover:bg-forest-800'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="block text-[10px] font-normal opacity-80 mt-0.5">{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Pricing Breakdown Box */}
            <div className="lg:col-span-5 bg-forest-950/80 rounded-2xl p-6 sm:p-7 border border-forest-800 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-sage-400 block">
                Calculated Summary
              </span>

              <div className="space-y-2 text-xs text-sage-300">
                <div className="flex justify-between">
                  <span>Base Rate:</span>
                  <span className="text-ivory-50 font-mono">₹{plan.pricePerMeal} / meal</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Delivered Meals:</span>
                  <span className="text-ivory-50 font-mono">{pricing.totalMeals} meals</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-ivory-50 font-mono">₹{pricing.subtotal}</span>
                </div>
                {pricing.discountAmount > 0 && (
                  <div className="flex justify-between text-citrus-400 font-semibold">
                    <span>Duration Discount ({pricing.discountPercent}%):</span>
                    <span>-₹{pricing.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Food GST (5%):</span>
                  <span className="text-ivory-50 font-mono">₹{pricing.tax}</span>
                </div>
                <div className="flex justify-between">
                  <span>Chilled Courier Delivery:</span>
                  <span className="text-emerald-400 font-semibold font-mono">
                    {pricing.deliveryFee === 0 ? 'FREE' : `₹${pricing.deliveryFee}`}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-forest-800 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-sage-400 block">Total Payable</span>
                  <span className="font-serif text-3xl font-bold text-ivory-50">
                    ₹{pricing.finalTotal}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-sage-400 block">Effective Per Meal</span>
                  <span className="font-mono text-xs font-bold text-citrus-400">
                    ₹{pricing.effectivePricePerMeal}
                  </span>
                </div>
              </div>

              <button
                onClick={handleStartSubscription}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-citrus-500 hover:bg-citrus-600 text-white font-semibold text-sm transition-all shadow-warm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
