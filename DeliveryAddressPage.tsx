import React, { useState } from 'react';
import { MapPin, Plus, Trash2, Check, Home, Building, ShieldCheck, X } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const DeliveryAddressPage: React.FC = () => {
  const { addresses, setDefaultAddress, deleteAddress, addAddress } = useAuth();
  const { showToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    label: 'Home' as 'Home' | 'Work' | 'Other',
    fullName: '',
    phone: '',
    streetAddress: '',
    apartmentSuite: '',
    landmark: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
    deliveryInstructions: '',
    isDefault: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Recipient name required.';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) errs.phone = '10-digit phone required.';
    if (!form.streetAddress.trim()) errs.streetAddress = 'Street address required.';
    if (!form.pincode.trim() || form.pincode.length < 6) errs.pincode = '6-digit pincode required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addAddress(form);
    showToast('success', 'Address Saved', `Added ${form.label} delivery address.`);
    setShowAddModal(false);
    setForm({
      label: 'Home',
      fullName: '',
      phone: '',
      streetAddress: '',
      apartmentSuite: '',
      landmark: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '',
      deliveryInstructions: '',
      isDefault: false
    });
  };

  const handleDelete = (id: string, label: string) => {
    deleteAddress(id);
    showToast('info', 'Address Removed', `Deleted ${label} from your delivery locations.`);
  };

  const handleSetDefault = (id: string, label: string) => {
    setDefaultAddress(id);
    showToast('success', 'Default Address Updated', `${label} set as primary delivery destination.`);
  };

  return (
    <DashboardLayout
      activeTabTitle="Delivery Locations"
      activeTabDescription="Manage your primary home residence, office tiffin drops, and gate instructions."
    >
      <div className="space-y-6">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-forest-900/10">
          <span className="text-xs text-charcoal-500">
            {addresses.length} destinations on file
          </span>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 text-citrus-400" />
            <span>Add Delivery Address</span>
          </button>
        </div>

        {/* Saved Addresses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 rounded-3xl border transition-all ${
                addr.isDefault
                  ? 'bg-white border-forest-900 shadow-lift ring-1 ring-forest-900'
                  : 'bg-white border-forest-900/10 shadow-editorial'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="badge-tag bg-forest-900 text-ivory-50 text-[10px]">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="badge-tag bg-emerald-100 text-emerald-800 text-[10px]">
                      Default Destination
                    </span>
                  )}
                </div>

                {addresses.length > 1 && (
                  <button
                    onClick={() => handleDelete(addr.id, addr.label)}
                    className="p-1.5 text-charcoal-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <h4 className="font-serif font-bold text-forest-900 text-base">
                {addr.fullName}
              </h4>
              <p className="text-xs text-charcoal-500 font-mono mt-0.5">{addr.phone}</p>

              <div className="mt-3 text-xs text-charcoal-700 leading-relaxed space-y-1">
                <p>{addr.streetAddress}</p>
                <p>{addr.apartmentSuite}</p>
                <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                {addr.landmark && (
                  <p className="text-[11px] text-charcoal-500">Landmark: {addr.landmark}</p>
                )}
              </div>

              {addr.deliveryInstructions && (
                <div className="mt-3 pt-3 border-t border-forest-900/5 text-[11px] text-citrus-700 bg-citrus-50/50 p-2.5 rounded-xl">
                  <strong>Gate Instructions:</strong> {addr.deliveryInstructions}
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-forest-900/10 flex items-center justify-between">
                {!addr.isDefault ? (
                  <button
                    onClick={() => handleSetDefault(addr.id, addr.label)}
                    className="text-xs font-semibold text-citrus-600 hover:text-citrus-700 underline"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Primary Drop Location</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Address Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-forest-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-forest-900/10">
              <div className="flex items-center justify-between pb-4 border-b border-forest-900/10 mb-4">
                <h3 className="font-serif text-2xl font-bold text-forest-900">
                  New Delivery Location
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-charcoal-400 hover:text-charcoal-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Type pills */}
                <div>
                  <label className="text-xs font-mono uppercase text-charcoal-600 block mb-1">
                    Location Label
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Home', 'Work', 'Other'].map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => setForm({ ...form, label: l as any })}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all ${
                          form.label === l
                            ? 'bg-forest-900 text-ivory-50 shadow-sm'
                            : 'bg-ivory-100 text-charcoal-700 hover:bg-ivory-200'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">Recipient Name *</label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Komal Sharma"
                      className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                    />
                    {errors.fullName && <p className="text-[10px] text-rose-600 mt-0.5">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                    />
                    {errors.phone && <p className="text-[10px] text-rose-600 mt-0.5">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">Street Address *</label>
                  <input
                    type="text"
                    value={form.streetAddress}
                    onChange={(e) => setForm({ ...form, streetAddress: e.target.value })}
                    placeholder="House / Flat / Society"
                    className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                  />
                  {errors.streetAddress && <p className="text-[10px] text-rose-600 mt-0.5">{errors.streetAddress}</p>}
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">Apartment / Tower / Floor</label>
                  <input
                    type="text"
                    value={form.apartmentSuite}
                    onChange={(e) => setForm({ ...form, apartmentSuite: e.target.value })}
                    placeholder="Tower B, Floor 4"
                    className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">State</label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">PIN *</label>
                    <input
                      type="text"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      placeholder="400053"
                      className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                    />
                    {errors.pincode && <p className="text-[10px] text-rose-600 mt-0.5">{errors.pincode}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-charcoal-600 block mb-1">Gate / Guard Instructions</label>
                  <input
                    type="text"
                    value={form.deliveryInstructions}
                    onChange={(e) => setForm({ ...form, deliveryInstructions: e.target.value })}
                    placeholder="Leave with main gate security if unreachable"
                    className="w-full px-3 py-2 rounded-xl border border-forest-900/10 bg-ivory-50 text-xs focus:outline-none focus:border-citrus-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-forest-900 text-ivory-50 text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
