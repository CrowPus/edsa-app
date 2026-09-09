import { ServiceItem, NewsItem, ProjectItem, DocumentItem, LeadershipMember, RegionalOffice, TariffCategory } from '../types';

export const EDSA_HOTLINE = "672";
export const EDSA_EMERGENCY_DIRECT = "+232 (0) 76 672 672";
export const EDSA_HQ_ADDRESS = "Electricity House, 36 Siaka Stevens Street, Freetown, Sierra Leone";
export const EDSA_EMAIL = "info@edsa.sl";
export const EDSA_SUPPORT_EMAIL = "customercare@edsa.sl";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'buy-electricity',
    title: 'Buy Electricity',
    description: 'Purchase prepaid meter recharge tokens instantly via digital payment channels, mobile money, or accredited vendor locations.',
    iconName: 'Zap',
    route: 'buy-electricity',
    badge: 'Instant Recharge',
    category: 'Vending',
    actionLabel: 'Recharge Token',
    featured: true,
  },
  {
    id: 'new-connection',
    title: 'New Connection Application',
    description: 'Apply for single-phase or three-phase power connections for residential, commercial, or industrial properties with step-by-step guidance.',
    iconName: 'PlusCircle',
    route: 'new-connection',
    category: 'Connection',
    actionLabel: 'Apply Now',
    featured: true,
  },
  {
    id: 'meter-services',
    title: 'Meter Services & STS Migration',
    description: 'Smart meter upgrades, TID Rollover STS Key Change Token updates, meter testing, calibration, and tamper reporting.',
    iconName: 'Gauge',
    route: 'meter-services',
    badge: 'TID Rollover Active',
    category: 'Metering',
    actionLabel: 'Meter Support',
    featured: true,
  },
  {
    id: 'billing-payments',
    title: 'Tariffs & Payment Channels',
    description: 'View the official SLEWRC approved electricity tariff schedule, billing bands, and authorized banking & mobile money partners.',
    iconName: 'CreditCard',
    route: 'billing-payments',
    category: 'Billing',
    actionLabel: 'View Tariffs',
    featured: true,
  },
  {
    id: 'report-outage',
    title: 'Report Outage & Faults',
    description: 'Log power outages, transformer trips, sparking cables, or fallen poles directly into our national dispatch system for rapid response.',
    iconName: 'AlertTriangle',
    route: 'report-outage',
    badge: '24/7 Dispatch',
    category: 'Dispatch',
    actionLabel: 'Report Fault',
    featured: true,
  },
  {
    id: 'customer-support',
    title: 'Customer Care & 672 Hotline',
    description: 'Get support, verify service center locations across all provinces, access customer FAQs, and track service requests.',
    iconName: 'Headphones',
    route: 'support',
    category: 'Support',
    actionLabel: 'Get Support',
    featured: true,
  },
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'news-01',
    title: 'EDSA Accelerates STS Prepayment Meter TID Rollover Key Change Campaign Nationwide',
    summary: 'Electricity Distribution and Supply Authority urges all prepaid meter customers to generate and enter their 20-digit Key Change Tokens (KCT) to ensure uninterrupted power token vending.',
    date: 'February 24, 2025',
    category: 'Public Notice',
    imagePlaceholder: 'news-placeholder-01.jpg',
    readTime: '3 min read',
    content: 'The Electricity Distribution and Supply Authority (EDSA) wishes to inform all valued customers using Standard Transfer Specification (STS) prepaid meters across the Western Area and provincial networks that the mandatory TID Rollover Key Change upgrade is ongoing. Customers can obtain their Key Change Tokens automatically upon their next recharge or visit their nearest EDSA Customer Care Center.'
  },
  {
    id: 'news-02',
    title: 'Western Area Distribution Network Upgrade: 33kV Substation Modernization in Progress',
    summary: 'Technical teams conclude scheduled transformer replacement and feeder line stabilization to reinforce grid reliability across Central Freetown, Wilberforce, and Lumley corridors.',
    date: 'February 18, 2025',
    category: 'Press Release',
    imagePlaceholder: 'grid-project.jpg',
    readTime: '4 min read',
    content: 'As part of our commitment to reducing technical distribution losses and improving voltage stability, EDSA engineers have completed critical reinforcement works on primary 33/11kV substations in the Western Area. These upgrades significantly improve power transfer capability during peak demand hours.'
  },
  {
    id: 'news-03',
    title: 'Notice of Scheduled Maintenance & Tree Trimming Along Blackhall Road Feeder Lines',
    summary: 'Planned temporary network isolation to allow urgent overhead line clearance and insulator replacements for safety and service reliability.',
    date: 'February 12, 2025',
    category: 'Maintenance',
    imagePlaceholder: 'electricity-transmission.jpg',
    readTime: '2 min read',
    content: 'EDSA notifies residents of Kissy, Cline Town, and Blackhall Road that routine preventive maintenance and vegetative clearance along the 11kV transmission right-of-way will take place on Saturday between 08:00 and 15:00. Power will be restored promptly upon completion.'
  },
  {
    id: 'news-04',
    title: 'CLSG Trans-National Power Flow Increases Energy Availability in Bo and Kenema',
    summary: 'Cote d’Ivoire-Liberia-Sierra Leone-Guinea (CLSG) transmission line stabilizes industrial and commercial power supply in Southern and Eastern provinces.',
    date: 'January 29, 2025',
    category: 'Grid Advisory',
    imagePlaceholder: 'hero-edsa-infrastructure.jpg',
    readTime: '5 min read',
    content: 'Through coordinated operations with the West African Power Pool (WAPP) and TRANSCO CLSG, power dispatch into the regional substations at Bikongor and Tiloma has significantly stabilized provincial industrial supply.'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-01',
    title: 'TRANSCO CLSG Interconnection & Regional Power Integration',
    category: 'Transmission',
    status: 'Active',
    location: 'Bumbuna, Bikongor, Tiloma & Western Area',
    description: 'Integrating Sierra Leone into the 225kV multi-national regional transmission network to access affordable, reliable cross-border hydro and thermal energy.',
    benefits: [
      'Increases baseline national grid capacity by over 120MW',
      'Provides redundancy against seasonal hydro variations at Bumbuna',
      'Powers industrialization in Bo, Kenema, and Kono growth corridors'
    ],
    partners: 'World Bank, AfDB, KfW, TRANSCO CLSG',
    imagePlaceholder: 'hero-edsa-infrastructure.jpg'
  },
  {
    id: 'proj-02',
    title: 'Western Area Distribution Network Rehabilitation (WADEP)',
    category: 'Distribution',
    status: 'Active',
    location: 'Freetown & Western Area Rural',
    description: 'Comprehensive rehabilitation of 33kV and 11kV primary distribution lines, secondary substations, and aging feeder networks to minimize technical outages.',
    benefits: [
      'Reduces technical and commercial distribution losses',
      'Upgrades 45+ distribution transformers and switchgear units',
      'Eliminates overloaded low-voltage lines in dense urban zones'
    ],
    partners: 'Government of Sierra Leone, JICA, AfDB',
    imagePlaceholder: 'grid-project.jpg'
  },
  {
    id: 'proj-03',
    title: 'National Smart Metering & Split Prepaid Infrastructure Rollout',
    category: 'Digital & Metering',
    status: 'Active',
    location: 'Nationwide (Western Area, Bo, Kenema, Makeni, Port Loko)',
    description: 'Replacing non-communicating meters with tamper-evident, split prepaid smart meters capable of remote credit loading, automated fault diagnostics, and energy balance monitoring.',
    benefits: [
      'Prevents revenue leakage and bypass vulnerabilities',
      'Enables automated customer usage insights and credit warning alerts',
      'Facilitates rapid fault localization for line maintenance squads'
    ],
    partners: 'EDSA Digital Transformation Unit, SLEWRC',
    imagePlaceholder: 'smart-meter.jpg'
  },
  {
    id: 'proj-04',
    title: 'Provincial Mini-Grid & Off-Grid Hybrid Electrification',
    category: 'Renewable & Rural',
    status: 'Planning',
    location: 'Northern and Southern District Hubs',
    description: 'Deployment of solar photovoltaic and battery energy storage systems (BESS) hybrid micro-grids to power off-grid chiefdom headquarters and rural health facilities.',
    benefits: [
      'Extends clean electricity to unserved rural healthcare centers',
      'Stimulates small agro-processing and rural commerce',
      'Reduces carbon emissions in localized provincial generation'
    ],
    partners: 'UNOPS, FCDO, Ministry of Energy',
    imagePlaceholder: 'electricity-transmission.jpg'
  }
];

