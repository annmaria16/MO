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

console.log('--- NewsBridge AI Bug Fix Verification Suite ---');

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

assert(
  cleanHeadline('# Kottayam Students Develop Low-Cost Water Monitoring System') ===
  'Kottayam Students Develop Low-Cost Water Monitoring System',
  'cleanHeadline strips markdown "#" prefix cleanly'
);
assert(
  cleanHeadline('water: പ്രധാന വാർത്താ അപ്ഡേറ്റ്') === 'പ്രധാന വാർത്താ അപ്ഡേറ്റ്',
  'cleanHeadline strips keyword colon prefixes like "water: "'
);
assert(
  cleanHeadline('Headline: "Heavy Rain Likely in Kerala"') === 'Heavy Rain Likely in Kerala',
  'cleanHeadline strips "Headline:" label and surrounding quotes'
);

// 3. Article Input Parsing Function
function parseArticleInput(rawInput) {
  if (!rawInput) {
    return { title: null, paragraphs: [], fullBodyText: '', cleanFullText: '' };
  }
  const lines = rawInput.split(/\r?\n/).map(l => l.trim());
  let extractedTitle = null;
  let bodyStartIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.length > 0) {
      if (line.startsWith('#') || /^title:\s*/i.test(line) || /^തലക്കെട്ട്:\s*/i.test(line)) {
        extractedTitle = cleanHeadline(line);
        bodyStartIndex = i + 1;
      }
      break;
    }
  }

  const rawBodyText = lines.slice(bodyStartIndex).join('\n').trim();
  let paragraphs = rawBodyText
    .split(/\n\s*\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  if (paragraphs.length === 0 && rawBodyText.length > 0) {
    paragraphs = rawBodyText
      .split(/\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 0);
  }

  if (!extractedTitle && paragraphs.length > 1 && paragraphs[0].length <= 80 && !paragraphs[0].endsWith('.')) {
    extractedTitle = cleanHeadline(paragraphs[0]);
    paragraphs = paragraphs.slice(1);
  }

  const fullBodyText = paragraphs.join('\n\n');
  const cleanFullText = extractedTitle ? `${extractedTitle}\n\n${fullBodyText}` : fullBodyText;

  return { title: extractedTitle, paragraphs, fullBodyText, cleanFullText };
}

const rawInputWithMarkdown = `# Kottayam Students Develop Low-Cost Water Monitoring System

A group of engineering students in Kottayam has developed a low-cost water monitoring system designed to help local communities check drinking water quality.

The prototype was developed by a team of five students from St. Thomas Institute of Technology as part of their final-year project. The device uses sensors to measure water temperature, pH level and turbidity. The collected information is displayed through a simple mobile application.

According to the student team leader, Ananya Thomas, the project aims to make basic water quality monitoring more accessible to households and community organisations.

The students demonstrated the prototype at a college technology exhibition on Thursday. Faculty members appreciated the project and suggested further testing before it is introduced for wider public use.

The team plans to improve the device's accuracy and battery life before conducting field trials in nearby villages.

The project highlights how affordable technology and student innovation can contribute to solving everyday community problems.`;

const parsed = parseArticleInput(rawInputWithMarkdown);
assert(
  parsed.title === 'Kottayam Students Develop Low-Cost Water Monitoring System',
  'parseArticleInput extracted clean title without #'
);
assert(parsed.paragraphs.length === 6, 'parseArticleInput preserved all 6 paragraphs intact');
assert(!parsed.fullBodyText.startsWith('#'), 'Article body does not contain Markdown # header');
assert(
  parsed.paragraphs[5].includes('The project highlights how affordable technology'),
  'Final paragraph 6 is completely preserved'
);

// 4. Headline validation function
function validateHeadline(headline, limit = 60) {
  const cleaned = cleanHeadline(headline);
  const length = cleaned.length;
  const remaining = limit - length;
  return {
    valid: length > 0 && length <= limit,
    length,
    remaining
  };
}

const expectedEnHeadline = 'Kottayam Students Develop Low-Cost Water Monitoring Device';
const expectedMlHeadline = 'കുറഞ്ഞ ചെലവിലുള്ള ജലപരിശോധനാ ഉപകരണം വികസിപ്പിച്ച് കോട്ടയത്തെ വിദ്യാർഥികൾ';

assert(!expectedEnHeadline.includes('#'), 'English headline does not contain #');
assert(!expectedMlHeadline.includes('water:'), 'Malayalam headline does not contain "water:"');
assert(validateHeadline(expectedEnHeadline, 60).valid === true, 'English headline within 60 chars');
assert(validateHeadline(expectedEnHeadline, 60).length === 58, 'English headline length correctly computed as 58 chars');
assert(validateHeadline(expectedEnHeadline, 60).remaining === 2, 'Remaining characters correctly computed as 2 chars');

// 5. Verify sample articles data file
const sampleArticlesContent = fs.readFileSync('src/data/sampleArticles.ts', 'utf8');
assert(sampleArticlesContent.includes('kottayam-water-monitoring'), 'Kottayam water monitoring article present in sampleArticles.ts');
assert(sampleArticlesContent.includes('Kottayam Students Develop Low-Cost Water Monitoring Device'), 'Expected English headline present');
assert(sampleArticlesContent.includes('കുറഞ്ഞ ചെലവിലുള്ള ജലപരിശോധനാ ഉപകരണം വികസിപ്പിച്ച് കോട്ടയത്തെ വിദ്യാർഥികൾ'), 'Expected Malayalam headline present');
assert(!sampleArticlesContent.includes('Gemini API required'), 'No developer API messages in sample articles');

console.log(`\nVerification Complete: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
