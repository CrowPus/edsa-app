import React, { useState } from 'react';
import { AlertCircle, ChevronRight, X, PhoneCall } from 'lucide-react';
import { RouteId } from '../types';
import { EDSA_HOTLINE } from '../data/edsaData';

interface OutageTickerProps {
  onNavigate: (route: RouteId) => void;
  onSelectNotice?: (id: string) => void;
}

export const OutageTicker: React.FC<OutageTickerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Public Safety and Urgent Grid Advisory"
      className="bg-edsa-red text-white border-b border-red-800 text-xs sm:text-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-[280px]">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white text-red-700 font-bold uppercase text-[11px] tracking-wider shrink-0 border border-white">
            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Advisory
          </span>
          <p className="font-medium text-white line-clamp-1">
            <span className="font-semibold">Prepaid Meter STS TID Upgrade:</span> Upgrade your meter with 20-digit Key Change Tokens (KCT). 
            Emergency fault reporting toll-free on <strong className="underline underline-offset-2">{EDSA_HOTLINE}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('meter-services')}
            className="inline-flex items-center gap-1 px-3 py-1 bg-transparent hover:bg-black/10 text-white font-medium text-xs transition border border-white/30 focus:ring-2 focus:ring-white focus:outline-hidden"
          >
            Learn About STS
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
          
          <button
            type="button"
            onClick={() => onNavigate('report-outage')}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white text-edsa-red hover:bg-surface-1 font-semibold text-xs transition focus:ring-2 focus:ring-white focus:outline-hidden"
          >
            <PhoneCall className="w-3 h-3" aria-hidden="true" />
            Report Fault (672)
          </button>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement banner"
            className="p-1 text-red-100 hover:text-white hover:bg-red-800/60 transition focus:ring-2 focus:ring-white focus:outline-hidden ml-1"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};
