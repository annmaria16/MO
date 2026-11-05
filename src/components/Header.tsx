import React from 'react';
import { Newspaper, Settings, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';

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
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Brand & Tagline */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Newsroom Emblem */}
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-manorama-darkRed via-manorama-red to-red-500 text-white shadow-md shadow-red-500/20">
              <Newspaper className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="border-l border-slate-200 pl-3 sm:pl-4">
              <div className="flex items-baseline space-x-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-serif">
                  NewsBridge <span className="text-manorama-red">AI</span>
                </h1>
                <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                  v1.0 Intern Assessment
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 tracking-tight">
                A smarter bridge from newsroom to reader.
              </p>
            </div>
          </div>

          {/* Right: Badges & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Context Label Badge */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-medium text-slate-700">
              <div className="w-2 h-2 rounded-full bg-manorama-red"></div>
              <span>Manorama Online Newsroom Concept</span>
            </div>

            {/* AI / Demo Mode Status Pill */}
            <div
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold border ${
                isDemoMode
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isDemoMode ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-500 animate-pulse'
                }`}
              />
              <span className="hidden xs:inline">
                {isDemoMode ? 'Demo Mode' : 'Live Gemini AI'}
              </span>
              <span className="xs:hidden">
                {isDemoMode ? 'Demo' : 'AI'}
              </span>
            </div>

            {/* Reset / Reload Sample */}
            <button
              onClick={onResetToSample}
              title="Reset to default sample article"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
              aria-label="Reset sample"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Settings Modal Button */}
            <button
              onClick={onOpenSettings}
              title="Configure AI & limits"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
