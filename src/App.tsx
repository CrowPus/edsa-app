import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Search, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  FileText, 
  Building2, 
  AlertCircle,
  ExternalLink,
  LifeBuoy,
  CreditCard,
  Gauge,
  PlusCircle,
  Briefcase,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  MapPin,
  Mail,
  ChevronRight,
  Filter,
  Users,
  Award,
  Globe,
  HelpCircle,
  Send,
  RefreshCw,
  Sliders,
  Check,
  Info,
  Calendar,
  Tag,
  Share2
} from 'lucide-react';
import { Header } from './components/Header';
import { OutageTicker } from './components/OutageTicker';
import { SearchModal } from './components/SearchModal';
import { ImagePlaceholder } from './components/ImagePlaceholder';
import { RouteId, OutageReport, NewsArticle, ProjectItem, DocumentItem, TariffBand } from './types';
import { 
  EDSA_HOTLINE, 
  EDSA_TARIFFS, 
  EDSA_REGIONAL_OFFICES, 
  EDSA_PROJECTS, 
  EDSA_NEWS, 
  EDSA_DOCUMENTS, 
  EDSA_FAQS, 
  EDSA_SERVICES,
  EDSA_LEADERSHIP,
  SIERRA_LEONE_DISTRICTS
} from './data/edsaData';

