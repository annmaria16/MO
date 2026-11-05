import React, { useState, useEffect } from 'react';
import { Newspaper, Settings, RefreshCw, SlidersHorizontal, FileText, Sparkles, Tag, Globe } from 'lucide-react';

interface HeaderProps {
  isDemoMode: boolean;
  onOpenSettings: () => void;
  onResetToSample: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({
  isDemoMode,
  onOpenSettings,
  onResetToSample,
}) => {
  const [currentSection, setCurrentSection] = useState<string>('section-input');

  const navItems = [
    { id: 'section-input', label: '1. Article Input', icon: FileText },
    { id: 'section-results', label: '2. AI Results & Editor', icon: Sparkles },
    { id: 'section-key-info', label: '3. Key Information', icon: Tag },
    { id: 'section-previews', label: '4. Publication Previews', icon: Globe },
  ];

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    setCurrentSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll spy to highlight active nav item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setCurrentSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Bar */}
        <div className="flex items-center justify-between h-16 sm:h-18 border-b border-slate-100">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-manorama-red text-white shadow-xs">
              <Newspaper className="w-5 h-5" />
            </div>

            <div className="border-l border-slate-200 pl-3 sm:pl-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900 font-serif">
                  NewsBridge <span className="text-manorama-red">AI</span>
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider">
                  Workflow Desk
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 tracking-tight">
                A smarter bridge from newsroom to reader.
              </p>
            </div>
          </div>

          {/* Right: Controls & Demo Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-manorama-red"></span>
              <span>Newsroom workflow concept for Manorama Online</span>
            </div>

            <div
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                isDemoMode
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-indigo-50 text-indigo-800 border-indigo-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isDemoMode ? 'bg-emerald-500' : 'bg-indigo-500'
                }`}
              />
              <span>{isDemoMode ? 'Demo Mode' : 'Live Gemini AI'}</span>
            </div>

            <button
              onClick={onResetToSample}
              title="Reset sample news story"
              className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
              aria-label="Reset sample"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenSettings}
              title="Configure API key and limits"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              aria-label="Settings"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>

        </div>

        {/* Fixed Horizontal Navigation Links Bar */}
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none" aria-label="Section Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollTo(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-manorama-red text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};
