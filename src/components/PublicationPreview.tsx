import React, { useState } from 'react';
import { PreviewTab, BilingualContent } from '../types';
import {
  Globe,
  Smartphone,
  Tv,
  Newspaper,
  Clock,
  Search,
  Menu,
  Bookmark,
  Share2,
  ChevronRight,
  Volume2
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
  // Local language toggle for Online, Mobile, and TV views
  const [onlineLang, setOnlineLang] = useState<'malayalam' | 'english'>('malayalam');
  const [mobileLang, setMobileLang] = useState<'malayalam' | 'english'>('malayalam');
  const [tvLang, setTvLang] = useState<'malayalam' | 'english'>('malayalam');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 transition-all">
      
      {/* Stage Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-manorama-red text-white text-xs font-black">
              4
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Preview Your News Across Publication Platforms
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 pl-9.5">
            Live multi-format previews using exact official brand assets for digital, broadcast, and print publications.
          </p>
        </div>
      </div>

      {/* Five Distinct Navigation Tabs */}
      <div className="mt-4 border-b border-slate-200">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-px">
          
          {/* Tab 1: Online Website */}
          <button
            type="button"
            onClick={() => setActiveTab('online')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'online'
                ? 'border-manorama-red text-manorama-red bg-red-50/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>1. Online Website</span>
          </button>

          {/* Tab 2: Mobile Website */}
          <button
            type="button"
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'mobile'
                ? 'border-manorama-red text-manorama-red bg-red-50/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>2. Mobile Website</span>
          </button>

          {/* Tab 3: TV Bulletin */}
          <button
            type="button"
            onClick={() => setActiveTab('tv')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'tv'
                ? 'border-manorama-red text-manorama-red bg-red-50/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>3. TV Bulletin</span>
          </button>

          {/* Tab 4: English Newspaper */}
          <button
            type="button"
            onClick={() => setActiveTab('newspaper-en')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'newspaper-en'
                ? 'border-manorama-red text-manorama-red bg-red-50/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>4. English Newspaper</span>
          </button>

          {/* Tab 5: Malayalam Newspaper */}
          <button
            type="button"
            onClick={() => setActiveTab('newspaper-ml')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap font-ml ${
              activeTab === 'newspaper-ml'
                ? 'border-manorama-red text-manorama-red bg-red-50/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>5. മലയാള മനോരമ (Print)</span>
          </button>

        </div>
      </div>

      {/* Main Preview Screen */}
      <div className="mt-5">
        
        {/* ============================================================ */}
        {/* 1. ONLINE WEBSITE PREVIEW */}
        {/* Uses exact logo: public/brand/manorama-online-banner.png */}
        {/* ============================================================ */}
        {activeTab === 'online' && (
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
            
            {/* Website Top Header Bar */}
            <div className="border-b border-slate-200 bg-white px-4 py-3 flex items-center justify-between">
              
              {/* Exact Manorama Online Logo Banner */}
              <div className="flex items-center space-x-4">
                <img
                  src="/brand/manorama-online-banner.png"
                  alt="Manorama Online Logo"
                  className="h-9 sm:h-10 object-contain"
                  onError={(e) => {
                    // Fallback to original full asset if banner was not cropped
                    (e.target as HTMLImageElement).src = '/brand/manorama-online.png';
                  }}
                />
              </div>

              {/* Realistic News Categories Navigation */}
              <div className="hidden md:flex items-center space-x-4 text-xs font-bold text-slate-700">
                <span className="text-manorama-red border-b-2 border-manorama-red pb-1">Home</span>
                <span className="hover:text-manorama-red cursor-pointer">Kerala</span>
                <span className="hover:text-manorama-red cursor-pointer">India</span>
                <span className="hover:text-manorama-red cursor-pointer">World</span>
                <span className="hover:text-manorama-red cursor-pointer">Business</span>
                <span className="hover:text-manorama-red cursor-pointer">Sports</span>
                <span className="hover:text-manorama-red cursor-pointer">Movies</span>
              </div>

              {/* Language Switcher for Preview & Search */}
              <div className="flex items-center space-x-2">
                <div className="inline-flex p-0.5 bg-slate-100 rounded-lg text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setOnlineLang('malayalam')}
                    className={`px-2.5 py-1 rounded-md transition-all font-ml ${
                      onlineLang === 'malayalam' ? 'bg-white text-manorama-red shadow-xs font-bold' : 'text-slate-600'
                    }`}
                  >
                    മലയാളം
                  </button>
                  <button
                    type="button"
                    onClick={() => setOnlineLang('english')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      onlineLang === 'english' ? 'bg-white text-blue-600 shadow-xs font-bold' : 'text-slate-600'
                    }`}
                  >
                    English
                  </button>
                </div>
                <Search className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-800 ml-1" />
              </div>
            </div>

            {/* Breaking News Ribbon */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center space-x-2 text-xs">
              <span className="bg-manorama-red text-white font-black text-[10px] px-2 py-0.5 uppercase tracking-wider rounded">
                Breaking
              </span>
              <span className={`text-slate-800 font-semibold truncate ${onlineLang === 'malayalam' ? 'font-ml' : ''}`}>
                {onlineLang === 'malayalam' ? malayalam.headline : english.headline}
              </span>
            </div>

            {/* Editorial Article Layout */}
            <div className="p-5 sm:p-7">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* News Photo */}
                <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video md:aspect-[4/3]">
                  <img
                    src={imageUrl}
                    alt="News story"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded">
                    {category}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 text-white text-[11px] leading-snug line-clamp-1">
                    {imageCaption}
                  </div>
                </div>

                {/* Article Copy */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Date/Time byline */}
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
                      <Clock className="w-3.5 h-3.5 text-manorama-red" />
                      <span>{currentDate} • {currentTime} IST</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">Digital News Desk</span>
                    </div>

                    {/* Headline */}
                    <h3 className={`text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight ${
                      onlineLang === 'malayalam' ? 'font-ml' : 'font-serif'
                    }`}>
                      {onlineLang === 'malayalam' ? malayalam.headline : english.headline}
                    </h3>

                    {/* Summary callout box */}
                    <div className={`mt-3 p-3 bg-red-50/50 rounded-xl border-l-4 border-manorama-red text-sm text-slate-700 font-medium leading-relaxed ${
                      onlineLang === 'malayalam' ? 'font-ml' : ''
                    }`}>
                      {onlineLang === 'malayalam' ? malayalam.summary : english.summary}
                    </div>

                    {/* Article excerpt */}
                    <p className={`mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4 ${
                      onlineLang === 'malayalam' ? 'font-ml' : ''
                    }`}>
                      {onlineLang === 'malayalam' ? malayalam.article : english.article}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-manorama-red text-white text-xs font-bold rounded-lg hover:bg-manorama-darkRed transition-colors"
                    >
                      <span>Read Full Story</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center space-x-2 text-slate-400">
                      <button
                        type="button"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                        className={`p-1.5 rounded-lg hover:bg-slate-100 ${isBookmarked ? 'text-manorama-red' : 'hover:text-slate-700'}`}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <button type="button" className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-700">
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
        {/* 2. MOBILE WEBSITE PREVIEW */}
        {/* Uses exact logo: public/brand/manorama-online-banner.png or manorama-online.png */}
        {/* ============================================================ */}
        {activeTab === 'mobile' && (
          <div className="flex justify-center py-2">
            <div className="w-[330px] sm:w-[360px] rounded-[36px] border-[8px] border-slate-900 bg-white shadow-xl overflow-hidden flex flex-col">
              
              {/* iPhone Notch & Status Bar */}
              <div className="bg-slate-900 px-6 pt-2 pb-1.5 flex items-center justify-between text-white text-[10px]">
                <span className="font-semibold">{currentTime}</span>
                <div className="w-20 h-4 bg-slate-950 rounded-full" />
                <span className="font-mono text-[9px]">5G 100%</span>
              </div>

              {/* Mobile App Header with Manorama Online Logo */}
              <div className="border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between bg-white sticky top-0 z-10">
                <img
                  src="/brand/manorama-online-banner.png"
                  alt="Manorama Online Logo"
                  className="h-7 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/brand/manorama-online.png';
                  }}
                />
                
                {/* Language Toggle */}
                <div className="inline-flex p-0.5 bg-slate-100 rounded-md text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setMobileLang('malayalam')}
                    className={`px-1.5 py-0.5 rounded ${mobileLang === 'malayalam' ? 'bg-white text-manorama-red font-bold shadow-xs' : 'text-slate-500'}`}
                  >
                    മലയാളം
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileLang('english')}
                    className={`px-1.5 py-0.5 rounded ${mobileLang === 'english' ? 'bg-white text-blue-600 font-bold shadow-xs' : 'text-slate-500'}`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Scrollable Mobile Body */}
              <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto">
                <div className="text-[10px] font-bold text-manorama-red uppercase tracking-wider">
                  {category} • {currentTime}
                </div>

                <h3 className={`text-base font-bold text-slate-950 leading-snug ${mobileLang === 'malayalam' ? 'font-ml' : ''}`}>
                  {mobileLang === 'malayalam' ? malayalam.headline : english.headline}
                </h3>

                <div className="rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={imageUrl}
                    alt="Mobile news asset"
                    className="w-full h-40 object-cover"
                  />
                </div>

                <div className={`text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded-lg border-l-2 border-manorama-red leading-relaxed ${
                  mobileLang === 'malayalam' ? 'font-ml' : ''
                }`}>
                  {mobileLang === 'malayalam' ? malayalam.summary : english.summary}
                </div>

                <p className={`text-xs text-slate-600 leading-relaxed ${mobileLang === 'malayalam' ? 'font-ml' : ''}`}>
                  {mobileLang === 'malayalam' ? malayalam.article : english.article}
                </p>
              </div>

              {/* Mobile Bottom Read Bar */}
              <div className="border-t border-slate-200 px-4 py-2.5 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[10px]">Manorama Online Mobile</span>
                <button
                  type="button"
                  className="px-3 py-1 bg-manorama-red text-white text-[11px] font-bold rounded-md"
                >
                  Read More →
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 3. TV BULLETIN PREVIEW */}
        {/* Uses exact logo: public/brand/manorama-news.png */}
        {/* ============================================================ */}
        {activeTab === 'tv' && (
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between text-white select-none">
            
            {/* TV Studio Background Backdrop */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80"
                alt="News Broadcast Studio"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-900/60" />
            </div>

            {/* Top Broadcast Strip with Exact Manorama News Logo */}
            <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
              
              {/* Exact Manorama News Logo */}
              <div className="flex items-center space-x-3 bg-white/95 px-3 py-1.5 rounded-lg shadow-md">
                <img
                  src="/brand/manorama-news.png"
                  alt="Manorama News Channel Logo"
                  className="h-7 sm:h-8 object-contain"
                />
              </div>

              {/* Live Broadcast Bug & Clock */}
              <div className="flex items-center space-x-2">
                <div className="inline-flex p-0.5 bg-black/60 rounded-md text-[10px] font-bold border border-white/20">
                  <button
                    type="button"
                    onClick={() => setTvLang('malayalam')}
                    className={`px-2 py-0.5 rounded font-ml ${tvLang === 'malayalam' ? 'bg-red-600 text-white' : 'text-slate-300'}`}
                  >
                    മലയാളം
                  </button>
                  <button
                    type="button"
                    onClick={() => setTvLang('english')}
                    className={`px-2 py-0.5 rounded ${tvLang === 'english' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
                  >
                    English
                  </button>
                </div>
                <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-600 text-white text-[10px] font-black tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  <span>LIVE</span>
                </div>
                <div className="text-xs font-mono font-bold bg-black/60 px-2 py-1 rounded border border-white/10">
                  {currentTime} IST
                </div>
              </div>

            </div>

            {/* Middle Studio Presentation Area */}
            <div className="relative z-10 px-6 sm:px-8 grid grid-cols-12 gap-5 items-center">
              
              <div className="col-span-8 flex flex-col space-y-2">
                <div className="inline-block self-start px-2.5 py-0.5 bg-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded">
                  SPECIAL BULLETIN
                </div>
                <h2 className={`text-lg sm:text-2xl font-black drop-shadow-md leading-tight text-white ${
                  tvLang === 'malayalam' ? 'font-ml' : ''
                }`}>
                  {tvLang === 'malayalam' ? malayalam.headline : english.headline}
                </h2>
                <p className={`text-xs sm:text-sm text-slate-200 drop-shadow line-clamp-2 max-w-xl ${
                  tvLang === 'malayalam' ? 'font-ml' : ''
                }`}>
                  {tvLang === 'malayalam' ? malayalam.summary : english.summary}
                </p>
              </div>

              {/* TOP 5 NEWS Widget */}
              <div className="col-span-4 hidden sm:block bg-black/75 backdrop-blur-md border border-white/10 rounded-xl p-3">
                <div className="text-[10px] font-black text-yellow-400 uppercase tracking-wider pb-1 border-b border-white/10 mb-2 flex items-center justify-between">
                  <span>TOP 5 BULLETINS</span>
                  <Volume2 className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="space-y-1.5 text-[11px] text-slate-300 font-ml">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[9px]">1</span>
                    <span className="truncate">{tvLang === 'malayalam' ? malayalam.headline : english.headline}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[9px]">2</span>
                    <span className="truncate">സംസ്ഥാനത്ത് കനത്ത മഴ മുന്നറിയിപ്പ് തുടർന്നു</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-[9px]">3</span>
                    <span className="truncate">തീരദേശ മേഖലകളിൽ ജാഗ്രതാ നിർദ്ദേശം</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Broadcast Lower-Third Banner */}
            <div className="relative z-10 bg-slate-900 border-t-2 border-red-600 flex items-stretch">
              <div className="bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wider shrink-0 flex items-center">
                BREAKING NEWS
              </div>
              <div className="px-4 py-2 text-xs sm:text-sm font-semibold truncate flex-1 text-slate-100 flex items-center">
                <span className={tvLang === 'malayalam' ? 'font-ml' : ''}>
                  {tvLang === 'malayalam' ? malayalam.headline : english.headline}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* 4. ENGLISH NEWSPAPER PREVIEW */}
        {/* Uses exact logo: public/brand/manorama-newspaper-en.png */}
        {/* ============================================================ */}
        {activeTab === 'newspaper-en' && (
          <div className="border border-stone-300 rounded-2xl overflow-hidden shadow-md newspaper-texture p-5 sm:p-7 text-stone-900 font-serif">
            
            {/* Front Page Header with Exact English Masthead */}
            <div className="border-b-2 border-stone-900 pb-3 text-center">
              <div className="flex items-center justify-between text-[11px] font-sans text-stone-600 uppercase tracking-widest border-b border-stone-300 pb-1 mb-2">
                <span>The National Daily Edition</span>
                <span>{currentDate} • Vol. CXXXV No. 248</span>
                <span>Kottayam Edition • ₹6.00</span>
              </div>

              {/* Exact English Masthead from supplied image */}
              <div className="flex justify-center my-2">
                <img
                  src="/brand/manorama-newspaper-en.png"
                  alt="Malayala Manorama English Masthead"
                  className="h-12 sm:h-14 object-contain filter contrast-125"
                />
              </div>

              <div className="text-[10px] tracking-wider uppercase text-stone-600 font-sans font-semibold mt-1">
                English Editorial Desk • Newsroom Edition
              </div>
            </div>

            {/* Newspaper Column Grid */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              
              {/* Main Lead Story in English */}
              <div className="sm:col-span-8">
                <div className="text-xs uppercase tracking-wider font-sans font-bold text-manorama-red mb-1">
                  MAIN REGIONAL REPORT
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 leading-tight mb-2 font-newspaper">
                  {english.headline || 'English Newspaper Headline'}
                </h3>

                <h4 className="text-sm sm:text-base font-semibold text-stone-700 italic border-l-2 border-stone-900 pl-3 mb-3 leading-snug">
                  {english.summary}
                </h4>

                {/* Print columns */}
                <div className="columns-1 sm:columns-2 gap-5 text-xs sm:text-sm text-stone-800 leading-relaxed text-justify">
                  <p className="first-letter:text-3xl first-letter:font-black first-letter:float-left first-letter:mr-2">
                    {english.article}
                  </p>
                </div>
              </div>

              {/* Editorial Print Photo with Caption */}
              <div className="sm:col-span-4 border border-stone-400 p-2 bg-white shadow-xs">
                <img
                  src={imageUrl}
                  alt="English Print Asset"
                  className="w-full h-44 object-cover filter grayscale contrast-125"
                />
                <div className="text-[11px] font-sans text-stone-700 italic mt-2 text-center leading-snug">
                  {imageCaption}
                </div>
                <div className="text-[9px] font-sans text-right text-stone-400 mt-1 uppercase">
                  Staff Photo / Manorama
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* 5. MALAYALAM NEWSPAPER PREVIEW */}
        {/* Uses exact logo: public/brand/manorama-newspaper-ml.png */}
        {/* ============================================================ */}
        {activeTab === 'newspaper-ml' && (
          <div className="border border-stone-300 rounded-2xl overflow-hidden shadow-md newspaper-texture p-5 sm:p-7 text-stone-900 font-serif">
            
            {/* Front Page Header with Exact Malayalam Masthead */}
            <div className="border-b-2 border-stone-900 pb-3 text-center">
              <div className="flex items-center justify-between text-[11px] font-sans text-stone-600 uppercase tracking-widest border-b border-stone-300 pb-1 mb-2">
                <span>കേരളത്തിന്റെ മുഖപത്രം</span>
                <span>{currentDate} • ലക്കം 248</span>
                <span>കോട്ടയം പതിപ്പ് • ₹6.00</span>
              </div>

              {/* Exact Malayalam Masthead from supplied image */}
              <div className="flex justify-center my-2">
                <img
                  src="/brand/manorama-newspaper-ml.png"
                  alt="മലയാള മനോരമ മാസ്റ്റ്ഹെഡ്"
                  className="h-12 sm:h-14 object-contain filter contrast-125"
                />
              </div>

              <div className="text-[10px] tracking-wider uppercase text-stone-600 font-ml mt-1">
                കേരളത്തിലെ ഏറ്റവും വലിയ പത്രസ്ഥാപനം • വാർത്താ വിഭാഗം
              </div>
            </div>

            {/* Malayalam Newspaper Column Grid */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              
              {/* Main Story in Malayalam */}
              <div className="sm:col-span-8">
                <div className="text-xs uppercase tracking-wider font-sans font-bold text-manorama-red mb-1 font-ml">
                  പ്രധാന വാർത്ത
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 leading-tight mb-2 font-ml">
                  {malayalam.headline || 'മലയാളം തലക്കെട്ട്'}
                </h3>

                <h4 className="text-sm sm:text-base font-semibold text-stone-700 italic border-l-2 border-stone-900 pl-3 mb-3 leading-snug font-ml">
                  {malayalam.summary}
                </h4>

                {/* Print columns */}
                <div className="columns-1 sm:columns-2 gap-5 text-xs sm:text-sm text-stone-800 leading-relaxed text-justify font-ml">
                  <p className="first-letter:text-3xl first-letter:font-black first-letter:float-left first-letter:mr-2">
                    {malayalam.article}
                  </p>
                </div>
              </div>

              {/* Editorial Print Photo with Caption in Malayalam */}
              <div className="sm:col-span-4 border border-stone-400 p-2 bg-white shadow-xs">
                <img
                  src={imageUrl}
                  alt="മലയാള പത്ര ചിത്രം"
                  className="w-full h-44 object-cover filter grayscale contrast-125"
                />
                <div className="text-[11px] font-ml text-stone-700 italic mt-2 text-center leading-snug">
                  {imageCaption}
                </div>
                <div className="text-[9px] font-sans text-right text-stone-400 mt-1 uppercase">
                  ചിത്രം: മനോരമ സ്പെഷ്യൽ
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
