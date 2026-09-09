import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Zap, FileText, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react';
import { RouteId } from '../types';
import { SERVICES_DATA, NEWS_DATA, DOCUMENTS_DATA, PROJECTS_DATA, FAQS_DATA } from '../data/edsaData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: RouteId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredServices = q
    ? SERVICES_DATA.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    : SERVICES_DATA.slice(0, 4);

  const filteredNews = q
    ? NEWS_DATA.filter(n => n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q))
    : [];

  const filteredProjects = q
    ? PROJECTS_DATA.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    : [];

  const filteredDocs = q
    ? DOCUMENTS_DATA.filter(d => d.title.toLowerCase().includes(q) || d.referenceNo.toLowerCase().includes(q))
    : [];

  const filteredFaqs = q
    ? FAQS_DATA.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    : [];

  const handleSelect = (route: RouteId) => {
    onNavigate(route);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Search EDSA Website"
    >
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-800 shrink-0 mr-3" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, tariffs, STS tokens, tenders, outage reports..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-800 focus:outline-hidden text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-800 hover:text-slate-800 "
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-xs font-semibold px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800  transition"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Services Matches */}
          <div>
            <div className="text-xs font-semibold tracking-wider text-slate-800 uppercase px-2 mb-2">
              {q ? 'Matching Customer Services' : 'Quick Actions & Services'}
            </div>
            <div className="space-y-1.5">
              {filteredServices.map(service => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleSelect(service.route)}
                  className="w-full flex items-center justify-between p-2.5 hover:bg-slate-100 text-left transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2  bg-blue-50 text-blue-800 group-hover:bg-blue-800 group-hover:text-white transition">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{service.title}</div>
                      <div className="text-xs text-slate-800 line-clamp-1">{service.description}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-800 group-hover:text-slate-800 transition" />
                </button>
              ))}
            </div>
          </div>

          {/* Documents & Tenders Matches */}
          {filteredDocs.length > 0 && (
            <div>
              <div className="text-xs font-semibold tracking-wider text-slate-800 uppercase px-2 mb-2">
                Documents & Tenders
              </div>
              <div className="space-y-1.5">
                {filteredDocs.map(doc => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleSelect('documents')}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-slate-100 text-left transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2  bg-emerald-50 text-emerald-800">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 line-clamp-1">{doc.title}</div>
                        <div className="text-xs text-slate-800">{doc.referenceNo} • {doc.category}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono bg-slate-100 text-slate-800 px-2 py-0.5 ">
                      {doc.fileFormat}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects Matches */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-xs font-semibold tracking-wider text-slate-800 uppercase px-2 mb-2">
                Capital Infrastructure Projects
              </div>
              <div className="space-y-1.5">
                {filteredProjects.map(proj => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => handleSelect('projects')}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-slate-100 text-left transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2  bg-emerald-50 text-emerald-800">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 line-clamp-1">{proj.title}</div>
                        <div className="text-xs text-slate-800">{proj.category} • {proj.location}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* News Matches */}
          {filteredNews.length > 0 && (
            <div>
              <div className="text-xs font-semibold tracking-wider text-slate-800 uppercase px-2 mb-2">
                News & Public Announcements
              </div>
              <div className="space-y-1.5">
                {filteredNews.map(news => (
                  <button
                    key={news.id}
                    type="button"
                    onClick={() => handleSelect('news')}
                    className="w-full flex items-center justify-between p-2.5 hover:bg-slate-100 text-left transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2  bg-amber-50 text-amber-800">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 line-clamp-1">{news.title}</div>
                        <div className="text-xs text-slate-800">{news.category} • {news.date}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Matches */}
          {filteredFaqs.length > 0 && (
            <div>
              <div className="text-xs font-semibold tracking-wider text-slate-800 uppercase px-2 mb-2">
                Help & FAQs
              </div>
              <div className="space-y-2">
                {filteredFaqs.map((faq, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelect('support')}
                    className="p-3 bg-slate-50 hover:bg-slate-100 cursor-pointer transition"
                  >
                    <div className="text-sm font-semibold text-slate-900">{faq.q}</div>
                    <div className="text-xs text-slate-800 mt-1 line-clamp-2">{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {q && filteredServices.length === 0 && filteredDocs.length === 0 && filteredNews.length === 0 && filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-slate-800">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-800">No direct results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-800 mt-1">Try searching for keywords like &ldquo;STS&rdquo;, &ldquo;Tariff&rdquo;, &ldquo;Connection&rdquo;, or &ldquo;Hotline&rdquo;</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 text-xs text-slate-800 flex justify-between items-center">
          <span>Official EDSA National Portal Search</span>
          <span>Emergency Hotline: <strong className="text-red-700">672</strong></span>
        </div>
      </div>
    </div>
  );
};
