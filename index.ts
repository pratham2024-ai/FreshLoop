export type DietaryCategory = 
  | 'all' 
  | 'vegetarian' 
  | 'high-protein' 
  | 'balanced' 
  | 'weight-management' 
  | 'vegan' 
  | 'gluten-free' 
  | 'keto-friendly';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
  fiber: number;   // in grams
  isIllustrative: true;
}

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: DietaryCategory[];
  mealTime: MealTime;
  day: DayOfWeek[];
  image: string;
  fallbackImage: string;
  ingredients: string[];
  allergens: string[];
  nutrition: NutritionInfo;
  chefNote?: string;
  prepTimeMinutes: number; // e.g. 3 mins reheat or ready-to-eat
}

export interface PlanBenefit {
  title: string;
  description: string;
}

export interface MealPlan {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  category: DietaryCategory;
  pricePerMeal: number; // INR or base currency
  defaultMealsPerDay: number;
  defaultDaysPerWeek: number;
  recommendedDurationWeeks: number;
  image: string;
  fallbackImage: string;
  dietaryTags: string[];
  targetAudience: string;
  benefits: PlanBenefit[];
  sampleMenu: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  sampleCaloriesRange: string;
  customizationAllowed: boolean;
}

export interface SubscriptionConfig {
  planId: string;
  mealsPerDay: number;   // e.g. 1, 2, or 3
  daysPerWeek: number;   // e.g. 5 or 6 or 7
  durationWeeks: number; // 1 (weekly), 2 (bi-weekly), 4 (monthly)
  dietaryPreference: DietaryCategory;
  selectedDeliverySlot: 'morning' | 'midday' | 'evening';
  startDate: string;
  allergiesNote?: string;
}

export interface DeliverySlot {
  id: 'morning' | 'midday' | 'evening';
  name: string;
  timeWindow: string;
  description: string;
}

export interface DeliveryAddress {
  id: string;
  isDefault: boolean;
  label: 'Home' | 'Work' | 'Other';
  fullName: string;
  phone: string;
  streetAddress: string;
  apartmentSuite: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  deliveryInstructions?: string;
}

export interface OrderItem {
  planName: string;
  mealsPerDay: number;
  daysPerWeek: number;
  durationWeeks: number;
  price: number;
}

export type OrderStatus = 'placed' | 'chef_preparing' | 'packed' | 'out_for_delivery' | 'delivered';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  planId: string;
  planName: string;
  status: OrderStatus;
  statusDescription: string;
  nextDeliveryDate: string;
  deliverySlot: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  total: number;
  addressSummary: string;
  paymentMethod: string;
  estimatedArrival: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  activeSubscriptionId?: string;
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}
