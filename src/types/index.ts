export type SupportedLanguage = 'auto' | 'malayalam' | 'english';

export type ReviewStatus = 'Pending Review' | 'Reviewed' | 'Approved for Preview';

export interface BilingualContent {
  headline: string;
  summary: string;
  article: string;
}

export interface ExtractedEntities {
  people: string[];
  places: string[];
  organisations: string[];
}

export interface NewsroomJSONOutput {
  sourceLanguage: 'malayalam' | 'english';
  translatedLanguage: 'malayalam' | 'english';
  english: BilingualContent;
  malayalam: BilingualContent;
  entities: ExtractedEntities;
  keywords: string[];
  reviewStatus: ReviewStatus;
  metadata?: {
    wordCount: {
      english: number;
      malayalam: number;
    };
    category: string;
    generatedAt: string;
    processingEngine: 'demo-heuristics' | 'gemini-live-ai';
  };
}

export interface SampleArticle {
  id: string;
  title: string;
  language: 'malayalam' | 'english';
  category: string;
  text: string;
  imageUrl?: string;
  imageCaption?: string;
  expectedResult: {
    english: BilingualContent;
    malayalam: BilingualContent;
    entities: ExtractedEntities;
    keywords: string[];
  };
}

export type PreviewTab = 'online' | 'mobile' | 'tv' | 'newspaper-en' | 'newspaper-ml';
