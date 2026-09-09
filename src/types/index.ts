export type RouteId =
  | 'home'
  | 'customer-services'
  | 'buy-electricity'
  | 'new-connection'
  | 'meter-services'
  | 'billing-payments'
  | 'report-outage'
  | 'support'
  | 'digital'
  | 'about'
  | 'leadership'
  | 'projects'
  | 'news'
  | 'notices'
  | 'procurement'
  | 'documents'
  | 'careers'
  | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  icon?: string;
  category?: string;
  actionLabel?: string;
  route: RouteId;
  badge?: string;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  date: string;
  category: 'Press Release' | 'Public Notice' | 'Maintenance' | 'Grid Advisory' | string;
  imagePlaceholder: string;
  readTime: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Transmission' | 'Distribution' | 'Renewable & Rural' | 'Digital & Metering' | string;
  status: 'Active' | 'Completed' | 'Planning' | 'Ongoing' | string;
  location: string;
  description: string;
  benefits?: string[];
  partners?: string;
  imagePlaceholder: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Procurement & Tenders' | 'Financial & Annual Reports' | 'Policies & Regulations' | 'Forms & Applications' | 'Public Notices' | string;
  referenceNo: string;
  date: string;
  fileSize: string;
  fileFormat?: 'PDF' | 'DOCX' | 'ZIP' | string;
  fileType?: string;
  deadline?: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  title: string;
  role?: string;
  designation?: string;
  category: 'Executive Management' | 'Board of Directors' | string;
  bio: string;
  imagePlaceholder: string;
}

export interface RegionalOffice {
  id?: string;
  name?: string;
  region?: string;
  district: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  operatingHours?: string;
  hours?: string;
  emergencyDispatch: string;
}

export interface TariffCategory {
  id?: string;
  name?: string;
  category: string;
  subCategory?: string;
  consumptionBand: string;
  ratePerKwhNLe: number;
  ratePerKwhOldLe?: number;
  ratePerKwh?: number;
  fixedChargeNLe?: number;
  fixedCharge?: number;
  description?: string;
  notes?: string;
}

export interface FAQItem {
  q: string;
  a: string;
  category?: string;
}

export interface OutageReport {
  id?: string;
  referenceNo?: string;
  referenceNumber?: string;
  fullName?: string;
  contactName?: string;
  phone?: string;
  contactPhone?: string;
  district: string;
  area: string;
  streetAddress?: string;
  address?: string;
  meterNumber?: string;
  outageType: string;
  description?: string;
  status: string;
  timestamp?: string;
  reportedAt?: string;
  assignedUnit?: string;
  estimatedResolution?: string;
  notes?: string;
}

export type NewsArticle = NewsItem;
export type TariffBand = TariffCategory;

