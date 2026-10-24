import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { PrototypeNotice } from './components/common/PrototypeNotice';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import { HomePage } from './pages/HomePage';
import { PlansPage } from './pages/PlansPage';
import { PlanDetailPage } from './pages/PlanDetailPage';
import { WeeklyMenuPage } from './pages/WeeklyMenuPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DashboardPage } from './pages/DashboardPage';
import { MySubscriptionPage } from './pages/MySubscriptionPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { DeliveryAddressPage } from './pages/DeliveryAddressPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-ivory-50 text-charcoal-900 selection:bg-citrus-500 selection:text-white">
              <PrototypeNotice />
              <Navbar />

              <main className="flex-1">
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/plans" element={<PlansPage />} />
                  <Route path="/plans/:planId" element={<PlanDetailPage />} />
                  <Route path="/menu" element={<WeeklyMenuPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/story" element={<OurStoryPage />} />
                  <Route path="/about" element={<Navigate to="/story" replace />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />

                  {/* Auth Pages */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />

                  {/* Subscription Checkout */}
                  <Route path="/checkout" element={<CheckoutPage />} />

                  {/* Customer Portal (Protected Routes) */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/subscription"
                    element={
                      <ProtectedRoute>
                        <MySubscriptionPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/orders"
                    element={
                      <ProtectedRoute>
                        <MyOrdersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/addresses"
                    element={
                      <ProtectedRoute>
                        <DeliveryAddressPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Ops Portal */}
                  <Route path="/admin" element={<AdminDashboardPage />} />

                  {/* Catch-all redirect */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
