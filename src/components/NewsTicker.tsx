import React, { useState } from 'react';
import { Play, Pause, Radio, AlertCircle } from 'lucide-react';

interface NewsTickerProps {
  malayalamHeadline: string;
  englishHeadline: string;
  headlineLimit: number;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({
  malayalamHeadline,
  englishHeadline,
  headlineLimit
}) => {
  const [tickerLang, setTickerLang] = useState<'malayalam' | 'english'>('malayalam');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const activeHeadline = tickerLang === 'malayalam' ? malayalamHeadline : englishHeadline;
  const isOverLimit = activeHeadline.length > headlineLimit;

  return (
    <div className="rounded-xl overflow-hidden shadow-md border border-slate-900/10 flex flex-col sm:flex-row items-stretch bg-slate-900 text-white">
      
      {/* Red "BREAKING NEWS" Tag */}
      <div className="bg-gradient-to-r from-manorama-darkRed to-manorama-red px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between sm:justify-start space-x-2 shrink-0 z-10 shadow-lg">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span className="text-xs sm:text-sm font-black tracking-wider uppercase font-sans">
            Breaking News
          </span>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded bg-black/20 hover:bg-black/40 text-white"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Marquee Center Track */}
      <div
        className="relative flex-1 overflow-hidden py-2 sm:py-2.5 px-3 flex items-center cursor-pointer select-none"
        onClick={() => setIsPaused(!isPaused)}
        title={isPaused ? "Click to resume scrolling" : "Click to pause scrolling"}
      >
        <div
          className={`whitespace-nowrap transition-all duration-300 ${
            isPaused ? 'animate-ticker-paused' : 'animate-ticker'
          } ${tickerLang === 'malayalam' ? 'font-ml text-sm sm:text-base font-semibold' : 'text-sm sm:text-base font-semibold'}`}
        >
          {/* Repeated ticker text for seamless infinite scrolling loop */}
          <span className="mr-12 flex items-center inline-flex">
            <span className="text-manorama-lightRed mr-2 font-mono">●</span>
            {activeHeadline || 'NewsBridge AI: Live newsroom feed standby...'}
          </span>
          <span className="mr-12 flex items-center inline-flex">
            <span className="text-manorama-lightRed mr-2 font-mono">●</span>
            {activeHeadline || 'NewsBridge AI: Live newsroom feed standby...'}
          </span>
          <span className="mr-12 flex items-center inline-flex">
            <span className="text-manorama-lightRed mr-2 font-mono">●</span>
            {activeHeadline || 'NewsBridge AI: Live newsroom feed standby...'}
          </span>
        </div>

        {/* Fade gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 to-transparent" />
      </div>

      {/* Right Controls: Pause / Play & Language Switcher */}
      <div className="bg-slate-950/80 px-3 py-2 sm:py-2 flex items-center justify-between sm:justify-end space-x-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-800">
        
        {/* Warning if over limit */}
        {isOverLimit && (
          <div className="flex items-center space-x-1 text-[11px] text-amber-400 font-mono mr-1">
            <AlertCircle className="w-3 h-3" />
            <span>Exceeds {headlineLimit}c</span>
          </div>
        )}

        {/* Desktop Pause / Play button */}
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="hidden sm:flex items-center justify-center w-7 h-7 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title={isPaused ? "Resume ticker" : "Pause ticker"}
        >
          {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
        </button>

        {/* Language switcher pills */}
        <div className="inline-flex p-0.5 bg-slate-800 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTickerLang('malayalam')}
            className={`px-2.5 py-1 rounded-md transition-all font-ml ${
              tickerLang === 'malayalam'
                ? 'bg-manorama-red text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            മലയാളം
          </button>
          <button
            type="button"
            onClick={() => setTickerLang('english')}
            className={`px-2.5 py-1 rounded-md transition-all font-sans ${
              tickerLang === 'english'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
        </div>

      </div>

    </div>
  );
};
