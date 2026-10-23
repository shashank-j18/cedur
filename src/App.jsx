import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import ProductsIndexPage from './pages/ProductsIndexPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import BlogListPage from './pages/BlogListPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import FaqsPage from './pages/FaqsPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import TermsOfServicePage from './pages/TermsOfServicePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }) {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsIndexPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Protected Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
