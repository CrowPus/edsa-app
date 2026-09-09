import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Zap, 
  Smartphone, 
  FileText, 
  AlertCircle,
  CreditCard,
  Gauge,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import { RouteId } from '../types';
import { EDSA_HOTLINE } from '../data/edsaData';

interface HeaderProps {
  currentRoute: RouteId;
  onNavigate: (route: RouteId) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Close mobile menu on resize or navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [currentRoute]);

  const handleNavClick = (route: RouteId) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const isCurrent = (route: RouteId) => currentRoute === route;

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-inverse-canvas text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Hotline & Grid Status */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-400 uppercase text-[11px] tracking-wider">
                National Grid Operations Active
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-200">
              <span>National Toll-Free 24/7 Hotline:</span>
              <a
                href={`tel:${EDSA_HOTLINE}`}
                className="font-bold text-white bg-edsa-red hover:bg-edsa-red-hover px-2 py-0.5  text-xs inline-flex items-center gap-1 transition"
              >
                <PhoneCall className="w-3 h-3" aria-hidden="true" />
                {EDSA_HOTLINE}
              </a>
            </div>
          </div>

          {/* Right: Quick actions & portals */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <button
              type="button"
              onClick={() => handleNavClick('report-outage')}
              className="text-slate-200 hover:text-white flex items-center gap-1 font-medium transition"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-400" />
              <span>Fault Logging</span>
            </button>

            <span className="text-slate-800">|</span>

            <button
              type="button"
              onClick={() => handleNavClick('digital')}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>EDSA Digital (Beta)</span>
            </button>
            
            <span className="text-slate-800 hidden md:inline">|</span>

            <button
              type="button"
              onClick={() => handleNavClick('procurement')}
              className="hidden md:inline-flex text-slate-200 hover:text-white items-center gap-1 transition"
            >
              <span>Tenders</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group focus:outline-hidden focus:ring-2 focus:ring-red-600 py-1"
            aria-label="EDSA - Electricity Distribution and Supply Authority Homepage"
          >
            <img
              src="/edsa.png"
              alt="EDSA - Electricity Distribution and Supply Authority, Sierra Leone"
              className="h-14 sm:h-16 w-auto max-w-[200px] sm:max-w-[260px] object-contain shrink-0"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
            {/* Home */}
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-semibold transition ${
                isCurrent('home')
                  ? 'text-red-700 bg-red-50'
                  : 'text-slate-800 hover:text-[#0A1931] hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            {/* Customer Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'services'}
                onClick={() => handleNavClick('customer-services')}
                className={`px-3 py-2 text-sm font-semibold inline-flex items-center gap-1 transition ${
                  ['customer-services', 'buy-electricity', 'new-connection', 'meter-services', 'billing-payments', 'report-outage'].includes(currentRoute)
                    ? 'text-red-700 bg-red-50'
                    : 'text-slate-800 hover:text-[#0A1931] hover:bg-slate-100'
                }`}
              >
                <span>Customer Services</span>
                <ChevronDown className="w-4 h-4 text-slate-700" />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 py-2 mt-0 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Customer Care & Portals
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavClick('buy-electricity')}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-start gap-3 transition group"
                  >
                    <div className="p-1.5 bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-red-700 transition">Buy Electricity Tokens</div>
                      <div className="text-xs text-slate-800">Prepaid recharge channels & simulator</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('report-outage')}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-start gap-3 transition group"
                  >
                    <div className="p-1.5 bg-red-50 text-red-700 group-hover:bg-edsa-red group-hover:text-white transition">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-red-700 transition">Report Outage & Track</div>
                      <div className="text-xs text-slate-800">Log electrical faults & check ticket status</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('new-connection')}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-start gap-3 transition group"
                  >
                    <div className="p-1.5 bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition">
                      <PlusCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-red-700 transition">New Connection Application</div>
                      <div className="text-xs text-slate-800">Residential, commercial & industrial guides</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('meter-services')}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-start gap-3 transition group"
                  >
                    <div className="p-1.5 bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition">
                      <Gauge className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-red-700 transition">Meter Services & STS TID</div>
                      <div className="text-xs text-slate-800">Key Change Tokens & calibration</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('billing-payments')}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-start gap-3 transition group"
                  >
                    <div className="p-1.5 bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-red-700 transition">Tariffs & Billing Info</div>
                      <div className="text-xs text-slate-800">Approved SLEWRC rate categories</div>
                    </div>
                  </button>

                  <div className="p-2 border-t border-slate-100 bg-slate-50/70">
                    <button
                      type="button"
                      onClick={() => handleNavClick('customer-services')}
                      className="w-full text-center py-1.5 text-xs font-semibold text-red-700 hover:text-red-800 transition"
                    >
                      View All Customer Services →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* EDSA Digital Platform */}
            <button
              type="button"
              onClick={() => handleNavClick('digital')}
              className={`px-3 py-2 text-sm font-semibold inline-flex items-center gap-2 transition ${
                isCurrent('digital')
                  ? 'text-red-700 bg-red-50'
                  : 'text-slate-800 hover:text-[#0A1931] hover:bg-slate-100'
              }`}
            >
              <Smartphone className="w-4 h-4 text-blue-700 shrink-0" />
              <span>EDSA Digital</span>
              <span className="bg-edsa-red text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                New
              </span>
            </button>

            {/* Projects */}
            <button
              type="button"
              onClick={() => handleNavClick('projects')}
              className={`px-3 py-2 text-sm font-semibold transition ${
                isCurrent('projects')
                  ? 'text-red-700 bg-red-50'
                  : 'text-slate-800 hover:text-[#0A1931] hover:bg-slate-100'
              }`}
            >
              Projects & Grid
            </button>

            {/* News & Notices */}
            <button
              type="button"
              onClick={() => handleNavClick('news')}
              className={`px-3 py-2 text-sm font-semibold transition ${
                ['news', 'notices'].includes(currentRoute)
                  ? 'text-red-700 bg-red-50'
                  : 'text-slate-800 hover:text-[#0A1931] hover:bg-slate-100'
              }`}
            >
              News & Notices
            </button>

            {/* Procurement & Docs */}
            <button
              type="button"
              onClick={() => handleNavClick('documents')}
              className={`px-3 py-2 text-sm font-semibold transition ${
                ['documents', 'procurement'].includes(currentRoute)
                  ? 'text-red-700 bg-red-50'
                  : 'text-slate-800 hover:text-[#0A1931] hover:bg-slate-100'
              }`}
            >
              Documents & Tenders
            </button>

            {/* About & Leadership Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-expanded={activeDropdown === 'about'}
                onClick={() => handleNavClick('about')}
                className={`px-3 py-2 text-sm font-semibold inline-flex items-center gap-1 transition ${
                  ['about', 'leadership', 'careers'].includes(currentRoute)
                    ? 'text-red-700 bg-red-50'
                    : 'text-slate-800 hover:text-[#0A1931] hover:bg-slate-100'
                }`}
              >
                <span>About EDSA</span>
                <ChevronDown className="w-4 h-4 text-slate-700" />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full right-0 w-64 bg-white border border-slate-200 py-2 mt-0 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    type="button"
                    onClick={() => handleNavClick('about')}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-800 hover:text-red-700 block transition"
                  >
                    Mandate, Vision & Mission
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('leadership')}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-800 hover:text-red-700 block transition"
                  >
                    Board & Executive Leadership
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('careers')}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-800 hover:text-red-700 block transition"
                  >
                    Careers & Public Vacancies
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('support')}
                    className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm font-medium text-slate-800 hover:text-red-700 block transition"
                  >
                    Customer Care Centers (SL)
                  </button>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 text-sm font-semibold transition ${
                isCurrent('contact')
                  ? 'text-red-700 bg-red-50'
                  : 'text-slate-800 hover:text-[#0A1931] hover:bg-slate-100'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Open search dialog"
              className="p-2.5 text-slate-800 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-hidden focus:ring-2 focus:ring-red-600"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => handleNavClick('buy-electricity')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#0A1931] hover:bg-[#122B54] text-white font-semibold text-sm transition focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#0A1931]"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Buy Electricity</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              aria-expanded={mobileMenuOpen}
              className="xl:hidden p-2.5 text-slate-800 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-hidden focus:ring-2 focus:ring-red-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 max-h-[85vh] overflow-y-auto space-y-3">
          
          {/* Mobile Search button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-100 text-slate-800 text-sm mb-3"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Search services, tariffs, tenders...
            </span>
            <span className="text-xs bg-white px-2 py-0.5  border border-slate-300">Open</span>
          </button>

          {/* Mobile Hotlines */}
          <div className="p-3 bg-red-50 border border-red-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span className="text-xs font-semibold text-slate-800">24/7 Emergency Hotline:</span>
            </div>
            <a
              href={`tel:${EDSA_HOTLINE}`}
              className="font-bold text-xs bg-edsa-red text-white px-3 py-1  "
            >
              Dial {EDSA_HOTLINE}
            </a>
          </div>

          <div className="space-y-1">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('digital')}
              className="w-full text-left px-3 py-2.5 text-sm font-bold text-red-700 bg-red-50 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                EDSA Digital Platform
              </span>
              <span className="text-[10px] bg-edsa-red text-white font-bold px-1.5 py-0.5 ">NEW</span>
            </button>

            {/* Services group */}
            <div className="pt-2">
              <div className="px-3 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Customer Services
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('buy-electricity')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                • Buy Electricity (Prepaid)
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('report-outage')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 font-semibold text-red-700"
              >
                • Report Electrical Fault (672)
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('new-connection')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                • New Connection Application
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('meter-services')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                • Meter Services & STS TID
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('billing-payments')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                • Tariffs & Payment Channels
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('customer-services')}
                className="w-full text-left px-4 py-2 text-sm text-red-700 font-semibold hover:bg-slate-100 -none"
              >
                • View All Services
              </button>
            </div>

            {/* Other routes */}
            <div className="pt-2">
              <div className="px-3 text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Authority & Grid
              </div>
              <button
                type="button"
                onClick={() => handleNavClick('projects')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                Projects & Grid Infrastructure
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('news')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                News & Announcements
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('documents')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                Public Documents & Tenders
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('about')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                About EDSA Mandate & Governance
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('leadership')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                Board & Executive Management
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('careers')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                Careers & Vacancies
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('support')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                Customer Care & Regional Centers
              </button>
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="w-full text-left px-4 py-2 text-sm text-slate-800 hover:bg-slate-100 -none"
              >
                Contact & Headquarters
              </button>
            </div>

            {/* Quick Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => handleNavClick('buy-electricity')}
                className="w-full py-3 bg-[#0A1931] text-white font-bold text-center flex items-center justify-center gap-2 "
              >
                <Zap className="w-4 h-4 text-amber-400" />
                Buy Electricity (Prepaid)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
