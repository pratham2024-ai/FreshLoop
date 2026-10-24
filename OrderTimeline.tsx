import React from 'react';
import { Check, Clock, Truck, Package, Utensils, Home } from 'lucide-react';
import { OrderStatus } from '../../types';

interface OrderTimelineProps {
  status: OrderStatus;
  estimatedArrival?: string;
}

const TIMELINE_STEPS = [
  { key: 'placed', label: 'Order Confirmed', icon: Clock, desc: 'Cycle scheduled' },
  { key: 'chef_preparing', label: 'Chef Preparation', icon: Utensils, desc: 'Freshly cooked & blast chilled' },
  { key: 'packed', label: 'Eco-Tote Packed', icon: Package, desc: 'Lined with cold ice-cells' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, desc: 'Morning courier en route' },
  { key: 'delivered', label: 'Delivered', icon: Home, desc: 'Enjoy your fresh meal' },
];

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ status, estimatedArrival }) => {
  const getStepIndex = (s: OrderStatus) => {
    switch (s) {
      case 'placed': return 0;
      case 'chef_preparing': return 1;
      case 'packed': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(status);

  return (
    <div className="py-4">
      {estimatedArrival && (
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-forest-900/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold text-forest-900">Live Delivery Status</span>
          </div>
          <span className="text-xs font-mono font-bold text-citrus-600 bg-citrus-50 px-2.5 py-1 rounded-md border border-citrus-200">
            Est. Arrival: {estimatedArrival}
          </span>
        </div>
      )}

      {/* Progress Bar & Steps */}
      <div className="relative">
        {/* Background Track Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-forest-900/10 hidden sm:block" />
        <div
          className="absolute top-5 left-5 h-0.5 bg-citrus-500 transition-all duration-500 hidden sm:block"
          style={{ width: `${(currentIndex / (TIMELINE_STEPS.length - 1)) * 90}%` }}
        />

        {/* Step Items */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative">
          {TIMELINE_STEPS.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex sm:flex-col items-center gap-3 sm:text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all relative z-10 flex-shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isCurrent
                      ? 'bg-citrus-500 text-white ring-4 ring-citrus-100 shadow-warm'
                      : 'bg-ivory-200 text-charcoal-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-xs font-semibold ${
                      isCurrent ? 'text-forest-900 font-bold' : isCompleted ? 'text-charcoal-800' : 'text-charcoal-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[11px] text-charcoal-500 leading-tight mt-0.5 hidden sm:block">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
