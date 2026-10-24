import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Download, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { OrderTimeline } from '../components/dashboard/OrderTimeline';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const MyOrdersPage: React.FC = () => {
  const { orders } = useAuth();
  const { showToast } = useToast();
  const [expandedOrderId, setExpandedOrderId] = useState<string>(orders[0]?.id || '');

  const toggleOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? '' : id);
  };

  const handleDownloadInvoice = (orderNumber: string) => {
    showToast('success', 'Tax Invoice Generated', `Downloaded PDF invoice for Order ${orderNumber}.`);
  };

  return (
    <DashboardLayout
      activeTabTitle="Order History & Delivery Timeline"
      activeTabDescription="Review your current delivery cycles, tracking status, and invoices."
    >
      <div className="space-y-6">
        {orders.length === 0 && (
          <div className="bg-white rounded-3xl p-10 border border-forest-900/10 shadow-editorial text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-forest-900/5 text-citrus-500 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-forest-900">
                No Active Orders Yet
              </h3>
              <p className="text-xs text-charcoal-600 mt-1 max-w-sm mx-auto">
                You haven't scheduled any meal subscriptions yet. Explore our chef-curated plans to get started.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="/plans"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest-900 text-ivory-50 text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
              >
                <span>Browse Meal Plans</span>
                <ArrowRight className="w-3.5 h-3.5 text-citrus-400" />
              </a>
            </div>
          </div>
        )}

        {orders.map((ord) => {
          const isExpanded = expandedOrderId === ord.id;
          const isCurrent = ord.status !== 'delivered';

          return (
            <div
              key={ord.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6"
            >
              {/* Header Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-900/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-base text-forest-900">
                      {ord.orderNumber}
                    </span>
                    <span
                      className={`badge-tag text-[10px] ${
                        isCurrent
                          ? 'bg-citrus-100 text-citrus-700'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isCurrent ? 'Active Cycle' : 'Completed Cycle'}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-500">
                    Ordered on {ord.date} • Paid via {ord.paymentMethod}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <button
                    onClick={() => handleDownloadInvoice(ord.orderNumber)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ivory-100 hover:bg-ivory-200 text-xs font-semibold text-charcoal-700 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Invoice</span>
                  </button>

                  <button
                    onClick={() => toggleOrder(ord.id)}
                    className="p-1.5 rounded-xl hover:bg-ivory-100 text-charcoal-500 transition-colors"
                    aria-label={isExpanded ? 'Collapse order' : 'Expand order'}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Delivery Timeline View */}
              <div>
                <OrderTimeline
                  status={ord.status}
                  estimatedArrival={ord.estimatedArrival}
                />
              </div>

              {/* Expanded Breakdown */}
              {isExpanded && (
                <div className="pt-6 border-t border-forest-900/10 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs animate-in fade-in">
                  {/* Items */}
                  <div>
                    <h4 className="font-serif font-bold text-forest-900 text-sm mb-3">
                      Subscription Inclusions
                    </h4>
                    <div className="space-y-2 bg-ivory-50 p-4 rounded-2xl border border-forest-900/5">
                      {ord.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-start">
                          <div>
                            <span className="font-semibold text-charcoal-800">{item.planName}</span>
                            <span className="block text-[11px] text-charcoal-500">
                              {item.durationWeeks} weeks cycle
                            </span>
                          </div>
                          <span className="font-mono font-bold text-forest-900">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Breakdown & Delivery Destination */}
                  <div className="space-y-4">
                    <h4 className="font-serif font-bold text-forest-900 text-sm">
                      Financial Summary
                    </h4>
                    <div className="space-y-1.5 text-charcoal-600 bg-ivory-50 p-4 rounded-2xl border border-forest-900/5">
                      <div className="flex justify-between">
                        <span>Catalogue Subtotal:</span>
                        <span className="font-mono">₹{ord.subtotal}</span>
                      </div>
                      {ord.discount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>Applied Savings:</span>
                          <span className="font-mono">-₹{ord.discount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>GST:</span>
                        <span className="font-mono">₹{ord.tax}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chilled Courier:</span>
                        <span className="font-mono text-emerald-700 font-semibold">FREE</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-forest-900/10 font-bold text-forest-900 text-sm">
                        <span>Total Paid:</span>
                        <span className="font-mono font-serif text-base">₹{ord.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};
