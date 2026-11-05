import React, { useState, useEffect } from 'react';
import { BilingualContent, ReviewStatus } from '../types';
import { Copy, Check, Sliders, AlertTriangle, CheckCircle2, ChevronDown, Sparkles, PenLine, RotateCcw } from 'lucide-react';
import { generateShorterHeadline } from '../services/aiService';

interface BilingualResultsProps {
  malayalam: BilingualContent;
  english: BilingualContent;
  onUpdateMalayalam: (field: keyof BilingualContent, val: string) => void;
  onUpdateEnglish: (field: keyof BilingualContent, val: string) => void;
  headlineLimit: number;
  setHeadlineLimit: (limit: number) => void;
  reviewStatus: ReviewStatus;
  setReviewStatus: (status: ReviewStatus) => void;
  isDemoMode?: boolean;
}

export const BilingualResults: React.FC<BilingualResultsProps> = ({
  malayalam,
  english,
  onUpdateMalayalam,
  onUpdateEnglish,
  headlineLimit,
  setHeadlineLimit,
  reviewStatus,
  setReviewStatus,
  isDemoMode = true
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Track if user clicked "Write My Own" to dismiss suggestion for current input
  const [dismissedEnSuggestion, setDismissedEnSuggestion] = useState(false);
  const [dismissedMlSuggestion, setDismissedMlSuggestion] = useState(false);

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(identifier);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const enHeadLen = (english.headline || '').length;
  const mlHeadLen = (malayalam.headline || '').length;

  const isEnWithin = enHeadLen <= headlineLimit;
  const isMlWithin = mlHeadLen <= headlineLimit;

  // Compute shorter headline suggestions
  const suggestedEnHeadline = generateShorterHeadline(english.headline, 'english', headlineLimit, english.summary);
  const suggestedMlHeadline = generateShorterHeadline(malayalam.headline, 'malayalam', headlineLimit, malayalam.summary);

  // Reset dismiss state if user edits to a new string
  useEffect(() => {
    if (isEnWithin) {
      setDismissedEnSuggestion(false);
    }
  }, [english.headline, headlineLimit, isEnWithin]);

  useEffect(() => {
    if (isMlWithin) {
      setDismissedMlSuggestion(false);
    }
  }, [malayalam.headline, headlineLimit, isMlWithin]);

  // Handle accepting suggestions
  const handleApplyEnSuggestion = () => {
    onUpdateEnglish('headline', suggestedEnHeadline);
    setDismissedEnSuggestion(false);
  };

  const handleApplyMlSuggestion = () => {
    onUpdateMalayalam('headline', suggestedMlHeadline);
    setDismissedMlSuggestion(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 transition-all">
      
      {/* Section 2 Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-manorama-red text-white text-xs font-black">
              2
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              AI Results & Editor
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9.5">
            Refine headlines, summaries, and full translations. Smart alternative suggestions are automatically generated when limits are exceeded.
          </p>
        </div>

        {/* Top Controls: Review Status and Headline Limit */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Review Status Pill Selector */}
          <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <span className="font-semibold text-slate-500">Status:</span>
            <select
              value={reviewStatus}
              onChange={(e) => setReviewStatus(e.target.value as ReviewStatus)}
              className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="Pending Review">⏳ Pending Review</option>
              <option value="Reviewed">🔍 Reviewed</option>
              <option value="Approved for Preview">✅ Approved for Preview</option>
            </select>
          </div>

          {/* Headline Limit Selector */}
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold text-slate-500">Limit:</span>
            <div className="relative">
              <select
                value={headlineLimit}
                onChange={(e) => {
                  setHeadlineLimit(Number(e.target.value));
                  setDismissedEnSuggestion(false);
                  setDismissedMlSuggestion(false);
                }}
                className="font-bold bg-transparent text-slate-900 pr-4 appearance-none focus:outline-none cursor-pointer"
              >
                <option value={40}>40 chars</option>
                <option value={50}>50 chars</option>
                <option value={60}>60 chars</option>
                <option value={70}>70 chars</option>
                <option value={80}>80 chars</option>
                <option value={100}>100 chars</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-0 top-1 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Two Side-by-Side Editing Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: English Content */}
        {/* ============================================================ */}
        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col space-y-4">
          
          {/* Column Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold tracking-wide">
                English Content
              </span>
              <span
                className={`text-xs font-mono font-bold ${
                  isEnWithin ? 'text-emerald-700' : 'text-red-600'
                }`}
              >
                Headline: {enHeadLen}/{headlineLimit} chars
              </span>
            </div>

            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                isEnWithin
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {isEnWithin ? '✓ Within Limit' : `⚠️ ${enHeadLen - headlineLimit} chars over`}
            </span>
          </div>

          {/* English Headline */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2">
                <label className="text-xs font-bold text-slate-700">
                  Headline (English)
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  ({enHeadLen}/{headlineLimit} chars)
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(english.headline, 'en-head')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy headline"
              >
                {copiedField === 'en-head' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[11px]">Copy</span>
              </button>
            </div>
            
            <input
              type="text"
              value={english.headline}
              onChange={(e) => {
                onUpdateEnglish('headline', e.target.value);
                setDismissedEnSuggestion(false);
              }}
              className={`w-full px-3.5 py-2.5 text-sm font-semibold rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                isEnWithin
                  ? 'border-slate-300 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900'
                  : 'border-red-400 ring-2 ring-red-100 text-red-950 bg-red-50/20'
              }`}
              placeholder="Enter English headline..."
            />

            {/* Warning Message when limit exceeded */}
            {!isEnWithin && (
              <p className="text-[11px] text-red-600 mt-1.5 flex items-center space-x-1 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Headline exceeds character budget by {enHeadLen - headlineLimit} characters ({enHeadLen}/{headlineLimit} chars).</span>
              </p>
            )}

            {/* Smart Shorter Headline Suggestion Box */}
            {!isEnWithin && !dismissedEnSuggestion && suggestedEnHeadline && (
              <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/90 shadow-xs space-y-2.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Suggested Shorter Headline</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {suggestedEnHeadline.length}/{headlineLimit} chars (Within Limit ✓)
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {isDemoMode ? 'Demo Suggestion' : 'AI Suggestion'}
                    </span>
                  </div>
                </div>

                {/* The Suggested Headline Text */}
                <div className="p-2.5 rounded-lg bg-white border border-amber-200 text-sm font-bold text-slate-900 shadow-2xs">
                  "{suggestedEnHeadline}"
                </div>

                {/* Two Clear Options */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setDismissedEnSuggestion(true)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-amber-100/60 rounded-lg transition-colors"
                  >
                    <PenLine className="w-3.5 h-3.5 text-slate-500" />
                    <span>Write My Own</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleApplyEnSuggestion}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-manorama-red hover:bg-manorama-darkRed text-white text-xs font-bold rounded-lg shadow-xs transition-all active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Use Suggested Headline</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* English Summary */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Lead Summary (English)
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(english.summary, 'en-sum')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy summary"
              >
                {copiedField === 'en-sum' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[11px]">Copy</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={english.summary}
              onChange={(e) => onUpdateEnglish('summary', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 resize-none leading-relaxed"
              placeholder="Concise 2-sentence summary..."
            />
            <div className="text-right text-[10px] text-slate-400 mt-0.5">
              {english.summary.length} characters
            </div>
          </div>

          {/* English Full Article */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                Full Article Body (English)
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(english.article, 'en-art')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy full article"
              >
                {copiedField === 'en-art' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[11px]">Copy</span>
              </button>
            </div>
            <textarea
              rows={5}
              value={english.article}
              onChange={(e) => onUpdateEnglish('article', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 resize-y leading-relaxed"
              placeholder="Full translated body copy..."
            />
            <div className="text-right text-[10px] text-slate-400 mt-0.5">
              {english.article.length} characters
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Malayalam Content */}
        {/* ============================================================ */}
        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col space-y-4">
          
          {/* Column Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-lg bg-manorama-red text-white text-xs font-bold tracking-wide font-ml">
                മലയാളം (Malayalam)
              </span>
              <span
                className={`text-xs font-mono font-bold ${
                  isMlWithin ? 'text-emerald-700' : 'text-red-600'
                }`}
              >
                തലക്കെട്ട്: {mlHeadLen}/{headlineLimit} chars
              </span>
            </div>

            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md font-ml ${
                isMlWithin
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {isMlWithin ? '✓ പരിധിക്കുള്ളിൽ' : `⚠️ ${mlHeadLen - headlineLimit} അക്ഷരങ്ങൾ അധികം`}
            </span>
          </div>

          {/* Malayalam Headline */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center space-x-2">
                <label className="text-xs font-bold text-slate-700 font-ml">
                  തലക്കെട്ട് (Malayalam Headline)
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  ({mlHeadLen}/{headlineLimit} chars)
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(malayalam.headline, 'ml-head')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy Malayalam headline"
              >
                {copiedField === 'ml-head' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[11px]">Copy</span>
              </button>
            </div>
            
            <input
              type="text"
              value={malayalam.headline}
              onChange={(e) => {
                onUpdateMalayalam('headline', e.target.value);
                setDismissedMlSuggestion(false);
              }}
              className={`w-full px-3.5 py-2.5 text-sm font-ml font-bold rounded-lg border bg-white focus:outline-none focus:ring-2 transition-all ${
                isMlWithin
                  ? 'border-slate-300 focus:ring-manorama-red/20 focus:border-manorama-red text-slate-900'
                  : 'border-red-400 ring-2 ring-red-100 text-red-950 bg-red-50/20'
              }`}
              placeholder="മലയാളം തലക്കെട്ട് നൽകുക..."
            />

            {/* Warning Message when limit exceeded */}
            {!isMlWithin && (
              <p className="text-[11px] text-red-600 mt-1.5 flex items-center space-x-1 font-ml font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>തലക്കെട്ട് അനുവദനീയമായ പരിധിയേക്കാൾ {mlHeadLen - headlineLimit} അക്ഷരങ്ങൾ കൂടുതലാണ് ({mlHeadLen}/{headlineLimit} chars).</span>
              </p>
            )}

            {/* Smart Shorter Headline Suggestion Box */}
            {!isMlWithin && !dismissedMlSuggestion && suggestedMlHeadline && (
              <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/90 shadow-xs space-y-2.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-900 font-ml">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>നിർദ്ദേശിക്കുന്ന ചുരുങ്ങിയ തലക്കെട്ട് (Shorter Alternative)</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-ml">
                      {suggestedMlHeadline.length}/{headlineLimit} chars (പരിധിക്കുള്ളിൽ ✓)
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 font-sans">
                      {isDemoMode ? 'Demo Suggestion' : 'AI Suggestion'}
                    </span>
                  </div>
                </div>

                {/* The Suggested Headline Text */}
                <div className="p-2.5 rounded-lg bg-white border border-amber-200 text-sm font-bold text-slate-900 font-ml shadow-2xs">
                  "{suggestedMlHeadline}"
                </div>

                {/* Two Clear Options */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setDismissedMlSuggestion(true)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-amber-100/60 rounded-lg transition-colors font-ml"
                  >
                    <PenLine className="w-3.5 h-3.5 text-slate-500" />
                    <span>Write My Own (സ്വന്തമായി തിരുത്തുക)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleApplyMlSuggestion}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-manorama-red hover:bg-manorama-darkRed text-white text-xs font-bold rounded-lg shadow-xs transition-all active:scale-95 font-ml"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Use Suggested Headline</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Malayalam Summary */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 font-ml">
                സംഗ്രഹം (Malayalam Summary)
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(malayalam.summary, 'ml-sum')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy Malayalam summary"
              >
                {copiedField === 'ml-sum' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[11px]">Copy</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={malayalam.summary}
              onChange={(e) => onUpdateMalayalam('summary', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-ml rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-manorama-red/20 focus:border-manorama-red text-slate-800 resize-none leading-relaxed"
              placeholder="ലഘു വാർത്താ സംഗ്രഹം..."
            />
            <div className="text-right text-[10px] text-slate-400 mt-0.5">
              {malayalam.summary.length} characters
            </div>
          </div>

          {/* Malayalam Full Article */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 font-ml">
                പൂർണ്ണ രൂപം (Malayalam Full Article)
              </label>
              <button
                type="button"
                onClick={() => copyToClipboard(malayalam.article, 'ml-art')}
                className="text-slate-400 hover:text-slate-700 text-xs inline-flex items-center space-x-1"
                title="Copy full Malayalam text"
              >
                {copiedField === 'ml-art' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span className="text-[11px]">Copy</span>
              </button>
            </div>
            <textarea
              rows={5}
              value={malayalam.article}
              onChange={(e) => onUpdateMalayalam('article', e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-ml rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-manorama-red/20 focus:border-manorama-red text-slate-700 resize-y leading-relaxed"
              placeholder="പൂർണ്ണ വിവരണം..."
            />
            <div className="text-right text-[10px] text-slate-400 mt-0.5">
              {malayalam.article.length} characters
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
