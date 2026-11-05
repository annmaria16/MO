import React from 'react';
import { PreviewTab, BilingualContent } from '../types';
import { Globe, Smartphone, Tv, Newspaper, Check } from 'lucide-react';

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      
      {/* 1. Online Website */}
      <div
        onClick={() => setActiveTab('online')}
        className={`cursor-pointer rounded-xl border p-3 bg-white transition-all hover:shadow-xs ${
          activeTab === 'online'
            ? 'border-manorama-red ring-2 ring-manorama-red/20 shadow-xs'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5 text-manorama-red" />
            <span>Online Website</span>
          </div>
          {activeTab === 'online' && <Check className="w-3.5 h-3.5 text-manorama-red" />}
        </div>
        <div className="h-14 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 p-2 flex items-center justify-center">
          <img src="/brand/manorama-online-banner.png" alt="Online" className="h-5 object-contain" />
        </div>
      </div>

      {/* 2. Mobile Website */}
      <div
        onClick={() => setActiveTab('mobile')}
        className={`cursor-pointer rounded-xl border p-3 bg-white transition-all hover:shadow-xs ${
          activeTab === 'mobile'
            ? 'border-manorama-red ring-2 ring-manorama-red/20 shadow-xs'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-1.5">
            <Smartphone className="w-3.5 h-3.5 text-manorama-red" />
            <span>Mobile Website</span>
          </div>
          {activeTab === 'mobile' && <Check className="w-3.5 h-3.5 text-manorama-red" />}
        </div>
        <div className="h-14 rounded-lg overflow-hidden border border-slate-100 bg-slate-50 p-2 flex items-center justify-center">
          <span className="text-[10px] font-bold text-slate-600">Mobile Edition</span>
        </div>
      </div>

      {/* 3. TV Bulletin */}
      <div
        onClick={() => setActiveTab('tv')}
        className={`cursor-pointer rounded-xl border p-3 bg-white transition-all hover:shadow-xs ${
          activeTab === 'tv'
            ? 'border-manorama-red ring-2 ring-manorama-red/20 shadow-xs'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-1.5">
            <Tv className="w-3.5 h-3.5 text-manorama-red" />
            <span>TV Bulletin</span>
          </div>
          {activeTab === 'tv' && <Check className="w-3.5 h-3.5 text-manorama-red" />}
        </div>
        <div className="h-14 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 p-2 flex items-center justify-center">
          <img src="/brand/manorama-news.png" alt="TV" className="h-5 object-contain" />
        </div>
      </div>

      {/* 4. English Newspaper */}
      <div
        onClick={() => setActiveTab('newspaper-en')}
        className={`cursor-pointer rounded-xl border p-3 bg-white transition-all hover:shadow-xs ${
          activeTab === 'newspaper-en'
            ? 'border-manorama-red ring-2 ring-manorama-red/20 shadow-xs'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-1.5">
            <Newspaper className="w-3.5 h-3.5 text-manorama-red" />
            <span>English Print</span>
          </div>
          {activeTab === 'newspaper-en' && <Check className="w-3.5 h-3.5 text-manorama-red" />}
        </div>
        <div className="h-14 rounded-lg overflow-hidden border border-stone-200 bg-stone-50 p-2 flex items-center justify-center">
          <img src="/brand/manorama-newspaper-en.png" alt="English Print" className="h-4 object-contain" />
        </div>
      </div>

      {/* 5. Malayalam Newspaper */}
      <div
        onClick={() => setActiveTab('newspaper-ml')}
        className={`cursor-pointer rounded-xl border p-3 bg-white transition-all hover:shadow-xs ${
          activeTab === 'newspaper-ml'
            ? 'border-manorama-red ring-2 ring-manorama-red/20 shadow-xs'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100 text-xs font-bold text-slate-800">
          <div className="flex items-center space-x-1.5">
            <Newspaper className="w-3.5 h-3.5 text-manorama-red" />
            <span>മലയാള മനോരമ</span>
          </div>
          {activeTab === 'newspaper-ml' && <Check className="w-3.5 h-3.5 text-manorama-red" />}
        </div>
        <div className="h-14 rounded-lg overflow-hidden border border-stone-200 bg-stone-50 p-2 flex items-center justify-center">
          <img src="/brand/manorama-newspaper-ml.png" alt="Malayalam Print" className="h-4 object-contain" />
        </div>
      </div>

    </div>
  );
};
