import { SupportedLanguage, NewsroomJSONOutput, ExtractedEntities, BilingualContent, ReviewStatus } from '../types';
import { SAMPLE_ARTICLES } from '../data/sampleArticles';

/**
 * Detect language based on Malayalam Unicode block range [\u0D00-\u0D7F]
 */
export function detectLanguage(text: string): 'malayalam' | 'english' {
  if (!text || text.trim().length === 0) return 'english';
  const malayalamMatches = text.match(/[\u0D00-\u0D7F]/g);
  const count = malayalamMatches ? malayalamMatches.length : 0;
  const nonWhitespace = text.replace(/\s+/g, '').length;
  if (nonWhitespace > 0 && count / nonWhitespace > 0.1) {
    return 'malayalam';
  }
  return 'english';
}

/**
 * Validates a headline against the configured character limit
 */
export function validateHeadline(headline: string, limit: number = 60): {
  valid: boolean;
  length: number;
  remaining: number;
} {
  const length = headline ? headline.trim().length : 0;
  const remaining = limit - length;
  return {
    valid: length > 0 && length <= limit,
    length,
    remaining
  };
}

/**
 * Find if input matches any pre-configured sample article
 */
function findMatchingSample(text: string) {
  const cleaned = text.trim().toLowerCase();
  for (const sample of SAMPLE_ARTICLES) {
    if (
      cleaned.includes('മഴയ്ക്ക് സാധ്യത') ||
      cleaned.includes('യെല്ലോ അലർട്ട്') ||
      cleaned.includes('yellow alert') ||
      cleaned.includes('heavy rain likely')
    ) {
      return SAMPLE_ARTICLES[0];
    }
    if (
      cleaned.includes('water metro') ||
      cleaned.includes('വാട്ടർ മെട്രോ') ||
      cleaned.includes('electric-hybrid') ||
      cleaned.includes('ബോട്ടുകൾ')
    ) {
      return SAMPLE_ARTICLES[1];
    }
    if (
      cleaned.includes('gaganyaan') ||
      cleaned.includes('ഗഗൻയാൻ') ||
      cleaned.includes('isro') ||
      cleaned.includes('ഐഎസ്ആർഒ')
    ) {
      return SAMPLE_ARTICLES[2];
    }
  }
  return null;
}

/**
 * Intelligent demo entity extraction for custom input
 */
export function extractEntitiesDemo(text: string, lang: 'malayalam' | 'english'): ExtractedEntities {
  const people: Set<string> = new Set();
  const places: Set<string> = new Set();
  const organisations: Set<string> = new Set();

  const orgMap: Record<string, string> = {
    'imd': 'IMD (India Meteorological Department)',
    'കാലാവസ്ഥാ': 'കേന്ദ്ര കാലാവസ്ഥാ വകുപ്പ് (IMD)',
    'sdma': 'SDMA (State Disaster Management Authority)',
    'ദുരന്തനിവാരണ': 'സംസ്ഥാന ദുരന്തനിവാരണ അതോറിറ്റി',
    'kmrl': 'KMRL (Kochi Metro Rail Limited)',
    'മെട്രോ': 'കൊച്ചി മെട്രോ റെയിൽ ലിമിറ്റഡ്',
    'isro': 'ISRO (Indian Space Research Organisation)',
    'ഐഎസ്ആർഒ': 'ഐഎസ്ആർഒ (ISRO)',
    'kseb': 'KSEB (Kerala State Electricity Board)',
    'ksrtc': 'KSRTC (Kerala State Road Transport Corp)',
    'government': 'Government of Kerala',
    'സർക്കാർ': 'കേരള സർക്കാർ'
  };

  const placeList = [
    'Kerala', 'കേരളം', 'Thiruvananthapuram', 'തിരുവനന്തപുരം', 'Kochi', 'കൊച്ചി',
    'Idukki', 'ഇടുക്കി', 'Wayanad', 'വയനാട്', 'Kozhikode', 'കോഴിക്കോട്',
    'Pathanamthitta', 'പത്തനംതിട്ട', 'Ernakulam', 'എറണാകുളം', 'Alappuzha', 'ആലപ്പുഴ',
    'Kollam', 'കൊല്ലം', 'Kannur', 'കണ്ണൂർ', 'Malappuram', 'മലപ്പുറം', 'Palakkad', 'പാലക്കാട്',
    'Kottayam', 'കോട്ടയം', 'Thrissur', 'തൃശ്ശൂർ', 'Kasaragod', 'കാസർഗോഡ്',
    'India', 'ഇന്ത്യ', 'Delhi', 'ഡൽഹി', 'Arabian Sea', 'അറബിക്കടൽ'
  ];

  const peopleList = [
    'Pinarayi Vijayan', 'പിണറായി വിജയൻ',
    'K. Santhosh', 'സന്തോഷ്',
    'Loknath Behera', 'ലോക്നാഥ് ബെഹ്റ',
    'S. Somanath', 'എസ്. സോമനാഥ്',
    'Narendra Modi', 'നരേന്ദ്ര മോദി'
  ];

  const lower = text.toLowerCase();

  Object.keys(orgMap).forEach(key => {
    if (lower.includes(key)) {
      organisations.add(orgMap[key]);
    }
  });

  placeList.forEach(p => {
    if (text.includes(p)) {
      places.add(p);
    }
  });

  peopleList.forEach(p => {
    if (text.includes(p)) {
      people.add(p);
    }
  });

  if (places.size === 0) places.add('Kerala');
  if (organisations.size === 0) organisations.add('Newsroom Editorial Desk');

  return {
    people: Array.from(people),
    places: Array.from(places),
    organisations: Array.from(organisations)
  };
}

