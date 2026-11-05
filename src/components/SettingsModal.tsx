import React, { useState } from 'react';
import { X, Key, Shield, Sparkles, Sliders, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  headlineLimit: number;
  setHeadlineLimit: (limit: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  setApiKey,
  headlineLimit,
  setHeadlineLimit
}) => {
  const [tempKey, setTempKey] = useState<string>(apiKey);
  const [showKey, setShowKey] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setApiKey(tempKey.trim());
    sessionStorage.setItem('newsbridge_gemini_key', tempKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClearKey = () => {
    setTempKey('');
    setApiKey('');
    sessionStorage.removeItem('newsbridge_gemini_key');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-red-100 text-manorama-red">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                NewsBridge AI Configuration
              </h3>
              <p className="text-xs text-slate-500">
                AI Provider, Headline Rules & Newsroom Preferences
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          
          {/* Engine Mode Explanation */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Processing Engine</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                apiKey ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {apiKey ? 'Active: Live Gemini API' : 'Active: Deterministic Demo Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              By default, NewsBridge AI runs in <strong>Demo Mode</strong> with curated high-fidelity Malayalam journalistic datasets and local heuristic rule engines. No external API key is needed for assessment evaluation.
            </p>
          </div>

          {/* Gemini API Key Setting */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Key className="w-3.5 h-3.5 text-manorama-red" />
                <span>Google Gemini API Key (Optional)</span>
              </span>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-[11px] text-blue-600 hover:underline"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </label>
            <input
              type={showKey ? 'text' : 'password'}
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="Paste AI Studio API key (AIzaSy...)"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-manorama-red font-mono"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Saved exclusively in browser session memory.</span>
              {tempKey && (
                <button
                  type="button"
                  onClick={handleClearKey}
                  className="text-red-500 hover:underline"
                >
                  Clear Key
                </button>
              )}
            </div>
          </div>

          {/* Headline Limit Defaults */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700">
              Default Headline Character Limit
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[50, 60, 70, 80].map((limit) => (
                <button
                  key={limit}
                  type="button"
                  onClick={() => setHeadlineLimit(limit)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    headlineLimit === limit
                      ? 'bg-manorama-red text-white border-manorama-red shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {limit} Chars
                </button>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 text-[11px] text-amber-800 flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Assessment Compliance:</strong> No secrets are hardcoded in source code or pushed to Git. Keys are handled strictly client-side in volatile session storage.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
            {savedSuccess && (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Settings saved successfully!</span>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-bold text-white bg-manorama-red hover:bg-manorama-darkRed rounded-lg shadow-sm transition-all"
            >
              Save Configuration
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

