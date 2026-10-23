import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BRAND_NAME, SUPPORT_PHONE } from '../config/brand.js';
import { 
  Users, 
  Calculator, 
  Calendar, 
  Clock, 
  UserCheck, 
  Smartphone, 
  Receipt, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { API_ENDPOINTS } from '../config.js';

export const productsList = [
  {
    id: 'payroll-software',
    name: 'Payroll Software',
    desc: 'Automate EPF, ESIC, TDS, and PT with 1-click salary slips',
    icon: Calculator,
    href: '/products/payroll-software',
  },
  {
    id: 'hr-software',
    name: 'HR Software',
    desc: 'Central employee directory, digital onboarding, and documents',
    icon: Users,
    href: '/products/hr-software',
  },
  {
    id: 'leave-management',
    name: 'Leave Management',
    desc: 'Custom leave types, approval workflows, and holiday calendars',
    icon: Calendar,
    href: '/products/leave-management',
  },
  {
    id: 'attendance-management',
    name: 'Attendance Management',
    desc: 'Biometric device sync, shift tracking, and overtime calculation',
    icon: Clock,
    href: '/products/attendance-management',
  },
  {
    id: 'geofence-attendance',
    name: 'Geofence Attendance',
    desc: 'GPS perimeter check-in with selfie verification for field staff',
    icon: MapPin,
    href: '/products/geofence-attendance',
  },
  {
    id: 'employee-self-service',
    name: 'Employee Self-Service (ESS)',
    desc: 'Mobile & web portal to download salary slips and submit leaves',
    icon: UserCheck,
    href: '/products/employee-self-service',
  },
  {
    id: 'expense-reimbursement',
    name: 'Expense & Reimbursement',
    desc: 'Receipt OCR, mileage tracking, and multi-tier manager approvals',
    icon: Receipt,
    href: '/products/expense-reimbursement',
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
    desc: 'Android & iOS apps for punches, notifications, and salary slips',
    icon: Smartphone,
    href: '/products/mobile-app',
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check login state from localStorage / cookie presence
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
    setMobileMenuOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await fetch(API_ENDPOINTS.logout, { method: 'POST', credentials: 'include' });
    } catch (err) {
      // ignore
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3' : 'bg-white border-b border-slate-100 py-4'}`}>
      <div className="section-container">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label={`${BRAND_NAME} Home`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-brand-600/20 group-hover:scale-105 transition-transform">
              CE
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
                Ce<span className="text-brand-600">dur</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">HR & Payroll</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Products Dropdown */}
            <div className="relative" onMouseLeave={() => setProductsOpen(false)}>
              <button
                type="button"
                onClick={() => setProductsOpen(!productsOpen)}
                onMouseEnter={() => setProductsOpen(true)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${location.pathname.startsWith('/products') ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'}`}
                aria-expanded={productsOpen}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? 'rotate-180 text-brand-600' : 'text-slate-400'}`} />
              </button>

              {productsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-4 grid grid-cols-2 gap-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => setProductsOpen(true)}
                >
                  <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between px-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">All Modules</span>
                    <Link to="/products" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                      View all products <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {productsList.map((product) => {
                    const IconComponent = product.icon;
                    return (
                      <Link
                        key={product.id}
                        to={product.href}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                            {product.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/pricing"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${location.pathname === '/pricing' ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'}`}
            >
              Pricing
            </Link>

            <Link
              to="/blog"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${location.pathname.startsWith('/blog') ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'}`}
            >
              Blog
            </Link>

            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${location.pathname === '/about' ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'}`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${location.pathname === '/contact' ? 'text-brand-600 bg-brand-50' : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'}`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="btn-primary py-2 px-4 text-xs">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary py-2.5 px-4 text-xs"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-150 pb-4">
            <nav className="flex flex-col gap-1">
              <Link
                to="/products"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between"
              >
                <span>Products (8 Modules)</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                to="/pricing"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Pricing
              </Link>
              <Link
                to="/blog"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                Contact & Demo
              </Link>
              <Link
                to="/faqs"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                FAQs
              </Link>

              <div className="pt-3 mt-2 border-t border-slate-200 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link to="/dashboard" className="btn-primary w-full text-center">
                      Open Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="btn-secondary w-full text-center text-rose-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-secondary w-full text-center">
                      Sign In
                    </Link>
                    <Link to="/register" className="btn-primary w-full text-center">
                      Start Free Trial
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
}