export const DOCUMENTS_DATA: DocumentItem[] = [
  {
    id: 'doc-01',
    title: 'National Competitive Bidding (NCB) — Supply of 33kV Composite Insulators and Line Hardware',
    category: 'Procurement & Tenders',
    referenceNo: 'EDSA/NCB/G/2025/004',
    date: 'February 20, 2025',
    fileSize: '2.4 MB',
    fileFormat: 'PDF',
    deadline: 'March 25, 2025 (12:00 GMT)'
  },
  {
    id: 'doc-02',
    title: 'International Competitive Bidding (ICB) — Turnkey Substation Automation and SCADA Integration',
    category: 'Procurement & Tenders',
    referenceNo: 'EDSA/ICB/W/2025/002',
    date: 'February 10, 2025',
    fileSize: '4.8 MB',
    fileFormat: 'PDF',
    deadline: 'April 14, 2025 (14:00 GMT)'
  },
  {
    id: 'doc-03',
    title: 'Official Electricity Tariff Schedule & Regulatory Framework 2024/2025',
    category: 'Policies & Regulations',
    referenceNo: 'SLEWRC-EDSA-TR-2024',
    date: 'January 15, 2025',
    fileSize: '1.2 MB',
    fileFormat: 'PDF'
  },
  {
    id: 'doc-04',
    title: 'Standard Application Form for New Electricity Supply (Single & Three Phase)',
    category: 'Forms & Applications',
    referenceNo: 'EDSA-FORM-CON-01',
    date: 'January 2025',
    fileSize: '450 KB',
    fileFormat: 'PDF'
  },
  {
    id: 'doc-05',
    title: 'Annual Power Sector Performance & Distribution Operations Report 2023-2024',
    category: 'Financial & Annual Reports',
    referenceNo: 'EDSA-AR-2024',
    date: 'December 2024',
    fileSize: '6.7 MB',
    fileFormat: 'PDF'
  },
  {
    id: 'doc-06',
    title: 'Environmental & Social Management Framework (ESMF) — Grid Expansion Project',
    category: 'Policies & Regulations',
    referenceNo: 'EDSA-ESMF-2024-V2',
    date: 'November 2024',
    fileSize: '3.1 MB',
    fileFormat: 'PDF'
  },
  {
    id: 'doc-07',
    title: 'Notice to Contractors: Vendor Registration & Prequalification Requirements 2025',
    category: 'Public Notices',
    referenceNo: 'EDSA-PROC-REG-2025',
    date: 'January 2025',
    fileSize: '680 KB',
    fileFormat: 'PDF'
  }
];

