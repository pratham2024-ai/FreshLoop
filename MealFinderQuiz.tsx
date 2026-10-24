import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Check, Sparkles, HelpCircle, Utensils, Award } from 'lucide-react';
import { BASE_MEAL_PLANS } from '../../data/plans';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './ImageWithFallback';

interface QuizState {
  diet: string;
  frequency: string;
  goal: string;
}

export const MealFinderQuiz: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizState>({
    diet: 'balanced',
    frequency: '2',
    goal: 'energy'
  });
  const { setPlanById, updateConfig } = useCart();
  const navigate = useNavigate();

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));
  const handleRestart = () => {
    setAnswers({ diet: 'balanced', frequency: '2', goal: 'energy' });
    setStep(1);
  };

  // Transparent frontend recommendation rules:
  const getMatchedPlan = () => {
    if (answers.diet === 'vegetarian' || answers.diet === 'vegan') {
      return BASE_MEAL_PLANS.find((p) => p.id === 'plan-vegetarian')!;
    }
    if (answers.goal === 'muscle' || answers.diet === 'high-protein') {
      return BASE_MEAL_PLANS.find((p) => p.id === 'plan-high-protein')!;
    }
    if (answers.goal === 'weight' || answers.diet === 'weight-management') {
      return BASE_MEAL_PLANS.find((p) => p.id === 'plan-weight-management')!;
    }
    if (answers.frequency === '1') {
      return BASE_MEAL_PLANS.find((p) => p.id === 'plan-starter')!;
    }
    return BASE_MEAL_PLANS.find((p) => p.id === 'plan-balanced')!;
  };

  const matchedPlan = getMatchedPlan();

  const handleApplyRecommendation = () => {
    setPlanById(matchedPlan.id);
    updateConfig({
      mealsPerDay: parseInt(answers.frequency, 10) || matchedPlan.defaultMealsPerDay,
    });
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-editorial border border-forest-900/10">
      {/* Quiz Progress & Disclaimers Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-900/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-citrus-500/10 text-citrus-600 flex items-center justify-center font-bold text-xs">
              {step < 4 ? step : <Check className="w-3.5 h-3.5" />}
            </span>
            <span className="text-xs uppercase font-mono tracking-wider text-charcoal-400">
              {step < 4 ? `Step ${step} of 3 • Meal Plan Finder` : 'Personalized Plan Match'}
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900 mt-1">
            {step === 1 && 'What is your preferred dietary lifestyle?'}
            {step === 2 && 'How many meals do you want covered daily?'}
            {step === 3 && 'What is your primary wellness & routine goal?'}
            {step === 4 && 'Here is your ideal FreshLoop recommendation'}
          </h3>
        </div>

        {step === 4 && (
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ivory-100 hover:bg-ivory-200 text-xs font-semibold text-charcoal-700 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        )}
      </div>

      {/* Step 1: Diet Preference */}
      {step === 1 && (
        <div className="py-8 space-y-4">
          <p className="text-sm text-charcoal-600 mb-6">
            Select the dietary philosophy that best suits your everyday eating habits:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: 'balanced',
                title: 'Balanced Omnivore',
                desc: 'Wholesome mix of pasture-raised meats, poultry, wild seafood, legumes, and market produce.'
              },
              {
                id: 'vegetarian',
                title: 'Plant-Forward Vegetarian',
                desc: '100% lacto-veg with artisanal paneer, lentils, tempeh, seeds, and rich heirloom vegetables.'
              },
              {
                id: 'high-protein',
                title: 'High Protein Athletic',
                desc: 'Dense lean protein cuts (38g+ per plate) for workout recovery, satiety, and active routines.'
              },
              {
                id: 'weight-management',
                title: 'Calorie Mindful & Lean',
                desc: 'Nutrient-rich, fiber-dense portions under 450 kcal designed for sustainable satiety.'
              }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setAnswers({ ...answers, diet: option.id })}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  answers.diet === option.id
                    ? 'border-citrus-500 bg-citrus-50/40 shadow-sm ring-1 ring-citrus-500'
                    : 'border-forest-900/10 hover:border-forest-900/25 bg-ivory-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-serif font-bold text-forest-900 text-lg">{option.title}</h4>
                  {answers.diet === option.id && (
                    <span className="w-5 h-5 rounded-full bg-citrus-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Frequency & Schedule */}
      {step === 2 && (
        <div className="py-8 space-y-4">
          <p className="text-sm text-charcoal-600 mb-6">
            Which meals would you like our culinary team to prepare each day?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: '1',
                title: '1 Meal / Day',
                sub: 'Lunch or Dinner',
                desc: 'Ideal for busy office lunches or hassle-free evening dinners without cooking or grocery shopping.'
              },
              {
                id: '2',
                title: '2 Meals / Day',
                sub: 'Lunch & Dinner (Popular)',
                desc: 'Complete workday nutrition covered. You only prepare breakfast or grab a light smoothie.'
              },
              {
                id: '3',
                title: '3 Meals / Day',
                sub: 'All-Day Culinary Care',
                desc: 'Breakfast, energizing lunch, and wholesome dinner. Zero cooking all week long.'
              }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setAnswers({ ...answers, frequency: option.id })}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  answers.frequency === option.id
                    ? 'border-citrus-500 bg-citrus-50/40 shadow-sm ring-1 ring-citrus-500'
                    : 'border-forest-900/10 hover:border-forest-900/25 bg-ivory-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-serif font-bold text-forest-900 text-lg">{option.title}</h4>
                  {answers.frequency === option.id && (
                    <span className="w-5 h-5 rounded-full bg-citrus-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-citrus-600 block mb-2">{option.sub}</span>
                <p className="text-xs text-charcoal-600 leading-relaxed">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Food Goal */}
      {step === 3 && (
        <div className="py-8 space-y-4">
          <p className="text-sm text-charcoal-600 mb-6">
            What is the primary positive outcome you are looking to achieve?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                id: 'energy',
                title: 'Consistent All-Day Energy',
                desc: 'Eliminate post-meal sluggishness and afternoon brain fog with clean low-glycemic fuel.'
              },
              {
                id: 'muscle',
                title: 'Athletic Recovery & Muscle',
                desc: 'Hit consistent protein targets (38g+/meal) to support fitness goals and endurance.'
              },
              {
                id: 'weight',
                title: 'Effortless Weight Management',
                desc: 'Satisfying calorie-controlled portions with high fiber that curb mid-day cravings.'
              },
              {
                id: 'time',
                title: 'Reclaim 10+ Hours Every Week',
                desc: 'Zero shopping, zero chopping, zero washing dishes. Chef quality in under 3 minutes.'
              }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setAnswers({ ...answers, goal: option.id })}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  answers.goal === option.id
                    ? 'border-citrus-500 bg-citrus-50/40 shadow-sm ring-1 ring-citrus-500'
                    : 'border-forest-900/10 hover:border-forest-900/25 bg-ivory-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-serif font-bold text-forest-900 text-lg">{option.title}</h4>
                  {answers.goal === option.id && (
                    <span className="w-5 h-5 rounded-full bg-citrus-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Matched Plan Result */}
      {step === 4 && (
        <div className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-ivory-50 rounded-2xl p-6 sm:p-8 border border-forest-900/10">
            {/* Plan Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md">
              <ImageWithFallback
                src={matchedPlan.image}
                fallbackSrc={matchedPlan.fallbackImage}
                alt={matchedPlan.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-forest-900/90 text-ivory-50 text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                98% Compatibility Match
              </div>
            </div>

            {/* Plan Match Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-citrus-100 text-citrus-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended Based on Your Choices</span>
              </div>
              <h4 className="font-serif text-3xl font-bold text-forest-900">{matchedPlan.name}</h4>
              <p className="text-sm text-charcoal-700 leading-relaxed">{matchedPlan.description}</p>

              {/* Sample Day Preview */}
              <div className="bg-white p-4 rounded-xl border border-forest-900/10 text-xs space-y-2">
                <span className="font-mono uppercase tracking-wider text-[10px] text-charcoal-400 font-semibold block">
                  Illustrative Daily Plate
                </span>
                <p className="text-charcoal-800">
                  <strong className="text-forest-900 font-semibold">Lunch:</strong> {matchedPlan.sampleMenu.lunch}
                </p>
                <p className="text-charcoal-800">
                  <strong className="text-forest-900 font-semibold">Dinner:</strong> {matchedPlan.sampleMenu.dinner}
                </p>
              </div>

              {/* Pricing & CTA */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div>
                  <span className="text-xs text-charcoal-500 block">Subscription Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-serif font-bold text-forest-900">
                      ₹{matchedPlan.pricePerMeal}
                    </span>
                    <span className="text-xs text-charcoal-600">/ meal</span>
                  </div>
                </div>

                <button
                  onClick={handleApplyRecommendation}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  <span>Configure {matchedPlan.name}</span>
                  <ArrowRight className="w-4 h-4 text-citrus-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Non-Medical Disclaimer Banner */}
          <div className="mt-6 p-4 rounded-xl bg-forest-900/5 border border-forest-900/10 flex items-start gap-3 text-xs text-charcoal-600 leading-relaxed">
            <HelpCircle className="w-4 h-4 text-citrus-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>General Wellness Disclaimer:</strong> This quiz matches culinary meal options based on transparent lifestyle preferences and self-reported targets. It does not provide medical diagnoses, treatment advice, or personalized clinical nutrition therapy. Consult a licensed physician for clinical diet interventions.
            </p>
          </div>
        </div>
      )}

      {/* Quiz Navigation Buttons (for steps 1-3) */}
      {step < 4 && (
        <div className="pt-6 border-t border-forest-900/10 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-colors ${
              step === 1
                ? 'opacity-30 cursor-not-allowed text-charcoal-400'
                : 'text-charcoal-700 hover:bg-ivory-100'
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-citrus-500 hover:bg-citrus-600 text-white text-xs font-semibold transition-all shadow-warm"
          >
            <span>{step === 3 ? 'View Matching Plan' : 'Continue'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
