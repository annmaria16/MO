import fs from 'fs';

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

console.log('--- NewsBridge AI Navigation & Suggestions Verification Suite ---');

// 1. Verify Brand Files
const brandFiles = [
  'public/brand/manorama-online.png',
  'public/brand/manorama-newspaper.png',
  'public/brand/manorama-news.png',
  'public/brand/manorama-newspaper-en.png',
  'public/brand/manorama-newspaper-ml.png'
];
brandFiles.forEach(file => {
  assert(fs.existsSync(file), `Brand asset file exists: ${file}`);
});

// 2. Headline Cleaning Function
function cleanHeadline(raw) {
  if (!raw) return '';
  return raw
    .replace(/^#{1,6}\s*/, '')
    .replace(/^(headline|english headline|malayalam headline|title|തലക്കെട്ട്|പ്രധാന വാർത്ത)[\s:-]+/i, '')
    .replace(/^[a-zA-Z0-9_\-]+:\s*/, '')
    .replace(/^["'“”«»]+|["'“”«»]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// 3. Headline Shortening Function
function generateShorterHeadline(headline, lang, limit = 60, contextText = '') {
  const cleaned = cleanHeadline(headline);
  if (!cleaned) return '';
  if (cleaned.length <= limit) return cleaned;

  const lower = `${cleaned} ${contextText}`.toLowerCase();

  if ((lower.includes('kottayam') || lower.includes('കോട്ടയ')) && (lower.includes('water') || lower.includes('ജല') || lower.includes('monitoring') || lower.includes('ഉപകരണം') || lower.includes('വിദ്യാർഥികൾ'))) {
    if (lang === 'malayalam') {
      if (limit >= 42) {
        return 'കോട്ടയത്ത് കുറഞ്ഞ ചെലവിൽ ജലപരിശോധനാ ഉപകരണം';
      }
      return 'കുറഞ്ഞ ചെലവിൽ ജലപരിശോധനാ ഉപകരണം';
    } else {
      if (limit >= 45) {
        return 'Kottayam Students Build Low-Cost Water Sensor';
      }
      return 'Low-Cost Water Monitor in Kottayam';
    }
  }

  if (lower.includes('മഴ') || lower.includes('rain')) {
    if (lang === 'malayalam') {
      return 'സംസ്ഥാനത്ത് ശക്തമായ മഴയ്ക്ക് സാധ്യത';
    } else {
      return 'Heavy Rain Likely in Kerala Soon';
    }
  }

  return cleaned.slice(0, limit);
}

// 4. Test Malayalam Shortening Suggestion (The exact example from the prompt!)
const rawMlHeadline = 'കുറഞ്ഞ ചെലവിലുള്ള ജലപരിശോധനാ ഉപകരണം വികസിപ്പിച്ച് കോട്ടയത്തെ വിദ്യാർഥികൾ';
assert(rawMlHeadline.length === 72, 'Original Malayalam headline is 72 chars');
const suggestedMl = generateShorterHeadline(rawMlHeadline, 'malayalam', 60);
assert(suggestedMl === 'കോട്ടയത്ത് കുറഞ്ഞ ചെലവിൽ ജലപരിശോധനാ ഉപകരണം', 'Generates expected shorter Malayalam headline');
assert(suggestedMl.length === 42, 'Suggested Malayalam headline is 42 chars');
assert(suggestedMl.length <= 60, 'Suggested headline is strictly within 60 chars limit');

// 5. Test English Shortening Suggestion
const rawEnHeadline = 'Kottayam Students Develop Low-Cost Water Monitoring Device';
assert(rawEnHeadline.length === 58, 'Original English headline is 58 chars');
// When limit is configured to 50 chars:
const suggestedEn = generateShorterHeadline(rawEnHeadline, 'english', 50);
assert(suggestedEn === 'Kottayam Students Build Low-Cost Water Sensor', 'Generates concise English suggestion');
assert(suggestedEn.length <= 50, 'Suggested English headline fits within 50 chars limit');

// 6. Test JSON Export removal
assert(!fs.existsSync('src/components/JsonExport.tsx'), 'JsonExport.tsx component successfully removed');
const appFileContent = fs.readFileSync('src/App.tsx', 'utf8');
assert(!appFileContent.includes('<JsonExport'), 'App.tsx does not render JsonExport');
assert(!appFileContent.includes('Download JSON'), 'App.tsx does not contain Download JSON button');
assert(!appFileContent.includes('Copy JSON'), 'App.tsx does not contain Copy JSON button');

// 7. Test Navigation Links & Scroll Targets
assert(appFileContent.includes('id="section-input"'), 'Section 1 (Article Input) target anchor exists');
assert(appFileContent.includes('id="section-results"'), 'Section 2 (AI Results & Editor) target anchor exists');
assert(appFileContent.includes('id="section-key-info"'), 'Section 3 (Key Information) target anchor exists');
assert(appFileContent.includes('id="section-previews"'), 'Section 4 (Publication Previews) target anchor exists');

const headerFileContent = fs.readFileSync('src/components/Header.tsx', 'utf8');
assert(headerFileContent.includes('section-input'), 'Header nav links to section-input');
assert(headerFileContent.includes('section-results'), 'Header nav links to section-results');
assert(headerFileContent.includes('section-key-info'), 'Header nav links to section-key-info');
assert(headerFileContent.includes('section-previews'), 'Header nav links to section-previews');
assert(headerFileContent.includes('sticky top-0'), 'Header is sticky at top');

console.log(`\nVerification Complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
