import React from 'react';
import { PreviewTab, BilingualContent } from '../types';
import { Globe, Tv, Newspaper, Smartphone, Check } from 'lucide-react';

interface PreviewGalleryProps {
  activeTab: PreviewTab;
  setActiveTab: (tab: PreviewTab) => void;
  malayalam: BilingualContent;
  english: BilingualContent;
  imageUrl?: string;
}

export const PreviewGallery: React.FC<PreviewGalleryProps> = ({
  activeTab,
  setActiveTab,
  malayalam,
  english,
  imageUrl = 'https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1200&q=80'
}) => {
  const headline = malayalam.headline || english.headline;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      
      {/* 1. Website Preview Thumbnail */}
      <div
        onClick={() => setActiveTab('website')}
        className={`cursor-pointer rounded-xl border p-3 bg-white transition-all hover:shadow-md ${
          activeTab === 'website'
            ? 'border-manorama-red ring-2 ring-manorama-red/20 shadow-sm'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-manorama-red" />
            <span>Online News Website</span>
          </div>
          {activeTab === 'website' && <Check className="w-3.5 h-3.5 text-manorama-red" />}
        </div>
        
        {/* Mini Preview Box */}
        <div className="h-28 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 p-2 flex space-x-2 items-center">
          <img
            src={imageUrl}
            alt="Website card"
            className="w-16 h-16 rounded object-cover shrink-0"
          />
          <div className="flex-1 overflow-hidden">
            <div className="text-[9px] font-bold text-manorama-red uppercase">Manorama Online</div>
            <div className="text-[11px] font-bold font-ml line-clamp-2 text-slate-900 mt-0.5">
              {headline}
            </div>
            <div className="text-[9px] text-slate-400 mt-1">Read More →</div>
          </div>
        </div>
      </div>

      {/* 2. TV Bulletin Thumbnail */}
      <div
        onClick={() => setActiveTab('tv')}
        className={`cursor-pointer rounded-xl border p-3 bg-white transition-all hover:shadow-md ${
          activeTab === 'tv'
            ? 'border-manorama-red ring-2 ring-manorama-red/20 shadow-sm'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-1.5">
            <Tv className="w-3.5 h-3.5 text-manorama-red" />
            <span>TV Bulletin Preview</span>
          </div>
          {activeTab === 'tv' && <Check className="w-3.5 h-3.5 text-manorama-red" />}
        </div>

        {/* Mini TV Studio Preview */}
        <div className="h-28 rounded-lg overflow-hidden bg-slate-950 p-2 flex flex-col justify-between text-white relative">
          <div className="flex items-center justify-between text-[9px]">
            <span className="bg-red-600 px-1 py-0.5 font-bold rounded">MANORAMA NEWS</span>
            <span className="text-red-400 font-mono">LIVE ●</span>
          </div>
          <div className="text-[11px] font-bold font-ml text-center line-clamp-2 drop-shadow">
            {headline}
          </div>
          <div className="bg-red-700/80 px-1 py-0.5 text-[8px] font-bold truncate">
            BREAKING: {headline}
          </div>
        </div>
      </div>

      {/* 3. Newspaper Preview Thumbnail */}
      <div
        onClick={() => setActiveTab('print')}
        className={`cursor-pointer rounded-xl border p-3 bg-white transition-all hover:shadow-md ${
          activeTab === 'print'
            ? 'border-manorama-red ring-2 ring-manorama-red/20 shadow-sm'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-1.5">
            <Newspaper className="w-3.5 h-3.5 text-manorama-red" />
            <span>Newspaper Preview</span>
          </div>
          {activeTab === 'print' && <Check className="w-3.5 h-3.5 text-manorama-red" />}
        </div>

        {/* Mini Newspaper texture */}
        <div className="h-28 rounded-lg overflow-hidden border border-stone-300 newspaper-texture p-2 flex flex-col justify-between">
          <div className="text-center border-b border-stone-800 pb-0.5">
            <span className="text-[10px] font-black font-newspaper uppercase text-stone-900 tracking-wider">
              MALAYALA MANORAMA
            </span>
          </div>
          <div className="text-[10px] font-bold font-ml line-clamp-2 text-stone-950 my-1">
            {headline}
          </div>
          <div className="flex items-center space-x-1 text-[8px] text-stone-600">
            <div className="w-6 h-6 bg-stone-300 rounded shrink-0"></div>
            <div className="line-clamp-2">വിവിധ ജില്ലകളിൽ ശക്തമായ മഴ മുന്നറിയിപ്പ്...</div>
          </div>
        </div>
      </div>

      {/* 4. Mobile View Thumbnail */}
      <div
        onClick={() => setActiveTab('mobile')}
        className={`cursor-pointer rounded-xl border p-3 bg-white transition-all hover:shadow-md ${
          activeTab === 'mobile'
            ? 'border-manorama-red ring-2 ring-manorama-red/20 shadow-sm'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-1.5">
            <Smartphone className="w-3.5 h-3.5 text-manorama-red" />
            <span>Mobile View</span>
          </div>
          {activeTab === 'mobile' && <Check className="w-3.5 h-3.5 text-manorama-red" />}
        </div>

        {/* Mini Mobile Preview */}
        <div className="h-28 rounded-lg overflow-hidden border-2 border-slate-800 bg-white p-1.5 flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between border-b border-slate-200 pb-0.5">
            <span className="text-[8px] font-bold text-manorama-red">manorama ONLINE</span>
            <span className="text-[7px] text-slate-400">9:41</span>
          </div>
          <div className="text-[10px] font-bold font-ml line-clamp-2 text-slate-900">
            {headline}
          </div>
          <div className="bg-manorama-red text-white text-[7px] font-bold text-center py-0.5 rounded">
            Read on Mobile App →
          </div>
        </div>
      </div>

    </div>
  );
};
