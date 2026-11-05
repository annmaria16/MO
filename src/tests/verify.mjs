// Direct Node.js ESM verification script
const SAMPLE_ARTICLES = [
  {
    id: 'kerala-rain-alert',
    title: 'Kerala Monsoon Yellow Alert (Malayalam)',
    language: 'malayalam',
    category: 'Kerala',
    text: `സംസ്ഥാനത്ത് വരും ദിവസങ്ങളിൽ ശക്തമായ മഴയ്ക്ക് സാധ്യതയെന്ന് കാലാവസ്ഥാ വകുപ്പ്. വിവിധ ജില്ലകളിൽ യെല്ലോ അലർട്ട് പ്രഖ്യാപിച്ചു.`,
    expectedResult: {
      malayalam: {
        headline: 'സംസ്ഥാനത്ത് ശക്തമായ മഴയ്ക്ക് സാധ്യത',
        summary: 'കാലാവസ്ഥാ വകുപ്പ് വിവിധ ജില്ലകളിൽ യെല്ലോ അലർട്ട് പ്രഖ്യാപിച്ചു.',
        article: 'വിശദ വിവരങ്ങൾ...'
      },
      english: {
        headline: 'Heavy Rain Likely in Kerala Soon',
        summary: 'IMD has issued yellow alert across Kerala.',
        article: 'Detailed article...'
      },
      entities: {
        people: ['K. Santhosh (IMD Director)'],
        places: ['Kerala', 'Idukki', 'Wayanad'],
        organisations: ['IMD (India Meteorological Department)']
      },
      keywords: ['Rain', 'Kerala', 'Alert', 'Weather']
    }
  }
];

function detectLanguage(text) {
  if (!text || text.trim().length === 0) return 'english';
  const malayalamMatches = text.match(/[\u0D00-\u0D7F]/g);
  const count = malayalamMatches ? malayalamMatches.length : 0;
  const nonWhitespace = text.replace(/\s+/g, '').length;
  if (nonWhitespace > 0 && count / nonWhitespace > 0.1) {
    return 'malayalam';
  }
  return 'english';
}

function validateHeadline(headline, limit = 60) {
  const length = headline ? headline.trim().length : 0;
  const remaining = limit - length;
  return {
    valid: length > 0 && length <= limit,
    length,
    remaining
  };
}

let passed = 0;
let failed = 0;

function assert(condition, desc) {
  if (condition) {
    console.log(`✅ PASS: ${desc}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${desc}`);
    failed++;
  }
}

console.log('--- NewsBridge AI Test Suite ---');

// 1. Language Detection
assert(detectLanguage('സംസ്ഥാനത്ത് ശക്തമായ മഴയ്ക്ക് സാധ്യത') === 'malayalam', 'Malayalam script detected');
assert(detectLanguage('Kochi Water Metro modernises urban travel') === 'english', 'English text detected');
assert(detectLanguage('') === 'english', 'Empty text defaults cleanly');

// 2. Character limit validation
const v1 = validateHeadline('Heavy Rain Likely in Kerala', 60);
assert(v1.valid === true && v1.length === 27 && v1.remaining === 33, 'Valid headline within limit');

const v2 = validateHeadline('Extremely lengthy headline that exceeds standard broadcast length', 30);
assert(v2.valid === false && v2.remaining < 0, 'Exceeded headline flagged with negative remaining count');

// 3. Schema Structure validation
const mockPayload = {
  sourceLanguage: 'malayalam',
  translatedLanguage: 'english',
  english: { headline: 'Rain alert', summary: 'IMD update', article: 'Full text' },
  malayalam: { headline: 'മഴ മുന്നറിയിപ്പ്', summary: 'ഐഎംഡി അറിയിപ്പ്', article: 'വിവരണം' },
  entities: { people: ['CM'], places: ['Kerala'], organisations: ['IMD'] },
  keywords: ['Rain', 'Monsoon'],
  reviewStatus: 'pending'
};

const requiredKeys = ['sourceLanguage', 'translatedLanguage', 'english', 'malayalam', 'entities', 'keywords', 'reviewStatus'];
assert(requiredKeys.every(k => k in mockPayload), 'All Section 12 JSON schema keys present');

const jsonString = JSON.stringify(mockPayload);
const parsed = JSON.parse(jsonString);
assert(parsed.reviewStatus === 'pending', 'JSON parses cleanly without error');

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
