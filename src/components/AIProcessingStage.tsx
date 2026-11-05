import React from 'react';
import { Sparkles, CheckCircle2, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';

interface AIProcessingStageProps {
  isProcessing: boolean;
  isDemoMode: boolean;
  sourceLanguage: 'malayalam' | 'english';
  targetLanguage: 'malayalam' | 'english';
  hasProcessed: boolean;
}

export const AIProcessingStage: React.FC<AIProcessingStageProps> = ({
  isProcessing,
  isDemoMode,
  sourceLanguage,
  targetLanguage,
  hasProcessed
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 transition-all">
      
      {/* Stage Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-manorama-red text-white text-xs font-black">
              2
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              AI Processing Engine
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9.5">
            Automated bidirectional translation, headline crafting, summary distillation, and NER entity extraction.
          </p>
        </div>

        {/* Engine status indicator */}
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isDemoMode
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-current" />
            <span>{isDemoMode ? 'Demo Mode (Illustrative Results)' : 'Gemini 1.5 Flash Active'}</span>
          </span>
        </div>
      </div>

      {/* Processing State Animation */}
      {isProcessing ? (
        <div className="py-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-manorama-red animate-pulse">
            <Cpu className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Processing Article Between Malayalam and English...
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Detecting linguistic features, generating constrained headlines, extracting named entities, and formulating multi-platform outputs.
            </p>
          </div>
          <div className="max-w-xs mx-auto bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-manorama-red h-full w-2/3 animate-pulse"></div>
          </div>
        </div>
      ) : (
        /* Completed Pipeline Breakdown */
        <div className="mt-4 space-y-3">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Step 1: Language Detection */}
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[11px] font-bold uppercase text-slate-400">Language Detection</div>
                <div className="text-xs font-bold text-slate-800 capitalize flex items-center space-x-1 mt-0.5">
                  <span>{sourceLanguage}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>{targetLanguage}</span>
                </div>
              </div>
            </div>

            {/* Step 2: Translation Engine */}
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[11px] font-bold uppercase text-slate-400">Bidirectional Translation</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">
                  Factual Context Preserved
                </div>
              </div>
            </div>

            {/* Step 3: Headlines & Summaries */}
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[11px] font-bold uppercase text-slate-400">Headlines & Summaries</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">
                  Validated & Budgeted
                </div>
              </div>
            </div>

            {/* Step 4: Named Entities & Tags */}
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="text-[11px] font-bold uppercase text-slate-400">Entity & Tag Index</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">
                  Extracted for Publishing
                </div>
              </div>
            </div>

          </div>

          {/* Demo Mode Disclaimer Notice */}
          {isDemoMode && (
            <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Demo Mode Active:</strong> Output generated via curated editorial newsroom models and local heuristic rules for intern assessment evaluation. Results are illustrative demonstration outputs. To connect live Gemini neural models, configure an API key in <strong>Settings</strong>.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
