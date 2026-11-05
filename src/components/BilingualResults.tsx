import React, { useState } from 'react';
import { BilingualContent } from '../types';
import { Copy, Check, Sparkles, AlertTriangle, CheckCircle2, Sliders, ChevronDown } from 'lucide-react';

interface BilingualResultsProps {
  malayalam: BilingualContent;
  english: BilingualContent;
  onUpdateMalayalam: (field: keyof BilingualContent, val: string) => void;
  onUpdateEnglish: (field: keyof BilingualContent, val: string) => void;
  headlineLimit: number;
  setHeadlineLimit: (limit: number) => void;
}

export const BilingualResults: React.FC<BilingualResultsProps> = ({
  malayalam,
  english,
  onUpdateMalayalam,
  onUpdateEnglish,
  headlineLimit,
  setHeadlineLimit
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(identifier);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const mlLen = (malayalam.headline || '').length;
  const enLen = (english.headline || '').length;

  const isMlWithin = mlLen <= headlineLimit;
  const isEnWithin = enLen <= headlineLimit;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 sm:p-5 transition-all">
      
      {/* Header bar with Headline Limit Config */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-red-50 text-manorama-red">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              AI Results & Editor
            </h2>
            <p className="text-[11px] text-slate-400">
              Live editable bilingual content with character validation
            </p>
          </div>
        </div>

        {/* Headline Limit Selector */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-slate-600 flex items-center space-x-1">
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span>Headline Limit:</span>
          </label>
          <div className="relative">
            <select
              value={headlineLimit}
              onChange={(e) => setHeadlineLimit(Number(e.target.value))}
              className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-md px-2.5 py-1 text-slate-700 pr-6 appearance-none focus:outline-none focus:ring-1 focus:ring-manorama-red cursor-pointer"
            >
              <option value={40}>40 chars</option>
              <option value={50}>50 chars</option>
              <option value={60}>60 chars</option>
              <option value={70}>70 chars</option>
              <option value={80}>80 chars</option>
              <option value={100}>100 chars</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>

          {/* Validation Overall Pill */}
          <span
            className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium ${
              isMlWithin && isEnWithin
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {isMlWithin && isEnWithin ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Within Limit</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                <span>Limit Exceeded</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Side by side columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        
        {/* Malayalam Column */}
        <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col space-y-3">
          
          {/* Column Header & Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded bg-manorama-red text-white text-xs font-semibold">
                മലയാളം
              </span>
              <span
                className={`text-xs font-mono font-medium ${
                  isMlWithin ? 'text-emerald-700' : 'text-red-600 font-bold'
                }`}
              >
                ({mlLen}/{headlineLimit} chars) {isMlWithin ? '✓' : '⚠️'}
              </span>
            </div>

            <span className="text-[11px] text-slate-400">
              {headlineLimit - mlLen >= 0 ? `${headlineLimit - mlLen} left` : `${Math.abs(headlineLimit - mlLen)} over limit`}
            </span>
          </div>

          {/* Headline Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                തലക്കെട്ട് (Headline)
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(malayalam.headline, 'ml-head')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy Malayalam headline"
              >
                {copiedField === 'ml-head' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">Copy</span>
              </button>
            </div>
            <input
              type="text"
              value={malayalam.headline}
              onChange={(e) => onUpdateMalayalam('headline', e.target.value)}
              className={`w-full px-3 py-2 text-sm font-ml font-bold rounded-md border bg-white focus:outline-none focus:ring-2 ${
                isMlWithin
                  ? 'border-slate-300 focus:ring-manorama-red/20 focus:border-manorama-red text-slate-900'
                  : 'border-red-400 ring-2 ring-red-100 text-red-950 bg-red-50/30'
              }`}
              placeholder="മലയാളം തലക്കെട്ട് നൽകുക..."
            />
            {!isMlWithin && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 shrink-0" />
                <span>തലക്കെട്ട് അനുവദനീയമായ പരിധിയേക്കാൾ {mlLen - headlineLimit} അക്ഷരങ്ങൾ കൂടുതലാണ്.</span>
              </p>
            )}
          </div>

          {/* Summary Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                സംഗ്രഹം (Summary)
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(malayalam.summary, 'ml-sum')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy Malayalam summary"
              >
                {copiedField === 'ml-sum' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">Copy</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={malayalam.summary}
              onChange={(e) => onUpdateMalayalam('summary', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm font-ml rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-manorama-red/20 focus:border-manorama-red text-slate-800 resize-none"
              placeholder="ലഘു സംഗ്രഹം..."
            />
          </div>

          {/* Full Translated / Processed Article */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                പൂർണ്ണ രൂപം (Full Article)
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(malayalam.article, 'ml-art')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy full Malayalam text"
              >
                {copiedField === 'ml-art' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">Copy</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={malayalam.article}
              onChange={(e) => onUpdateMalayalam('article', e.target.value)}
              className="w-full px-3 py-2 text-xs font-ml rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-manorama-red/20 focus:border-manorama-red text-slate-700 resize-none"
              placeholder="പൂർണ്ണ വിവരണം..."
            />
          </div>

        </div>

        {/* English Column */}
        <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col space-y-3">
          
          {/* Column Header & Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-600 text-white text-xs font-semibold">
                English
              </span>
              <span
                className={`text-xs font-mono font-medium ${
                  isEnWithin ? 'text-emerald-700' : 'text-red-600 font-bold'
                }`}
              >
                ({enLen}/{headlineLimit} chars) {isEnWithin ? '✓' : '⚠️'}
              </span>
            </div>

            <span className="text-[11px] text-slate-400">
              {headlineLimit - enLen >= 0 ? `${headlineLimit - enLen} left` : `${Math.abs(headlineLimit - enLen)} over limit`}
            </span>
          </div>

          {/* Headline Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Headline
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(english.headline, 'en-head')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy English headline"
              >
                {copiedField === 'en-head' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">Copy</span>
              </button>
            </div>
            <input
              type="text"
              value={english.headline}
              onChange={(e) => onUpdateEnglish('headline', e.target.value)}
              className={`w-full px-3 py-2 text-sm font-semibold rounded-md border bg-white focus:outline-none focus:ring-2 ${
                isEnWithin
                  ? 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900'
                  : 'border-red-400 ring-2 ring-red-100 text-red-950 bg-red-50/30'
              }`}
              placeholder="Enter English headline..."
            />
            {!isEnWithin && (
              <p className="text-[11px] text-red-600 mt-1 flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 shrink-0" />
                <span>Headline exceeds character limit by {enLen - headlineLimit} chars.</span>
              </p>
            )}
          </div>

          {/* Summary Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Summary
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(english.summary, 'en-sum')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy English summary"
              >
                {copiedField === 'en-sum' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">Copy</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={english.summary}
              onChange={(e) => onUpdateEnglish('summary', e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 resize-none"
              placeholder="Brief summary..."
            />
          </div>

          {/* Full Translated / Processed Article */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Full Article
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(english.article, 'en-art')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy full English text"
              >
                {copiedField === 'en-art' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[10px]">Copy</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={english.article}
              onChange={(e) => onUpdateEnglish('article', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-md border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 resize-none"
              placeholder="Full article content..."
            />
          </div>

        </div>

      </div>

    </div>
  );
};