export const TARIFF_DATA: TariffCategory[] = [
  {
    category: 'Residential (Domestic)',
    subCategory: 'Lifeline Band (Social Tariff)',
    consumptionBand: '0 – 50 kWh / month',
    ratePerKwhNLe: 1.85,
    ratePerKwhOldLe: 1850,
    fixedChargeNLe: 0.00,
    description: 'Subsidized social baseline tariff designed to protect low-income households consuming essential lighting and basic appliances.'
  },
  {
    category: 'Residential (Domestic)',
    subCategory: 'Standard Consumption Band',
    consumptionBand: '51 – 200 kWh / month',
    ratePerKwhNLe: 2.75,
    ratePerKwhOldLe: 2750,
    fixedChargeNLe: 15.00,
    description: 'Standard domestic residential consumption for middle-range urban and peri-urban single-family households.'
  },
  {
    category: 'Residential (Domestic)',
    subCategory: 'High Consumption Band',
    consumptionBand: 'Over 200 kWh / month',
    ratePerKwhNLe: 3.40,
    ratePerKwhOldLe: 3400,
    fixedChargeNLe: 25.00,
    description: 'Tiered domestic rate for multi-appliance, air-conditioned households exceeding base consumption thresholds.'
  },
  {
    category: 'Commercial (General Business)',
    subCategory: 'Small & Medium Enterprises',
    consumptionBand: 'Single-phase commercial supplies',
    ratePerKwhNLe: 3.65,
    ratePerKwhOldLe: 3650,
    fixedChargeNLe: 40.00,
    description: 'Shops, professional offices, retail stores, and service facilities connected to low-voltage network.'
  },
  {
    category: 'Commercial & Institutional',
    subCategory: 'Three-Phase Commercial & Public Facilities',
    consumptionBand: 'Three-phase commercial / schools / hospitals',
    ratePerKwhNLe: 3.95,
    ratePerKwhOldLe: 3950,
    fixedChargeNLe: 75.00,
    description: 'Hotels, large office complexes, government ministries, educational institutions, and private health facilities.'
  },
  {
    category: 'Industrial (High Voltage / Maximum Demand)',
    subCategory: 'Medium & Heavy Manufacturing',
    consumptionBand: '11kV / 33kV dedicated feeders',
    ratePerKwhNLe: 4.20,
    ratePerKwhOldLe: 4200,
    fixedChargeNLe: 250.00,
    description: 'Industrial manufacturing, cold storage facilities, beverage bottling plants, and processing mills with dedicated transformer capacity.'
  }
];