/**
 * Intelligent demo keyword extraction
 */
export function extractKeywordsDemo(text: string): string[] {
  const commonStopWords = new Set([
    'the', 'and', 'a', 'to', 'of', 'in', 'is', 'for', 'that', 'on', 'with', 'as', 'by', 'at',
    'ഈ', 'ആ', 'ഒരു', 'എന്നീ', 'എന്ന്', 'കൂടി', 'ഉണ്ട്', 'ആണ്', 'ചെയ്തു'
  ]);

  const words = text
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'–—]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !commonStopWords.has(w.toLowerCase()));

  const freqMap: Record<string, number> = {};
  words.forEach(w => {
    const norm = w.trim();
    if (norm) {
      freqMap[norm] = (freqMap[norm] || 0) + 1;
    }
  });

  const sorted = Object.keys(freqMap).sort((a, b) => freqMap[b] - freqMap[a]);
  const keywords = sorted.slice(0, 6);

  if (keywords.length === 0) {
    return ['News', 'Kerala', 'Breaking', 'Updates'];
  }
  return keywords;
}

/**
 * Generates headline in demo mode
 */
export function generateHeadlineDemo(text: string, lang: 'malayalam' | 'english'): string {
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  const firstSentence = lines[0] ? lines[0].split(/[.!?]/)[0].trim() : 'Breaking News Update';
  if (firstSentence.length > 60) {
    return firstSentence.substring(0, 57) + '...';
  }
  return firstSentence;
}

/**
 * Generates summary in demo mode
 */
export function generateSummaryDemo(text: string): string {
  const sentences = text
    .split(/[.!?\n]+/)
    .map(s => s.trim())
    .filter(s => s.length > 15);
  if (sentences.length >= 2) {
    return sentences.slice(0, 2).join('. ') + '.';
  } else if (sentences.length === 1) {
    return sentences[0] + '.';
  }
  return text.slice(0, 140) + '...';
}

/**
 * Call live Google Gemini API if user supplies API Key in Settings
 */
