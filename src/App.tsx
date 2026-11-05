import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ArticleInput } from './components/ArticleInput';
import { AIProcessingStage } from './components/AIProcessingStage';
import { BilingualResults } from './components/BilingualResults';
import { KeyInformation } from './components/KeyInformation';
import { PublicationPreview } from './components/PublicationPreview';
import { NewsTicker } from './components/NewsTicker';
import { SettingsModal } from './components/SettingsModal';
import { SAMPLE_ARTICLES } from './data/sampleArticles';
import {
  SupportedLanguage,
  BilingualContent,
  PreviewTab,
  ReviewStatus
} from './types';
import { processArticle, detectLanguage } from './services/aiService';

export const App: React.FC = () => {
  // Default sample: Kottayam Water Monitoring System (English)
  const defaultSample = SAMPLE_ARTICLES.find(s => s.id === 'kottayam-water-monitoring') || SAMPLE_ARTICLES[0];

  const [articleText, setArticleText] = useState<string>(defaultSample.text);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('auto');
  const [headlineLimit, setHeadlineLimit] = useState<number>(60);
  const [activePreviewTab, setActivePreviewTab] = useState<PreviewTab>('online');

  // AI Content State
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
  const [sourceLang, setSourceLang] = useState<'malayalam' | 'english'>('english');
  const [targetLang, setTargetLang] = useState<'malayalam' | 'english'>('malayalam');
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>('Pending Review');
  const [processingEngine, setProcessingEngine] = useState<'demo-heuristics' | 'gemini-live-ai'>('demo-heuristics');

  // Processing & Error states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Settings & API Key
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return sessionStorage.getItem('newsbridge_gemini_key') || '';
  });

  // Sample metadata
  const [currentCategory, setCurrentCategory] = useState<string>(defaultSample.category);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(defaultSample.imageUrl || '');
  const [currentCaption, setCurrentCaption] = useState<string>(defaultSample.imageCaption || '');

  // Detect script dynamically
  const autoDetectedLang = useMemo(() => {
    return detectLanguage(articleText);
  }, [articleText]);

  // Handle Load Malayalam Sample
  const handleLoadSampleMalayalam = () => {
    const sample = SAMPLE_ARTICLES.find(s => s.id === 'kerala-rain-alert') || SAMPLE_ARTICLES[1];
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

  // Handle Load English Sample (Kottayam Water Monitoring)
  const handleLoadSampleEnglish = () => {
    const sample = SAMPLE_ARTICLES.find(s => s.id === 'kottayam-water-monitoring') || SAMPLE_ARTICLES[0];
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

  // Clear Input
  const handleClearInput = () => {
    setArticleText('');
    setErrorMessage(null);
  };

  // Analyse & Translate Trigger
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

      // Automatically scroll to Section 2 (AI Results & Editor) after processing
      const resultsEl = document.getElementById('section-results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while processing article.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Immediate edits from Review & Edit Stage
  const handleUpdateMalayalam = (field: keyof BilingualContent, val: string) => {
    setMalayalamContent(prev => ({ ...prev, [field]: val }));
  };

  const handleUpdateEnglish = (field: keyof BilingualContent, val: string) => {
    setEnglishContent(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans scroll-smooth">
      
      {/* Fixed Sticky Header with Section Navigation Bar */}
      <Header
        isDemoMode={!apiKey}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetToSample={handleLoadSampleEnglish}
      />

      {/* Main Sequential Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* ============================================================ */}
        {/* SECTION 1: ARTICLE INPUT */}
        {/* ============================================================ */}
        <section id="section-input" className="scroll-mt-28 space-y-4">
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

          {/* AI Processing Milestone / Demo Status */}
          <AIProcessingStage
            isProcessing={isProcessing}
            isDemoMode={!apiKey}
            sourceLanguage={sourceLang}
            targetLanguage={targetLang}
            hasProcessed={true}
          />
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: AI RESULTS & EDITOR */}
        {/* ============================================================ */}
        <section id="section-results" className="scroll-mt-28">
          <BilingualResults
            malayalam={malayalamContent}
            english={englishContent}
            onUpdateMalayalam={handleUpdateMalayalam}
            onUpdateEnglish={handleUpdateEnglish}
            headlineLimit={headlineLimit}
            setHeadlineLimit={setHeadlineLimit}
            reviewStatus={reviewStatus}
            setReviewStatus={setReviewStatus}
            isDemoMode={!apiKey}
          />
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: KEY INFORMATION */}
        {/* ============================================================ */}
        <section id="section-key-info" className="scroll-mt-28">
          <KeyInformation
            entities={entities}
            keywords={keywords}
            isDemoEngine={processingEngine === 'demo-heuristics'}
          />
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: PUBLICATION PREVIEWS */}
        {/* ============================================================ */}
        <section id="section-previews" className="scroll-mt-28">
          <PublicationPreview
            activeTab={activePreviewTab}
            setActiveTab={setActivePreviewTab}
            malayalam={malayalamContent}
            english={englishContent}
            category={currentCategory}
            imageUrl={currentImageUrl}
            imageCaption={currentCaption}
          />
        </section>

        {/* ============================================================ */}
        {/* LIVE SCROLLING NEWS TICKER */}
        {/* ============================================================ */}
        <section id="section-ticker" className="pt-2">
          <NewsTicker
            malayalamHeadline={malayalamContent.headline}
            englishHeadline={englishContent.headline}
            headlineLimit={headlineLimit}
          />
        </section>

      </main>

      {/* Editorial Newsroom Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">NewsBridge AI</span>
            <span>—</span>
            <span>A smarter bridge from newsroom to reader.</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            Manorama Online Software Engineer Intern Technical Assessment • React, TypeScript, Vite & Tailwind CSS
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
