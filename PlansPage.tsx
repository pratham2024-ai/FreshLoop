import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, SlidersHorizontal, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { BASE_MEAL_PLANS, calculatePlanPricing } from '../data/plans';
import { fetchMealPlans } from '../services/mealPlans';
import { DietaryCategory, MealPlan } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { PlanCompareModal } from '../components/common/PlanCompareModal';
import { useCart } from '../context/CartContext';

export const PlansPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<DietaryCategory | 'all'>('all');
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [plans, setPlans] = useState<MealPlan[]>(BASE_MEAL_PLANS);
  const [dataSource, setDataSource] = useState<'database' | 'fallback_seed'>('fallback_seed');
  const [loading, setLoading] = useState(true);

  const { setPlanById } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    fetchMealPlans().then((res) => {
      if (!isMounted) return;
      setPlans(res.plans);
      setDataSource(res.source);
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPlans = selectedCategory === 'all'
    ? plans
    : plans.filter((p) => p.category === selectedCategory);

  const handleStartPlan = (planId: string) => {
    setPlanById(planId);
    navigate('/checkout');
  };

  const categories = [
    { id: 'all', label: 'All Subscription Plans' },
    { id: 'balanced', label: 'Balanced Daily' },
    { id: 'vegetarian', label: 'Vegetarian Fresh' },
    { id: 'high-protein', label: 'High Protein' },
    { id: 'weight-management', label: 'Calorie Mindful' },
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/5 text-forest-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-citrus-500" />
              <span>Curated Subscription Catalogue</span>
            </div>
            {dataSource === 'database' ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium font-mono">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Live Supabase Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-medium font-mono">
                Development Seed Data
              </span>
            )}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950 tracking-tight">
            Meal Plans Tailored To Your Life
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 mt-3 leading-relaxed">
            Every subscription is chef-cooked, blast-chilled, and delivered in our returnable zero-waste thermal totes. Select a plan below to preview menus, macronutrient ranges, and configuration options.
          </p>
        </div>

        {/* Filters and Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-forest-900/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as DietaryCategory | 'all')}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-forest-900 text-ivory-50 shadow-sm'
                    : 'bg-white hover:bg-ivory-100 text-charcoal-700 border border-forest-900/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCompareModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-ivory-200/70 hover:bg-ivory-200 text-xs font-semibold text-charcoal-800 transition-colors self-start sm:self-auto border border-forest-900/10"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-citrus-600" />
            <span>Compare Plans</span>
          </button>
        </div>

        {/* Empty state if filtered plans is empty */}
        {filteredPlans.length === 0 && !loading && (
          <div className="text-center py-16 bg-white rounded-3xl border border-forest-900/10 p-8 my-8 shadow-editorial">
            <HelpCircle className="w-10 h-10 text-charcoal-400 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-forest-900">
              No Meal Plans in this Category
            </h3>
            <p className="text-xs text-charcoal-600 mt-1">
              Please choose another dietary category or browse all available subscriptions.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-4 py-2 bg-forest-900 text-ivory-50 rounded-xl text-xs font-semibold hover:bg-forest-800 transition-colors"
            >
              View All Plans
            </button>
          </div>
        )}

        {/* Plans List Grid */}
        <div className="space-y-8">
          {filteredPlans.map((plan) => {
            const pricingPreview = calculatePlanPricing(
              plan.pricePerMeal,
              plan.defaultMealsPerDay,
              plan.defaultDaysPerWeek,
              plan.recommendedDurationWeeks
            );

            return (
              <div
                key={plan.id}
                className="bg-white rounded-3xl overflow-hidden border border-forest-900/10 shadow-editorial p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Plan Image */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/11] bg-ivory-200 shadow-sm">
                  <ImageWithFallback
                    src={plan.image}
                    fallbackSrc={plan.fallbackImage}
                    alt={plan.name}
                    className="w-full h-full object-cover"
                  />
                  {plan.badge && (
                    <span className="absolute top-3 left-3 bg-forest-900/90 text-ivory-50 text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                      {plan.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-white/95 text-forest-900 text-xs font-bold font-mono px-3 py-1 rounded-lg shadow-sm">
                    {plan.sampleCaloriesRange}
                  </span>
                </div>

                {/* Plan Copy & Sample Menu */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase font-mono tracking-wider font-semibold text-citrus-600">
                      {plan.category.replace('-', ' ')}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
                    {plan.name}
                  </h2>
                  <p className="text-xs text-charcoal-600 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="pt-2 space-y-1.5 text-xs text-charcoal-700">
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-citrus-100 text-citrus-700 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                        L
                      </span>
                      <p className="line-clamp-1">
                        <strong className="text-forest-900">Sample Lunch:</strong> {plan.sampleMenu.lunch}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-forest-100 text-forest-800 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                        D
                      </span>
                      <p className="line-clamp-1">
                        <strong className="text-forest-900">Sample Dinner:</strong> {plan.sampleMenu.dinner}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/plans/${plan.slug}`}
                      className="text-xs font-semibold text-citrus-600 hover:text-citrus-700 inline-flex items-center gap-1"
                    >
                      <span>Explore full nutritional breakdown & benefits</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Pricing & Subscription Trigger Box */}
                <div className="lg:col-span-3 bg-ivory-50 rounded-2xl p-6 border border-forest-900/10 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <span className="text-[11px] uppercase font-mono text-charcoal-400 font-semibold block">
                      Starting At
                    </span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-serif text-3xl font-bold text-forest-900">
                        ₹{plan.pricePerMeal}
                      </span>
                      <span className="text-xs text-charcoal-500">/ meal</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-forest-900/10 text-xs text-charcoal-600 space-y-1 font-mono">
                      <p>• {plan.defaultMealsPerDay} meals/day × {plan.defaultDaysPerWeek} days/wk</p>
                      <p>• {pricingPreview.totalMeals} meals / {plan.recommendedDurationWeeks}-wk cycle</p>
                      {pricingPreview.discountPercent > 0 && (
                        <p className="text-emerald-700 font-semibold">
                          • {pricingPreview.discountPercent}% auto-discount applied
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleStartPlan(plan.id)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-all shadow-sm"
                    >
                      <span>Configure This Plan</span>
                      <ArrowRight className="w-3.5 h-3.5 text-citrus-400" />
                    </button>
                    <Link
                      to={`/plans/${plan.slug}`}
                      className="w-full inline-flex items-center justify-center py-2 text-xs font-medium text-charcoal-600 hover:text-forest-900"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nutritional & Medical Disclaimer Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-forest-900/10 flex items-start gap-4">
          <HelpCircle className="w-5 h-5 text-citrus-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-charcoal-600 leading-relaxed space-y-1">
            <h4 className="font-bold text-forest-900 text-sm">Illustrative Nutrition Disclosure</h4>
            <p>
              Macronutrient breakdowns and calorie ranges shown above are estimates for illustrative purposes based on standardized test portions and culinary recipe calculations. Natural variation in seasonal produce and meats will occur. FreshLoop does not offer medical advice or prescription clinical diets.
            </p>
          </div>
        </div>
      </div>

      <PlanCompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
      />
    </div>
  );
};
