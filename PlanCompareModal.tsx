import React, { useEffect } from 'react';
import { X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { BASE_MEAL_PLANS } from '../../data/plans';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface PlanCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanCompareModal: React.FC<PlanCompareModalProps> = ({ isOpen, onClose }) => {
  const { setPlanById } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectPlan = (planId: string) => {
    setPlanById(planId);
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-forest-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div className="bg-ivory-50 rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-forest-900/10 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-white border-b border-forest-900/10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/5 text-forest-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-citrus-500" />
              <span>Side-by-Side Comparison</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
              Find Your Ideal FreshLoop Plan
            </h3>
            <p className="text-sm text-charcoal-600 mt-1">
              Compare base pricing, nutritional targets, and culinary features across our subscription tiers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-ivory-100 hover:bg-ivory-200 text-charcoal-600 flex items-center justify-center transition-colors"
            aria-label="Close comparison modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Table Body */}
        <div className="p-6 sm:p-8 overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-forest-900/10">
                <th className="py-4 px-4 text-xs uppercase font-mono tracking-wider text-charcoal-400 w-1/4">
                  Feature
                </th>
                {BASE_MEAL_PLANS.map((plan) => (
                  <th key={plan.id} className="py-4 px-4 text-center">
                    <span className="font-serif text-base font-bold text-forest-900 block">{plan.name}</span>
                    <span className="text-xs text-citrus-600 font-semibold font-mono block mt-1">
                      ₹{plan.pricePerMeal} / meal
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-900/5 text-xs text-charcoal-700">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-forest-900">Primary Focus</td>
                {BASE_MEAL_PLANS.map((plan) => (
                  <td key={plan.id} className="py-3.5 px-4 text-center text-charcoal-600 leading-snug">
                    {plan.targetAudience.slice(0, 70)}...
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-forest-900">Est. Calories / Meal</td>
                {BASE_MEAL_PLANS.map((plan) => (
                  <td key={plan.id} className="py-3.5 px-4 text-center font-mono font-medium">
                    {plan.sampleCaloriesRange}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-forest-900">Dietary Category</td>
                {BASE_MEAL_PLANS.map((plan) => (
                  <td key={plan.id} className="py-3.5 px-4 text-center capitalize font-medium text-forest-800">
                    {plan.category.replace('-', ' ')}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-forest-900">Recommended Duration</td>
                {BASE_MEAL_PLANS.map((plan) => (
                  <td key={plan.id} className="py-3.5 px-4 text-center">
                    {plan.recommendedDurationWeeks} {plan.recommendedDurationWeeks === 1 ? 'Week' : 'Weeks'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-forest-900">Default Meal Cadence</td>
                {BASE_MEAL_PLANS.map((plan) => (
                  <td key={plan.id} className="py-3.5 px-4 text-center font-mono">
                    {plan.defaultMealsPerDay} meals/day, {plan.defaultDaysPerWeek} days/wk
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-forest-900">Eco-Tote Packaging Return</td>
                {BASE_MEAL_PLANS.map((plan) => (
                  <td key={plan.id} className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-forest-900">Flexible Daily Pause</td>
                {BASE_MEAL_PLANS.map((plan) => (
                  <td key={plan.id} className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  </td>
                ))}
              </tr>
              {/* Select Action Row */}
              <tr>
                <td className="py-6 px-4"></td>
                {BASE_MEAL_PLANS.map((plan) => (
                  <td key={plan.id} className="py-6 px-4 text-center">
                    <button
                      onClick={() => handleSelectPlan(plan.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-forest-900 text-ivory-50 text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
                    >
                      <span>Select</span>
                      <ArrowRight className="w-3 h-3 text-citrus-400" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
