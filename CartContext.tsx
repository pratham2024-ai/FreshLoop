import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_MEAL_PLANS } from '../data/plans';
import { MealPlan, SubscriptionConfig } from '../types';

interface PricingBreakdown {
  totalMeals: number;
  basePricePerMeal: number;
  subtotal: number;
  durationDiscountAmount: number;
  durationDiscountPercent: number;
  couponDiscountAmount: number;
  tax: number;
  deliveryFee: number;
  finalTotal: number;
  effectivePricePerMeal: number;
}

interface CartContextType {
  config: SubscriptionConfig;
  selectedPlan: MealPlan;
  couponCode: string;
  isCouponApplied: boolean;
  couponError: string;
  pricing: PricingBreakdown;
  updateConfig: (updates: Partial<SubscriptionConfig>) => void;
  setPlanById: (planId: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  resetConfig: () => void;
}

const DEFAULT_CONFIG: SubscriptionConfig = {
  planId: 'plan-balanced',
  mealsPerDay: 2,
  daysPerWeek: 5,
  durationWeeks: 4,
  dietaryPreference: 'balanced',
  selectedDeliverySlot: 'morning',
  startDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days ahead
  allergiesNote: ''
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SubscriptionConfig>(() => {
    try {
      const saved = localStorage.getItem('freshloop_subscription_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG;
  });

  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    localStorage.setItem('freshloop_subscription_config', JSON.stringify(config));
  }, [config]);

  const selectedPlan = BASE_MEAL_PLANS.find((p) => p.id === config.planId) || BASE_MEAL_PLANS[0];

  // Calculate pricing breakdown
  const totalMeals = config.mealsPerDay * config.daysPerWeek * config.durationWeeks;
  const basePricePerMeal = selectedPlan.pricePerMeal;
  const subtotal = totalMeals * basePricePerMeal;

  // Progressive duration discounts
  let durationDiscountPercent = 0;
  if (config.durationWeeks === 2) durationDiscountPercent = 5;
  if (config.durationWeeks === 4) durationDiscountPercent = 10;

  const durationDiscountAmount = Math.round(subtotal * (durationDiscountPercent / 100));
  const subtotalAfterDuration = subtotal - durationDiscountAmount;

  // Promo coupon
  const couponDiscountAmount = isCouponApplied ? Math.round(subtotalAfterDuration * 0.15) : 0; // 15% off coupon
  const discountedSubtotal = subtotalAfterDuration - couponDiscountAmount;

  // 5% food tax
  const tax = Math.round(discountedSubtotal * 0.05);

  // Delivery fee logic: free for 2+ weeks or orders over ₹2000
  const deliveryFee = (discountedSubtotal >= 2000 || config.durationWeeks >= 2) ? 0 : 150;

  const finalTotal = discountedSubtotal + tax + deliveryFee;
  const effectivePricePerMeal = totalMeals > 0 ? Math.round(finalTotal / totalMeals) : basePricePerMeal;

  const pricing: PricingBreakdown = {
    totalMeals,
    basePricePerMeal,
    subtotal,
    durationDiscountAmount,
    durationDiscountPercent,
    couponDiscountAmount,
    tax,
    deliveryFee,
    finalTotal,
    effectivePricePerMeal,
  };

  const updateConfig = (updates: Partial<SubscriptionConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const setPlanById = (planId: string) => {
    const plan = BASE_MEAL_PLANS.find((p) => p.id === planId);
    if (plan) {
      setConfig((prev) => ({
        ...prev,
        planId: plan.id,
        dietaryPreference: plan.category,
        mealsPerDay: plan.defaultMealsPerDay,
        daysPerWeek: plan.defaultDaysPerWeek,
      }));
    }
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FRESH15' || clean === 'HEALTHY2026' || clean === 'LOOPNEW') {
      setIsCouponApplied(true);
      setCouponCode(clean);
      setCouponError('');
      return true;
    } else {
      setCouponError('Invalid promo code. Try "FRESH15" for 15% off.');
      return false;
    }
  };

  const removeCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode('');
    setCouponError('');
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    setIsCouponApplied(false);
    setCouponCode('');
    setCouponError('');
  };

  return (
    <CartContext.Provider
      value={{
        config,
        selectedPlan,
        couponCode,
        isCouponApplied,
        couponError,
        pricing,
        updateConfig,
        setPlanById,
        applyCoupon,
        removeCoupon,
        resetConfig,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
