import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Clock, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Tag, 
  HelpCircle, 
  Calendar,
  AlertCircle,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { BASE_MEAL_PLANS } from '../data/plans';
import { DeliverySlot } from '../types';

export const CheckoutPage: React.FC = () => {
  const { 
    config, 
    selectedPlan, 
    pricing, 
    updateConfig, 
    setPlanById,
    couponCode,
    isCouponApplied,
    couponError,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { user, addresses, isAuthenticated, addAddress } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Coupon input state
  const [promoInput, setPromoInput] = useState('');
  
  // Address selection & form state
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || 'new'
  );

  const [addressForm, setAddressForm] = useState({
    fullName: user?.fullName || 'Komal Ajbe',
    phone: user?.phone || '+91 98200 45112',
    streetAddress: 'Apartment 402, Oakwood Enclave, 14th Main',
    apartmentSuite: 'Tower B, 4th Floor',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053',
    instructions: 'Leave with reception if unreached.'
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any | null>(null);

  const deliverySlots: DeliverySlot[] = [
    {
      id: 'morning',
      name: 'Morning Fresh Slot',
      timeWindow: '6:30 AM – 8:30 AM',
      description: 'Ideal for breakfast & packing lunch to office.'
    },
    {
      id: 'midday',
      name: 'Midday Office Drop',
      timeWindow: '11:00 AM – 1:00 PM',
      description: 'Direct to your workplace desk before lunchtime.'
    },
    {
      id: 'evening',
      name: 'Evening Dinner Window',
      timeWindow: '5:30 PM – 7:30 PM',
      description: 'Chilled delivery ready for relaxing dinner.'
    }
  ];

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyCoupon(promoInput);
    if (ok) {
      showToast('success', 'Promo Code Applied', '15% extra discount has been deducted from your subscription.');
      setPromoInput('');
    } else {
      showToast('error', 'Invalid Code', 'Try "FRESH15" for 15% off.');
    }
  };

  const handlePlaceSubscription = async () => {
    // Validate address if creating new
    if (selectedAddressId === 'new') {
      if (!addressForm.fullName || !addressForm.phone || !addressForm.streetAddress || !addressForm.pincode) {
        showToast('error', 'Incomplete Address', 'Please fill in all mandatory address fields.');
        return;
      }
    }

    setIsProcessingOrder(true);
    // Simulate Razorpay SDK modal & order verification
    await new Promise((r) => setTimeout(r, 1200));
    setIsProcessingOrder(false);

    const generatedOrder = {
      orderNumber: 'FL-2026-' + Math.floor(1000 + Math.random() * 9000),
      planName: selectedPlan.name,
      mealsTotal: pricing.totalMeals,
      startDate: config.startDate,
      deliverySlot: deliverySlots.find((s) => s.id === config.selectedDeliverySlot)?.name || 'Morning',
      totalPaid: pricing.finalTotal,
      datePlaced: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setOrderComplete(generatedOrder);
    showToast('success', 'Subscription Scheduled', `Order #${generatedOrder.orderNumber} successfully registered.`);
  };

  if (orderComplete) {
    return (
      <div className="bg-ivory-50 min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 border border-forest-900/10 shadow-editorial text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
            <Check className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-1">
              Order Confirmed & Scheduled
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">
              Welcome to the Loop!
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              Your subscription is scheduled for preparation. Order <strong className="text-forest-900">{orderComplete.orderNumber}</strong>.
            </p>
          </div>

          {/* Summary Box */}
          <div className="bg-ivory-50 rounded-2xl p-6 border border-forest-900/10 text-left space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-forest-900/5">
              <span className="text-charcoal-500">Selected Plan:</span>
              <strong className="text-forest-900">{orderComplete.planName}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-forest-900/5">
              <span className="text-charcoal-500">Total Plates:</span>
              <strong className="text-forest-900 font-mono">{orderComplete.mealsTotal} Meals</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-forest-900/5">
              <span className="text-charcoal-500">First Delivery Date:</span>
              <strong className="text-forest-900 font-mono">{orderComplete.startDate}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-forest-900/5">
              <span className="text-charcoal-500">Delivery Window:</span>
              <strong className="text-forest-900">{orderComplete.deliverySlot}</strong>
            </div>
            <div className="flex justify-between py-1 pt-2">
              <span className="text-charcoal-700 font-bold">Total Amount:</span>
              <span className="text-base font-serif font-bold text-forest-900 font-mono">
                ₹{orderComplete.totalPaid}
              </span>
            </div>
          </div>

          {/* Prototype Backend Note */}
          <div className="p-3.5 rounded-xl bg-forest-900/5 border border-forest-900/10 text-[11px] text-charcoal-600 leading-relaxed text-left flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Sandbox Checkout Complete:</strong> In production, this trigger connects to a secure server-side Razorpay order API with Webhooks. No financial transaction occurred.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/dashboard/orders')}
              className="flex-1 py-3 px-6 rounded-full bg-forest-900 text-ivory-50 text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
            >
              Track Order Status & Timeline
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="py-3 px-6 rounded-full bg-ivory-100 text-charcoal-800 text-xs font-semibold hover:bg-ivory-200 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs uppercase font-mono tracking-wider text-citrus-600 font-semibold block mb-2">
            Step 2 of 2 • Checkout & Schedule
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 tracking-tight">
            Configure Your Subscription
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-700 mt-2">
            Fine-tune your meal cadences, select delivery windows, and review your live order breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Plan Customizer & Delivery Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Meal Plan Switcher */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-semibold">
                  1. Selected Meal Plan
                </span>
                <Link to="/plans" className="text-xs font-semibold text-citrus-600 hover:underline">
                  Browse Catalogue
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BASE_MEAL_PLANS.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlanById(p.id)}
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      selectedPlan.id === p.id
                        ? 'border-citrus-500 bg-citrus-50/40 shadow-sm ring-1 ring-citrus-500'
                        : 'border-forest-900/10 hover:border-forest-900/20 bg-ivory-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-bold text-sm text-forest-900">{p.name}</span>
                      {selectedPlan.id === p.id && <Check className="w-3.5 h-3.5 text-citrus-600" />}
                    </div>
                    <span className="font-mono text-xs text-charcoal-500 block">₹{p.pricePerMeal}/meal</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Frequency & Duration Selectors */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-semibold block">
                2. Cadence & Billing Duration
              </span>

              {/* Meals per day */}
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-2">
                  Meals Per Day
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => updateConfig({ mealsPerDay: num })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                        config.mealsPerDay === num
                          ? 'bg-forest-900 text-ivory-50 shadow-sm'
                          : 'bg-ivory-100 hover:bg-ivory-200 text-charcoal-700'
                      }`}
                    >
                      {num} {num === 1 ? 'Meal (Lunch)' : num === 2 ? 'Meals (Lunch + Dinner)' : 'Meals (All Day)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Days per week */}
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-2">
                  Delivery Days Per Week
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[5, 6, 7].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => updateConfig({ daysPerWeek: days })}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                        config.daysPerWeek === days
                          ? 'bg-forest-900 text-ivory-50 shadow-sm'
                          : 'bg-ivory-100 hover:bg-ivory-200 text-charcoal-700'
                      }`}
                    >
                      {days} Days {days === 5 ? '(Mon-Fri)' : days === 6 ? '(Mon-Sat)' : '(7 Days)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration with discount tags */}
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-2">
                  Subscription Duration
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { weeks: 1, label: '1 Week', sub: 'Standard rate' },
                    { weeks: 2, label: '2 Weeks', sub: 'Save 5% + Free delivery' },
                    { weeks: 4, label: '4 Weeks', sub: 'Save 10% + Free delivery' },
                  ].map((dur) => (
                    <button
                      key={dur.weeks}
                      type="button"
                      onClick={() => updateConfig({ durationWeeks: dur.weeks })}
                      className={`py-3 px-3 rounded-xl text-xs font-semibold transition-all relative ${
                        config.durationWeeks === dur.weeks
                          ? 'bg-citrus-500 text-white shadow-warm'
                          : 'bg-ivory-100 hover:bg-ivory-200 text-charcoal-700'
                      }`}
                    >
                      <span>{dur.label}</span>
                      <span className="block text-[10px] font-normal opacity-90 mt-0.5">{dur.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Delivery Schedule & Available Slot Selection */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-semibold block">
                3. Delivery Date & Window Selection
              </span>

              {/* Start Date Picker */}
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-citrus-600" />
                  <span>Earliest Start Date</span>
                </label>
                <input
                  type="date"
                  min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                  value={config.startDate}
                  onChange={(e) => updateConfig({ startDate: e.target.value })}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-forest-900/15 bg-ivory-50 text-xs text-charcoal-900 font-mono focus:outline-none focus:border-citrus-500"
                />
                <span className="text-[11px] text-charcoal-500 block mt-1">
                  *Orders require 24 hours culinary lead time to source fresh farm produce.
                </span>
              </div>

              {/* Delivery Slots */}
              <div>
                <label className="text-xs font-semibold text-charcoal-700 block mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-citrus-600" />
                  <span>Choose Your Delivery Slot</span>
                </label>
                <div className="space-y-3">
                  {deliverySlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => updateConfig({ selectedDeliverySlot: slot.id })}
                      className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between transition-all ${
                        config.selectedDeliverySlot === slot.id
                          ? 'border-citrus-500 bg-citrus-50/40 shadow-sm ring-1 ring-citrus-500'
                          : 'border-forest-900/10 hover:border-forest-900/20 bg-ivory-50/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-forest-900 text-sm">{slot.name}</h4>
                          <span className="font-mono text-xs font-semibold text-citrus-600 bg-white px-2 py-0.5 rounded border border-citrus-200">
                            {slot.timeWindow}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-600 mt-1">{slot.description}</p>
                      </div>
                      {config.selectedDeliverySlot === slot.id && (
                        <div className="w-5 h-5 rounded-full bg-citrus-500 text-white flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Delivery Address Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-semibold block">
                4. Delivery Address
              </span>

              {/* Saved Addresses List */}
              {addresses.length > 0 && (
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-charcoal-700 block">
                    Select a Saved Destination
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          selectedAddressId === addr.id
                            ? 'border-forest-900 bg-forest-900/5 ring-1 ring-forest-900'
                            : 'border-forest-900/10 hover:border-forest-900/20 bg-ivory-50/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="badge-tag bg-forest-900 text-ivory-50 text-[10px]">
                            {addr.label}
                          </span>
                          {selectedAddressId === addr.id && <Check className="w-3.5 h-3.5 text-forest-900" />}
                        </div>
                        <p className="font-bold text-xs text-charcoal-900 mt-1">{addr.fullName}</p>
                        <p className="text-[11px] text-charcoal-600 mt-0.5 line-clamp-2">
                          {addr.streetAddress}, {addr.city} {addr.pincode}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Address Form Inputs */}
              <div className="pt-2 border-t border-forest-900/10 space-y-4">
                <span className="text-xs font-semibold text-charcoal-700 block">
                  Verify or Edit Delivery Coordinates
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">Recipient Name</label>
                    <input
                      type="text"
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">Street Address / Society</label>
                  <input
                    type="text"
                    value={addressForm.streetAddress}
                    onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">City</label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">State</label>
                    <input
                      type="text"
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={addressForm.pincode}
                      onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">
                    Special Delivery / Security Gate Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={addressForm.instructions}
                    onChange={(e) => setAddressForm({ ...addressForm, instructions: e.target.value })}
                    placeholder="e.g. Ring bell twice or leave at reception desk."
                    className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                  />
                </div>
              </div>
            </div>

            {/* 5. Special Dietary & Allergies Notes */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-400 font-semibold block">
                5. Dietary Exclusions & Chef Notes
              </span>
              <p className="text-xs text-charcoal-600">
                Let our culinary kitchen know about any strict exclusions (e.g. no shellfish, peanut allergy, lactose avoidance).
              </p>
              <textarea
                rows={2}
                value={config.allergiesNote || ''}
                onChange={(e) => updateConfig({ allergiesNote: e.target.value })}
                placeholder="Mention allergies or spice preferences here..."
                className="w-full p-3 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs text-charcoal-900 placeholder-charcoal-400 focus:outline-none focus:border-citrus-500"
              />
            </div>
          </div>

          {/* Right Column: Order Summary & Payment Gateway Trigger */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-forest-900/10">
                <h3 className="font-serif text-2xl font-bold text-forest-900">
                  Subscription Summary
                </h3>
                <span className="badge-tag bg-citrus-100 text-citrus-700">
                  {pricing.totalMeals} Meals Total
                </span>
              </div>

              {/* Item Details */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-forest-900">{selectedPlan.name}</h4>
                    <p className="text-charcoal-500 text-[11px] mt-0.5">
                      {config.mealsPerDay} meals/day • {config.daysPerWeek} days/week • {config.durationWeeks} weeks
                    </p>
                  </div>
                  <span className="font-mono font-bold text-forest-900">
                    ₹{pricing.subtotal}
                  </span>
                </div>

                <div className="pt-3 border-t border-forest-900/5 space-y-2 text-charcoal-600">
                  <div className="flex justify-between">
                    <span>Base Meals Rate:</span>
                    <span className="font-mono">₹{selectedPlan.pricePerMeal} × {pricing.totalMeals}</span>
                  </div>

                  {pricing.durationDiscountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Duration Discount ({pricing.durationDiscountPercent}%):</span>
                      <span className="font-mono">-₹{pricing.durationDiscountAmount}</span>
                    </div>
                  )}

                  {isCouponApplied && (
                    <div className="flex justify-between text-citrus-600 font-semibold">
                      <span>Promo Voucher (15% OFF):</span>
                      <span className="font-mono">-₹{pricing.couponDiscountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Prepared Food GST (5%):</span>
                    <span className="font-mono">₹{pricing.tax}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Chilled Tote Courier:</span>
                    <span className="font-mono font-semibold text-emerald-700">
                      {pricing.deliveryFee === 0 ? 'FREE' : `₹${pricing.deliveryFee}`}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-forest-900/10 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-charcoal-500 block">Total Due Today</span>
                    <span className="font-serif text-3xl font-bold text-forest-900">
                      ₹{pricing.finalTotal}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-charcoal-400 block">Effective Per Meal</span>
                    <span className="font-mono text-sm font-bold text-citrus-600">
                      ₹{pricing.effectivePricePerMeal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-2 border-t border-forest-900/10">
                {isCouponApplied ? (
                  <div className="flex items-center justify-between p-3 bg-citrus-50 rounded-xl border border-citrus-200 text-xs">
                    <div className="flex items-center gap-2 text-citrus-800 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code: {couponCode} Applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-charcoal-500 hover:text-charcoal-900 text-xs underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo code (Try FRESH15)"
                        className="flex-1 px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500 font-mono uppercase"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-ivory-200 hover:bg-ivory-300 text-charcoal-800 text-xs font-semibold transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
                  </form>
                )}
              </div>

              {/* Payment Method UI Options */}
              <div className="pt-2 border-t border-forest-900/10 space-y-2">
                <span className="text-xs font-mono uppercase text-charcoal-400 font-semibold block mb-2">
                  Payment Architecture (Razorpay Demo)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'upi', label: 'UPI / QR' },
                    { id: 'card', label: 'Cards' },
                    { id: 'netbanking', label: 'NetBank' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setSelectedPaymentMethod(pm.id as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all text-center ${
                        selectedPaymentMethod === pm.id
                          ? 'bg-forest-900 text-ivory-50 shadow-sm'
                          : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                type="button"
                disabled={isProcessingOrder}
                onClick={handlePlaceSubscription}
                className="w-full py-4 px-6 rounded-full bg-citrus-500 hover:bg-citrus-600 text-white font-semibold text-sm transition-all shadow-warm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessingOrder ? (
                  <span>Contacting Razorpay Gateway...</span>
                ) : (
                  <>
                    <span>Confirm & Schedule Subscription</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted • Reusable Tote Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
