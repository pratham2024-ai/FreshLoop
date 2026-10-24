import { MealPlan } from '../types';

export const BASE_MEAL_PLANS: MealPlan[] = [
  {
    id: 'plan-balanced',
    slug: 'balanced-daily-meals',
    name: 'Balanced Daily Meals',
    tagline: 'Wholesome macro-nutrient equilibrium for sustained everyday vitality.',
    description: 'Our flagship subscription crafted by culinary chefs and nutritionist partners. Featuring organic seasonal vegetables, lean clean proteins, cold-pressed dressings, and slow-burning ancient grains designed to avoid afternoon energy crashes.',
    badge: 'Most Popular',
    category: 'balanced',
    pricePerMeal: 285,
    defaultMealsPerDay: 2,
    defaultDaysPerWeek: 5,
    recommendedDurationWeeks: 4,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Organic Produce', 'Chef Prepared', 'No Preservatives', 'Whole Grains'],
    targetAudience: 'Professionals and families seeking reliable, clean nutrition without daily meal planning or cooking stress.',
    sampleCaloriesRange: '520 – 640 kcal / meal',
    customizationAllowed: true,
    benefits: [
      {
        title: 'Complete Macro Harmony',
        description: 'Precise ratio of 40% complex carbs, 30% clean proteins, and 30% healthy monounsaturated fats.'
      },
      {
        title: 'Zero Afternoon Slump',
        description: 'Low-glycemic whole ingredients maintain stable blood glucose levels throughout your workday.'
      },
      {
        title: 'Culinary Variety',
        description: 'Over 40 rotating recipes every month so your palate never experiences meal fatigue.'
      },
      {
        title: 'Eco Insulated Chilled Tiffin',
        description: 'Delivered in returnable compostable containers with ice-cell lining to keep meals pristine.'
      }
    ],
    sampleMenu: {
      breakfast: 'Avocado Tartine with Sprouted Seed Crumble & Microgreens',
      lunch: 'Herb-Roasted Salmon or Paneer Bowl with Tri-Color Quinoa & Tahini Green Goddess',
      dinner: 'Smoked Paprika Chicken Breast with Charred Broccolini & Sweet Potato Mash'
    }
  },
  {
    id: 'plan-vegetarian',
    slug: 'vegetarian-fresh-plan',
    name: 'Vegetarian Fresh Plan',
    tagline: 'Vibrant plant-forward creations highlighting heirloom produce & artisanal dairy.',
    description: 'A celebration of farm-to-table vegetarian gastronomy. Packed with locally sourced heirloom greens, farmstead paneer, legumes, tempeh, seeds, and aromatic herb reductions.',
    badge: 'Chef Favorite',
    category: 'vegetarian',
    pricePerMeal: 265,
    defaultMealsPerDay: 2,
    defaultDaysPerWeek: 5,
    recommendedDurationWeeks: 4,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['100% Lacto-Veg', 'High Fiber', 'Seasonal Greens', 'Farm-to-Box'],
    targetAudience: 'Vegetarians who crave restaurant-caliber variety, complex flavors, and rich fiber density.',
    sampleCaloriesRange: '480 – 590 kcal / meal',
    customizationAllowed: true,
    benefits: [
      {
        title: 'Heirloom Farm Partnerships',
        description: 'Direct relationships with certified sustainable regional farms ensuring produce picked at peak ripeness.'
      },
      {
        title: 'Complete Plant Protein Stacks',
        description: 'Smart amino acid pairing combining lentils, ancient grains, nuts, and dairy for optimal bioavailability.'
      },
      {
        title: 'Naturally Digestive-Friendly',
        description: 'Rich in soluble fiber, prebiotic roots, and fermented condiments to support digestive microbiome health.'
      },
      {
        title: 'Pure Clean Oils',
        description: 'Cooked strictly in cold-pressed mustard, coconut, or extra-virgin olive oil with zero palm or hydrogenated fats.'
      }
    ],
    sampleMenu: {
      breakfast: 'Golden Turmeric Overnight Oats with Chia, Roasted Pistachios & Wild Fig',
      lunch: 'Tuscan White Bean & Kale Casserole with Sourdough Garlic Crostini',
      dinner: 'Charred Malai Paneer Tikka Skewer with Minted Edamame Brown Basmati'
    }
  },
  {
    id: 'plan-high-protein',
    slug: 'high-protein-plan',
    name: 'High Protein Athletic Plan',
    tagline: 'Lean muscle recovery and endurance fuel with 38g+ protein per plate.',
    description: 'Engineered for athletes, fitness enthusiasts, and active bodies. High-yield protein from pasture-raised chicken breast, fresh salmon fillets, egg whites, whey-infused marinades, or dense edamame & tofu for plant athletes.',
    badge: 'Athletic Grade',
    category: 'high-protein',
    pricePerMeal: 335,
    defaultMealsPerDay: 2,
    defaultDaysPerWeek: 6,
    recommendedDurationWeeks: 4,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['38g–48g Protein', 'Lean Cuts', 'Amino Dense', 'Low Refined Carbs'],
    targetAudience: 'Gym-goers, marathoners, and active professionals looking to hit strict daily macronutrient targets effortlessly.',
    sampleCaloriesRange: '580 – 720 kcal / meal',
    customizationAllowed: true,
    benefits: [
      {
        title: 'Verified Macro Benchmarks',
        description: 'Every plate contains a certified minimum of 38g bioavailability-optimized protein.'
      },
      {
        title: 'No Greasy Fillers',
        description: 'Steam-grill and sous-vide cooking techniques maintain moisture without heavy saturated fats.'
      },
      {
        title: 'Electrolyte & Mineral Support',
        description: 'Meals include dark leafy greens and seeds rich in potassium, magnesium, and zinc for rapid muscular recovery.'
      },
      {
        title: 'Post-Workout Timing Friendly',
        description: 'Chilled ready-to-heat packaging takes only 90 seconds in microwave or 3 minutes in skillet.'
      }
    ],
    sampleMenu: {
      breakfast: 'Egg White Scramble with Crumbled Turkey or Spiced Cottage Cheese & Smashed Sweet Yam',
      lunch: 'Sous-Vide Rosemary Lemon Chicken Breast with Steamed French Beans & Wild Rice',
      dinner: 'Pan-Seared Mustard Salmon Fillet with Asparagus Spears & Cauliflower Mash'
    }
  },
  {
    id: 'plan-weight-management',
    slug: 'weight-management-plan',
    name: 'Weight Management & Lean Plan',
    tagline: 'Calorie-conscious gourmet dining with high satiety and nutrient density.',
    description: 'Sustainable, satisfying nutrition designed to support calorie-deficit lifestyles without feeling deprived. Rich in hydration-heavy vegetables, lean protein sources, and complex fibers that keep you full for hours.',
    badge: 'Calorie Mindful',
    category: 'weight-management',
    pricePerMeal: 295,
    defaultMealsPerDay: 2,
    defaultDaysPerWeek: 5,
    recommendedDurationWeeks: 4,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Under 450 kcal', 'Low Glycemic', 'High Satiety', 'Portion Controlled'],
    targetAudience: 'Individuals aiming for steady, healthy fat loss without the misery of bland boiled chicken and plain lettuce.',
    sampleCaloriesRange: '380 – 460 kcal / meal',
    customizationAllowed: true,
    benefits: [
      {
        title: 'Satiety Science',
        description: 'Strategic balance of resistant starches, proteins, and fibrous vegetables suppresses hunger signals naturally.'
      },
      {
        title: 'Zero Hidden Sugars',
        description: 'All sauces and vinaigrettes are prepared in-house without refined cane sugar, corn syrup, or thickeners.'
      },
      {
        title: 'Exact Portion Calibration',
        description: 'Weigh-scale portioning ensures you hit your caloric deficit without calorie-counting anxiety.'
      },
      {
        title: 'Metabolic Hydration',
        description: 'Includes infused herbal broth and electrolyte-friendly mineral accompaniments.'
      }
    ],
    sampleMenu: {
      breakfast: 'Chia-Berry Parfait with Crushed Flax, Coconut Greek Yogurt & Cinnamon Dust',
      lunch: 'Grilled Zucchini & Halloumi Warm Salad with Citrus Herb Emulsion & Roasted Pepitas',
      dinner: 'Ginger Sesame Glazed Tofu or Lean Chicken over Shaved Cabbage & Bok Choy Slaw'
    }
  },
  {
    id: 'plan-starter',
    slug: 'starter-plan',
    name: 'FreshLoop Discovery Starter',
    tagline: 'The flexible trial plan to test our culinary craft and daily delivery cadence.',
    description: 'A 5-day exploratory subscription with zero long-term commitment. Experience our top-rated lunch and dinner dishes across categories to discover your preferred culinary rhythm.',
    badge: 'Trial Friendly',
    category: 'balanced',
    pricePerMeal: 275,
    defaultMealsPerDay: 1,
    defaultDaysPerWeek: 5,
    recommendedDurationWeeks: 1,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    dietaryTags: ['Zero Commitment', 'Curated Bestsellers', 'Flexible Pauses', 'Free Delivery'],
    targetAudience: 'First-time meal subscribers who want to taste chef quality before setting up a monthly plan.',
    sampleCaloriesRange: '500 – 620 kcal / meal',
    customizationAllowed: false,
    benefits: [
      {
        title: 'Bestseller Chef Selection',
        description: 'Features the top 5 highest-rated lunch dishes from our rotating weekly seasonal catalogue.'
      },
      {
        title: 'No Auto-Renewal Lock-in',
        description: 'Automatic transition to a regular plan only if you explicitly choose to continue.'
      },
      {
        title: 'Flexible Delivery Window',
        description: 'Choose your preferred 2-hour morning or midday delivery slot to fit your workplace schedule.'
      },
      {
        title: 'Direct Feedback Line',
        description: 'Personal link to rate each dish and shape your future menu preferences.'
      }
    ],
    sampleMenu: {
      breakfast: 'Optional Cold-Pressed Green Detox Juice add-on',
      lunch: 'Mediterranean Grain Bowl with Roasted Bell Peppers, Falafel, and Hummus Swirl',
      dinner: 'Slow-Cooked Lentil Dahl or Chicken Curry with Brown Rice & Cucumber Raita'
    }
  }
];

