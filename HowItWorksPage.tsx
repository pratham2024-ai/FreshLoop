import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Leaf, 
  RefreshCw, 
  Clock, 
  ChefHat, 
  Snowflake, 
  Truck, 
  Sparkles 
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Pick Your Nutrition Archetype',
      subtitle: 'Personalized to your lifestyle',
      desc: 'Select from Balanced Daily, Vegetarian Fresh, High-Protein Athletic, or Calorie Mindful. Specify whether you need 1, 2, or 3 meals daily, and choose 5, 6, or 7 days weekly.',
      icon: ChefHat,
      highlight: 'Tailored calorie & protein benchmarks'
    },
    {
      num: '02',
      title: 'Sourced from Regional Organic Farms',
      subtitle: 'Pure soil integrity',
      desc: 'Before sunrise, fresh heirloom greens, whole grains, cold-pressed oils, and pasture-raised proteins arrive at our central production facility from vetted agricultural partners.',
      icon: Leaf,
      highlight: 'Zero artificial preservatives or trans fats'
    },
    {
      num: '03',
      title: 'Cooked Daily & Blast-Chilled',
      subtitle: 'Culinary science locked in',
      desc: 'Our chefs cook each plate from scratch with minimal healthy oils. We immediately blast-chill meals from 75°C to 3°C in under 90 minutes. This preserves cell structure and vitamins without chemical additives.',
      icon: Snowflake,
      highlight: 'Keeps farm-fresh in fridge for 48 hours'
    },
    {
      num: '04',
      title: 'Morning Delivery in Reusable Totes',
      subtitle: 'The circular packaging loop',
      desc: 'Your meals arrive between 6:30 AM and 8:30 AM in compostable sugarcane trays enclosed in an insulated thermal cooler tote with frozen ice cells.',
      icon: Truck,
      highlight: 'Zero single-use plastic waste'
    },
    {
      num: '05',
      title: 'Reheat in 3 Mins & Leave Tote Out',
      subtitle: 'Zero friction daily ritual',
      desc: 'Warm for 90 to 120 seconds in your microwave or 3 minutes on a stovetop. Place your empty thermal tote and ice packs outside your door for our courier to collect during your next drop-off.',
      icon: RefreshCw,
      highlight: 'Zero meal planning, zero dirty dishes'
    }
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
            The FreshLoop Operational Standard
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-950 tracking-tight leading-tight">
            How FreshLoop Works
          </h1>
          <p className="text-base sm:text-lg text-charcoal-700 mt-4 leading-relaxed">
            We reimagined daily eating as an unbroken, circular system. From certified organic soil to morning doorstep drop-offs, every step is engineered for flavor, nutritional retention, and sustainability.
          </p>
        </div>

        {/* 5-Step Deep Dive Sequence */}
        <div className="space-y-8 mb-20">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-forest-900/10 shadow-editorial grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-2 flex lg:flex-col items-center gap-4">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-citrus-500 font-mono">
                    {st.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-forest-900/5 text-forest-900 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-forest-800" />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-2">
                  <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold">
                    {st.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="lg:col-span-3 bg-ivory-50 rounded-2xl p-4 sm:p-5 border border-forest-900/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-400 font-semibold block mb-1">
                    Quality Benchmark
                  </span>
                  <p className="text-xs font-semibold text-forest-900 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-citrus-500 flex-shrink-0" />
                    <span>{st.highlight}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Cutoff Times & Policy Transparency */}
        <div className="bg-forest-900 text-ivory-50 rounded-3xl p-8 sm:p-12 mb-20 shadow-xl border border-forest-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-citrus-400 font-semibold block mb-2">
              Subscription Cadence Rules
            </span>
            <h2 className="font-serif text-3xl font-bold">
              Transparent, Fair, and Predictable Policies
            </h2>
            <p className="text-xs sm:text-sm text-sage-200 mt-2 leading-relaxed">
              Because we procure ingredients daily based on exact subscriber numbers, we keep our operations transparent and straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-forest-950/60 border border-forest-800 space-y-2">
              <div className="flex items-center gap-2 text-citrus-400 font-bold font-mono">
                <Clock className="w-4 h-4" />
                <span>8:00 PM Daily Cutoff</span>
              </div>
              <p className="text-sage-300 leading-relaxed">
                Pause deliveries, change your delivery address, or skip specific calendar dates directly in your customer dashboard until 8:00 PM the evening prior.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-forest-950/60 border border-forest-800 space-y-2">
              <div className="flex items-center gap-2 text-citrus-400 font-bold font-mono">
                <RefreshCw className="w-4 h-4" />
                <span>Packaging Hygiene</span>
              </div>
              <p className="text-sage-300 leading-relaxed">
                Returned thermal totes and gel packs undergo dual-stage UV sanitization and hot-water wash before being re-introduced to circulation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-forest-950/60 border border-forest-800 space-y-2">
              <div className="flex items-center gap-2 text-citrus-400 font-bold font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Lock-in Contract</span>
              </div>
              <p className="text-sage-300 leading-relaxed">
                Renew week-by-week or choose 4-week discounted terms. Unused meal credits rollover indefinitely if you pause with advance notice.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="text-center space-y-4">
          <h3 className="font-serif text-3xl font-bold text-forest-900">
            Ready to simplify your everyday eating?
          </h3>
          <p className="text-sm text-charcoal-600 max-w-md mx-auto">
            Build your plan now and taste the difference of chef-crafted nutrition.
          </p>
          <div className="pt-2">
            <Link
              to="/plans"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-citrus-500 hover:bg-citrus-600 text-white font-semibold text-sm transition-all shadow-warm"
            >
              <span>Explore All Meal Plans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
