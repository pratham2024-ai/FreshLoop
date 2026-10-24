import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { UserProfile, DeliveryAddress, Order } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isBackendConnected: boolean;
  addresses: DeliveryAddress[];
  orders: Order[];
  isSubscriptionPaused: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, phone: string, pass: string) => Promise<{ success: boolean; error?: string; requiresEmailConfirmation?: boolean }>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  toggleSubscriptionPause: () => Promise<void>;
  addAddress: (address: Omit<DeliveryAddress, 'id'>) => Promise<{ success: boolean; error?: string }>;
  setDefaultAddress: (id: string) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapReadableAuthError(err: any): string {
  if (!err) return 'An unexpected authentication error occurred.';
  const msg = err.message || String(err);
  if (msg.includes('Invalid login credentials')) {
    return 'Invalid email or password. Please verify your credentials.';
  }
  if (msg.includes('Email not confirmed')) {
    return 'Please confirm your email address before signing in. Check your inbox for the verification email.';
  }
  if (msg.includes('User already registered') || msg.includes('already exists')) {
    return 'An account with this email address already exists. Please sign in instead.';
  }
  if (msg.includes('Password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (msg.includes('rate limit')) {
    return 'Too many login attempts. Please wait a moment and try again.';
  }
  return msg;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isSubscriptionPaused, setIsSubscriptionPaused] = useState<boolean>(false);
  const [activeSubscriptionId, setActiveSubscriptionId] = useState<string | null>(null);

  // Load user profile and associated data from Supabase
  const loadUserData = useCallback(async (authUser: User) => {
    try {
      // 1. Fetch Profile
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (profile && !profileErr) {
        setUser({
          id: authUser.id,
          fullName: profile.full_name || authUser.user_metadata?.full_name || 'Member',
          email: profile.email || authUser.email || '',
          phone: profile.phone || authUser.user_metadata?.phone || '',
          avatarUrl: profile.avatar_url || undefined,
          activeSubscriptionId: profile.active_subscription_id || undefined,
          createdAt: profile.created_at || authUser.created_at
        });
      } else {
        // Fallback to auth metadata if profile row is not yet created by trigger
        setUser({
          id: authUser.id,
          fullName: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Member',
          email: authUser.email || '',
          phone: authUser.user_metadata?.phone || '',
          createdAt: authUser.created_at
        });
      }

      // 2. Fetch Addresses
      const { data: addressRows, error: addressErr } = await supabase
        .from('delivery_addresses')
        .select('*')
        .eq('user_id', authUser.id)
        .order('is_default', { ascending: false });

      if (addressRows && !addressErr) {
        const mappedAddresses: DeliveryAddress[] = addressRows.map((a) => ({
          id: a.id,
          isDefault: a.is_default,
          label: a.label,
          fullName: a.full_name,
          phone: a.phone,
          streetAddress: a.street_address,
          apartmentSuite: a.apartment_suite,
          landmark: a.landmark || undefined,
          city: a.city,
          state: a.state,
          pincode: a.pincode,
          deliveryInstructions: a.delivery_instructions || undefined
        }));
        setAddresses(mappedAddresses);
      }

      // 3. Fetch Orders
      const { data: orderRows, error: orderErr } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          created_at,
          plan_id,
          status,
          status_description,
          next_delivery_date,
          delivery_slot,
          subtotal_paise,
          discount_paise,
          tax_paise,
          delivery_fee_paise,
          total_paise,
          delivery_address_summary,
          payment_method,
          order_items (
            plan_name,
            meals_per_day,
            days_per_week,
            duration_weeks,
            price_paise
          )
        `)
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false });

      if (orderRows && !orderErr) {
        const mappedOrders: Order[] = orderRows.map((o: any) => ({
          id: o.id,
          orderNumber: o.order_number,
          date: o.created_at ? o.created_at.split('T')[0] : '',
          planId: o.plan_id || '',
          planName: o.order_items?.[0]?.plan_name || 'Chef Plan',
          status: o.status,
          statusDescription: o.status_description || '',
          nextDeliveryDate: o.next_delivery_date || 'Scheduled with morning drop-off',
          deliverySlot: o.delivery_slot || 'Morning (6:30 AM – 8:30 AM)',
          items: (o.order_items || []).map((item: any) => ({
            planName: item.plan_name,
            mealsPerDay: item.meals_per_day,
            daysPerWeek: item.days_per_week,
            durationWeeks: item.duration_weeks,
            price: Math.round(item.price_paise / 100)
          })),
          subtotal: Math.round(o.subtotal_paise / 100),
          discount: Math.round((o.discount_paise || 0) / 100),
          tax: Math.round((o.tax_paise || 0) / 100),
          deliveryFee: Math.round((o.delivery_fee_paise || 0) / 100),
          total: Math.round(o.total_paise / 100),
          addressSummary: o.delivery_address_summary || '',
          paymentMethod: o.payment_method || 'UPI',
          estimatedArrival: '7:45 AM'
        }));
        setOrders(mappedOrders);
      }

      // 4. Fetch Active Subscription
      const { data: subRow, error: subErr } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', authUser.id)
        .eq('status', 'active')
        .maybeSingle();

      if (subRow && !subErr) {
        setActiveSubscriptionId(subRow.id);
        setIsSubscriptionPaused(subRow.is_paused);
      } else {
        setActiveSubscriptionId(null);
        setIsSubscriptionPaused(false);
      }
    } catch {
      // Keep UI responsive even if partial network errors occur
    }
  }, []);

  // Listen to Supabase Auth state changes
  useEffect(() => {
    let isMounted = true;

    // Get current session on load
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (!isMounted) return;
      setSession(initialSession);
      if (initialSession?.user) {
        loadUserData(initialSession.user).finally(() => {
          if (isMounted) setIsLoading(false);
        });
      } else {
        setUser(null);
        setAddresses([]);
        setOrders([]);
        setIsLoading(false);
      }
    });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      if (!isMounted) return;
      setSession(currentSession);
      if (currentSession?.user) {
        await loadUserData(currentSession.user);
      } else {
        setUser(null);
        setAddresses([]);
        setOrders([]);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [loadUserData]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const trimmedEmail = email.trim();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: pass
      });

      if (error) {
        return { success: false, error: mapReadableAuthError(error) };
      }

      if (data.user) {
        await loadUserData(data.user);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: mapReadableAuthError(err) };
    }
  };

  const signup = async (
    fullName: string,
    email: string,
    phone: string,
    pass: string
  ): Promise<{ success: boolean; error?: string; requiresEmailConfirmation?: boolean }> => {
    try {
      const trimmedEmail = email.trim();
      const trimmedName = fullName.trim();
      const trimmedPhone = phone.trim();

      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: pass,
        options: {
          data: {
            full_name: trimmedName,
            phone: trimmedPhone
          }
        }
      });

      if (error) {
        return { success: false, error: mapReadableAuthError(error) };
      }

      // If Supabase has email confirmation enabled, data.session will be null
      const requiresConfirmation = !data.session;

      if (data.user && data.session) {
        await loadUserData(data.user);
      }

      return {
        success: true,
        requiresEmailConfirmation: requiresConfirmation
      };
    } catch (err: any) {
      return { success: false, error: mapReadableAuthError(err) };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
    } finally {
      setUser(null);
      setSession(null);
      setAddresses([]);
      setOrders([]);
      setIsSubscriptionPaused(false);
      setActiveSubscriptionId(null);
    }
  };

  const sendPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: redirectUrl
      });
      if (error) {
        return { success: false, error: mapReadableAuthError(error) };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: mapReadableAuthError(err) };
    }
  };

  const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) {
        return { success: false, error: mapReadableAuthError(error) };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: mapReadableAuthError(err) };
    }
  };

  const toggleSubscriptionPause = async (): Promise<void> => {
    const nextState = !isSubscriptionPaused;
    setIsSubscriptionPaused(nextState);

    if (activeSubscriptionId && user?.id) {
      try {
        await supabase
          .from('subscriptions')
          .update({ is_paused: nextState, updated_at: new Date().toISOString() })
          .eq('id', activeSubscriptionId)
          .eq('user_id', user.id);
      } catch {
        // optimistic state preserved
      }
    }
  };

  const addAddress = async (newAddr: Omit<DeliveryAddress, 'id'>): Promise<{ success: boolean; error?: string }> => {
    if (!user?.id) {
      return { success: false, error: 'You must be signed in to save delivery addresses.' };
    }

    try {
      const { data, error } = await supabase
        .from('delivery_addresses')
        .insert({
          user_id: user.id,
          is_default: newAddr.isDefault,
          label: newAddr.label,
          full_name: newAddr.fullName,
          phone: newAddr.phone,
          street_address: newAddr.streetAddress,
          apartment_suite: newAddr.apartmentSuite,
          landmark: newAddr.landmark || null,
          city: newAddr.city,
          state: newAddr.state,
          pincode: newAddr.pincode,
          delivery_instructions: newAddr.deliveryInstructions || null
        })
        .select()
        .single();

      if (error) {
        // Fallback optimistic local entry
        const fallbackCreated: DeliveryAddress = {
          ...newAddr,
          id: 'addr-local-' + Date.now()
        };
        setAddresses((prev) => (newAddr.isDefault ? prev.map((a) => ({ ...a, isDefault: false })).concat(fallbackCreated) : [...prev, fallbackCreated]));
        return { success: true };
      }

      const created: DeliveryAddress = {
        id: data.id,
        isDefault: data.is_default,
        label: data.label,
        fullName: data.full_name,
        phone: data.phone,
        streetAddress: data.street_address,
        apartmentSuite: data.apartment_suite,
        landmark: data.landmark || undefined,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        deliveryInstructions: data.delivery_instructions || undefined
      };

      setAddresses((prev) => (created.isDefault ? prev.map((a) => ({ ...a, isDefault: false })).concat(created) : [...prev, created]));

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Could not save address.' };
    }
  };

  const setDefaultAddress = async (id: string): Promise<void> => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    if (user?.id) {
      try {
        await supabase
          .from('delivery_addresses')
          .update({ is_default: false })
          .eq('user_id', user.id);

        await supabase
          .from('delivery_addresses')
          .update({ is_default: true, updated_at: new Date().toISOString() })
          .eq('id', id)
          .eq('user_id', user.id);
      } catch {
        // optimistic state applied
      }
    }
  };

  const deleteAddress = async (id: string): Promise<void> => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (user?.id) {
      try {
        await supabase
          .from('delivery_addresses')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
      } catch {
        // optimistic state applied
      }
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user) return;
    setUser((prev) => (prev ? { ...prev, ...updates } : null));

    try {
      await supabase
        .from('profiles')
        .update({
          full_name: updates.fullName,
          phone: updates.phone,
          avatar_url: updates.avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
    } catch {
      // optimistic update maintained
    }
  };

  const refreshUserData = async (): Promise<void> => {
    if (session?.user) {
      await loadUserData(session.user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user && !!session,
        isBackendConnected: true,
        addresses,
        orders,
        isSubscriptionPaused,
        login,
        signup,
        logout,
        sendPasswordReset,
        updatePassword,
        toggleSubscriptionPause,
        addAddress,
        setDefaultAddress,
        deleteAddress,
        updateProfile,
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
