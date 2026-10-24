import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { FAQ_DATA, FAQ_CATEGORIES } from '../data/faq';

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-4': true
  });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    FAQ_DATA.forEach((item) => { all[item.id] = true; });
    setOpenIds(all);
  };

  const collapseAll = () => {
    setOpenIds({});
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQ = faq.question.toLowerCase().includes(query);
        const matchesA = faq.answer.toLowerCase().includes(query);
        if (!matchesQ && !matchesA) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
            Knowledge Base & Policies
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 mt-3 leading-relaxed">
            Everything you need to know about our meal cadence, cooking protocols, packaging return loop, and flexible billing.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. microwave, cancel, organic, packaging)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-forest-900/10 text-xs sm:text-sm text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-citrus-500 shadow-sm transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-charcoal-400 hover:text-charcoal-700 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills & Bulk Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-forest-900 text-ivory-50 shadow-sm'
                    : 'bg-white hover:bg-ivory-100 text-charcoal-700 border border-forest-900/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-charcoal-500 self-end sm:self-auto">
            <button onClick={expandAll} className="hover:text-forest-900 underline">
              Expand All
            </button>
            <span>•</span>
            <button onClick={collapseAll} className="hover:text-forest-900 underline">
              Collapse All
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-16">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-forest-900/10 shadow-editorial overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
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
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-forest-900/10 p-6">
              <HelpCircle className="w-8 h-8 text-citrus-500 mx-auto mb-2" />
              <h4 className="font-serif font-bold text-forest-900 text-base">No Matching Questions</h4>
              <p className="text-xs text-charcoal-500 mt-1">
                Try searching for general keywords or reset your filter.
              </p>
            </div>
          )}
        </div>

        {/* Still have questions card */}
        <div className="bg-white rounded-3xl p-8 border border-forest-900/10 shadow-editorial text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-forest-900">
            Have a question not listed here?
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
            Our culinary team and support desk are ready to assist with custom corporate orders, special diet notes, and delivery inquiries.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-colors shadow-sm"
            >
              <span>Contact Concierge Desk</span>
              <ArrowRight className="w-3.5 h-3.5 text-citrus-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
