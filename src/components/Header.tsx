import React from 'react';
import { Newspaper, Settings, RefreshCw, SlidersHorizontal, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  isDemoMode: boolean;
  onOpenSettings: () => void;
  onResetToSample: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDemoMode,
  onOpenSettings,
  onResetToSample
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Elegant News Icon */}
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-manorama-red text-white shadow-sm shadow-red-500/20">
              <Newspaper className="w-6 h-6" />
            </div>

            <div className="border-l border-slate-200 pl-3 sm:pl-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-serif">
                  NewsBridge <span className="text-manorama-red">AI</span>
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                  Concept Desk
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 tracking-tight">
                A smarter bridge from newsroom to reader.
              </p>
            </div>
          </div>

          {/* Right: Workflow Status & Settings */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Concept Label */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-manorama-red"></span>
              <span>Newsroom workflow concept for Manorama Online</span>
            </div>

            {/* AI / Demo Mode Pill */}
            <div
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
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

            {/* Reset Sample Button */}
            <button
              onClick={onResetToSample}
              title="Reset to default news sample"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
              aria-label="Reset sample"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              title="Configure API key and limits"
              className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              aria-label="Settings"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
