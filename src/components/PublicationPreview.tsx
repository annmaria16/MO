import React, { useState } from 'react';
import { PreviewTab, BilingualContent } from '../types';
import {
  Globe,
  Tv,
  Newspaper,
  Smartphone,
  ExternalLink,
  Share2,
  Bookmark,
  Clock,
  Search,
  Menu,
  Volume2,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

interface PublicationPreviewProps {
  activeTab: PreviewTab;
  setActiveTab: (tab: PreviewTab) => void;
  malayalam: BilingualContent;
  english: BilingualContent;
  category?: string;
  imageUrl?: string;
  imageCaption?: string;
}

export const PublicationPreview: React.FC<PublicationPreviewProps> = ({
  activeTab,
  setActiveTab,
  malayalam,
  english,
  category = 'Kerala',
  imageUrl = 'https://images.unsplash.com/photo-1514632595-4944383f2737?auto=format&fit=crop&w=1200&q=80',
  imageCaption = 'Heavy monsoon showers reported across multiple districts.'
}) => {
  const [previewLang, setPreviewLang] = useState<'malayalam' | 'english'>('malayalam');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const content = previewLang === 'malayalam' ? malayalam : english;
  const isMl = previewLang === 'malayalam';

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col h-full">
      
      {/* Top Preview Format Navigation Bar */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        
        {/* Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('website')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'website'
                ? 'bg-manorama-red text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Website Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tv')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'tv'
                ? 'bg-manorama-red text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>TV Bulletin</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('print')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'print'
                ? 'bg-manorama-red text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Print Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'mobile'
                ? 'bg-manorama-red text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile View</span>
          </button>
        </div>

        {/* Language switch toggle for Preview */}
        <div className="inline-flex p-0.5 bg-white border border-slate-200 rounded-md text-xs font-medium">
          <button
            type="button"
            onClick={() => setPreviewLang('malayalam')}
            className={`px-2 py-0.5 rounded transition-all font-ml ${
              previewLang === 'malayalam'
                ? 'bg-manorama-red text-white font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            മലയാളം
          </button>
          <button
            type="button"
            onClick={() => setPreviewLang('english')}
            className={`px-2 py-0.5 rounded transition-all font-sans ${
              previewLang === 'english'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English
          </button>
        </div>

      </div>

      {/* Main Preview Container */}
      <div className="p-3 sm:p-5 flex-1 overflow-y-auto">
        
        {/* ============================================================ */}
        {/* 1. WEBSITE PREVIEW */}
        {/* ============================================================ */}
        {activeTab === 'website' && (
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
            
            {/* Manorama Online Masthead Mock */}
            <div className="border-b border-slate-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-6 h-6 rounded bg-manorama-red text-white font-black text-xs flex items-center justify-center font-serif">
                      M
                    </span>
                    <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900">
                      manorama <span className="text-manorama-red font-black">ONLINE</span>
                    </span>
                  </div>
                </div>

                {/* News sections nav */}
                <div className="hidden md:flex items-center space-x-3 text-xs font-semibold text-slate-600">
                  <span className="text-manorama-red">Home</span>
                  <span className="hover:text-slate-900 cursor-pointer">Kerala</span>
                  <span className="hover:text-slate-900 cursor-pointer">India</span>
                  <span className="hover:text-slate-900 cursor-pointer">World</span>
                  <span className="hover:text-slate-900 cursor-pointer">Business</span>
                  <span className="hover:text-slate-900 cursor-pointer">Sports</span>
                  <span className="hover:text-slate-900 cursor-pointer">Entertainment</span>
                </div>

                <div className="flex items-center space-x-2 text-slate-500">
                  <Search className="w-4 h-4 cursor-pointer hover:text-slate-800" />
                  <Menu className="w-4 h-4 cursor-pointer hover:text-slate-800 md:hidden" />
                </div>
              </div>

              {/* Sub-breaking bar */}
              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center space-x-2 text-xs">
                <span className="bg-manorama-red text-white font-black text-[10px] px-2 py-0.5 uppercase tracking-wider rounded">
                  Breaking
                </span>
                <span className="text-slate-800 truncate font-medium">
                  {content.headline || 'Breaking news update headline in live desk queue'}
                </span>
              </div>
            </div>

            {/* Article Content Grid */}
            <div className="p-3 sm:p-5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                
                {/* News Image */}
                <div className="md:col-span-5 relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-video md:aspect-[4/3] group">
                  <img
                    src={imageUrl}
                    alt="News publication asset"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {category}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white text-[10px] line-clamp-1">
                    {imageCaption}
                  </div>
                </div>

                {/* Headline & Body */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Timestamp & Desk Byline */}
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
                      <Clock className="w-3.5 h-3.5 text-manorama-red" />
                      <span>{currentDate} • {currentTime} IST</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">Digital Desk</span>
                    </div>

                    {/* Headline */}
                    <h3 className={`text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-snug ${
                      isMl ? 'font-ml' : 'font-serif'
                    }`}>
                      {content.headline || 'Article Headline Will Appear Here'}
                    </h3>

                    {/* Summary Callout */}
                    <p className={`mt-2.5 text-sm sm:text-base text-slate-600 bg-slate-50 p-2.5 rounded-lg border-l-4 border-manorama-red font-medium leading-relaxed ${
                      isMl ? 'font-ml' : ''
                    }`}>
                      {content.summary || 'Summary preview will appear here immediately as generated or edited.'}
                    </p>

                    {/* Article excerpt */}
                    <p className={`mt-3 text-xs sm:text-sm text-slate-700 line-clamp-3 leading-relaxed ${
                      isMl ? 'font-ml' : ''
                    }`}>
                      {content.article || 'Full article text...'}
                    </p>
                  </div>

                  {/* Actions bar */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-manorama-red hover:bg-manorama-darkRed text-white text-xs font-semibold rounded-md shadow-sm transition-all"
                    >
                      <span>Read More</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center space-x-2 text-slate-400">
                      <button
                        type="button"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-1.5 rounded hover:bg-slate-100 ${isBookmarked ? 'text-manorama-red' : 'hover:text-slate-700'}`}
                        title="Bookmark article"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-slate-100 hover:text-slate-700"
                        title="Share article"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* 2. TV BULLETIN PREVIEW */}
        {/* ============================================================ */}
        {activeTab === 'tv' && (
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between text-white select-none">
            
            {/* TV Studio Backdrop with Presenter simulation */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80"
                alt="News Studio"
                className="w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/60" />
            </div>

            {/* Top Broadcast Bugs */}
            <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between">
              
              {/* Channel Logo & Live Pill */}
              <div className="flex items-center space-x-2">
                <div className="px-2.5 py-1 bg-red-600 font-black text-xs tracking-wider rounded font-serif shadow-md">
                  MANORAMA NEWS
                </div>
                <div className="flex items-center space-x-1 px-2 py-0.5 rounded bg-black/60 border border-red-500/50 text-[10px] font-bold text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>LIVE</span>
                </div>
              </div>

              {/* Broadcast clock */}
              <div className="text-xs font-mono font-bold bg-black/50 px-2 py-1 rounded border border-white/10">
                {currentTime} IST
              </div>

            </div>

            {/* Center Broadcast Graphics / Split Screen */}
            <div className="relative z-10 px-4 sm:px-6 grid grid-cols-12 gap-4 items-center">
              
              {/* Studio Graphic Frame */}
              <div className="col-span-8 flex flex-col space-y-2">
                <div className="inline-block self-start px-2 py-0.5 bg-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded">
                  SPECIAL REPORT
                </div>
                <h2 className={`text-lg sm:text-2xl font-black drop-shadow-md leading-tight text-white ${
                  isMl ? 'font-ml' : ''
                }`}>
                  {content.headline || 'Live TV Studio Broadcast Headline'}
                </h2>
                <p className={`text-xs sm:text-sm text-slate-200 drop-shadow line-clamp-2 max-w-xl ${
                  isMl ? 'font-ml' : ''
                }`}>
                  {content.summary}
                </p>
              </div>

              {/* Right Side: TOP 5 NEWS Bulletin Widget */}
              <div className="col-span-4 hidden sm:block bg-black/70 backdrop-blur-md border border-white/10 rounded-lg p-2.5">
                <div className="text-[10px] font-black text-yellow-400 uppercase tracking-wider pb-1 border-b border-white/10 mb-1.5 flex items-center justify-between">
                  <span>TOP 5 NEWS</span>
                  <Volume2 className="w-3 h-3 text-white" />
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-300 font-ml">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[9px]">1</span>
                    <span className="truncate">{content.headline}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[9px]">2</span>
                    <span className="truncate">സംസ്ഥാനത്ത് ഉപതിരഞ്ഞെടുപ്പ് തീയതി പ്രഖ്യാപിച്ചു</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[9px]">3</span>
                    <span className="truncate">സ്വർണവിലയിൽ റെക്കോർഡ് വർധന</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Lower Third Broadcast Strip */}
            <div className="relative z-10 bg-slate-900 border-t-2 border-red-600 flex items-stretch">
              <div className="bg-red-600 px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black uppercase tracking-wider shrink-0 flex items-center">
                BREAKING
              </div>
              <div className="px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold truncate flex-1 text-slate-100 flex items-center">
                <span className={isMl ? 'font-ml' : ''}>
                  {content.headline}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* 3. PRINT NEWSPAPER PREVIEW */}
        {/* ============================================================ */}
        {activeTab === 'print' && (
          <div className="border border-stone-300 rounded-xl overflow-hidden shadow-md newspaper-texture p-4 sm:p-6 text-stone-900 font-serif">
            
            {/* Masthead Header */}
            <div className="border-b-2 border-stone-900 pb-2 text-center">
              <div className="flex items-center justify-between text-[11px] font-sans text-stone-600 uppercase tracking-widest border-b border-stone-400 pb-1 mb-2">
                <span>Malayala Manorama Daily</span>
                <span>{currentDate} • Vol. CXXXV No. 248</span>
                <span>Kottayam Edition • ₹6.00</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-stone-950 font-newspaper">
                MALAYALA MANORAMA
              </h2>
              <div className="text-[10px] tracking-wider uppercase text-stone-600 mt-0.5">
                Kerala's Largest Circulated Daily Newspaper
              </div>
            </div>

            {/* Editorial Columns */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
              
              {/* Main Headline & Article */}
              <div className="sm:col-span-8">
                <div className="text-xs uppercase tracking-wider font-sans font-bold text-manorama-red mb-1">
                  STATE NEWS DESK
                </div>
                
                <h3 className={`text-2xl sm:text-3xl font-extrabold text-stone-950 leading-tight mb-2 ${
                  isMl ? 'font-ml font-bold' : 'font-newspaper'
                }`}>
                  {content.headline || 'Print Headline'}
                </h3>

                <h4 className={`text-sm sm:text-base font-semibold text-stone-700 italic border-l-2 border-stone-900 pl-3 mb-3 leading-snug ${
                  isMl ? 'font-ml' : ''
                }`}>
                  {content.summary}
                </h4>

                {/* Newspaper columns */}
                <div className="columns-1 sm:columns-2 gap-4 text-xs sm:text-sm text-stone-800 leading-relaxed text-justify">
                  <p className={`first-letter:text-3xl first-letter:font-black first-letter:float-left first-letter:mr-2 ${
                    isMl ? 'font-ml' : ''
                  }`}>
                    {content.article}
                  </p>
                </div>
              </div>

              {/* Side Photo with Traditional Caption */}
              <div className="sm:col-span-4 border border-stone-400 p-1.5 bg-white shadow-sm">
                <img
                  src={imageUrl}
                  alt="Print Edition Asset"
                  className="w-full h-44 object-cover filter grayscale contrast-125"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="text-[11px] font-sans text-stone-600 italic mt-1.5 text-center leading-snug">
                  {imageCaption}
                </div>
                <div className="text-[9px] font-sans text-right text-stone-400 mt-1 uppercase">
                  Photo: Manorama Special
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* 4. MOBILE VIEW */}
        {/* ============================================================ */}
        {activeTab === 'mobile' && (
          <div className="flex justify-center">
            {/* Phone Mockup Frame */}
            <div className="w-[320px] sm:w-[340px] rounded-[38px] border-[8px] border-slate-900 bg-white shadow-2xl overflow-hidden flex flex-col">
              
              {/* iPhone Notch & Status Bar */}
              <div className="bg-slate-900 px-6 pt-2 pb-1.5 flex items-center justify-between text-white text-[10px]">
                <span className="font-semibold">{currentTime}</span>
                <div className="w-20 h-4 bg-slate-950 rounded-full" />
                <span className="font-mono text-[9px]">5G 100%</span>
              </div>

              {/* Mobile App Header */}
              <div className="border-b border-slate-200 px-3 py-2 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center space-x-1.5">
                  <span className="w-5 h-5 rounded bg-manorama-red text-white font-black text-[10px] flex items-center justify-center font-serif">
                    M
                  </span>
                  <span className="font-extrabold text-xs tracking-tight text-slate-900">
                    manorama <span className="text-manorama-red">ONLINE</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-slate-500">
                  <Search className="w-3.5 h-3.5" />
                  <Menu className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Scrollable Mobile Body */}
              <div className="p-3 space-y-2.5 max-h-[380px] overflow-y-auto">
                <div className="text-[10px] font-bold text-manorama-red uppercase tracking-wide">
                  {category} • {currentTime}
                </div>

                <h3 className={`text-base font-bold text-slate-950 leading-snug ${isMl ? 'font-ml' : ''}`}>
                  {content.headline}
                </h3>

                <div className="rounded-lg overflow-hidden border border-slate-200">
                  <img
                    src={imageUrl}
                    alt="Mobile news photo"
                    className="w-full h-36 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>

                <p className={`text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded border-l-2 border-manorama-red ${isMl ? 'font-ml' : ''}`}>
                  {content.summary}
                </p>

                <p className={`text-xs text-slate-600 leading-relaxed ${isMl ? 'font-ml' : ''}`}>
                  {content.article}
                </p>
              </div>

              {/* Mobile Bottom Bar */}
              <div className="border-t border-slate-200 px-3 py-2 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[10px]">Manorama Online App</span>
                <button
                  type="button"
                  className="px-2.5 py-1 bg-manorama-red text-white text-[10px] font-bold rounded"
                >
                  Read More →
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
