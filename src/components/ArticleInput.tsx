import React from 'react';
import { SupportedLanguage } from '../types';
import { Sparkles, Trash2, FileText, ArrowRight, AlertCircle, Languages } from 'lucide-react';

interface ArticleInputProps {
  articleText: string;
  setArticleText: (text: string) => void;
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: (lang: SupportedLanguage) => void;
  detectedLanguage: 'malayalam' | 'english';
  onLoadSampleMalayalam: () => void;
  onLoadSampleEnglish: () => void;
  onClear: () => void;
  onAnalyse: () => void;
  isProcessing: boolean;
  errorMessage?: string | null;
}

export const ArticleInput: React.FC<ArticleInputProps> = ({
  articleText,
  setArticleText,
  selectedLanguage,
  setSelectedLanguage,
  detectedLanguage,
  onLoadSampleMalayalam,
  onLoadSampleEnglish,
  onClear,
  onAnalyse,
  isProcessing,
  errorMessage
}) => {
  const charCount = articleText.length;
  const wordCount = articleText.trim() ? articleText.trim().split(/\s+/).length : 0;
  const isInputValid = articleText.trim().length >= 10;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 transition-all">
      
      {/* Stage Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-manorama-red text-white text-xs font-black">
              1
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Enter Your News Article
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9.5">
            Input source wire copy, reporter dispatch, or press release in Malayalam or English.
          </p>
        </div>

        {/* Load Sample Buttons */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">
            Load Sample:
          </span>
          <button
            type="button"
            onClick={onLoadSampleEnglish}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            title="Load English news sample (Kochi Water Metro)"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Sample English</span>
          </button>
          <button
            type="button"
            onClick={onLoadSampleMalayalam}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors font-ml"
            title="Load Malayalam news sample (Kerala Rain Alert)"
          >
            <FileText className="w-3.5 h-3.5 text-manorama-red" />
            <span>Sample മലയാളം</span>
          </button>
        </div>
      </div>

      {/* Language Selector Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4 mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-600 flex items-center space-x-1">
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <span>Source Language:</span>
          </span>
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setSelectedLanguage('auto')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedLanguage === 'auto'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              ✨ Auto Detect
            </button>
            <button
              type="button"
              onClick={() => setSelectedLanguage('english')}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedLanguage === 'english'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setSelectedLanguage('malayalam')}
              className={`px-3 py-1 rounded-lg transition-all font-ml ${
                selectedLanguage === 'malayalam'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              മലയാളം (Malayalam)
            </button>
          </div>
        </div>

        {/* Live Detected Script Indicator */}
        <div className="text-xs text-slate-500 flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          <span>Detected Script:</span>
          <span className="font-bold text-slate-900 capitalize">
            {detectedLanguage}
          </span>
        </div>
      </div>

      {/* Main Text Area */}
      <div className="relative mt-2">
        <textarea
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          rows={6}
          placeholder="Paste or type article text here in English or Malayalam..."
          className="w-full p-4 text-base text-slate-800 bg-slate-50/50 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-manorama-red/20 focus:border-manorama-red font-ml resize-y transition-all placeholder:text-slate-400 placeholder:font-sans"
        />

        {/* Real-time Counts */}
        <div className="flex items-center justify-between text-xs text-slate-400 mt-1 px-1 font-mono">
          <span>
            {wordCount} words • {charCount} characters
          </span>
          <span>{charCount > 0 && isInputValid ? 'Ready for AI processing' : 'Minimum 10 characters required'}</span>
        </div>
      </div>

      {/* Validation / Error Message */}
      {errorMessage && (
        <div className="mt-3 flex items-center space-x-2 text-xs font-medium text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Bottom Action Strip */}
      <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onClear}
          disabled={!articleText}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Article</span>
        </button>

        <button
          type="button"
          onClick={onAnalyse}
          disabled={!isInputValid || isProcessing}
          className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md transition-all ${
            isInputValid && !isProcessing
              ? 'bg-manorama-red hover:bg-manorama-darkRed active:scale-98 shadow-red-500/20'
              : 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing Stage 2...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analyse & Translate Article</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
