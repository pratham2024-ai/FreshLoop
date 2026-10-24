import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Leaf, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  Flame,
  ChefHat
} from 'lucide-react';
import { BASE_MEAL_PLANS } from '../data/plans';
import { WEEKLY_MENU_ITEMS, DAYS_CONFIG, DayOfWeek } from '../data/menu';
import { FAQ_DATA } from '../data/faq';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { MealFinderQuiz } from '../components/common/MealFinderQuiz';
import { PlanCompareModal } from '../components/common/PlanCompareModal';
import { useCart } from '../context/CartContext';

export const HomePage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('monday');
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { setPlanById } = useCart();
  const navigate = useNavigate();

  // Filter day's menu preview
  const dayMeals = WEEKLY_MENU_ITEMS.filter((item) => item.day.includes(selectedDay)).slice(0, 3);

  const handleSelectPlan = (planId: string) => {
    setPlanById(planId);
    navigate('/checkout');
  };

  return (
    <div className="bg-ivory-50 text-charcoal-900 overflow-hidden">
      {/* SECTION B: HERO — Editorial Asymmetric Composition */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-forest-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/5 text-forest-800 text-xs font-semibold border border-forest-900/10">
                <span className="w-2 h-2 rounded-full bg-citrus-500 animate-pulse" />
                <span>Chef-Prepared • Delivered Fresh • Zero Prep Stress</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-950 tracking-tight leading-[1.12]">
                Healthy eating made <span className="italic font-serif text-citrus-600 font-normal">effortless</span>, delicious, and consistent.
              </h1>

              <p className="text-base sm:text-lg text-charcoal-700 max-w-xl leading-relaxed">
                FreshLoop delivers chef-crafted, nutritionally calibrated meals daily to your home or office. Organic farm produce, clean cold-pressed oils, and returnable chilled totes.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/plans"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Explore Meal Plans</span>
                  <ArrowRight className="w-4 h-4 text-citrus-400" />
                </Link>

                <a
                  href="#meal-finder"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-ivory-100 text-charcoal-800 text-sm font-semibold border border-forest-900/15 transition-all shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-citrus-500" />
                  <span>Take Meal Finder Quiz</span>
                </a>
              </div>

              {/* Service Highlights Strip */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-forest-900/10 text-xs">
                <div>
                  <span className="font-serif text-lg font-bold text-forest-900 block">40+ Dishes</span>
                  <span className="text-charcoal-500">Rotating weekly menu</span>
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-forest-900 block">3 Mins</span>
                  <span className="text-charcoal-500">Fast reheat to plate</span>
                </div>
                <div>
                  <span className="font-serif text-lg font-bold text-forest-900 block">Zero Lock-in</span>
                  <span className="text-charcoal-500">Pause or skip anytime</span>
                </div>
              </div>
            </div>

            {/* Right Editorial Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Featured Dish Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-ivory-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80"
                    alt="Mediterranean Quinoa and Zaatar Chicken Bowl"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-ivory-50">
                    <span className="badge-tag bg-citrus-500 text-white mb-2">
                      Today's Seasonal Feature
                    </span>
                    <h3 className="font-serif text-xl font-bold">Za’atar Grilled Chicken & Tri-Color Quinoa</h3>
                    <p className="text-xs text-sage-200 mt-1">44g Protein • Organic Greens • 3 mins reheat</p>
                  </div>
                </div>

                {/* Overlapping Floating Badge 1 (Top Right) */}
                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lift border border-forest-900/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-charcoal-400 font-semibold block">Source Guarantee</span>
                    <span className="text-xs font-bold text-forest-900">100% Non-GMO & Organic</span>
                  </div>
                </div>

                {/* Overlapping Floating Card 2 (Bottom Left) */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lift border border-forest-900/10 hidden sm:flex items-center gap-3 max-w-[240px]">
                  <div className="w-9 h-9 rounded-full bg-citrus-100 text-citrus-700 flex items-center justify-center font-bold flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-forest-900 block">Morning Chilled Delivery</span>
                    <span className="text-[11px] text-charcoal-500">6:30 AM – 8:30 AM slot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: MEAL PLAN DISCOVERY */}
      <section className="py-16 sm:py-24 bg-white border-b border-forest-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
                Tailored Nutrition
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">
                Crafted for your lifestyle.
              </h2>
              <p className="text-sm text-charcoal-600 mt-2 max-w-xl">
                Choose the subscription tier that aligns with your fitness, dietary, and schedule preferences.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCompareModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ivory-100 hover:bg-ivory-200 text-xs font-semibold text-charcoal-800 transition-colors border border-forest-900/10"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-citrus-600" />
                <span>Compare All 5 Plans</span>
              </button>
              <Link
                to="/plans"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-citrus-600 transition-colors"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Meal Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BASE_MEAL_PLANS.slice(0, 3).map((plan) => (
              <div
                key={plan.id}
                className="editorial-card rounded-3xl overflow-hidden flex flex-col group"
              >
                {/* Plan Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-ivory-200">
                  <ImageWithFallback
                    src={plan.image}
                    fallbackSrc={plan.fallbackImage}
                    alt={plan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {plan.badge && (
                    <span className="absolute top-4 left-4 bg-forest-900/90 text-ivory-50 text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                      {plan.badge}
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 bg-white/95 text-forest-900 font-mono text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                    ₹{plan.pricePerMeal} <span className="text-[10px] text-charcoal-500 font-normal">/ meal</span>
                  </span>
                </div>

                {/* Plan Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-forest-900">{plan.name}</h3>
                    <p className="text-xs text-charcoal-600 mt-2 line-clamp-2 leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Dietary Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {plan.dietaryTags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] font-medium bg-ivory-100 text-charcoal-700 px-2.5 py-1 rounded-full border border-forest-900/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sample Dish Row */}
                  <div className="pt-4 border-t border-forest-900/10">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-400 block mb-1">
                      Sample Dish
                    </span>
                    <p className="text-xs font-medium text-forest-800 line-clamp-1">
                      {plan.sampleMenu.lunch}
                    </p>
                  </div>

                  {/* Action Row */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <Link
                      to={`/plans/${plan.slug}`}
                      className="text-xs font-semibold text-charcoal-700 hover:text-forest-900 underline underline-offset-4"
                    >
                      Plan Details
                    </Link>
                    <button
                      onClick={() => handleSelectPlan(plan.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-colors"
                    >
                      <span>Select Plan</span>
                      <ArrowRight className="w-3 h-3 text-citrus-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: INTERACTIVE MEAL FINDER QUIZ */}
      <section id="meal-finder" className="py-16 sm:py-24 bg-ivory-100/50 border-b border-forest-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
              Intuitive Recommendation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">
              Not sure which plan fits best?
            </h2>
            <p className="text-sm text-charcoal-600 mt-2 max-w-md mx-auto">
              Answer 3 quick questions about your diet, daily schedule, and wellness goals.
            </p>
          </div>

          <MealFinderQuiz />
        </div>
      </section>

      {/* SECTION E: ROTATING WEEKLY MENU PREVIEW */}
      <section className="py-16 sm:py-24 bg-white border-b border-forest-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
                What’s Cooking This Week
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">
                Explore our rotating daily menu.
              </h2>
              <p className="text-sm text-charcoal-600 mt-2 max-w-xl">
                Every dish is cooked from scratch each morning. Select a day to preview sample plates.
              </p>
            </div>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-colors self-start md:self-auto"
            >
              <span>View Full Weekly Menu</span>
              <ArrowRight className="w-3.5 h-3.5 text-citrus-400" />
            </Link>
          </div>

          {/* Day of Week Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {DAYS_CONFIG.map((day) => (
              <button
                key={day.key}
                onClick={() => setSelectedDay(day.key as DayOfWeek)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedDay === day.key
                    ? 'bg-forest-900 text-ivory-50 shadow-sm'
                    : 'bg-ivory-100 hover:bg-ivory-200 text-charcoal-700'
                }`}
              >
                <span className="font-medium mr-1.5">{day.label}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">({day.fullLabel})</span>
              </button>
            ))}
          </div>

          {/* Day's Featured Dishes Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dayMeals.map((dish) => (
              <div
                key={dish.id}
                className="editorial-card rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/11] overflow-hidden bg-ivory-200">
                    <ImageWithFallback
                      src={dish.image}
                      fallbackSrc={dish.fallbackImage}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-forest-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                      {dish.mealTime}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-serif text-lg font-bold text-forest-900 leading-snug">
                      {dish.name}
                    </h4>
                    <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>

                    <div className="pt-3">
                      <span className="text-[10px] font-mono text-charcoal-400 uppercase tracking-wider block mb-1">
                        Ingredients Highlight
                      </span>
                      <p className="text-xs text-charcoal-700 line-clamp-1">
                        {dish.ingredients.slice(0, 4).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-forest-900/5 mt-4 flex items-center justify-between text-[11px] text-charcoal-500 font-mono">
                  <span>~{dish.nutrition.calories} kcal</span>
                  <span>{dish.nutrition.protein}g protein</span>
                  <span className="text-citrus-600 font-semibold">{dish.prepTimeMinutes}m prep</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION F: HOW FRESHLOOP WORKS — Visual 4-Step Sequence */}
      <section className="py-16 sm:py-24 bg-forest-900 text-ivory-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-mono tracking-wider text-citrus-400 font-semibold block mb-2">
              Simple Four-Step Cycle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-ivory-50">
              How the FreshLoop ritual works.
            </h2>
            <p className="text-sm text-sage-300 mt-3 leading-relaxed">
              We eliminated the grocery runs, prep fatigue, and daily takeout remorse with a disciplined culinary delivery system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Your Plan',
                desc: 'Select your dietary preferences, meal cadence (1, 2, or 3 plates daily), and preferred delivery days.'
              },
              {
                step: '02',
                title: 'Chef Cooked Daily',
                desc: 'Our culinary kitchen crafts every dish before dawn using organic produce, cold-pressed oils, and scratch sauces.'
              },
              {
                step: '03',
                title: 'Chilled Eco-Transit',
                desc: 'Delivered in insulated returnable tote bags with ice packs to lock in nutrition without chemical preservatives.'
              },
              {
                step: '04',
                title: 'Heat & Savor',
                desc: 'Heat for 90 to 180 seconds or enjoy fresh salads chilled. Leave the return tote out for next-day collection.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-forest-950/60 border border-forest-800/80 relative flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-bold text-citrus-500/80 block mb-3">
                    {item.step}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-ivory-50 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-sage-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-forest-900/60 flex items-center gap-1.5 text-[11px] text-sage-400">
                  <Check className="w-3.5 h-3.5 text-citrus-400" />
                  <span>Verified Daily Standard</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-xs font-semibold text-citrus-400 hover:text-citrus-300 transition-colors underline underline-offset-4"
            >
              <span>Learn more about our kitchen operations & packaging loop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION G: SUBSCRIPTION VALUE & CONVENIENCE */}
      <section className="py-16 sm:py-24 bg-white border-b border-forest-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block">
                The Practical Difference
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 leading-tight">
                Designed to fit real lives, demanding schedules, and discerning palates.
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                Most healthy diets fail because meal preparation requires hours of repetitive grocery shopping, chopping, cooking, and container cleanup. FreshLoop restores your personal time while keeping your nutrition uncompromisingly high.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: 'Reclaim 12+ Hours Every Week',
                    desc: 'No meal planning, supermarket queues, recipe hunting, or dishwashing cycles.'
                  },
                  {
                    title: 'Complete Flexibility Without Penalty',
                    desc: 'Traveling or dining out? Pause deliveries or change your delivery address with a single tap in your dashboard.'
                  },
                  {
                    title: 'Zero Single-Use Plastic Waste',
                    desc: 'Compostable sugarcane trays encased in reusable thermal totes that we retrieve during your next delivery.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-forest-900">{item.title}</h4>
                      <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-ivory-100 rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial">
                <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-semibold block mb-4">
                  Weekly Practical Comparison
                </span>
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white border border-forest-900/10">
                    <span className="font-bold text-forest-900 block mb-1">Traditional Cooking at Home</span>
                    <p className="text-charcoal-600">
                      Average 14 hours/week spent on shopping, chopping, cooking, and cleaning. High produce spoilage and repetitive recipes.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-forest-900/10">
                    <span className="font-bold text-forest-900 block mb-1">Standard Restaurant Delivery</span>
                    <p className="text-charcoal-600">
                      High sodium, hidden sugars, excessive saturated fats, and unpredictable delivery delays with mounting plastic containers.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-forest-900 text-ivory-50 border border-forest-800">
                    <span className="font-bold text-citrus-400 block mb-1">The FreshLoop Way</span>
                    <p className="text-sage-200">
                      Chef-cooked, clean nutrition delivered at your door before 8:30 AM. Zero prep, predictable macro balance, and compostable packaging.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: FOOD EDITORIAL & SOURCING ETHICS */}
      <section className="py-16 sm:py-24 bg-ivory-50 border-b border-forest-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-square bg-ivory-200 shadow-sm">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                    alt="Fresh organic market greens"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-ivory-200 shadow-sm mt-6">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
                    alt="Artisan grain and seed bowl"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block">
                Food Philosophy & Sourcing
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">
                Ingredients picked for taste, vitality, and soil integrity.
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed">
                We believe that food cooked with integrity needs no artificial enhancers. Our pantry features cold-pressed virgin oils, sprouted ancient grains, unbleached flours, and herbs harvested within 24 hours of culinary preparation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-forest-900/10">
                  <h4 className="font-serif font-bold text-forest-900 text-sm">Cold-Pressed Oils Only</h4>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Zero palm oil, zero trans fats, and zero commercial deep-fryer blends. Strictly cold-pressed mustard, coconut, and olive oils.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-forest-900/10">
                  <h4 className="font-serif font-bold text-forest-900 text-sm">No Refined Cane Sugars</h4>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Natural sweeteners only when needed: raw dates, clover honey, and pure Alphonso fruit purees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION I: EXPANDABLE ACCORDION FAQ */}
      <section className="py-16 sm:py-24 bg-white border-b border-forest-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-charcoal-600 mt-2">
              Everything you need to know about plans, delivery, and ingredients.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.slice(0, 5).map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-forest-900/10 overflow-hidden transition-all bg-ivory-50/50"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-forest-900 hover:text-citrus-600 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-citrus-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-charcoal-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-charcoal-700 leading-relaxed border-t border-forest-900/5 pt-3 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 hover:text-citrus-600 transition-colors underline underline-offset-4"
            >
              <span>View all questions and policies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION J: PRE-FOOTER SUBSCRIPTION BANNER */}
      <section className="py-16 bg-forest-900 text-ivory-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Ready to reclaim your nutrition?
          </h2>
          <p className="text-sm sm:text-base text-sage-200 max-w-xl mx-auto leading-relaxed">
            Choose your meals today. FreshLoop subscribers save over 40 hours each month while fueling their bodies with organic chef craft.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/checkout"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-citrus-500 hover:bg-citrus-600 text-white font-semibold text-sm shadow-warm transition-all"
            >
              <span>Build Your First Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-forest-800 hover:bg-forest-700 text-ivory-100 font-semibold text-sm transition-all"
            >
              <span>Preview Menu</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Compare Modal */}
      <PlanCompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
      />
    </div>
  );
};
