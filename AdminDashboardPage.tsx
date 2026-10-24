import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Utensils, 
  Truck, 
  Users, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  SlidersHorizontal,
  Flame,
  ArrowRight
} from 'lucide-react';
import { WEEKLY_MENU_ITEMS } from '../data/menu';
import { useToast } from '../context/ToastContext';

export const AdminDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [dishes, setDishes] = useState(
    WEEKLY_MENU_ITEMS.map((dish, i) => ({
      ...dish,
      isAvailable: i !== 3, // Simulate one dish temporarily 86'd
      stockUnits: 85 - (i * 3)
    }))
  );
  const [search, setSearch] = useState('');
  const [kitchenStatus, setKitchenStatus] = useState<'normal' | 'rush' | 'cut_off_closed'>('normal');

  const toggleAvailability = (id: string, name: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isAvailable: !d.isAvailable } : d))
    );
    showToast('info', 'Recipe Availability Toggled', `Updated daily prep availability for ${name}.`);
  };

  const filtered = dishes.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.mealTime.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-ivory-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header Banner */}
        <div className="bg-forest-950 text-ivory-50 rounded-3xl p-6 sm:p-8 border border-forest-900 shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-citrus-400 font-semibold">
                Central Kitchen Ops Portal • Admin Authorization Demo
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold">
              FreshLoop Kitchen & Fleet Dispatch
            </h1>
            <p className="text-xs sm:text-sm text-sage-300">
              Facility: Central Hub #1 (Bandra West Prep Kitchen) • Current Batch: Morning Cycle 06:30
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-forest-900 text-xs font-mono border border-forest-800 text-sage-200">
              Supabase RLS Ready
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-forest-900 rounded-xl border border-forest-800 text-xs text-ivory-100">
              <span className="text-sage-400">Kitchen Mode:</span>
              <strong className="text-citrus-400 uppercase font-mono">Live Prep</strong>
            </div>
          </div>
        </div>

        {/* Real-time Operational KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-forest-900/10 shadow-editorial">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-charcoal-400 font-semibold">
                Today’s Plate Target
              </span>
              <Utensils className="w-4 h-4 text-citrus-600" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-forest-900 font-mono">
              468 Plates
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              92% Prep Completed
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-forest-900/10 shadow-editorial">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-charcoal-400 font-semibold">
                Electric Fleet In-Transit
              </span>
              <Truck className="w-4 h-4 text-citrus-600" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-forest-900 font-mono">
              18 Couriers
            </h3>
            <span className="text-[11px] text-charcoal-500 mt-1 block">
              Morning drop: 94% on-schedule
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-forest-900/10 shadow-editorial">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-charcoal-400 font-semibold">
                Active Subscribers
              </span>
              <Users className="w-4 h-4 text-citrus-600" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-forest-900 font-mono">
              342 Active
            </h3>
            <span className="text-[11px] text-charcoal-500 mt-1 block">
              18 currently paused
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-forest-900/10 shadow-editorial">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-charcoal-400 font-semibold">
                Zero-Waste Tote Stock
              </span>
              <Package className="w-4 h-4 text-citrus-600" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-forest-900 font-mono">
              620 Sanitized
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              UV Station Operating
            </span>
          </div>
        </div>

        {/* Central Kitchen Batch Breakdown & Alert */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Dispatch Batches */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-forest-900/10">
              <div>
                <h3 className="font-serif text-xl font-bold text-forest-900">
                  Daily Dispatch Batches
                </h3>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  Real-time synchronization across blast-chillers and packing tables.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-forest-900 bg-ivory-100 px-3 py-1 rounded-lg">
                Date: Today
              </span>
            </div>

            <div className="space-y-4 text-xs">
              {[
                { slot: 'Morning Cycle (06:30 - 08:30)', orders: 218, progress: 95, status: 'In Transit' },
                { slot: 'Midday Office Cycle (11:00 - 13:00)', orders: 142, progress: 60, status: 'Packing & Chill' },
                { slot: 'Evening Dinner Cycle (17:30 - 19:30)', orders: 108, progress: 15, status: 'Prep Staging' },
              ].map((batch, i) => (
                <div key={i} className="p-4 rounded-2xl bg-ivory-50 border border-forest-900/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-forest-900 text-sm">{batch.slot}</h4>
                      <p className="text-charcoal-500 text-[11px] mt-0.5">{batch.orders} subscriber totes</p>
                    </div>
                    <span className="badge-tag bg-forest-900 text-ivory-50 text-[10px]">
                      {batch.status}
                    </span>
                  </div>
                  <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-citrus-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${batch.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sourcing & Supply Alerts */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-4">
            <h3 className="font-serif text-xl font-bold text-forest-900">
              Farm Supply Inbound
            </h3>
            <p className="text-xs text-charcoal-500">
              Direct agricultural procurement updates from certified partners.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900">
                <strong className="block font-bold">Organic Spinach & Mustard Greens</strong>
                <span className="text-[11px] block mt-0.5">80 kg received from Pune Regenerative Farm. Inspected & cleared.</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900">
                <strong className="block font-bold">Fresh Atlantic Salmon Fillets</strong>
                <span className="text-[11px] block mt-0.5">Chilled shipment arriving 11:30 AM for evening prep.</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-ivory-100 border border-forest-900/10 text-charcoal-700">
                <strong className="block font-bold text-forest-900">Sugarcane Fiber Meal Trays</strong>
                <span className="text-[11px] block mt-0.5">1,200 units restocked. 14 days operational buffer.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Inventory Availability Manager Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-900/10 shadow-editorial space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-forest-900">
                Daily Recipe Inventory Management
              </h3>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Toggle dish availability for incoming subscription configurations.
              </p>
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipe..."
                className="w-full px-4 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-forest-900/10 text-[11px] uppercase font-mono text-charcoal-400">
                  <th className="py-3 px-4">Dish Name</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Calories</th>
                  <th className="py-3 px-4">Allocated Units</th>
                  <th className="py-3 px-4">Kitchen Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-900/5 text-charcoal-700">
                {filtered.map((dish) => (
                  <tr key={dish.id} className="hover:bg-ivory-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-forest-900">
                      {dish.name}
                    </td>
                    <td className="py-3.5 px-4 capitalize font-mono text-[11px]">
                      {dish.mealTime}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      ~{dish.nutrition.calories} kcal
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      {dish.stockUnits} portions
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          dish.isAvailable
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${dish.isAvailable ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        <span>{dish.isAvailable ? 'Active for Cook' : '86’d / Out of Stock'}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toggleAvailability(dish.id, dish.name)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                          dish.isAvailable
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {dish.isAvailable ? 'Mark Sold Out' : 'Restore Portion'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