// Price calculation helper single source of truth
export function calculatePlanPricing(
  basePricePerMeal: number,
  mealsPerDay: number,
  daysPerWeek: number,
  durationWeeks: number
) {
  const totalMeals = mealsPerDay * daysPerWeek * durationWeeks;
  const subtotal = totalMeals * basePricePerMeal;
  
  // Duration-based progressive discount
  let durationDiscountPercent = 0;
  if (durationWeeks === 2) durationDiscountPercent = 0.05; // 5% off
  if (durationWeeks >= 4) durationDiscountPercent = 0.10; // 10% off

  // High volume meal discount (if 2+ meals/day and 6+ days/week)
  let volumeDiscountPercent = 0;
  if (mealsPerDay >= 2 && daysPerWeek >= 6) {
    volumeDiscountPercent = 0.05; // additional 5% off
  }

  const totalDiscountPercent = durationDiscountPercent + volumeDiscountPercent;
  const discountAmount = Math.round(subtotal * totalDiscountPercent);
  const discountedSubtotal = subtotal - discountAmount;
  
  // Sample tax (5% GST for prepared food)
  const tax = Math.round(discountedSubtotal * 0.05);
  
  // Free delivery for orders above ₹2000 or duration >= 2 weeks
  const deliveryFee = (discountedSubtotal >= 2000 || durationWeeks >= 2) ? 0 : 150;
  
  const finalTotal = discountedSubtotal + tax + deliveryFee;

  return {
    totalMeals,
    basePricePerMeal,
    subtotal,
    discountPercent: Math.round(totalDiscountPercent * 100),
    discountAmount,
    tax,
    deliveryFee,
    finalTotal,
    effectivePricePerMeal: Math.round(finalTotal / totalMeals)
  };
}