export default function App() {
  // Navigation & Route state
  const [currentRoute, setCurrentRoute] = useState<RouteId>('home');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash && [
        'home', 'customer-services', 'buy-electricity', 'new-connection', 
        'meter-services', 'billing-payments', 'report-outage', 'support', 
        'digital', 'about', 'leadership', 'projects', 'news', 'notices', 
        'procurement', 'documents', 'careers', 'contact'
      ].includes(hash)) {
        setCurrentRoute(hash as RouteId);
      } else if (!hash) {
        setCurrentRoute('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: RouteId) => {
    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-fg font-sans antialiased selection:bg-edsa-red selection:text-white">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-edsa-red text-white font-semibold  focus:outline-hidden"
      >
        Skip to main content
      </a>

      {/* 1. Global Navigation Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* 2. Urgent Outage & Maintenance Ticker Banner */}
      <OutageTicker
        onNavigate={navigate}
        onSelectNotice={(id) => {
          setSelectedNoticeId(id);
          navigate('notices');
        }}
      />

      {/* 3. Main Page Content View */}
      <main id="main-content" className="grow">
        {currentRoute === 'home' && <HomePage onNavigate={navigate} />}
        {currentRoute === 'customer-services' && <CustomerServicesPage onNavigate={navigate} />}
        {currentRoute === 'buy-electricity' && <BuyElectricityPage onNavigate={navigate} />}
        {currentRoute === 'new-connection' && <NewConnectionPage onNavigate={navigate} />}
        {currentRoute === 'meter-services' && <MeterServicesPage onNavigate={navigate} />}
        {currentRoute === 'billing-payments' && <BillingPaymentsPage onNavigate={navigate} />}
        {currentRoute === 'report-outage' && <ReportOutagePage onNavigate={navigate} />}
        {currentRoute === 'support' && <SupportPage onNavigate={navigate} />}
        {currentRoute === 'digital' && <DigitalPage onNavigate={navigate} />}
        {currentRoute === 'about' && <AboutPage onNavigate={navigate} />}
        {currentRoute === 'leadership' && <LeadershipPage onNavigate={navigate} />}
        {currentRoute === 'projects' && <ProjectsPage onNavigate={navigate} />}
        {currentRoute === 'news' && <NewsPage onNavigate={navigate} />}
        {currentRoute === 'notices' && <NoticesPage onNavigate={navigate} selectedNoticeId={selectedNoticeId} />}
        {currentRoute === 'procurement' && <ProcurementPage onNavigate={navigate} />}
        {currentRoute === 'documents' && <DocumentsPage onNavigate={navigate} />}
        {currentRoute === 'careers' && <CareersPage onNavigate={navigate} />}
        {currentRoute === 'contact' && <ContactPage onNavigate={navigate} />}
      </main>

      {/* 4. Global Government/Utility Footer */}
      <GlobalFooter onNavigate={navigate} />

      {/* 5. Global Search Modal Dialog */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}

/* =========================================================================
   PAGE 1: HOMEPAGE (All 8 Core Requested Sections)
========================================================================= */

function HomePage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [calcUnits, setCalcUnits] = useState<number>(100);
  const [calcTariff, setCalcTariff] = useState<'residential' | 'commercial'>('residential');

  // Simple token estimator
  const activeTariff = EDSA_TARIFFS.find(t => t.id === (calcTariff === 'residential' ? 'res-standard' : 'com-general')) || EDSA_TARIFFS[0];
  const rate = activeTariff?.ratePerKwh || activeTariff?.ratePerKwhNLe || 2.45;
  const estimatedCost = Math.round(calcUnits * rate);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* SECTION 1: HERO & DIGITAL GATEWAY */}
      <section className="relative bg-inverse-canvas text-white pt-8 pb-16 sm:pb-24 lg:pb-32 overflow-hidden border-b border-slate-800">
        {/* Ambient Video & Poster Backdrop */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Reduced motion static poster fallback */}
          <img
            src="/media/hero.webp"
            alt=""
            aria-hidden="true"
            className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-90 contrast-110"
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero.webp"
            className="absolute inset-0 w-full h-full object-cover opacity-40 filter brightness-95 contrast-115 motion-reduce:hidden"
            aria-hidden="true"
          >
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
          {/* Atmosphere Gradient Overlay for crisp WCAG AAA typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060F1E]/95 via-[#0A1931]/90 to-[#0A1931]/75" />
          {/* Animated subtle electrical telemetry grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1.2px,transparent_1.2px)] [background-size:28px_28px] animate-ambient-drift"></div>
          {/* Ambient energy glow pulse */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Mandate & Call to Action (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Official Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-200">
                <span className="w-2 h-2 bg-emerald-400 animate-pulse"></span>
                <span>Electricity Distribution and Supply Authority (EDSA)</span>
              </div>

              {/* Main Authority Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Powering Sierra Leone.<br />
                <span className="text-edsa-red">
                  Serving You Better.
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                Welcome to the official digital portal of the national electricity distribution authority. 
                Manage your prepaid tokens, report outages with live reference tracking, apply for new connections, 
                and discover our modern digital transformation.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('buy-electricity')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-edsa-red hover:bg-edsa-red-hover text-white font-bold text-base -900/30 transition transform active:scale-98 focus:ring-2 focus:ring-red-400 focus:outline-hidden"
                >
                  <Zap className="w-5 h-5 text-amber-300" />
                  <span>Buy Electricity (Prepaid)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('report-outage')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition focus:ring-2 focus:ring-slate-400 focus:outline-hidden"
                >
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span>Report an Outage</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('digital')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-950/60 hover:bg-blue-900/60 text-blue-200 hover:text-white font-medium text-base border border-blue-800/60 transition"
                >
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  <span>Explore EDSA Digital</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Rapid Access Stats / Trust Marks */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">672</div>
                  <div className="text-xs text-slate-200">Toll-Free 24/7 Hotline</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">24/7</div>
                  <div className="text-xs text-slate-200">National Dispatch</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-amber-400 tabular-nums">5 Provinces</div>
                  <div className="text-xs text-slate-200">Regional Coverage</div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Graphic / Infrastructure (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative overflow-hidden border border-slate-700 bg-slate-900/90 shadow-2xl">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] overflow-hidden bg-slate-950">
                  <img
                    src="/hero-image.png"
                    alt="Electricity Distribution and Supply Authority - Powering Sierra Leone"
                    className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-edsa-red text-white text-[11px] font-bold tracking-wider uppercase">
                    National Power Grid
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                    <div className="text-xs sm:text-sm font-bold">Sierra Leone Transmission & Distribution Network</div>
                    <div className="text-[11px] text-slate-300">Modernizing electricity infrastructure across all 5 provinces</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-slate-200 font-medium line-clamp-1">Interconnected Grid Network & Substation Upgrades</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold inline-flex items-center gap-1 shrink-0 ml-2"
                  >
                    View Projects <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK CUSTOMER SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5 text-blue-700" />
            Citizen & Customer Services
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
            How Can We Assist You Today?
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2">
            Access direct authority services, apply for utility connections, top-up prepaid meters, or report technical faults.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDSA_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-surface-0 p-6 border border-border hover:border-blue-400 hover:transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-surface-1 group-hover:bg-blue-900 group-hover:text-white text-blue-950 flex items-center justify-center transition">
                    <ServiceIcon iconName={srv.icon} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-surface-1 text-slate-800 border border-border">
                    {srv.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-fg group-hover:text-blue-900 transition">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavigate(srv.route)}
                  className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 group-hover:underline inline-flex items-center gap-1.5 focus:outline-hidden"
                >
                  <span>{srv.actionLabel}</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition" />
                </button>
                <span className="text-[11px] text-slate-200 font-medium">Official Portal</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: EDSA DIGITAL TRANSFORMATION SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-edsa-navy text-white p-8 sm:p-12 lg:p-16 border border-slate-800 relative overflow-hidden">
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-edsa-red/10 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modern Utility Platform • Prototype</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Your Electricity. <br />
                <span className="text-edsa-red">
                  Wherever You Are in Sierra Leone.
                </span>
              </h2>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                EDSA is undergoing an end-digital modernization. Soon, you will be able to manage your 
                prepaid electricity meters, buy instant tokens with instant receipt generation, track daily kWh consumption, 
                and log customer inquiries directly from our unified Web Portal and Mobile Apps.
              </p>

              {/* Key Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-2.5 p-3 bg-surface-0/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block">Instant Token Generation</strong>
                    <span className="text-slate-200">Fast 20-digit STS tokens via mobile money & cards.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-surface-0/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block">Multi-Meter Management</strong>
                    <span className="text-slate-200">Manage home, rental, and business meters on one account.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-surface-0/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block">Live Outage Tracker</strong>
                    <span className="text-slate-200">Direct status updates from regional dispatch engineers.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 bg-surface-0/5 border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block">Consumption Analytics</strong>
                    <span className="text-slate-200">Monitor monthly kilowatt-hour trends and tariffs.</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('digital')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base transition"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Discover EDSA Digital Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-xs text-slate-200 flex items-center gap-2">
                  <span className="px-2 py-0.5  bg-blue-900/60 border border-blue-700 text-blue-200">
                    Android & iOS Apps
                  </span>
                  <span>Coming Soon</span>
                </div>
              </div>

            </div>

            {/* Right: Digital App Graphic */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-700 p-2 shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src="/digital-platform-mobile-app.jpg.png"
                    alt="EDSA Mobile App and Web Customer Portal Interface Prototype"
                    className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-slate-950 text-[11px] font-bold tracking-wider uppercase">
                    Digital Portal Prototype
                  </div>
                </div>
                <div className="mt-3 p-3 bg-slate-800/80 text-center">
                  <p className="text-xs text-slate-200">
                    Unified Citizen & Business Experience across Web, Android, and iOS.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: ABOUT THE AUTHORITY & STATUTORY MANDATE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="overflow-hidden border border-border bg-slate-100 shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src="/edsa-headquarters.png"
                  alt="Electricity House Headquarters, 36 Siaka Stevens Street, Freetown, Sierra Leone"
                  className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-edsa-navy text-white text-[11px] font-bold tracking-wider uppercase">
                  Electricity House • Freetown
                </div>
              </div>
            </div>
            <div className="bg-surface-1 p-4 border border-border text-xs text-slate-700 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-blue-900 shrink-0" />
              <span>Electricity House, 36 Siaka Stevens Street, Freetown, Sierra Leone</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>National Utility Mandate</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
              Mandated to Power Sierra Leone’s Economic Growth and Social Welfare
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              The <strong>Electricity Distribution and Supply Authority (EDSA)</strong> was formally established 
              pursuant to the <span className="text-blue-900 font-semibold">National Electricity Act of 2011</span>. 
              As a public enterprise under the supervision of the Ministry of Energy, EDSA is tasked with the sole 
              statutory responsibility of distributing and supplying electricity to retail, commercial, and industrial 
              consumers across all districts of Sierra Leone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-surface-0 border border-border ">
                <h4 className="font-bold text-fg text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Our Core Mission
                </h4>
                <p className="text-xs text-slate-700 mt-1.5">
                  To supply reliable, safe, accessible, and affordable electricity while ensuring financial sustainability and operational excellence.
                </p>
              </div>

              <div className="p-4 bg-surface-0 border border-border ">
                <h4 className="font-bold text-fg text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  Strategic Vision
                </h4>
                <p className="text-xs text-slate-700 mt-1.5">
                  To be a modern, self-sustaining, and technologically-advanced power distribution utility serving all Sierra Leoneans.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-900 hover:text-blue-700 underline"
              >
                <span>Read Full Institutional Mandate & History</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-slate-200">•</span>

              <button
                type="button"
                onClick={() => onNavigate('leadership')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-800 hover:text-fg underline"
              >
                <span>Executive Management</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: INFRASTRUCTURE & PROJECTS SHOWCASE */}
      <section className="bg-surface-1 py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5 text-blue-800" />
                Grid Upgrades & Expansion
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
                Strengthening Sierra Leone's Electricity Infrastructure
              </h2>
              <p className="text-slate-700 text-sm sm:text-base mt-1 max-w-2xl">
                Major capital investments, sub-station modernization, and regional transmission interconnectivity programs.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-semibold text-sm transition shrink-0 self-start md:self-auto"
            >
              <span>View All Projects</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EDSA_PROJECTS.slice(0, 4).map((proj) => (
              <div 
                key={proj.id}
                className="bg-surface-0 overflow-hidden border border-border hover:transition flex flex-col justify-between"
              >
                <div>
                  <ImagePlaceholder
                    filename={proj.imagePlaceholder}
                    alt={proj.title}
                    aspect="16:9"
                    badgeText={proj.category}
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-blue-900 uppercase">
                        {proj.location}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 ${
                        proj.status === 'Ongoing' ? 'bg-amber-100 text-amber-800' :
                        proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-fg text-base leading-snug line-clamp-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-700 mt-2 line-clamp-3 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-slate-100 text-xs text-slate-800 flex items-center justify-between">
                  <span>Partners: {proj.partners ? proj.partners.split(',')[0] : 'EDSA / Ministry of Energy'}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('projects')}
                    className="text-red-600 font-bold hover:underline"
                  >
                    Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: RELIABILITY, OUTAGE REPORTING & SAFETY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-edsa-red/40 border border-red-500/50 text-red-200 text-xs font-bold uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 text-red-300" />
                <span>24/7 Rapid Response & Public Safety</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Experiencing a Blackout or Hazard? Report with Tracking.
              </h2>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
                Our national control center logs, categorizes, and dispatches rapid technical response teams 
                for transformer faults, fallen cables, and localized outages across all districts. You receive a unique 
                reference tracking number to monitor resolution progress online.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={`tel:${EDSA_HOTLINE}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-edsa-red hover:bg-edsa-red-hover text-white font-bold text-base transition focus:ring-2 focus:ring-white focus:outline-hidden"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>Call Toll-Free: {EDSA_HOTLINE}</span>
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate('report-outage')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-surface-0/10 hover:bg-surface-0/20 text-white font-semibold text-sm sm:text-base border border-white/20 transition"
                >
                  <span>Log Fault Online (With Tracker)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900/80 p-5 border border-slate-700 text-xs space-y-3">
              <div className="font-bold text-white text-sm border-b border-slate-700 pb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Electrical Safety Rules</span>
              </div>
              <p className="text-slate-200">
                ⚠️ <strong>Never touch</strong> fallen wires or poles. Stay at least 10 meters away and keep others back.
              </p>
              <p className="text-slate-200">
                ⚡ <strong>Illegal connections</strong> endanger lives and damage neighborhood transformers. Report vandalism anonymously.
              </p>
              <p className="text-slate-200 text-[11px]">
                Report power theft or illegal line taps directly to the EDSA Loss Reduction Unit via 672.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: LATEST NEWS & PUBLIC NOTICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 text-fg-strong text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5 text-slate-800" />
              Information Center
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
              News, Press Releases & Grid Advisories
            </h2>
            <p className="text-slate-700 text-sm sm:text-base mt-1">
              Stay informed with official updates from the authority's communications department.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('news')}
              className="text-xs sm:text-sm font-bold text-blue-900 hover:underline inline-flex items-center gap-1"
            >
              <span>View All News</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate('notices')}
              className="text-xs sm:text-sm font-bold text-red-600 hover:underline inline-flex items-center gap-1"
            >
              <span>Maintenance Bulletins</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDSA_NEWS.slice(0, 3).map((item) => (
            <article 
              key={item.id}
              className="bg-surface-0 overflow-hidden border border-border hover:transition flex flex-col justify-between"
            >
              <div>
                <ImagePlaceholder
                  filename={item.imagePlaceholder}
                  alt={item.title}
                  aspect="16:9"
                  badgeText={item.category}
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-800 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="font-semibold text-blue-900">{item.category}</span>
                  </div>

                  <h3 className="font-bold text-fg text-base leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 mt-2 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('news')}
                  className="font-bold text-blue-900 hover:text-red-600 inline-flex items-center gap-1"
                >
                  Read Release <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-slate-200">Official Bulletin</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 8: PUBLIC PROCUREMENT & DOWNLOADABLE DOCUMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white p-6 sm:p-8 border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Transparency & Governance
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Public Tenders, Policies & Application Forms
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                Download official EDSA documents in accordance with the National Public Procurement Act.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('procurement')}
                className="px-4 py-2 bg-edsa-red hover:bg-edsa-red-hover text-white font-semibold text-xs sm:text-sm transition"
              >
                Procurement Tenders
              </button>
              <button
                type="button"
                onClick={() => onNavigate('documents')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition border border-slate-700"
              >
                All Documents
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {EDSA_DOCUMENTS.slice(0, 4).map((doc) => (
              <div key={doc.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40 px-2 transition">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-slate-800 text-red-400 flex items-center justify-center shrink-0 border border-slate-700">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {doc.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-200 mt-1">
                      <span className="text-amber-300 font-semibold">{doc.category}</span>
                      <span>•</span>
                      <span>{doc.fileType} ({doc.fileSize})</span>
                      <span>•</span>
                      <span>Published {doc.date}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`#download-${doc.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Initiating download for official document: "${doc.title}" (${doc.fileType}, ${doc.fileSize}).`);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white text-xs font-semibold border border-blue-500/40 transition shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {doc.fileType}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* =========================================================================
   PAGE 2: CUSTOMER SERVICES HUB
========================================================================= */

function CustomerServicesPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/80 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Citizen Support & Utility Operations
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Customer Services Directory
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Welcome to the centralized hub for all EDSA customer operations. Choose a service below to 
            recharge meters, request new domestic or industrial connections, verify tariff rates, or get technical support.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EDSA_SERVICES.map((srv) => (
          <div 
            key={srv.id}
            className="bg-surface-0 p-6 border border-border hover:transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-blue-50 text-blue-900 flex items-center justify-center mb-4">
                <ServiceIcon iconName={srv.icon} />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1  bg-surface-1 text-slate-800">
                {srv.category}
              </span>
              <h3 className="text-lg font-bold text-fg mt-2">
                {srv.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                {srv.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onNavigate(srv.route)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <span>{srv.actionLabel}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Assistance Banner */}
      <div className="bg-red-50 border border-red-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-edsa-red text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-red-950 text-base">
              Need Immediate Human Assistance?
            </h3>
            <p className="text-xs sm:text-sm text-red-800">
              Our 24-hour National Customer Care line is available toll-free at <strong>672</strong> from all Sierra Leonean telecom networks.
            </p>
          </div>
        </div>

        <a
          href={`tel:${EDSA_HOTLINE}`}
          className="px-6 py-3 bg-edsa-red hover:bg-edsa-red-hover text-white font-bold text-sm shrink-0 transition"
        >
          Call 672 Now
        </a>
      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 3: BUY ELECTRICITY (Prepaid & Token Calculator)
========================================================================= */

function BuyElectricityPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [meterNumber, setMeterNumber] = useState('');
  const [amountLe, setAmountLe] = useState<number>(100);
  const [tariffType, setTariffType] = useState<'residential' | 'commercial'>('residential');
  const [simulatedToken, setSimulatedToken] = useState<string | null>(null);

  const ratePerKwh = tariffType === 'residential' ? 2.85 : 3.65;
  const estimatedKwh = (amountLe / ratePerKwh).toFixed(2);

  const handleSimulatePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meterNumber || meterNumber.length < 8) {
      alert('Please enter a valid 11 or 13-digit STS Prepaid Meter Number.');
      return;
    }
    // Generate simulated 20-digit token (formatted as 4-digit blocks)
    const part1 = Math.floor(1000 + Math.random() * 9000);
    const part2 = Math.floor(1000 + Math.random() * 9000);
    const part3 = Math.floor(1000 + Math.random() * 9000);
    const part4 = Math.floor(1000 + Math.random() * 9000);
    const part5 = Math.floor(1000 + Math.random() * 9000);
    setSimulatedToken(`${part1} ${part2} ${part3} ${part4} ${part5}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-edsa-red/30 text-red-200 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Prepaid Token Purchase & Estimator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Buy Electricity (Prepaid Recharge)
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Purchase 20-digit STS prepaid electricity tokens via authorized mobile money vendors, commercial banking portals, 
            or simulate top-up with the upcoming EDSA Digital Customer Portal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Purchase Simulator / Token Estimator (7 cols) */}
        <div className="lg:col-span-7 bg-surface-0 p-6 sm:p-8 border border-border space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-fg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Token Calculator & Purchase Simulator
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5  bg-blue-100 text-blue-900">
                Digital Prototype
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 mt-1">
              Estimate kilowatt-hours (kWh) according to SLEWRC-approved tariffs.
            </p>
          </div>

          <form onSubmit={handleSimulatePurchase} className="space-y-4">
            <div>
              <label htmlFor="meter-input" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                STS Prepaid Meter Number (11 or 13 digits) *
              </label>
              <input
                id="meter-input"
                type="text"
                maxLength={13}
                placeholder="e.g. 01429817456"
                value={meterNumber}
                onChange={(e) => setMeterNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-border-strong focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-sm font-mono"
                required
              />
              <p className="text-[11px] text-slate-800 mt-1">Found on your meter card or on the physical meter display.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Customer Tariff Category
                </label>
                <select
                  value={tariffType}
                  onChange={(e) => setTariffType(e.target.value as any)}
                  className="w-full px-3 py-2.5 border border-border-strong bg-surface-0 text-sm focus:ring-2 focus:ring-blue-600"
                >
                  <option value="residential">Residential Standard (NLE 2.85 / kWh)</option>
                  <option value="commercial">Commercial / Small Business (NLE 3.65 / kWh)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Recharge Amount (NLE)
                </label>
                <input
                  type="number"
                  min={10}
                  max={50000}
                  value={amountLe}
                  onChange={(e) => setAmountLe(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-border-strong focus:ring-2 focus:ring-blue-600 text-sm font-bold"
                />
              </div>
            </div>

            {/* Quick amount chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[50, 100, 200, 500, 1000, 2500].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmountLe(amt)}
                  className={`px-3 py-1 text-xs font-semibold border transition ${
                    amountLe === amt
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-surface-1 hover:bg-slate-200 text-slate-800 border-border'
                  }`}
                >
                  NLE {amt}
                </button>
              ))}
            </div>

            {/* Computation Result Card */}
            <div className="p-4 bg-canvas border border-border grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-800 block">Estimated Units:</span>
                <span className="text-xl sm:text-2xl font-black text-blue-950 tabular-nums">
                  {estimatedKwh} <span className="text-xs font-semibold text-slate-700">kWh</span>
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-800 block">Total Payable:</span>
                <span className="text-xl sm:text-2xl font-black text-red-600 tabular-nums">
                  NLE {amountLe.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-edsa-red hover:bg-edsa-red-hover text-white font-bold text-sm sm:text-base transition flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 text-amber-300" />
              <span>Generate Simulated 20-Digit Token</span>
            </button>
          </form>

          {/* Generated Simulated Token Output */}
          {simulatedToken && (
            <div className="p-5 bg-emerald-50 border border-emerald-300 space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Simulated STS Token Generated
                </span>
                <span className="text-[11px] text-emerald-700 font-mono">Meter: {meterNumber}</span>
              </div>

              <div className="bg-surface-0 p-4 border border-emerald-200 text-center font-mono text-xl sm:text-2xl font-black text-fg tracking-widest selection:bg-emerald-200">
                {simulatedToken}
              </div>

              <div className="text-xs text-emerald-900 flex items-center justify-between">
                <span>Units Credited: <strong>{estimatedKwh} kWh</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(simulatedToken.replace(/\s/g, ''));
                    alert('Token copied to clipboard!');
                  }}
                  className="font-bold text-emerald-800 underline hover:text-emerald-950"
                >
                  Copy Token
                </button>
              </div>
              <p className="text-[11px] text-slate-800 border-t border-emerald-200 pt-2">
                Note: In the live production system, entering this token on your CIU (Customer Interface Unit) keypad followed by the blue/enter button will credit your meter balance.
              </p>
            </div>
          )}

        </div>

        {/* Right Column: Authorized Payment Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-0 p-6 border border-border space-y-4">
            <h3 className="font-bold text-fg text-lg flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-900" />
              Authorized Payment Channels
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              You can purchase official EDSA electricity tokens 24/7 across Sierra Leone using:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-canvas border border-border flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                  OM
                </div>
                <div>
                  <h4 className="font-bold text-fg text-sm">Orange Money</h4>
                  <p className="text-xs text-slate-700 mt-0.5">Dial <strong>#144#</strong> → Bill Payments → EDSA → Enter Meter & Amount.</p>
                </div>
              </div>

              <div className="p-3.5 bg-canvas border border-border flex items-start gap-3">
                <div className="w-8 h-8 bg-edsa-red text-white font-black text-xs flex items-center justify-center shrink-0">
                  AM
                </div>
                <div>
                  <h4 className="font-bold text-fg text-sm">Afrimoney (Africell)</h4>
                  <p className="text-xs text-slate-700 mt-0.5">Dial <strong>*161#</strong> → Pay Bills → Electricity (EDSA) → Enter Details.</p>
                </div>
              </div>

              <div className="p-3.5 bg-canvas border border-border flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                  CB
                </div>
                <div>
                  <h4 className="font-bold text-fg text-sm">Commercial Banking Apps & USSD</h4>
                  <p className="text-xs text-slate-700 mt-0.5">Rokel Commercial Bank, Sierra Leone Commercial Bank (SLCB), UBA, EcoBank, Zenith Bank.</p>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  DP
                </div>
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">EDSA Digital Customer Portal</h4>
                  <p className="text-xs text-amber-900 mt-0.5">Integrated multi-meter web and mobile app token top-up (Launch Prototype).</p>
                </div>
              </div>
            </div>
          </div>

          {/* STS Rollover Reminder */}
          <div className="bg-blue-950 text-white p-6 border border-blue-900 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>STS TID Rollover Key Change</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Has your meter been updated with the 2-step Key Change Tokens (KCT)? All STS prepaid meters require key rollover 
              to continue accepting recharge tokens.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('meter-services')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 underline inline-flex items-center gap-1"
            >
              Read Step-by-Step Rollover Instructions →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 4: NEW CONNECTION (Step-by-step Workflow & Requirements)
========================================================================= */

function NewConnectionPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/80 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
            Grid Connection Service
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Apply for a New Electricity Connection
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Step-by-step guidance, documentation requirements, certified electrician inspection protocols, 
            and tariff schedules for residential, commercial, and three-phase industrial connections in Sierra Leone.
          </p>
        </div>
      </div>

      {/* 5-Step Process Workflow */}
      <div className="bg-surface-0 p-6 sm:p-8 border border-border space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-extrabold text-fg">
            5-Step Standard Connection Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 mt-1">
            Standardized across all EDSA District Service Centers under SLEWRC service standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { step: '01', title: 'Application Form', desc: 'Download and fill out the official EDSA New Connection Form.' },
            { step: '02', title: 'Wiring Certificate', desc: 'Submit building wiring certification signed by a licensed electrician.' },
            { step: '03', title: 'Site Inspection', desc: 'EDSA technical engineers inspect premises and transformer capacity.' },
            { step: '04', title: 'Fee Payment', desc: 'Pay approved connection and meter fees at any designated bank.' },
            { step: '05', title: 'Meter & Energize', desc: 'Prepaid meter installed, tested, and premises connected to grid.' }
          ].map((s) => (
            <div key={s.step} className="p-4 bg-canvas border border-border text-center space-y-2">
              <div className="w-10 h-10 bg-blue-900 text-white font-black text-sm flex items-center justify-center mx-auto ">
                {s.step}
              </div>
              <h3 className="font-bold text-fg text-sm">{s.title}</h3>
              <p className="text-xs text-slate-700 leading-normal">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Categories & Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Residential Single Phase */}
        <div className="bg-surface-0 p-6 border border-border space-y-4">
          <div className="w-10 h-10 bg-blue-100 text-blue-900 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-fg text-lg">Residential (Single-Phase)</h3>
          <p className="text-xs text-slate-700">For domestic households, apartments, and private compounds.</p>
          
          <ul className="space-y-2 text-xs text-slate-800 pt-2 border-t border-slate-100">
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Copy of National ID / Passport</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Proof of ownership (Title Deed or Local Council Rate receipt)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Certified Electrician Inspection Certificate</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Passport-sized photograph</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('documents')}
              className="w-full py-2 bg-surface-1 hover:bg-slate-200 text-fg font-bold text-xs transition"
            >
              Download Residential Form
            </button>
          </div>
        </div>

        {/* Commercial Single / Three Phase */}
        <div className="bg-surface-0 p-6 border border-border space-y-4">
          <div className="w-10 h-10 bg-amber-100 text-amber-900 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-fg text-lg">Commercial / Small Business</h3>
          <p className="text-xs text-slate-700">For retail stores, offices, hotels, and service enterprises.</p>
          
          <ul className="space-y-2 text-xs text-slate-800 pt-2 border-t border-slate-100">
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Business Registration Certificate</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Tenancy agreement or property title</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Load assessment schedule (kVA requirement)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Tax Identification Number (TIN)</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('documents')}
              className="w-full py-2 bg-surface-1 hover:bg-slate-200 text-fg font-bold text-xs transition"
            >
              Download Commercial Form
            </button>
          </div>
        </div>

        {/* Industrial High Voltage / Transformer */}
        <div className="bg-surface-0 p-6 border border-border space-y-4">
          <div className="w-10 h-10 bg-red-100 text-red-900 flex items-center justify-center">
            <Zap className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-bold text-fg text-lg">Industrial & Bulk Supply</h3>
          <p className="text-xs text-slate-700">For manufacturing plants, mining facilities, and dedicated substations.</p>
          
          <ul className="space-y-2 text-xs text-slate-800 pt-2 border-t border-slate-100">
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Full Environmental Protection Agency (EPA) clearance</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Comprehensive electrical engineering load diagrams</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Dedicated substation agreement with EDSA Engineering</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Corporate guarantees & Power Purchase Terms</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs transition"
            >
              Contact Industrial Desk
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 5: METER SERVICES & STS TID ROLLOVER
========================================================================= */

function MeterServicesPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            Metering Operations & Calibration
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Prepaid & Smart Meter Services
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Essential guidelines for STS Prepaid Meters, key change token (KCT) rollover instructions, 
            smart meter rollouts, tamper protection, and meter testing requests.
          </p>
        </div>
      </div>

      {/* STS TID ROLLOVER SPECIAL NOTICE */}
      <div className="bg-amber-50 border-2 border-amber-400 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-amber-950">
              National STS TID Rollover (Key Change Tokens)
            </h2>
            <p className="text-xs sm:text-sm text-amber-900">
              All Standard Transfer Specification (STS) prepayment meters worldwide require a rollover key change.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
          When you receive your 2 sets of 20-digit Key Change Tokens (KCT-1 and KCT-2) alongside your regular electricity purchase:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-surface-0 border border-amber-200 space-y-1.5">
            <span className="text-xs font-bold text-amber-800 uppercase block">Step 1</span>
            <h4 className="font-bold text-fg text-sm">Enter Token 1 (KCT-1)</h4>
            <p className="text-xs text-slate-700">Enter the first 20 digits on your keypad and press the blue/enter button. Wait for acceptance.</p>
          </div>

          <div className="p-4 bg-surface-0 border border-amber-200 space-y-1.5">
            <span className="text-xs font-bold text-amber-800 uppercase block">Step 2</span>
            <h4 className="font-bold text-fg text-sm">Enter Token 2 (KCT-2)</h4>
            <p className="text-xs text-slate-700">Enter the second 20 digits and press enter. Your meter base date is now successfully updated.</p>
          </div>

          <div className="p-4 bg-surface-0 border border-amber-200 space-y-1.5">
            <span className="text-xs font-bold text-emerald-800 uppercase block">Step 3</span>
            <h4 className="font-bold text-fg text-sm">Enter Recharge Token</h4>
            <p className="text-xs text-slate-700">Enter the third 20-digit electricity recharge token to credit your units.</p>
          </div>
        </div>
      </div>

      {/* Meter Types & Technical Guidance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-surface-0 p-6 sm:p-8 border border-border space-y-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-900 flex items-center justify-center">
            <Gauge className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-fg">Prepayment Split Meters (CIU)</h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Split prepayment meters comprise a Measurement and Control Unit (MCU) mounted on the pole/distribution box 
            and a Customer Interface Unit (CIU) located inside your premises. This architecture protects against tampering 
            and allows convenient keypad token entry.
          </p>

          <div className="space-y-2 pt-2 text-xs text-slate-800">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Check remaining kWh balance anytime on CIU screen</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Audible low-credit alarm warning at 15 kWh remaining</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Historical consumption memory</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-0 p-6 sm:p-8 border border-border space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-900 flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-fg">Advanced AMI Smart Meters</h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            As part of our national modernization program, EDSA is rolling out Advanced Metering Infrastructure (AMI). 
            Smart meters transmit automated remote readings via cellular telemetry, enable instant remote token loading, 
            and detect line faults instantly.
          </p>

          <div className="space-y-2 pt-2 text-xs text-slate-800">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Direct integration with upcoming EDSA Mobile App</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Automated fault telemetry to National Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>No manual meter reading visits required</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 6: BILLING & APPROVED TARIFFS
========================================================================= */

function BillingPaymentsPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            Approved National Tariffs
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tariffs & Billing Structure
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Official retail electricity tariff schedule gazetted and approved by the Sierra Leone 
            Electricity and Water Regulatory Commission (SLEWRC).
          </p>
        </div>
      </div>

      {/* Tariff Table */}
      <div className="bg-surface-0 border border-border overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-fg">
              Current Approved Tariff Rates (Sierra Leone Leones)
            </h2>
            <p className="text-xs text-slate-800">Effective for all grid-connected customers across all provinces.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 self-start">
            SLEWRC Approved
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-canvas text-slate-800 font-bold border-b border-border uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">Tariff Band / Class</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Rate per kWh (NLE)</th>
                <th className="py-3.5 px-6">Monthly Fixed Charge</th>
                <th className="py-3.5 px-6">Notes / Applicability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {EDSA_TARIFFS.map((t) => (
                <tr key={t.id} className="hover:bg-canvas/80 transition">
                  <td className="py-4 px-6 font-bold text-fg">{t.name}</td>
                  <td className="py-4 px-6">{t.category}</td>
                  <td className="py-4 px-6 font-mono font-bold text-blue-900 text-base">
                    NLE {t.ratePerKwh.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 font-mono">
                    {t.fixedCharge > 0 ? `NLE ${t.fixedCharge.toFixed(2)}` : 'Nil'}
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-800">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 7: REPORT OUTAGE & LIVE TICKET TRACKER
========================================================================= */

function ReportOutagePage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [district, setDistrict] = useState(SIERRA_LEONE_DISTRICTS[0]);
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [outageType, setOutageType] = useState('Total Blackout (Neighborhood)');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<OutageReport | null>(null);

  // Status Lookup state
  const [lookupTicketId, setLookupTicketId] = useState('');
  const [lookupResult, setLookupResult] = useState<OutageReport | null>(null);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!area || !address || !contactPhone) {
      alert('Please fill out all required fields.');
      return;
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newReport: OutageReport = {
      referenceNumber: `EDSA-REP-2025-${randomNum}`,
      district,
      area,
      address,
      meterNumber: meterNumber || undefined,
      outageType: outageType as any,
      reportedAt: new Date().toLocaleString(),
      status: 'Received & Logged',
      estimatedResolution: '2 to 4 hours (Team Dispatched)',
      notes: 'Logged into National Dispatch system. Field dispatch unit notified.'
    };

    setSubmittedTicket(newReport);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupTicketId.trim()) return;

    if (submittedTicket && lookupTicketId.trim().toUpperCase() === submittedTicket.referenceNumber) {
      setLookupResult(submittedTicket);
    } else {
      // Mock result for demo
      setLookupResult({
        referenceNumber: lookupTicketId.trim().toUpperCase(),
        district: 'Western Area Urban',
        area: 'Congo Cross / Wilberforce',
        address: 'Main Road Substation Sector',
        outageType: 'Distribution Line Fault',
        reportedAt: 'Today at 09:30 AM',
        status: 'In Progress (Engineers on Site)',
        estimatedResolution: 'Within 90 minutes',
        notes: 'Transformer fuse replacement and line safety clearance in progress.'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-edsa-red/30 text-red-200 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            24/7 Outage & Fault Reporting
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Report an Outage or Electrical Hazard
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Report blackouts, transformer trips, fallen lines, or low-voltage faults. 
            Every report generates a verifiable tracking reference monitored by the National Dispatch Center.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Reporting Form (7 cols) */}
        <div className="lg:col-span-7 bg-surface-0 p-6 sm:p-8 border border-border space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-fg">
              Log Fault Report Online
            </h2>
            <p className="text-xs text-slate-800 mt-1">
              For immediate physical danger (sparking wire, fire), dial Toll-Free <strong>672</strong> immediately.
            </p>
          </div>

          <form onSubmit={handleReportSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  District *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border-strong bg-surface-0 text-sm focus:ring-2 focus:ring-blue-600"
                >
                  {SIERRA_LEONE_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Community / Area Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aberdeen, Lumley, Kissy, Bo Town"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Street Address / Nearest Landmark *
              </label>
              <input
                type="text"
                placeholder="e.g. 14 Wilkinson Road, Opposite Total Station"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Outage / Fault Category *
                </label>
                <select
                  value={outageType}
                  onChange={(e) => setOutageType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border-strong bg-surface-0 text-sm focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Total Blackout (Neighborhood)">Total Blackout (Neighborhood)</option>
                  <option value="Single House Outage (Neighbors have light)">Single House Outage (Neighbors have light)</option>
                  <option value="Low Voltage / Fluctuating Power">Low Voltage / Fluctuating Power</option>
                  <option value="Transformer Sparking / Blown Fuse">Transformer Sparking / Blown Fuse</option>
                  <option value="Fallen Pole / Damaged Cable">Fallen Pole / Damaged Cable (Urgent)</option>
                  <option value="Meter Fault / Burning Smell">Meter Fault / Burning Smell</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Prepaid Meter Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 01429817456"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mohamed Kamara"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Phone Number (For SMS Updates) *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +232 76 000000"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Additional Fault Details
              </label>
              <textarea
                rows={3}
                placeholder="Provide any details such as loud noises, time power went off, or landmarks..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-edsa-red hover:bg-edsa-red-hover text-white font-bold text-sm sm:text-base transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Fault Report to National Dispatch</span>
            </button>
          </form>

          {/* Submitted Ticket Confirmation Card */}
          {submittedTicket && (
            <div className="p-6 bg-slate-900 text-white border border-slate-700 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Report Successfully Dispatched
                </span>
                <span className="text-xs text-slate-200">{submittedTicket.reportedAt}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-slate-200 block">Your Official Tracking Reference:</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-wider">
                    {submittedTicket.referenceNumber}
                  </span>
                </div>
                <div className="px-3 py-1  bg-blue-900/60 border border-blue-700 text-xs font-semibold text-blue-200">
                  Status: {submittedTicket.status}
                </div>
              </div>

              <div className="text-xs text-slate-200 space-y-1 bg-slate-800/60 p-3 -none">
                <p><strong>Location:</strong> {submittedTicket.address}, {submittedTicket.area} ({submittedTicket.district})</p>
                <p><strong>Category:</strong> {submittedTicket.outageType}</p>
                <p><strong>Estimated Response:</strong> {submittedTicket.estimatedResolution}</p>
              </div>

              <p className="text-[11px] text-slate-200">
                Please save this reference number. You can check real-time progress using the tracker below or quoting it when calling Toll-Free 672.
              </p>
            </div>
          )}

        </div>

        {/* Right: Live Ticket Lookup & Status Checker (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-0 p-6 border border-border space-y-4">
            <h3 className="font-bold text-fg text-lg flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-900" />
              Check Outage Ticket Status
            </h3>
            <p className="text-xs text-slate-700">
              Enter your reference number (e.g. <code>EDSA-REP-2025-XXXXX</code>) to view live engineer dispatch status.
            </p>

            <form onSubmit={handleLookup} className="space-y-3">
              <input
                type="text"
                placeholder="EDSA-REP-2025-..."
                value={lookupTicketId}
                onChange={(e) => setLookupTicketId(e.target.value)}
                className="w-full px-3 py-2.5 border border-border-strong text-sm font-mono uppercase"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm transition"
              >
                Track Status
              </button>
            </form>

            {lookupResult && (
              <div className="p-4 bg-canvas border border-border text-xs space-y-2 mt-4">
                <div className="flex items-center justify-between font-bold text-fg">
                  <span className="font-mono text-blue-900">{lookupResult.referenceNumber}</span>
                  <span className="px-2 py-0.5  bg-emerald-100 text-emerald-800 text-[10px]">
                    {lookupResult.status}
                  </span>
                </div>
                <p className="text-slate-700"><strong>Area:</strong> {lookupResult.area} ({lookupResult.district})</p>
                <p className="text-slate-700"><strong>Category:</strong> {lookupResult.outageType}</p>
                <p className="text-slate-700"><strong>Notes:</strong> {lookupResult.notes}</p>
              </div>
            )}
          </div>

          <div className="bg-slate-900 text-white p-6 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-red-400" />
              Regional Emergency Dispatch Centers
            </h4>
            <div className="space-y-2 text-xs text-slate-200">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Western Area Dispatch:</span>
                <span className="font-mono text-slate-100">+232 76 672672</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Southern Province (Bo):</span>
                <span className="font-mono text-slate-100">+232 78 672001</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span>Eastern Province (Kenema):</span>
                <span className="font-mono text-slate-100">+232 78 672002</span>
              </div>
              <div className="flex justify-between">
                <span>Northern Province (Makeni):</span>
                <span className="font-mono text-slate-100">+232 78 672003</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 8: SUPPORT & REGIONAL OFFICES
========================================================================= */

function SupportPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <LifeBuoy className="w-3.5 h-3.5 text-amber-400" />
            Customer Care & Regional Reach
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Customer Support & Regional Service Centers
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Find physical EDSA customer service centers across all provinces, access FAQs, 
            or reach our dedicated 24/7 National Call Center.
          </p>
        </div>
      </div>

      {/* Regional Customer Care Centers Directory */}
      <div className="space-y-6">
        <div className="border-b border-border pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-fg">
            Regional Service Centers & Commercial Offices
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 mt-1">
            Walk into any of our customer centers for token support, bill inquiries, and connection applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDSA_REGIONAL_OFFICES.map((off) => (
            <div key={off.id} className="bg-surface-0 p-6 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 uppercase">
                  {off.region}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5  bg-emerald-100 text-emerald-800">
                  Open
                </span>
              </div>

              <h3 className="font-bold text-fg text-base">{off.name}</h3>

              <div className="space-y-2 text-xs text-slate-700 pt-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{off.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-blue-900 shrink-0" />
                  <span className="font-mono">{off.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-200 shrink-0" />
                  <span>{off.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-surface-0 p-6 sm:p-8 border border-border space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-fg">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 mt-1">
            Common questions regarding tokens, billing, outages, and meter replacements.
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {EDSA_FAQS.map((faq) => (
            <div key={faq.id} className="py-4">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full text-left flex items-center justify-between gap-4 font-bold text-fg text-sm sm:text-base hover:text-blue-900 focus:outline-hidden"
              >
                <span>{faq.question}</span>
                <ChevronRight className={`w-5 h-5 text-slate-200 transform transition-transform ${openFaq === faq.id ? 'rotate-90' : ''}`} />
              </button>
              {openFaq === faq.id && (
                <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed pl-2 border-l-2 border-blue-900 animate-in fade-in">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 9: EDSA DIGITAL TRANSFORMATION PORTAL
========================================================================= */

function DigitalPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-white p-8 sm:p-12 border border-border-inverse space-y-6">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Digital Transformation Initiative • Prototype
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The EDSA Digital Ecosystem
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            As part of Sierra Leone’s national public sector modernization, EDSA is introducing a complete digital 
            suite empowering citizens, commercial clients, and engineers with instant access to power services.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 bg-surface-0/5 border border-white/10">
            <h4 className="font-bold text-white text-sm">1. Web Customer Portal</h4>
            <p className="text-xs text-slate-200 mt-1">Full-featured desktop dashboard for bill payment, token records, and new connection tracking.</p>
          </div>
          <div className="p-4 bg-surface-0/5 border border-white/10">
            <h4 className="font-bold text-white text-sm">2. Android App</h4>
            <p className="text-xs text-slate-200 mt-1">Native Android app with biometric login, mobile money token generation, and push outage alerts.</p>
          </div>
          <div className="p-4 bg-surface-0/5 border border-white/10">
            <h4 className="font-bold text-white text-sm">3. iOS App</h4>
            <p className="text-xs text-slate-200 mt-1">Sleek Apple iOS experience with Apple Pay, multi-property meter grouping, and live support chat.</p>
          </div>
          <div className="p-4 bg-surface-0/5 border border-white/10">
            <h4 className="font-bold text-white text-sm">4. Operations Dashboard</h4>
            <p className="text-xs text-slate-200 mt-1">Internal dispatch command center for grid telemetry, load distribution, and technician routing.</p>
          </div>
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-blue-800" />
            Citizen Mobile Features
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
            Designed for Speed, Clarity, and Total Reliability
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Citizens will no longer need to queue at commercial vendor booths or worry about lost printed token slips. 
            All token purchases are stored indefinitely with PDF receipts and SMS delivery.
          </p>

          <div className="space-y-3">
            {[
              { title: 'One-Tap Token Generation', desc: 'Buy tokens in under 15 seconds using Orange Money, Afrimoney, or Bank Cards.' },
              { title: 'Multi-Meter Management', desc: 'Label and monitor meters for your family home, shop, and rental apartments.' },
              { title: 'Low-Credit Alerts', desc: 'Receive automated notifications when your smart meter drops below 15 kWh.' },
              { title: 'Outage Push Notifications', desc: 'Stay informed about scheduled grid maintenance in your specific ward or street.' }
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 bg-surface-0 border border-border">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-fg text-sm">{f.title}</h4>
                  <p className="text-xs text-slate-700">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('buy-electricity')}
              className="px-6 py-3 bg-edsa-red hover:bg-edsa-red-hover text-white font-bold text-sm transition"
            >
              Test Token Simulator
            </button>
          </div>
        </div>

        <div>
          <div className="bg-slate-900 p-3 border border-slate-700 shadow-xl overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
              <img
                src="/digital-platform-mobile-app.jpg.png"
                alt="EDSA Mobile App and Web Customer Portal Interface Prototype"
                className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-slate-950 text-[11px] font-bold tracking-wider uppercase">
                Digital UI Showcase
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Telemetry & Smart Substation Transformation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-8 border-t border-border">
        <div className="order-2 lg:order-1">
          <div className="bg-slate-900 p-3 border border-slate-700 shadow-xl overflow-hidden">
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
              <img
                src="/hero-edsa-infrastructure.png"
                alt="EDSA National Transmission Grid, SCADA Substation & Infrastructure"
                className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-edsa-red text-white text-[11px] font-bold tracking-wider uppercase">
                SCADA & Smart Grid Telemetry
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5 text-emerald-800" />
            Grid Infrastructure Integration
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight">
            Physical Substation Telemetry Connected Directly to Digital Services
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Our digital transformation extends beyond apps into our physical national grid. Automated feeder substations,
            transformer load sensors, and computerized SCADA telemetry report status updates directly to our national control room
            and citizen outage tracking systems.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-surface-0 border border-border">
              <div className="text-xl font-bold text-fg tabular-nums">225 kV</div>
              <div className="text-xs text-slate-600">CLSG Regional Interconnection</div>
            </div>
            <div className="p-3 bg-surface-0 border border-border">
              <div className="text-xl font-bold text-emerald-600 tabular-nums">&lt; 15 min</div>
              <div className="text-xs text-slate-600">Automated Fault Isolation</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 10: ABOUT EDSA (Mandate, Vision, Governance)
========================================================================= */

function AboutPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            Institutional Profile
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About the Authority
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            The Electricity Distribution and Supply Authority (EDSA) is the statutory public enterprise 
            responsible for the retail distribution and commercial supply of electricity across the Republic of Sierra Leone.
          </p>
        </div>
      </div>

      {/* Statutory Mandate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-8 bg-surface-0 p-6 sm:p-8 border border-border space-y-6">
          <h2 className="text-2xl font-extrabold text-fg">
            Statutory Establishment & Legal Mandate
          </h2>
          
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 space-y-4 leading-relaxed">
            <p>
              Prior to 2011, electricity generation, transmission, and distribution in Sierra Leone were consolidated 
              under the National Power Authority (NPA). To enhance efficiency, transparency, and operational specialization, 
              the Parliament of Sierra Leone enacted the <strong>National Electricity Act, 2011</strong>.
            </p>
            <p>
              This landmark legislation unbundled the power sector into two distinct entities:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>EGTC (Electricity Generation and Transmission Company):</strong> Mandated to generate and transmit bulk high-voltage electricity.</li>
              <li><strong>EDSA (Electricity Distribution and Supply Authority):</strong> Mandated to distribute, supply, meter, and retail electricity to all categories of consumers throughout Sierra Leone.</li>
            </ul>
            <p>
              EDSA operates under the policy supervision of the <strong>Ministry of Energy</strong> and is regulated by the 
              <strong>Sierra Leone Electricity and Water Regulatory Commission (SLEWRC)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-canvas border border-border">
              <span className="text-xs font-bold text-blue-900 block mb-1">Integrity</span>
              <p className="text-xs text-slate-700">Ethical stewardship of national power resources and transparent public accountability.</p>
            </div>
            <div className="p-4 bg-canvas border border-border">
              <span className="text-xs font-bold text-blue-900 block mb-1">Reliability</span>
              <p className="text-xs text-slate-700">Continuous commitment to grid uptime, rapid fault rectification, and safety standards.</p>
            </div>
            <div className="p-4 bg-canvas border border-border">
              <span className="text-xs font-bold text-blue-900 block mb-1">Innovation</span>
              <p className="text-xs text-slate-700">Adopting smart metering, digital payments, and modern telemetry for national growth.</p>
            </div>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-6 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">
              Institutional Facts
            </h3>
            <div className="space-y-3 text-xs text-slate-200">
              <div>
                <span className="text-slate-200 block">Parent Ministry:</span>
                <strong className="text-white">Ministry of Energy, Sierra Leone</strong>
              </div>
              <div>
                <span className="text-slate-200 block">Enabling Law:</span>
                <strong className="text-white">National Electricity Act, 2011</strong>
              </div>
              <div>
                <span className="text-slate-200 block">Sector Regulator:</span>
                <strong className="text-white">SLEWRC</strong>
              </div>
              <div>
                <span className="text-slate-200 block">Headquarters:</span>
                <strong className="text-white">Electricity House, Freetown</strong>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
            <strong className="block font-bold">Leadership & Board:</strong>
            <p className="text-blue-800">
              View the members of the Board of Directors and Executive Management steering the Authority.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('leadership')}
              className="font-bold text-blue-950 underline"
            >
              Meet the Leadership Team →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 11: LEADERSHIP DIRECTORY
========================================================================= */

function LeadershipPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            Executive Governance
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Leadership & Management Directory
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            The Board of Directors and Executive Management directing EDSA's technical operations, 
            capital investments, and customer delivery.
          </p>
        </div>
      </div>

      {/* Leadership Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EDSA_LEADERSHIP.map((leader) => (
          <div key={leader.id} className="bg-surface-0 overflow-hidden border border-border flex flex-col justify-between">
            <div>
              <ImagePlaceholder
                filename={leader.imagePlaceholder}
                alt={leader.name}
                aspect="4:3"
                badgeText={leader.category}
              />
              <div className="p-5">
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block mb-1">
                  {leader.role}
                </span>
                <h3 className="font-bold text-fg text-lg">{leader.name}</h3>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">{leader.bio}</p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2 border-t border-slate-100 text-xs text-slate-200">
              Official Executive Profile
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 12: PROJECTS & INFRASTRUCTURE
========================================================================= */

function ProjectsPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Transmission & Interconnection', 'Distribution Rehabilitation', 'Rural Electrification', 'Smart Metering & Technology'];

  const filteredProjects = filter === 'All' 
    ? EDSA_PROJECTS 
    : EDSA_PROJECTS.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Capital Development & Grid Expansion
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Major Projects & Infrastructure
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Explore national electrification initiatives, regional power pool interconnections (CLSG), 
            distribution network upgrades, and metering modernization programs across Sierra Leone.
          </p>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-xs font-bold transition ${
              filter === cat 
                ? 'bg-blue-900 text-white ' 
                : 'bg-surface-0 text-slate-800 hover:bg-surface-1 border border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="bg-surface-0 overflow-hidden border border-border flex flex-col justify-between">
            <div>
              <ImagePlaceholder
                filename={proj.imagePlaceholder}
                alt={proj.title}
                aspect="16:9"
                badgeText={proj.category}
              />
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-900 uppercase">{proj.location}</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 ${
                    proj.status === 'Ongoing' ? 'bg-amber-100 text-amber-800' :
                    proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-fg leading-snug">{proj.title}</h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-2.5 leading-relaxed">{proj.description}</p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-slate-100 bg-canvas/60 text-xs text-slate-800 space-y-1">
              <div><strong>Development Partners:</strong> {proj.partners}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 13: NEWS & PRESS RELEASES
========================================================================= */

function NewsPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            Official Communications
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            News & Press Releases
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Latest press statements, stakeholder updates, and general news from EDSA.
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDSA_NEWS.map((item) => (
          <article key={item.id} className="bg-surface-0 overflow-hidden border border-border flex flex-col justify-between">
            <div>
              <ImagePlaceholder
                filename={item.imagePlaceholder}
                alt={item.title}
                aspect="16:9"
                badgeText={item.category}
              />
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-800 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="font-semibold text-blue-900">{item.category}</span>
                </div>
                <h3 className="font-bold text-fg text-base leading-snug">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">{item.summary}</p>
              </div>
            </div>

            <div className="p-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-200 font-medium">Published by EDSA PR</span>
              <button
                type="button"
                onClick={() => alert(`Full article content: "${item.title}"\n\n${item.summary}`)}
                className="font-bold text-red-600 hover:underline"
              >
                Read Article
              </button>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 14: PUBLIC NOTICES & MAINTENANCE BULLETINS
========================================================================= */

function NoticesPage({ onNavigate, selectedNoticeId }: { onNavigate: (route: RouteId) => void, selectedNoticeId?: string | null }) {
  const notices = [
    {
      id: 'notice-01',
      title: 'Planned Distribution Substation Maintenance — Western Area Urban',
      date: 'May 18, 2025',
      time: '08:00 AM – 04:00 PM',
      affectedAreas: 'Congo Cross, Kingtom, Syke Street, Ascension Town, and parts of Brookfields.',
      reason: 'Routine replacement of 33kV switchgear and transformer oil filtration at Kingtom Substation.',
      advice: 'Consumers are advised to treat all electrical installations as LIVE during this period.'
    },
    {
      id: 'notice-02',
      title: 'STS TID Rollover Key Change Campaign — Notice to All Prepaid Customers',
      date: 'May 10, 2025',
      time: 'Ongoing Nationwide Campaign',
      affectedAreas: 'All Prepayment Customers nationwide (Western Area, Bo, Kenema, Makeni, Port Loko, Koidu).',
      reason: 'Standard Transfer Specification token identifier (TID) rollover update.',
      advice: 'Enter the two 20-digit Key Change Tokens (KCT-1 and KCT-2) before loading your credit token.'
    },
    {
      id: 'notice-03',
      title: 'Public Warning Against Illegal Tapping and Line Tampering',
      date: 'April 28, 2025',
      time: 'Continuous Enforcement',
      affectedAreas: 'All Districts.',
      reason: 'Zero-tolerance enforcement under the National Electricity Act 2011.',
      advice: 'Power theft causes transformer burnouts and severe fire hazards. Report anonymously to 672.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-edsa-red/30 text-red-200 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            Grid Notices & Load Advisories
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Public Notices & Planned Maintenance
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Official operational bulletins regarding scheduled maintenance shutdowns, grid improvements, and safety warnings.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {notices.map((n) => (
          <div 
            key={n.id}
            className={`bg-surface-0 p-6 sm:p-8 border space-y-4 transition ${
              selectedNoticeId === n.id ? 'border-red-500 ring-2 ring-red-200' : 'border-border'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Operational Public Bulletin
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-800">
                <Calendar className="w-3.5 h-3.5" />
                <span>{n.date}</span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{n.time}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-fg">{n.title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-canvas border border-border">
                <strong className="text-fg block mb-1">Affected Areas:</strong>
                <p className="text-slate-700">{n.affectedAreas}</p>
              </div>

              <div className="p-3.5 bg-canvas border border-border">
                <strong className="text-fg block mb-1">Scope of Works:</strong>
                <p className="text-slate-700">{n.reason}</p>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200">
                <strong className="text-amber-950 block mb-1">Safety Advisory:</strong>
                <p className="text-amber-900">{n.advice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 15 & 16: PROCUREMENT & DOCUMENTS REPOSITORY
========================================================================= */

function ProcurementPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const tenders = EDSA_DOCUMENTS.filter(d => d.category === 'Procurement & Tenders');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            National Procurement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Procurement & Tender Notices
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Official expressions of interest (EOI), requests for proposals (RFP), and international competitive bidding 
            in accordance with the National Public Procurement Authority (NPPA) regulations.
          </p>
        </div>
      </div>

      <div className="bg-surface-0 p-6 sm:p-8 border border-border space-y-4">
        <h2 className="text-xl font-bold text-fg">Current Open Opportunities</h2>
        <div className="divide-y divide-slate-100">
          {tenders.map((t) => (
            <div key={t.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-fg text-base">{t.title}</h4>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-800 mt-1">
                  <span>Category: {t.category}</span>
                  <span>•</span>
                  <span>Format: {t.fileType} ({t.fileSize})</span>
                  <span>•</span>
                  <span>Published: {t.date}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Downloading official tender package: "${t.title}"`)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shrink-0 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Bidding Document</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocumentsPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Procurement & Tenders', 'Application Forms', 'Regulatory & Tariffs', 'Reports & Publications'];

  const filteredDocs = EDSA_DOCUMENTS.filter(doc => {
    const matchCat = categoryFilter === 'All' || doc.category === categoryFilter;
    const matchSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            Public Document Archive
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Documents, Forms & Publications
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Download connection application forms, annual reports, approved regulatory codes, and public policies.
          </p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-surface-0 p-6 border border-border space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative grow">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-200" />
            <input
              type="text"
              placeholder="Search documents, forms, reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategoryFilter(c)}
                className={`px-3.5 py-2 text-xs font-bold transition ${
                  categoryFilter === c
                    ? 'bg-blue-950 text-white'
                    : 'bg-surface-1 hover:bg-slate-200 text-slate-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100 pt-2">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-surface-1 text-blue-900 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-fg text-sm sm:text-base">{doc.title}</h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-800 mt-1">
                    <span className="font-semibold text-blue-900">{doc.category}</span>
                    <span>•</span>
                    <span>{doc.fileType} ({doc.fileSize})</span>
                    <span>•</span>
                    <span>Published {doc.date}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => alert(`Downloading official document: "${doc.title}"`)}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200 shrink-0 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {doc.fileType}</span>
              </button>
            </div>
          ))}
          {filteredDocs.length === 0 && (
            <div className="py-12 text-center text-slate-800 text-sm">
              No documents matched your search filter.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 17: CAREERS & PUBLIC RECRUITMENT
========================================================================= */

function CareersPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            Human Capital & Employment
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Careers & Vacancies
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Join the team powering Sierra Leone. EDSA is an equal-opportunity public utility enterprise committed 
            to professional excellence, engineering talent development, and transparent merit-based recruitment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-0 p-6 sm:p-8 border border-border space-y-6">
          <h2 className="text-xl font-bold text-fg">
            Current Vacancy Announcements
          </h2>
          <p className="text-xs sm:text-sm text-slate-700">
            All vacancies are officially gazetted and advertised in national newspapers in accordance with public service guidelines.
          </p>

          <div className="p-6 bg-canvas border border-border text-center space-y-3">
            <Briefcase className="w-8 h-8 text-blue-900 mx-auto" />
            <h3 className="font-bold text-fg text-base">No Open Vacancies Currently Advertised</h3>
            <p className="text-xs text-slate-800 max-w-md mx-auto">
              Please check back regularly or follow our official press releases for announcements regarding upcoming graduate engineering intakes and technical specialist postings.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h4 className="font-bold text-fg text-sm">Recruitment Integrity Notice</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              ⚠️ <strong>EDSA does NOT charge any fee</strong> at any stage of the recruitment process (application, interview, processing, or training). 
              Beware of fraudulent agents soliciting money for job placements. Report any suspicious recruitment solicitations to the Anti-Corruption Commission (ACC) or EDSA Internal Audit via 672.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 text-white p-6 border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2">
            Internships & Apprenticeships
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed">
            EDSA partners with the University of Sierra Leone (FBC), Njala University, and Government Technical Institutes 
            to offer hands-on electrical engineering, SCADA telemetry, and sub-station maintenance apprenticeships.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition"
            >
              Contact HR Department
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

/* =========================================================================
   PAGE 18: CONTACT & HEADQUARTERS
========================================================================= */

function ContactPage({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-edsa-navy text-white p-8 sm:p-10 border border-slate-800">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Official Contact & Headquarters
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact the Authority
          </h1>
          <p className="text-slate-200 text-base leading-relaxed">
            Reach out to our customer care center, headquarters administration, or regional commercial offices across Sierra Leone.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-surface-0 p-6 sm:p-8 border border-border space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-fg">Send an Official Message</h2>
            <p className="text-xs text-slate-800 mt-1">Our customer service representatives typically respond within 24 business hours.</p>
          </div>

          {sent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2 text-center animate-in fade-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-base">Message Successfully Transmitted</h3>
              <p className="text-xs text-emerald-800">
                Thank you, {name}. Your inquiry has been forwarded to the relevant EDSA department.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-3 text-xs font-bold text-emerald-900 underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Fatu Sesay"
                    className="w-full px-3 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +232 76 000000"
                    className="w-full px-3 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Subject / Department
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 border border-border-strong bg-surface-0 text-sm focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="General Inquiry">General Customer Inquiry</option>
                    <option value="Prepaid Meter Support">Prepaid Meter / STS Support</option>
                    <option value="New Connection Followup">New Connection Application</option>
                    <option value="Billing Dispute">Billing & Tariff Inquiries</option>
                    <option value="Commercial & Industrial">Commercial / Industrial Desk</option>
                    <option value="Media & Press">Media & Public Relations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you today?"
                  className="w-full px-3 py-2.5 border border-border-strong text-sm focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right: Verified Contact Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              National Headquarters
            </h3>

            <div className="space-y-3 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Electricity House, 36 Siaka Stevens Street, Freetown, Sierra Leone</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-red-500 shrink-0" />
                <span>Toll-Free Hotline: <strong>672</strong> (24/7)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>info@edsa.sl / support@edsa.sl</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Office Hours: Monday – Friday (8:00 AM – 5:00 PM)</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-0 p-6 border border-border space-y-3 text-xs text-slate-700">
            <h4 className="font-bold text-fg text-sm">Emergency Dispatch</h4>
            <p>
              For hazardous sparking cables, fallen poles, or transformer smoke, do not submit a general web form. 
              Call <strong>672</strong> immediately for immediate emergency dispatch response.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

/* =========================================================================
   HELPER ICONS & GLOBAL FOOTER
========================================================================= */

function ServiceIcon({ iconName }: { iconName?: string }) {
  switch (iconName) {
    case 'Zap': return <Zap className="w-6 h-6 text-amber-500" />;
    case 'PlusCircle': return <PlusCircle className="w-6 h-6 text-blue-600" />;
    case 'Gauge': return <Gauge className="w-6 h-6 text-emerald-600" />;
    case 'CreditCard': return <CreditCard className="w-6 h-6 text-indigo-600" />;
    case 'AlertCircle': return <AlertCircle className="w-6 h-6 text-red-600" />;
    case 'LifeBuoy': return <LifeBuoy className="w-6 h-6 text-sky-600" />;
    default: return <Zap className="w-6 h-6" />;
  }
}

function GlobalFooter({ onNavigate }: { onNavigate: (route: RouteId) => void }) {
  return (
    <footer className="bg-[#060F1E] text-slate-200 border-t-4 border-red-600">
      
      {/* 1. URGENT HOTLINE / EMERGENCY BANNER */}
      <div className="bg-edsa-navy border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border border-red-500/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-edsa-red text-white flex items-center justify-center shrink-0 ">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base sm:text-lg">
                  Electrical Emergency or Hazardous Wire Fault?
                </h3>
                <p className="text-xs sm:text-sm text-slate-200">
                  Contact our 24/7 National Dispatch & Rapid Response Center toll-free from any network.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${EDSA_HOTLINE}`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-edsa-red hover:bg-edsa-red-hover text-white font-bold text-base transition focus:ring-2 focus:ring-white focus:outline-hidden"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Dial {EDSA_HOTLINE} (Toll-Free)</span>
              </a>

              <button
                type="button"
                onClick={() => onNavigate('report-outage')}
                className="inline-flex items-center gap-2 px-4 py-3 bg-surface-0/10 hover:bg-surface-0/20 text-white font-semibold text-sm transition border border-white/20"
              >
                <span>Log Outage Online</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER DIRECTORY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Column 1: Authority & Identity (2 cols on large) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/edsa-white-logo.png"
                alt="Electricity Distribution and Supply Authority (EDSA) Sierra Leone"
                className="h-14 sm:h-16 w-auto max-w-[220px] object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Established under the <strong className="text-white">National Electricity Act, 2011</strong>, 
              EDSA is the statutory national utility mandated to distribute, supply, and manage retail electricity 
              throughout the Republic of Sierra Leone with reliability, safety, and modern transparency.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Electricity House, 36 Siaka Stevens Street, Freetown, Sierra Leone</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>info@edsa.sl / support@edsa.sl</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Customer Care: 8:00 AM – 5:00 PM (Hotline 672 24/7)</span>
              </div>
            </div>

            {/* Digital Transformation Badge */}
            <div className="p-3 bg-blue-950/60 border border-blue-800/40 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EDSA Digital Transformation Initiative</span>
              </div>
              <p className="text-slate-200 text-[11px]">
                Modernizing citizen experiences with mobile apps, instant token generation, and remote smart metering.
              </p>
            </div>
          </div>

          {/* Column 2: Customer Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('buy-electricity')}
                  className="hover:text-white hover:underline transition"
                >
                  Buy Electricity (Prepaid)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('report-outage')}
                  className="hover:text-white hover:underline transition"
                >
                  Report Fault / Blackout
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('new-connection')}
                  className="hover:text-white hover:underline transition"
                >
                  New Connection Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('meter-services')}
                  className="hover:text-white hover:underline transition"
                >
                  Prepaid Meter STS TID Update
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('billing-payments')}
                  className="hover:text-white hover:underline transition"
                >
                  Approved Tariffs & Rates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('support')}
                  className="hover:text-white hover:underline transition"
                >
                  Regional Service Centers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional & Projects */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              The Authority
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline transition"
                >
                  Mandate & Mission
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('leadership')}
                  className="hover:text-white hover:underline transition"
                >
                  Board & Management
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="hover:text-white hover:underline transition"
                >
                  Grid Expansion Projects
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('news')}
                  className="hover:text-white hover:underline transition"
                >
                  Press Releases & News
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('notices')}
                  className="hover:text-white hover:underline transition"
                >
                  Planned Maintenance Notices
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('careers')}
                  className="hover:text-white hover:underline transition"
                >
                  Vacancies & Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Public Resources & Regulatory */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Governance & Tenders
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('procurement')}
                  className="hover:text-white hover:underline transition"
                >
                  Procurement & Tenders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('documents')}
                  className="hover:text-white hover:underline transition"
                >
                  Annual Reports & Policies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('digital')}
                  className="text-amber-400 hover:text-amber-300 transition font-medium flex items-center gap-1"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  EDSA Digital Ecosystem
                </button>
              </li>
              <li className="pt-2">
                <div className="p-2.5  bg-slate-900 border border-slate-800 text-[11px] text-slate-200">
                  <span className="font-semibold text-slate-200 block mb-0.5">Regulated By:</span>
                  Sierra Leone Electricity and Water Regulatory Commission (SLEWRC)
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. SUB-FOOTER LEGAL & COPYRIGHT */}
      <div className="bg-[#030812] text-slate-200 text-xs py-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p>
              © {new Date().getFullYear()} Electricity Distribution and Supply Authority (EDSA). 
              An Agency of the Ministry of Energy, Government of Sierra Leone. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-200 mt-1">
              Operated in compliance with the National Electricity Act 2011 and SLEWRC regulatory codes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-200">
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="hover:text-slate-200 transition"
            >
              Terms of Supply
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="hover:text-slate-200 transition"
            >
              Citizen Privacy Notice
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate('support')}
              className="hover:text-slate-200 transition"
            >
              Accessibility Statement
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-slate-200 transition"
            >
              Whistleblower & Anti-Fraud
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

