import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  RotateCcw, 
  Clock, 
  Flame, 
  Info, 
  ArrowRight, 
  Check, 
  Filter, 
  ChefHat,
  AlertCircle
} from 'lucide-react';
import { 
  WEEKLY_MENU_ITEMS, 
  DAYS_CONFIG, 
  MEAL_TIMES_CONFIG, 
  DIETARY_FILTERS, 
  DayOfWeek, 
  MealTime 
} from '../data/menu';
import { DietaryCategory, MenuItem } from '../types';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { EmptyState } from '../components/common/EmptyState';

export const WeeklyMenuPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('monday');
  const [selectedMealTime, setSelectedMealTime] = useState<MealTime | 'all'>('all');
  const [selectedDiet, setSelectedDiet] = useState<DietaryCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDish, setActiveModalDish] = useState<MenuItem | null>(null);

  // Filtered menu items
  const filteredDishes = useMemo(() => {
    return WEEKLY_MENU_ITEMS.filter((dish) => {
      // Day match
      if (!dish.day.includes(selectedDay)) return false;

      // Meal time match
      if (selectedMealTime !== 'all' && dish.mealTime !== selectedMealTime) return false;

      // Dietary tag match
      if (selectedDiet !== 'all' && !dish.category.includes(selectedDiet)) return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        const matchesIngredients = dish.ingredients.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIngredients) return false;
      }

      return true;
    });
  }, [selectedDay, selectedMealTime, selectedDiet, searchQuery]);

  const handleResetFilters = () => {
    setSelectedMealTime('all');
    setSelectedDiet('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
            Seasonal Chef Kitchen
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950 tracking-tight">
            The Rotating Weekly Menu
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 mt-3 leading-relaxed">
            Every dish is cooked fresh daily in our HACCP central kitchens. Browse today's plates, filter by your dietary needs, and inspect full ingredient and allergen disclosures.
          </p>
        </div>

        {/* Day of Week Selector Navigation */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-forest-900/10 shadow-editorial mb-8">
          <div className="flex items-center justify-between gap-4 mb-3 pb-3 border-b border-forest-900/5">
            <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-semibold">
              Select Day of Week
            </span>
            <span className="text-xs text-charcoal-500 font-medium hidden sm:block">
              Menus change daily to prevent palate fatigue
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {DAYS_CONFIG.map((day) => (
              <button
                key={day.key}
                onClick={() => setSelectedDay(day.key as DayOfWeek)}
                className={`py-3 px-2 sm:px-4 rounded-2xl text-center transition-all ${
                  selectedDay === day.key
                    ? 'bg-forest-900 text-ivory-50 shadow-md ring-2 ring-forest-800'
                    : 'bg-ivory-100 hover:bg-ivory-200 text-charcoal-700'
                }`}
              >
                <span className="block text-xs sm:text-sm font-bold uppercase">{day.label}</span>
                <span className="block text-[10px] opacity-75 mt-0.5 truncate hidden md:block">
                  {day.fullLabel}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Multifaceted Filters Bar */}
        <div className="bg-white rounded-3xl p-6 border border-forest-900/10 shadow-editorial mb-10 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, salmon, paneer, quinoa, oats..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-ivory-50 border border-forest-900/10 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-citrus-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Meal Time Filters */}
            <div className="md:col-span-7 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {MEAL_TIMES_CONFIG.map((mt) => (
                <button
                  key={mt.key}
                  onClick={() => setSelectedMealTime(mt.key as MealTime | 'all')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedMealTime === mt.key
                      ? 'bg-citrus-500 text-white shadow-warm'
                      : 'bg-ivory-100 hover:bg-ivory-200 text-charcoal-700'
                  }`}
                >
                  {mt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Tags Pill Filters */}
          <div className="pt-4 border-t border-forest-900/10 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase text-charcoal-400 font-semibold mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-citrus-600" />
              <span>Diet:</span>
            </span>
            {DIETARY_FILTERS.map((df) => (
              <button
                key={df.id}
                onClick={() => setSelectedDiet(df.id as DietaryCategory | 'all')}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                  selectedDiet === df.id
                    ? 'bg-forest-900 text-ivory-50'
                    : 'bg-ivory-50 hover:bg-ivory-100 text-charcoal-700 border border-forest-900/10'
                }`}
              >
                {df.label}
              </button>
            ))}

            {(selectedMealTime !== 'all' || selectedDiet !== 'all' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-citrus-600 hover:text-citrus-700"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter & Illustrative Macro Disclaimer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-xs text-charcoal-600">
          <p>
            Showing <strong className="text-forest-900">{filteredDishes.length} dishes</strong> for{' '}
            <strong className="capitalize text-forest-900">{selectedDay}</strong>
          </p>
          <span className="italic text-[11px] text-charcoal-400">
            *All calorie and macronutrient figures are illustrative chef benchmarks.
          </span>
        </div>

        {/* Menu Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="editorial-card rounded-3xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-ivory-200">
                    <ImageWithFallback
                      src={dish.image}
                      fallbackSrc={dish.fallbackImage}
                      alt={dish.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-forest-900/90 text-ivory-50 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                      {dish.mealTime}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/95 text-forest-900 text-xs font-mono font-bold px-2.5 py-1 rounded-lg shadow-sm">
                      ~{dish.nutrition.calories} kcal
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-forest-900 leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>

                    {/* Ingredients summary */}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-charcoal-400 uppercase tracking-wider block mb-1">
                        Key Ingredients
                      </span>
                      <p className="text-xs text-charcoal-700 line-clamp-2 leading-relaxed">
                        {dish.ingredients.join(' • ')}
                      </p>
                    </div>

                    {/* Allergens & Dietary badges */}
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {dish.allergens.length > 0 ? (
                        dish.allergens.map((alg, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded"
                          >
                            Contains: {alg}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2 py-0.5 rounded">
                          No major allergens
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer with Macros & Quick Detail Modal Trigger */}
                <div className="p-6 pt-0">
                  <div className="p-3 bg-ivory-100/70 rounded-xl border border-forest-900/5 grid grid-cols-4 gap-2 text-center text-[10px] font-mono text-charcoal-600 mb-4">
                    <div>
                      <span className="text-charcoal-400 block">Protein</span>
                      <strong className="text-forest-900 text-xs">{dish.nutrition.protein}g</strong>
                    </div>
                    <div>
                      <span className="text-charcoal-400 block">Carbs</span>
                      <strong className="text-forest-900 text-xs">{dish.nutrition.carbs}g</strong>
                    </div>
                    <div>
                      <span className="text-charcoal-400 block">Fat</span>
                      <strong className="text-forest-900 text-xs">{dish.nutrition.fat}g</strong>
                    </div>
                    <div>
                      <span className="text-charcoal-400 block">Fiber</span>
                      <strong className="text-forest-900 text-xs">{dish.nutrition.fiber}g</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="text-charcoal-500 font-mono text-[11px] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-citrus-500" />
                      <span>{dish.prepTimeMinutes}m prep</span>
                    </span>

                    <button
                      onClick={() => setActiveModalDish(dish)}
                      className="font-semibold text-citrus-600 hover:text-citrus-700 underline underline-offset-4"
                    >
                      Chef Details & Notes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Matching Dishes for Selected Filter"
            description="We didn't find dishes matching this day and category combination. Reset filters to see our full menu."
            onReset={handleResetFilters}
          />
        )}

        {/* Pre-Subscription Floating Banner */}
        <div className="mt-16 bg-forest-900 text-ivory-50 rounded-3xl p-8 sm:p-10 border border-forest-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold">Love what you see?</h3>
            <p className="text-xs sm:text-sm text-sage-200">
              Pick your subscription plan today and have these seasonal dishes delivered daily to your door.
            </p>
          </div>
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-citrus-500 hover:bg-citrus-600 text-white font-semibold text-xs sm:text-sm transition-all shadow-warm whitespace-nowrap"
          >
            <span>Start Your Subscription</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Individual Dish Modal */}
      {activeModalDish && (
        <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-forest-900/10">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-ivory-200">
              <ImageWithFallback
                src={activeModalDish.image}
                fallbackSrc={activeModalDish.fallbackImage}
                alt={activeModalDish.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <span className="badge-tag bg-forest-900 text-ivory-50">
                {activeModalDish.mealTime}
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest-900">
                {activeModalDish.name}
              </h3>
              <p className="text-xs text-charcoal-700 leading-relaxed">
                {activeModalDish.description}
              </p>

              {activeModalDish.chefNote && (
                <div className="p-4 rounded-xl bg-ivory-100 border border-forest-900/10 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-forest-900 mb-1">
                    <ChefHat className="w-4 h-4 text-citrus-500" />
                    <span>Chef's Reheating Guidance</span>
                  </div>
                  <p className="text-charcoal-600 leading-relaxed">{activeModalDish.chefNote}</p>
                </div>
              )}

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-semibold block mb-1">
                  Full Ingredient Breakdown
                </span>
                <p className="text-xs text-charcoal-700 leading-relaxed">
                  {activeModalDish.ingredients.join(', ')}
                </p>
              </div>

              <div className="pt-4 border-t border-forest-900/10 flex items-center justify-between">
                <span className="text-xs font-mono text-charcoal-500">
                  {activeModalDish.nutrition.calories} kcal • {activeModalDish.nutrition.protein}g protein
                </span>
                <button
                  onClick={() => setActiveModalDish(null)}
                  className="px-5 py-2 rounded-full bg-forest-900 text-ivory-50 text-xs font-semibold hover:bg-forest-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
