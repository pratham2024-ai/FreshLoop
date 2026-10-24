import React, { useState } from 'react';
import { Mail, Clock, MessageSquare, Send, CheckCircle2, HelpCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'subscription',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please provide a valid email address.';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Please provide at least 10 characters describing your inquiry.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('error', 'Form Incomplete', 'Please correct the highlighted fields before submitting.');
      return;
    }
    setSubmitted(true);
    showToast('success', 'Message Transmitted', 'Our culinary concierge will respond to your email within 4 hours.');
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', category: 'subscription', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
            Culinary Concierge & Support
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950 tracking-tight">
            We’re Here To Help
          </h1>
          <p className="text-sm sm:text-base text-charcoal-700 mt-3 leading-relaxed">
            Have questions about your meal plan, dietary exclusions, corporate office catering, or delivery windows? Send us a note below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-forest-900/10 shadow-editorial">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest-900">
                  Thank You, {formData.name}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
                  Your inquiry regarding <strong className="text-forest-900">{formData.category}</strong> has been logged. Our culinary desk will email you at <strong className="text-forest-900">{formData.email}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-ivory-100 hover:bg-ivory-200 text-xs font-semibold text-charcoal-800 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">
                  Send a Direct Message
                </h3>

                {/* Name */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Komal Sharma"
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-forest-900/10 bg-ivory-50 focus:border-citrus-500'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="komal@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-500 bg-rose-50/30' : 'border-forest-900/10 bg-ivory-50 focus:border-citrus-500'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full px-4 py-2.5 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs text-charcoal-900 focus:outline-none focus:border-citrus-500 transition-colors"
                  >
                    <option value="subscription">Subscription & Delivery Customization</option>
                    <option value="corporate">Corporate & Team Meal Subscriptions</option>
                    <option value="dietary">Specific Food Allergies & Ingredients</option>
                    <option value="billing">Billing & Refund Assistance</option>
                    <option value="general">General Culinary Feedback</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-charcoal-700 font-semibold block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can assist you with your FreshLoop meal schedule..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                      errors.message ? 'border-rose-500 bg-rose-50/30' : 'border-forest-900/10 bg-ivory-50 focus:border-citrus-500'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5 text-citrus-400" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Support Details & Operational Protocol */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
              <h3 className="font-serif text-2xl font-bold text-forest-900">
                Operating Schedule & Protocol
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-citrus-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-forest-900 block font-semibold">Concierge Support Hours</strong>
                    <p className="text-charcoal-600 mt-0.5">
                      Monday through Saturday: 7:00 AM – 8:00 PM IST<br />
                      Sunday: 8:00 AM – 2:00 PM IST (Emergency delivery support only)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-citrus-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-forest-900 block font-semibold">Direct In-App Contact</strong>
                    <p className="text-charcoal-600 mt-0.5">
                      Subscribers can also reach us via the in-app chat widget or message our dispatch desk directly from the Customer Dashboard.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-citrus-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-forest-900 block font-semibold">Immediate Plan Edits</strong>
                    <p className="text-charcoal-600 mt-0.5">
                      To pause, skip a day, or change delivery address, you don't need to contact support—you can toggle it instantly in your dashboard before 8:00 PM.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note on genuine contact details */}
            <div className="p-4 rounded-2xl bg-forest-900/5 border border-forest-900/10 text-[11px] text-charcoal-500 leading-relaxed">
              <strong>Support Note:</strong> FreshLoop is currently operating in digital prototype mode. Inquiries submitted through this form are validated on the client side and saved to state.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
