import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { ArticleInput } from './components/ArticleInput';
import { BilingualResults } from './components/BilingualResults';
import { KeyInformation } from './components/KeyInformation';
import { PublicationPreview } from './components/PublicationPreview';
import { NewsTicker } from './components/NewsTicker';
import { PreviewGallery } from './components/PreviewGallery';
import { JsonExport } from './components/JsonExport';
import { SettingsModal } from './components/SettingsModal';
import { SAMPLE_ARTICLES } from './data/sampleArticles';
import {
  SupportedLanguage,
  NewsroomJSONOutput,
  BilingualContent,
  PreviewTab
} from './types';
import { processArticle, detectLanguage } from './services/aiService';

export const App: React.FC = () => {
  // Default to first realistic sample (Kerala Monsoon Yellow Alert)
  const defaultSample = SAMPLE_ARTICLES[0];

  const [articleText, setArticleText] = useState<string>(defaultSample.text);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('auto');
  const [headlineLimit, setHeadlineLimit] = useState<number>(60);
  const [activePreviewTab, setActivePreviewTab] = useState<PreviewTab>('website');

  // AI Results state
  const [malayalamContent, setMalayalamContent] = useState<BilingualContent>({
    ...defaultSample.expectedResult.malayalam
  });
  const [englishContent, setEnglishContent] = useState<BilingualContent>({
    ...defaultSample.expectedResult.english
  });
  const [entities, setEntities] = useState({
    ...defaultSample.expectedResult.entities
  });
  const [keywords, setKeywords] = useState<string[]>([
    ...defaultSample.expectedResult.keywords
  ]);
  const [sourceLang, setSourceLang] = useState<'malayalam' | 'english'>('malayalam');
  const [targetLang, setTargetLang] = useState<'malayalam' | 'english'>('english');
  const [reviewStatus, setReviewStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [processingEngine, setProcessingEngine] = useState<'demo-heuristics' | 'gemini-live-ai'>('demo-heuristics');

  // Processing & error states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Settings & API Key
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return sessionStorage.getItem('newsbridge_gemini_key') || '';
  });

  // Current active sample meta (for photos)
  const [currentCategory, setCurrentCategory] = useState<string>(defaultSample.category);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(defaultSample.imageUrl || '');
  const [currentCaption, setCurrentCaption] = useState<string>(defaultSample.imageCaption || '');

  // Detect language dynamically as user types
  const autoDetectedLang = useMemo(() => {
    return detectLanguage(articleText);
  }, [articleText]);

  // Handle Load Malayalam Sample
  const handleLoadSampleMalayalam = () => {
    const sample = SAMPLE_ARTICLES[0];
    setArticleText(sample.text);
    setSelectedLanguage('malayalam');
    setSourceLang('malayalam');
    setTargetLang('english');
    setMalayalamContent({ ...sample.expectedResult.malayalam });
    setEnglishContent({ ...sample.expectedResult.english });
    setEntities({ ...sample.expectedResult.entities });
    setKeywords([...sample.expectedResult.keywords]);
    setCurrentCategory(sample.category);
    setCurrentImageUrl(sample.imageUrl || '');
    setCurrentCaption(sample.imageCaption || '');
    setErrorMessage(null);
  };

  // Handle Load English Sample
  const handleLoadSampleEnglish = () => {
    const sample = SAMPLE_ARTICLES[1];
    setArticleText(sample.text);
    setSelectedLanguage('english');
    setSourceLang('english');
    setTargetLang('malayalam');
    setMalayalamContent({ ...sample.expectedResult.malayalam });
    setEnglishContent({ ...sample.expectedResult.english });
    setEntities({ ...sample.expectedResult.entities });
    setKeywords([...sample.expectedResult.keywords]);
    setCurrentCategory(sample.category);
    setCurrentImageUrl(sample.imageUrl || '');
    setCurrentCaption(sample.imageCaption || '');
    setErrorMessage(null);
  };

  // Handle Clear Input
  const handleClearInput = () => {
    setArticleText('');
    setErrorMessage(null);
  };

  // Handle Analyse & Translate
  const handleAnalyse = async () => {
    if (!articleText.trim()) {
      setErrorMessage('Please enter or select a news article before analysing.');
      return;
    }
    if (articleText.trim().length < 10) {
      setErrorMessage('Article text must contain at least 10 characters.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const result = await processArticle({
        text: articleText,
        selectedLanguage,
        apiKey: apiKey || undefined,
        headlineLimit
      });

      setSourceLang(result.sourceLanguage);
      setTargetLang(result.translatedLanguage);
      setMalayalamContent(result.malayalam);
      setEnglishContent(result.english);
      setEntities(result.entities);
      setKeywords(result.keywords);
      setProcessingEngine(result.metadata?.processingEngine || 'demo-heuristics');
      if (result.metadata?.category) {
        setCurrentCategory(result.metadata.category);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while processing article.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Updates from interactive bilingual editor
  const handleUpdateMalayalam = (field: keyof BilingualContent, val: string) => {
    setMalayalamContent(prev => ({ ...prev, [field]: val }));
  };

  const handleUpdateEnglish = (field: keyof BilingualContent, val: string) => {
    setEnglishContent(prev => ({ ...prev, [field]: val }));
  };

  // Build reactive JSON payload matching Section 12
  const currentJsonPayload: NewsroomJSONOutput = useMemo(() => {
    return {
      sourceLanguage: sourceLang,
      translatedLanguage: targetLang,
      english: {
        headline: englishContent.headline,
        summary: englishContent.summary,
        article: englishContent.article
      },
      malayalam: {
        headline: malayalamContent.headline,
        summary: malayalamContent.summary,
        article: malayalamContent.article
      },
      entities: {
        people: entities.people,
        places: entities.places,
        organisations: entities.organisations
      },
      keywords: keywords,
      reviewStatus: reviewStatus
    };
  }, [
    sourceLang,
    targetLang,
    englishContent,
    malayalamContent,
    entities,
    keywords,
    reviewStatus
  ]);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 flex flex-col font-sans">
      
      {/* 1. Header */}
      <Header
        isDemoMode={!apiKey}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetToSample={handleLoadSampleMalayalam}
      />

      {/* Main Newsroom Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Top Split Area: Left Input/Results & Right Previews/KeyInfo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: Input & Bilingual Results (7 cols on desktop) */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            
            {/* Article Input */}
            <ArticleInput
              articleText={articleText}
              setArticleText={setArticleText}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              detectedLanguage={autoDetectedLang}
              onLoadSampleMalayalam={handleLoadSampleMalayalam}
              onLoadSampleEnglish={handleLoadSampleEnglish}
              onClear={handleClearInput}
              onAnalyse={handleAnalyse}
              isProcessing={isProcessing}
              errorMessage={errorMessage}
            />

            {/* AI Results & Interactive Bilingual Editor */}
            <BilingualResults
              malayalam={malayalamContent}
              english={englishContent}
              onUpdateMalayalam={handleUpdateMalayalam}
              onUpdateEnglish={handleUpdateEnglish}
              headlineLimit={headlineLimit}
              setHeadlineLimit={setHeadlineLimit}
            />

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Publication Preview & Metadata (5 cols) */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            
            {/* Publication Preview Card */}
            <div className="flex-1 min-h-[380px]">
              <PublicationPreview
                activeTab={activePreviewTab}
                setActiveTab={setActivePreviewTab}
                malayalam={malayalamContent}
                english={englishContent}
                category={currentCategory}
                imageUrl={currentImageUrl}
                imageCaption={currentCaption}
              />
            </div>

            {/* Key Information & Export Results */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
              <KeyInformation
                entities={entities}
                keywords={keywords}
                isDemoEngine={processingEngine === 'demo-heuristics'}
              />

              <JsonExport
                jsonData={currentJsonPayload}
                onUpdateReviewStatus={setReviewStatus}
              />
            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* MIDDLE SECTION: Live Scrolling Breaking News Ticker */}
        {/* ============================================================ */}
        <section className="pt-1">
          <NewsTicker
            malayalamHeadline={malayalamContent.headline}
            englishHeadline={englishContent.headline}
            headlineLimit={headlineLimit}
          />
        </section>

        {/* ============================================================ */}
        {/* BOTTOM SECTION: Multi-Channel Publication Preview Gallery */}
        {/* ============================================================ */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Multi-Channel Digital Publication Suite
            </h3>
            <span className="text-xs text-slate-400">
              Select any format to preview in full resolution
            </span>
          </div>

          <PreviewGallery
            activeTab={activePreviewTab}
            setActiveTab={setActivePreviewTab}
            malayalam={malayalamContent}
            english={englishContent}
            imageUrl={currentImageUrl}
          />
        </section>

      </main>

      {/* Newsroom Editorial Footer */}
      <footer className="mt-8 border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">NewsBridge AI</span>
            <span>—</span>
            <span>A smarter bridge from newsroom to reader.</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            Technical Assessment Concept • Malayala Manorama / Manorama Online • Powered by React, TypeScript, Vite & Tailwind CSS
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        headlineLimit={headlineLimit}
        setHeadlineLimit={setHeadlineLimit}
      />

    </div>
  );
};
