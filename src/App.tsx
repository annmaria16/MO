import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ArticleInput } from './components/ArticleInput';
import { AIProcessingStage } from './components/AIProcessingStage';
import { BilingualResults } from './components/BilingualResults';
import { PublicationPreview } from './components/PublicationPreview';
import { KeyInformation } from './components/KeyInformation';
import { JsonExport } from './components/JsonExport';
import { NewsTicker } from './components/NewsTicker';
import { SettingsModal } from './components/SettingsModal';
import { SAMPLE_ARTICLES } from './data/sampleArticles';
import {
  SupportedLanguage,
  NewsroomJSONOutput,
  BilingualContent,
  PreviewTab,
  ReviewStatus
} from './types';
import { processArticle, detectLanguage } from './services/aiService';

export const App: React.FC = () => {
  // Default sample (Kerala Rain Alert)
  const defaultSample = SAMPLE_ARTICLES[0];

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
  const [sourceLang, setSourceLang] = useState<'malayalam' | 'english'>('malayalam');
  const [targetLang, setTargetLang] = useState<'malayalam' | 'english'>('english');
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

  // Build reactive JSON payload
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      
      {/* Brand Header */}
      <Header
        isDemoMode={!apiKey}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetToSample={handleLoadSampleMalayalam}
      />

      {/* Main Single Workflow Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-7">
        
        {/* Workflow Visual Stepper Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between overflow-x-auto text-xs font-bold text-slate-600 space-x-2 sm:space-x-4">
            
            <div className="flex items-center space-x-2 text-manorama-red shrink-0">
              <span className="w-6 h-6 rounded-full bg-manorama-red text-white flex items-center justify-center text-xs font-black">1</span>
              <span>Input Article</span>
            </div>
            
            <span className="text-slate-300">→</span>

            <div className="flex items-center space-x-2 text-slate-800 shrink-0">
              <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center text-xs font-black">2</span>
              <span>AI Processing</span>
            </div>

            <span className="text-slate-300">→</span>

            <div className="flex items-center space-x-2 text-slate-800 shrink-0">
              <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center text-xs font-black">3</span>
              <span>Review & Edit</span>
            </div>

            <span className="text-slate-300">→</span>

            <div className="flex items-center space-x-2 text-slate-800 shrink-0">
              <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center text-xs font-black">4</span>
              <span>Publishing Previews</span>
            </div>

            <span className="text-slate-300">→</span>

            <div className="flex items-center space-x-2 text-slate-800 shrink-0">
              <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center text-xs font-black">5</span>
              <span>JSON Export</span>
            </div>

          </div>
        </div>

        {/* STAGE 1: Article Input */}
        <section id="stage-1-input">
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
        </section>

        {/* STAGE 2: AI Processing State & Architecture */}
        <section id="stage-2-processing">
          <AIProcessingStage
            isProcessing={isProcessing}
            isDemoMode={!apiKey}
            sourceLanguage={sourceLang}
            targetLanguage={targetLang}
            hasProcessed={true}
          />
        </section>

        {/* STAGE 3: Review & Edit (Side-by-Side English & Malayalam) */}
        <section id="stage-3-review-edit">
          <BilingualResults
            malayalam={malayalamContent}
            english={englishContent}
            onUpdateMalayalam={handleUpdateMalayalam}
            onUpdateEnglish={handleUpdateEnglish}
            headlineLimit={headlineLimit}
            setHeadlineLimit={setHeadlineLimit}
            reviewStatus={reviewStatus}
            setReviewStatus={setReviewStatus}
          />
        </section>

        {/* STAGE 4: Publication Previews (5 Tabs with Exact Logos) */}
        <section id="stage-4-previews">
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

        {/* COMPACT SECONDARY: AI-Extracted Key Information */}
        <section id="stage-entities-metadata">
          <KeyInformation
            entities={entities}
            keywords={keywords}
            isDemoEngine={processingEngine === 'demo-heuristics'}
          />
        </section>

        {/* STAGE 5: Structured JSON Export */}
        <section id="stage-5-export">
          <JsonExport
            jsonData={currentJsonPayload}
            onUpdateReviewStatus={setReviewStatus}
          />
        </section>

        {/* LIVE SCROLLING NEWS TICKER */}
        <section id="stage-news-ticker" className="pt-2">
          <NewsTicker
            malayalamHeadline={malayalamContent.headline}
            englishHeadline={englishContent.headline}
            headlineLimit={headlineLimit}
          />
        </section>

      </main>

      {/* Editorial Newsroom Footer */}
      <footer className="mt-10 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
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