export const REGIONAL_OFFICES: RegionalOffice[] = [
  {
    district: 'Western Area Urban (Freetown Headquarters)',
    location: 'Central Freetown',
    address: 'Electricity House, 36 Siaka Stevens Street, Freetown',
    phone: 'Toll-Free: 672 | +232 (0) 76 672 672',
    email: 'customercare@edsa.sl',
    operatingHours: 'Mon – Fri: 08:00 – 17:00 | Sat: 09:00 – 14:00',
    emergencyDispatch: '24/7 National Dispatch Center: 672'
  },
  {
    district: 'Western Area Urban (West Zone)',
    location: 'Wilberforce / Lumley',
    address: 'Spur Loop Road, Wilberforce, Freetown',
    phone: '+232 (0) 78 300 112',
    email: 'west.zone@edsa.sl',
    operatingHours: 'Mon – Fri: 08:00 – 17:00 | Sat: 09:00 – 13:00',
    emergencyDispatch: 'Western Urban Rapid Response Squad: 672'
  },
  {
    district: 'Western Area Urban (East Zone)',
    location: 'Cline Town / Kissy',
    address: 'Blackhall Road Substation Complex, Kissy, Freetown',
    phone: '+232 (0) 78 300 114',
    email: 'east.zone@edsa.sl',
    operatingHours: 'Mon – Fri: 08:00 – 17:00 | Sat: 09:00 – 13:00',
    emergencyDispatch: 'East Zone Dispatch Desk: 672'
  },
  {
    district: 'Western Area Rural',
    location: 'Waterloo District Hub',
    address: 'Main Motor Road, Waterloo, Western Rural District',
    phone: '+232 (0) 78 300 118',
    email: 'waterloo@edsa.sl',
    operatingHours: 'Mon – Fri: 08:00 – 17:00 | Sat: 09:00 – 13:00',
    emergencyDispatch: 'Rural Rapid Response Desk: 672'
  },
  {
    district: 'Southern Province (Bo District)',
    location: 'Bo Regional Center',
    address: '6 Fenton Road, Bo City, Southern Province',
    phone: '+232 (0) 78 300 201',
    email: 'bo.station@edsa.sl',
    operatingHours: 'Mon – Fri: 08:00 – 17:00 | Sat: 09:00 – 13:00',
    emergencyDispatch: 'Bo Regional Fault Desk: 672 / +232 78 300 201'
  },
  {
    district: 'Eastern Province (Kenema District)',
    location: 'Kenema Regional Center',
    address: 'Hangha Road, Kenema City, Eastern Province',
    phone: '+232 (0) 78 300 301',
    email: 'kenema.station@edsa.sl',
    operatingHours: 'Mon – Fri: 08:00 – 17:00 | Sat: 09:00 – 13:00',
    emergencyDispatch: 'Kenema Regional Fault Desk: 672'
  },
  {
    district: 'Northern Province (Bombali District)',
    location: 'Makeni Regional Center',
    address: 'Rogbaneh Road, Makeni, Northern Province',
    phone: '+232 (0) 78 300 401',
    email: 'makeni.station@edsa.sl',
    operatingHours: 'Mon – Fri: 08:00 – 17:00 | Sat: 09:00 – 13:00',
    emergencyDispatch: 'Makeni Fault Line: 672'
  },
  {
    district: 'North-West Province (Port Loko District)',
    location: 'Port Loko Customer Hub',
    address: 'Lungi-Port Loko Highway Junction, Port Loko',
    phone: '+232 (0) 78 300 501',
    email: 'portloko@edsa.sl',
    operatingHours: 'Mon – Fri: 08:00 – 17:00',
    emergencyDispatch: 'North-West Response Unit: 672'
  }
];

