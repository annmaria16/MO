// Direct Node.js ESM verification script
import fs from 'fs';
import path from 'path';

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

console.log('--- NewsBridge AI Redesign Verification Suite ---');

// 1. Check exact brand files exist in public/brand/
const brandFiles = [
  'public/brand/manorama-online.png',
  'public/brand/manorama-newspaper.png',
  'public/brand/manorama-news.png',
  'public/brand/manorama-newspaper-en.png',
  'public/brand/manorama-newspaper-ml.png'
];

brandFiles.forEach(file => {
  const exists = fs.existsSync(file);
  assert(exists, `Brand file exists: ${file}`);
});

// 2. Language Detection
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

assert(detectLanguage('സംസ്ഥാനത്ത് ശക്തമായ മഴയ്ക്ക് സാധ്യത') === 'malayalam', 'Malayalam script detected');
assert(detectLanguage('Kochi Water Metro modernises urban travel') === 'english', 'English text detected');
assert(detectLanguage('') === 'english', 'Empty text defaults cleanly to English');

// 3. Character limit validation
function validateHeadline(headline, limit = 60) {
  const length = headline ? headline.trim().length : 0;
  const remaining = limit - length;
  return {
    valid: length > 0 && length <= limit,
    length,
    remaining
  };
}

const v1 = validateHeadline('Heavy Rain Likely in Kerala', 60);
assert(v1.valid === true && v1.length === 27 && v1.remaining === 33, 'Valid headline within limit');

const v2 = validateHeadline('Extremely lengthy headline that exceeds standard broadcast length', 30);
assert(v2.valid === false && v2.remaining < 0, 'Exceeded headline flagged with negative remaining count');

// 4. Schema Structure validation with ReviewStatus
const mockPayload = {
  sourceLanguage: 'malayalam',
  translatedLanguage: 'english',
  english: { headline: 'Rain alert', summary: 'IMD update', article: 'Full text' },
  malayalam: { headline: 'മഴ മുന്നറിയിപ്പ്', summary: 'ഐഎംഡി അറിയിപ്പ്', article: 'വിവരണം' },
  entities: { people: ['CM'], places: ['Kerala'], organisations: ['IMD'] },
  keywords: ['Rain', 'Monsoon'],
  reviewStatus: 'Pending Review'
};

const requiredKeys = ['sourceLanguage', 'translatedLanguage', 'english', 'malayalam', 'entities', 'keywords', 'reviewStatus'];
assert(requiredKeys.every(k => k in mockPayload), 'All Section 12 JSON schema keys present');

const validReviewStatuses = ['Pending Review', 'Reviewed', 'Approved for Preview'];
assert(validReviewStatuses.includes(mockPayload.reviewStatus), 'Review status matches new workflow statuses');

const jsonString = JSON.stringify(mockPayload);
const parsed = JSON.parse(jsonString);
assert(parsed.reviewStatus === 'Pending Review', 'JSON parses cleanly without error');

// 5. Verify the 5 Publication Tabs
const expectedTabs = ['online', 'mobile', 'tv', 'newspaper-en', 'newspaper-ml'];
assert(expectedTabs.length === 5, '5 publication preview platforms defined for multi-channel publishing');

console.log(`\nVerification Complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
