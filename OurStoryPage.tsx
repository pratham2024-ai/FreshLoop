import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Heart, Sparkles, UtensilsCrossed } from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const OurStoryPage: React.FC = () => {
  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Title */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
            The FreshLoop Heritage & Vision
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-forest-950 tracking-tight leading-tight">
            Food cooked with the care of home and the precision of fine dining.
          </h1>
          <p className="text-base sm:text-lg text-charcoal-700 mt-4 leading-relaxed">
            FreshLoop was born out of a simple observation: modern professional life makes consistent, clean nourishment nearly impossible without sacrificing either hours in the kitchen or your physical well-being.
          </p>
        </div>

        {/* Narrative Section 1: The Problem & The Idea */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <span className="badge-tag bg-forest-900 text-ivory-50">
              The Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 leading-tight">
              Escaping the cycle of supermarket fatigue and takeout burnout.
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              Between busy careers, family, and personal goals, cooking nutritious meals daily is often the first routine to collapse. The alternative was usually commercial restaurant food: heavily salted, cooked in degraded refined vegetable oils, and packed in layers of single-use plastic.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              We asked a foundational question: what if you could have balanced, chef-cooked meals prepared every single morning using certified organic produce and clean cold-pressed oils, delivered right to your door with zero cooking stress and zero environmental waste?
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-ivory-200">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
                alt="Culinary chef preparing fresh organic vegetables"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Three Core Pillars */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-forest-900/10 shadow-editorial mb-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
              Our Culinary Code
            </span>
            <h2 className="font-serif text-3xl font-bold text-forest-900">
              Three Non-Negotiable Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-charcoal-700">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-forest-900/5 text-forest-900 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-900">
                1. Soil-First Sourcing
              </h3>
              <p className="text-xs leading-relaxed text-charcoal-600">
                We work directly with certified regional farms cultivating heirloom grains and pesticide-free produce. We believe soil health directly determines taste and micronutrient density.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-forest-900/5 text-forest-900 flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-900">
                2. Culinary Craft, Not Factory Food
              </h3>
              <p className="text-xs leading-relaxed text-charcoal-600">
                No artificial emulsifiers, no ultra-processed protein isolates, and no microwave TV-dinner preservatives. Our kitchens roast whole spices, make stocks from scratch, and braise with patience.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-forest-900/5 text-forest-900 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-forest-800" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest-900">
                3. The Circular Return Loop
              </h3>
              <p className="text-xs leading-relaxed text-charcoal-600">
                Our food should nourish your body without burdening the planet. Sugarcane fiber containers and reusable insulated thermal totes form a zero-waste packaging loop with free morning collection.
              </p>
            </div>
          </div>
        </div>

        {/* Narrative Section 2: Culinary Team & Central Kitchens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-ivory-200">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                alt="Head culinary chef plating healthy dishes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <span className="badge-tag bg-forest-900 text-ivory-50">
              Our Central Kitchens
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900 leading-tight">
              Hospital-grade hygiene paired with culinary artistry.
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              Every FreshLoop kitchen operates under strict HACCP protocols. Temperature-controlled prep environments and blast-chilling units ensure that every meal arrives at your doorstep in peak microbiological safety without needing chemical preservatives.
            </p>
            <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
              Our menu development is led by seasoned culinary directors who collaborate with certified nutritionists to ensure that every dish achieves a natural equilibrium of fiber, healthy fats, and bioavailability.
            </p>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="text-center py-12 border-t border-forest-900/10">
          <h3 className="font-serif text-3xl font-bold text-forest-900 mb-3">
            Experience the FreshLoop difference.
          </h3>
          <p className="text-sm text-charcoal-600 max-w-md mx-auto mb-6">
            Join subscribers who have made wholesome eating their daily habit.
          </p>
          <Link
            to="/plans"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 font-semibold text-sm transition-all shadow-md"
          >
            <span>Explore Our Meal Plans</span>
            <ArrowRight className="w-4 h-4 text-citrus-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};