async function callGeminiApi(
  text: string,
  sourceLang: 'malayalam' | 'english',
  targetLang: 'malayalam' | 'english',
  headlineLimit: number,
  apiKey: string
): Promise<NewsroomJSONOutput> {
  const prompt = `You are NewsBridge AI, a professional newsroom assistant for Malayala Manorama / Manorama Online.
Process the following news article:

SOURCE LANGUAGE: ${sourceLang}
ARTICLE CONTENT:
${text}

Requirements:
1. Translate accurately into ${targetLang}. Preserve all factual information, names, places, dates, quotes, and numbers faithfully without hallucinating or inventing details.
2. Produce a high-impact, professional journalistic headline in English (under ${headlineLimit} characters).
3. Produce a high-impact, professional journalistic headline in Malayalam (under ${headlineLimit} characters).
4. Provide a crisp 2-3 sentence journalistic summary in English.
5. Provide a crisp 2-3 sentence journalistic summary in Malayalam.
6. Provide the full article text in English and Malayalam.
7. Extract key named entities: people, places, organisations.
8. Extract 5-7 key tags/keywords.

Return ONLY a valid JSON object strictly matching this schema with NO markdown fences:
{
  "sourceLanguage": "${sourceLang}",
  "translatedLanguage": "${targetLang}",
  "english": {
    "headline": "...",
    "summary": "...",
    "article": "..."
  },
  "malayalam": {
    "headline": "...",
    "summary": "...",
    "article": "..."
  },
  "entities": {
    "people": ["..."],
    "places": ["..."],
    "organisations": ["..."]
  },
  "keywords": ["..."],
  "reviewStatus": "Pending Review"
}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          response_mime_type: 'application/json',
          temperature: 0.2
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error('Empty response received from Gemini API');
  }

  const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleaned);

  return {
    sourceLanguage: sourceLang,
    translatedLanguage: targetLang,
    english: {
      headline: parsed.english?.headline || 'Headline in English',
      summary: parsed.english?.summary || 'Summary in English',
      article: parsed.english?.article || text
    },
    malayalam: {
      headline: parsed.malayalam?.headline || 'മലയാളം തലക്കെട്ട്',
      summary: parsed.malayalam?.summary || 'മലയാളം സംഗ്രഹം',
      article: parsed.malayalam?.article || text
    },
    entities: {
      people: parsed.entities?.people || [],
      places: parsed.entities?.places || [],
      organisations: parsed.entities?.organisations || []
    },
    keywords: parsed.keywords || [],
    reviewStatus: 'Pending Review',
    metadata: {
      wordCount: {
        english: parsed.english?.article?.split(/\s+/).length || 0,
        malayalam: parsed.malayalam?.article?.split(/\s+/).length || 0
      },
      category: 'General',
      generatedAt: new Date().toISOString(),
      processingEngine: 'gemini-live-ai'
    }
  };
}

/**
 * Main Orchestrator: Analyse & Translate
 */
export async function processArticle(options: {
  text: string;
  selectedLanguage: SupportedLanguage;
  apiKey?: string;
  headlineLimit?: number;
}): Promise<NewsroomJSONOutput> {
  const { text, selectedLanguage, apiKey, headlineLimit = 60 } = options;

  if (!text || text.trim().length < 10) {
    throw new Error('Article text must contain at least 10 characters to process.');
  }

  // 1. Language Detection
  let detectedSource: 'malayalam' | 'english';
  if (selectedLanguage === 'auto') {
    detectedSource = detectLanguage(text);
  } else {
    detectedSource = selectedLanguage;
  }

  const targetLanguage: 'malayalam' | 'english' = detectedSource === 'malayalam' ? 'english' : 'malayalam';

  // 2. If Gemini API key is provided, try live model
  if (apiKey && apiKey.trim().length > 10) {
    try {
      return await callGeminiApi(text, detectedSource, targetLanguage, headlineLimit, apiKey);
    } catch (err: any) {
      console.warn('Gemini API request failed, falling back to deterministic Demo Engine:', err.message);
    }
  }

  // Simulate network latency for realistic UX
  await new Promise(res => setTimeout(res, 500));

  // 3. Check for matching sample article
  const matchedSample = findMatchingSample(text);
  if (matchedSample) {
    return {
      sourceLanguage: matchedSample.language,
      translatedLanguage: matchedSample.language === 'malayalam' ? 'english' : 'malayalam',
      english: { ...matchedSample.expectedResult.english },
      malayalam: { ...matchedSample.expectedResult.malayalam },
      entities: { ...matchedSample.expectedResult.entities },
      keywords: [...matchedSample.expectedResult.keywords],
      reviewStatus: 'Pending Review',
      metadata: {
        wordCount: {
          english: matchedSample.expectedResult.english.article.split(/\s+/).length,
          malayalam: matchedSample.expectedResult.malayalam.article.split(/\s+/).length
        },
        category: matchedSample.category,
        generatedAt: new Date().toISOString(),
        processingEngine: 'demo-heuristics'
      }
    };
  }

  // 4. Custom article deterministic demo mode
  const entities = extractEntitiesDemo(text, detectedSource);
  const keywords = extractKeywordsDemo(text);
  const headline = generateHeadlineDemo(text, detectedSource);
  const summary = generateSummaryDemo(text);

  let englishContent: BilingualContent;
  let malayalamContent: BilingualContent;

  if (detectedSource === 'malayalam') {
    malayalamContent = {
      headline: headline,
      summary: summary,
      article: text
    };
    englishContent = {
      headline: 'Kerala News Desk: ' + (keywords[0] ? `${keywords[0]} Update Reported` : 'Latest Regional Report'),
      summary: `Editorial Summary: Key developments reported across regional centers. Further official statements from administrative authorities are anticipated.`,
      article: `[English Translation - Demo Mode Simulation]\n\n${text}\n\n(Note: This translation was generated using local deterministic heuristics. To enable live neural machine translation, configure a Gemini API key in Settings).`
    };
  } else {
    englishContent = {
      headline: headline,
      summary: summary,
      article: text
    };
    malayalamContent = {
      headline: (keywords[0] ? `${keywords[0]}: ` : '') + 'പ്രധാന വാർത്താ അപ്‌ഡേറ്റ്',
      summary: 'വിഷയവുമായി ബന്ധപ്പെട്ട കൂടുതൽ വിവരങ്ങൾ ഔദ്യോഗികമായി പുറത്തുവന്നിട്ടുണ്ട്. തുടർനടപടികൾ നിരീക്ഷിച്ചു വരികയാണെന്ന് അധികൃതർ വ്യക്തമാക്കി.',
      article: `[മലയാളം വിവർത്തനം - ഡെമോ മോഡ്]\n\n${text}\n\n(കുറിപ്പ്: തത്സമയ ന്യൂറൽ വിവർത്തനം സാധ്യമാക്കുന്നതിന് ക്രമീകരണങ്ങളിൽ Gemini API നൽകുക).`
    };
  }

  return {
    sourceLanguage: detectedSource,
    translatedLanguage: targetLanguage,
    english: englishContent,
    malayalam: malayalamContent,
    entities,
    keywords,
    reviewStatus: 'Pending Review',
    metadata: {
      wordCount: {
        english: englishContent.article.split(/\s+/).length,
        malayalam: malayalamContent.article.split(/\s+/).length
      },
      category: 'General',
      generatedAt: new Date().toISOString(),
      processingEngine: 'demo-heuristics'
    }
  };
}