export const LEADERSHIP_DATA: LeadershipMember[] = [
  {
    id: 'lead-01',
    name: 'Board Chairman',
    title: 'Chairman, Board of Directors',
    category: 'Board of Directors',
    bio: 'Provides strategic oversight, fiduciary stewardship, and policy governance in alignment with the National Electricity Act 2011 and national energy development priorities.',
    imagePlaceholder: 'leadership-placeholder.jpg'
  },
  {
    id: 'lead-02',
    name: 'Director General',
    title: 'Director General / Chief Executive Officer',
    category: 'Executive Management',
    bio: 'Leads the executive management team responsible for national transmission, power distribution operations, digital transformation, and customer service delivery across Sierra Leone.',
    imagePlaceholder: 'leadership-placeholder.jpg'
  },
  {
    id: 'lead-03',
    name: 'Deputy Director General — Technical & Operations',
    title: 'Deputy Director General (Technical)',
    category: 'Executive Management',
    bio: 'Oversees transmission network operations, 33/11kV substations, primary grid dispatch, maintenance engineering, and rural electrification implementation.',
    imagePlaceholder: 'leadership-placeholder.jpg'
  },
  {
    id: 'lead-04',
    name: 'Director of Commercial & Customer Services',
    title: 'Director, Commercial Operations',
    category: 'Executive Management',
    bio: 'Directs revenue management, prepaid and smart meter infrastructure, customer care centers nationwide, tariff application, and digital vending channels.',
    imagePlaceholder: 'leadership-placeholder.jpg'
  },
  {
    id: 'lead-05',
    name: 'Director of Finance & Corporate Services',
    title: 'Director, Finance & Administration',
    category: 'Executive Management',
    bio: 'Manages fiscal governance, capital expenditure financing, international donor project accounting, human resources, and administrative compliance.',
    imagePlaceholder: 'leadership-placeholder.jpg'
  },
  {
    id: 'lead-06',
    name: 'Director of Information Technology & Digital Systems',
    title: 'Director, IT & Digital Transformation',
    category: 'Executive Management',
    bio: 'Directs enterprise digitalization, smart grid SCADA integration, automated vending infrastructure, customer web & mobile apps, and cybersecurity frameworks.',
    imagePlaceholder: 'leadership-placeholder.jpg'
  }
];

