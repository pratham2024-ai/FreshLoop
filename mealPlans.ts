import { supabase } from '../lib/supabase';
import { MealPlan } from '../types';
import { BASE_MEAL_PLANS } from '../data/plans';

export interface FetchMealPlansResult {
  plans: MealPlan[];
  source: 'database' | 'fallback_seed';
  error?: string;
}

export async function fetchMealPlans(): Promise<FetchMealPlansResult> {
  try {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .eq('is_active', true)
      .order('price_per_meal_paise', { ascending: true });

    if (error) {
      // Table may not be migrated yet or connection issue
      return {
        plans: BASE_MEAL_PLANS,
        source: 'fallback_seed',
        error: error.message
      };
    }

    if (!data || data.length === 0) {
      return {
        plans: BASE_MEAL_PLANS,
        source: 'fallback_seed',
        error: 'No active meal plans found in database. Displaying local development seed data.'
      };
    }

    const mappedPlans: MealPlan[] = data.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      tagline: row.tagline,
      description: row.description,
      badge: row.badge || undefined,
      category: row.category,
      pricePerMeal: Math.round(row.price_per_meal_paise / 100),
      defaultMealsPerDay: row.default_meals_per_day,
      defaultDaysPerWeek: row.default_days_per_week,
      recommendedDurationWeeks: row.recommended_duration_weeks,
      image: row.image_url,
      fallbackImage: row.fallback_image_url || row.image_url,
      dietaryTags: Array.isArray(row.dietary_tags) ? row.dietary_tags : [],
      targetAudience: row.target_audience || '',
      benefits: Array.isArray(row.benefits) ? row.benefits : [],
      sampleMenu: row.sample_menu || { breakfast: '', lunch: '', dinner: '' },
      sampleCaloriesRange: row.sample_calories_range || '',
      customizationAllowed: row.customization_allowed ?? true
    }));

    return {
      plans: mappedPlans,
      source: 'database'
    };
  } catch (err: any) {
    return {
      plans: BASE_MEAL_PLANS,
      source: 'fallback_seed',
      error: err?.message || 'Failed to fetch meal plans from Supabase.'
    };
  }
}
