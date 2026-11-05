import React from 'react';
import { SupportedLanguage } from '../types';
import { PenSquare, Sparkles, Trash2, FileText, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

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
  const maxChars = 3000;
  const isInputValid = articleText.trim().length >= 10;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col justify-between h-full transition-all hover:border-slate-300">
      
      {/* Top Header & Actions */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-red-50 text-manorama-red">
              <PenSquare className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Article Input
            </h2>
          </div>

          {/* Sample Load Buttons */}
          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={onLoadSampleMalayalam}
              className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
              title="Load realistic Malayalam rain alert sample"
            >
              <FileText className="w-3.5 h-3.5 text-manorama-red" />
              <span>Sample Malayalam</span>
            </button>
            <button
              type="button"
              onClick={onLoadSampleEnglish}
              className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
              title="Load realistic English Kochi Water Metro sample"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Sample English</span>
            </button>
          </div>

        </div>

        {/* Language Selection Filter Tabs */}
        <div className="flex items-center justify-between mt-3 mb-2">
          <div className="inline-flex p-1 bg-slate-100/90 rounded-lg text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => setSelectedLanguage('auto')}
              className={`px-3 py-1 rounded-md transition-all ${
                selectedLanguage === 'auto'
                  ? 'bg-manorama-red text-white shadow-sm font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              ✨ Auto Detect
            </button>
            <button
              type="button"
              onClick={() => setSelectedLanguage('malayalam')}
              className={`px-3 py-1 rounded-md transition-all ${
                selectedLanguage === 'malayalam'
                  ? 'bg-manorama-red text-white shadow-sm font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              Malayalam
            </button>
            <button
              type="button"
              onClick={() => setSelectedLanguage('english')}
              className={`px-3 py-1 rounded-md transition-all ${
                selectedLanguage === 'english'
                  ? 'bg-manorama-red text-white shadow-sm font-semibold'
                  : 'hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>

          {/* Detected Language Pill */}
          <div className="text-xs text-slate-500 flex items-center space-x-1">
            <span>Detected:</span>
            <span className="font-semibold text-slate-800 capitalize bg-slate-100 px-2 py-0.5 rounded">
              {detectedLanguage}
            </span>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative mt-2">
          <textarea
            value={articleText}
            onChange={(e) => setArticleText(e.target.value)}
            rows={5}
            placeholder="Type, paste, or select a sample news article in Malayalam or English to process..."
            className="w-full p-3.5 text-sm sm:text-base text-slate-800 bg-slate-50/50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-manorama-red/30 focus:border-manorama-red font-ml resize-none transition-all placeholder:text-slate-400 placeholder:font-sans"
            maxLength={maxChars}
          />

          {/* Char Counter */}
          <div className="text-right text-[11px] text-slate-400 mt-1 font-mono">
            {charCount} / {maxChars}
          </div>
        </div>

        {/* Validation / Error Message */}
        {errorMessage && (
          <div className="mt-2 flex items-center space-x-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-md border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={onClear}
          disabled={!articleText}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-500"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear</span>
        </button>

        <button
          type="button"
          onClick={onAnalyse}
          disabled={!isInputValid || isProcessing}
          className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-md transition-all ${
            isInputValid && !isProcessing
              ? 'bg-gradient-to-r from-manorama-red to-red-600 hover:from-manorama-darkRed hover:to-red-700 shadow-red-500/25 active:scale-95'
              : 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analysing & Translating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analyse & Translate</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