export const FAQS_DATA = [
  {
    id: 'faq-01',
    question: 'How do I purchase electricity tokens for my prepaid meter?',
    answer: 'You can buy prepaid tokens through mobile money (Orange Money dial *144#, Afrimoney dial *161#), accredited commercial bank branches and apps (SL Commercial Bank, Rokel Commercial Bank, Zenith Bank, Ecobank, UBA, GTBank, Bloom Bank), or at any EDSA Customer Service Center nationwide.',
    q: 'How do I purchase electricity tokens for my prepaid meter?',
    a: 'You can buy prepaid tokens through mobile money (Orange Money dial *144#, Afrimoney dial *161#), accredited commercial bank branches and apps (SL Commercial Bank, Rokel Commercial Bank, Zenith Bank, Ecobank, UBA, GTBank, Bloom Bank), or at any EDSA Customer Service Center nationwide.',
    category: 'Vending & Payments'
  },
  {
    id: 'faq-02',
    question: 'What is the STS Key Change Token (TID Rollover) and is it mandatory?',
    answer: 'Yes, the STS Key Change Token is mandatory for all standard prepayment meters to ensure they continue accepting token credits beyond the global 2024/2025 TID rollover. When you purchase electricity, you may receive two 20-digit Key Change Tokens (KCT-1 and KCT-2) alongside your recharge token. Enter KCT-1 first, wait for confirmation, enter KCT-2, and then enter your recharge token.',
    q: 'What is the STS Key Change Token (TID Rollover) and is it mandatory?',
    a: 'Yes, the STS Key Change Token is mandatory for all standard prepayment meters to ensure they continue accepting token credits beyond the global 2024/2025 TID rollover. When you purchase electricity, you may receive two 20-digit Key Change Tokens (KCT-1 and KCT-2) alongside your recharge token. Enter KCT-1 first, wait for confirmation, enter KCT-2, and then enter your recharge token.',
    category: 'Meter Services'
  },
  {
    id: 'faq-03',
    question: 'How do I report a power outage, fallen pole, or transformer sparking?',
    answer: 'Call our 24/7 National Emergency Hotline on 672 (Toll-Free from any network) or submit an outage report directly through our website Outage Reporting portal. For direct emergency line, dial +232 (0) 76 672 672.',
    q: 'How do I report a power outage, fallen pole, or transformer sparking?',
    a: 'Call our 24/7 National Emergency Hotline on 672 (Toll-Free from any network) or submit an outage report directly through our website Outage Reporting portal. For direct emergency line, dial +232 (0) 76 672 672.',
    category: 'Outages & Safety'
  },
  {
    id: 'faq-04',
    question: 'What are the requirements for applying for a new electricity connection?',
    answer: 'You need proof of property ownership (Title Deed or Local Court / Chiefdom authorization), a valid Government ID (National ID, Voter Card, or Passport), 2 passport photos, a certified electrical wiring completion certificate from a licensed electrician, and a completed EDSA New Connection Form.',
    q: 'What are the requirements for applying for a new electricity connection?',
    a: 'You need proof of property ownership (Title Deed or Local Court / Chiefdom authorization), a valid Government ID (National ID, Voter Card, or Passport), 2 passport photos, a certified electrical wiring completion certificate from a licensed electrician, and a completed EDSA New Connection Form.',
    category: 'New Connections'
  },
  {
    id: 'faq-05',
    question: 'How are electricity tariffs calculated in Sierra Leone?',
    answer: 'Tariffs are regulated and approved by the Sierra Leone Electricity and Water Regulatory Commission (SLEWRC). They are tiered based on customer category (Residential Lifeline 0-50 kWh, Residential Standard, Commercial, and Industrial/High Voltage).',
    q: 'How are electricity tariffs calculated in Sierra Leone?',
    a: 'Tariffs are regulated and approved by the Sierra Leone Electricity and Water Regulatory Commission (SLEWRC). They are tiered based on customer category (Residential Lifeline 0-50 kWh, Residential Standard, Commercial, and Industrial/High Voltage).',
    category: 'Tariffs & Billing'
  },
  {
    id: 'faq-06',
    question: 'What should I do if my meter Customer Interface Unit (CIU) fails to connect or says "rEJEct"?',
    answer: 'Ensure your CIU has fresh batteries and is properly connected to the wall outlet. If it shows "rEJEct", ensure you did not enter duplicate tokens or mistype numbers. If the error persists, contact 672 or your nearest service center with your meter serial number.',
    q: 'What should I do if my meter Customer Interface Unit (CIU) fails to connect or says "rEJEct"?',
    a: 'Ensure your CIU has fresh batteries and is properly connected to the wall outlet. If it shows "rEJEct", ensure you did not enter duplicate tokens or mistype numbers. If the error persists, contact 672 or your nearest service center with your meter serial number.',
    category: 'Meter Services'
  }
];

export const SIERRA_LEONE_DISTRICTS = [
  'Western Area Urban (Freetown Central/East/West)',
  'Western Area Rural (Waterloo, Goderich, York, Sussex)',
  'Bo District (Southern Province)',
  'Kenema District (Eastern Province)',
  'Bombali District (Makeni - Northern Province)',
  'Port Loko District (North-West Province)',
  'Kono District (Koidu - Eastern Province)',
  'Tonkolili District (Magburaka - Northern Province)',
  'Kambia District (North-West Province)',
  'Moyamba District (Southern Province)',
  'Pujehun District (Southern Province)',
  'Bonthe District (Southern Province)',
  'Kailahun District (Eastern Province)',
  'Koinadugu District (Northern Province)',
  'Falaba District (Northern Province)',
  'Karene District (North-West Province)'
];

// Aliases for compatibility
export const EDSA_TARIFFS = TARIFF_DATA;
export const EDSA_REGIONAL_OFFICES = REGIONAL_OFFICES;
export const EDSA_PROJECTS = PROJECTS_DATA;
export const EDSA_NEWS = NEWS_DATA;
export const EDSA_DOCUMENTS = DOCUMENTS_DATA;
export const EDSA_FAQS = FAQS_DATA;
export const EDSA_SERVICES = SERVICES_DATA;
export const EDSA_LEADERSHIP = LEADERSHIP_DATA;

