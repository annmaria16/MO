# NewsBridge AI

> **A smarter bridge from newsroom to reader.**

*Newsroom workflow concept for Malayala Manorama / Manorama Online — Software Engineer Intern Technical Assessment.*

---

## 1. Executive Summary

**NewsBridge AI** is a specialized, responsive digital newsroom assistant concept engineered for **Malayala Manorama / Manorama Online**. It addresses the daily multilingual editorial workflow challenges of regional journalism: rapidly detecting, translating, editing, summarizing, and packaging news content between **Malayalam** and **English** for multi-channel digital publishing.

The interface simulates an editorial desk where journalists can process incoming field reports or wire copy, instantly obtain validated headlines within strict broadcast/print character constraints, preview how the story looks across four distinct publishing formats (Web, TV Broadcast, Print Newspaper, and Mobile App), monitor a live breaking news ticker, and export standards-compliant structured JSON payloads ready for downstream CMS integration.

---

## 2. Key Features

1. **Source-Language Detection & Routing**
   - Heuristic Unicode script analysis and automatic detection between Malayalam (`\u0D00-\u0D7F`) and English.
   - Manual override options (`Auto Detect`, `Malayalam`, `English`).

2. **Bilingual Editorial Processing**
   - Bidirectional translation between Malayalam and English.
   - High-impact headline generation tailored for digital news portals and broadcast lower-thirds.
   - Concise journalistic lead summaries capturing core facts (who, what, where, when, why).
   - Full editable translated body copy.

3. **Active Character Limit Enforcement**
   - Configurable headline character limits (`40`, `50`, `60`, `70`, `80`, `100` characters).
   - Real-time character count indicators with visual warnings and remaining budget.
   - Non-destructive validation: headlines are never silently truncated, empowering journalists to make editorial refinements.

4. **Multi-Channel Digital Publication Previews**
   - **🌐 Online News Website Preview:** Authentic Manorama Online layout featuring section tags, breaking headline ticker, editorial photo banner, timestamp, byline, summary callout, and read actions.
   - **📺 TV Bulletin Preview:** Broadcast control room monitor with live bug (`LIVE ●`), studio backdrop, `TOP 5 NEWS` bulletin side widget, and lower-third breaking news banner.
   - **📰 Print Newspaper Preview:** Traditional Malayala Manorama daily broadsheet layout with print texture, masthead, edition metadata, multi-column justified typography, and archival photo framing.
   - **📱 Mobile App View:** Smartphone viewport mockup simulating the Manorama Online mobile reader experience.

5. **Live Scrolling Breaking News Ticker**
   - Continuous marquee ticker displaying the active headline.
   - Direct Malayalam (`മലയാളം`) and English (`English`) language toggle.
   - Interactive play/pause toggle (`⏸` / `▶`) for editorial review.
   - Immediate reactive updates whenever the headline is edited.

6. **Named Entity Recognition (NER) & Keyword Extraction**
   - Categorized extraction of **People**, **Places**, and **Organisations**.
   - Important topical tags/keywords (`#Rain`, `#Kerala`, `#IMD`, `#WaterMetro`).

7. **Standardized JSON Publishing Export**
   - Formatted JSON output strictly conforming to the assessment schema specification.
   - One-click **Copy JSON** with visual confirmation.
   - **Download JSON** payload file (`newsbridge-publish-<timestamp>.json`).
   - Editorial workflow review status selector (`pending`, `approved`, `rejected`) that synchronizes immediately with the JSON output.

8. **Deterministic Demo Mode & Secure Gemini AI Integration**
   - Zero-dependency **Demo Mode** enabled out of the box with realistic Malayalam and English newsroom samples.
   - Optional, client-safe Google Gemini API integration (stored strictly in memory/sessionStorage; zero secrets in Git or client bundles).

---

## 3. Technology Stack

- **Framework:** [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite 5](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) with custom Manorama editorial color palette and typography
- **Typography:** Google Fonts preloaded with *Inter*, *Anek Malayalam*, *Noto Sans Malayalam*, *Merriweather*, and *Playfair Display*
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** Node.js automated ESM test suite (`src/tests/verify.mjs`)

---

## 4. Architecture & Component Structure

```
c:/Users/HP/Documents/online/
├── public/
│   └── favicon.svg               # Brand newsroom vector icon
├── src/
│   ├── components/
│   │   ├── Header.tsx            # NewsBridge AI brand identity & status indicators
│   │   ├── ArticleInput.tsx      # News input textarea, language switcher & sample loaders
│   │   ├── BilingualResults.tsx  # Side-by-side editable cards with character validation
│   │   ├── KeyInformation.tsx    # Entities (People, Places, Orgs) and keyword tags
│   │   ├── NewsTicker.tsx        # Smooth marquee ticker with play/pause and language switch
│   │   ├── PublicationPreview.tsx# 4-in-1 format preview (Web, TV Bulletin, Print, Mobile)
│   │   ├── PreviewGallery.tsx    # Bottom 4-format interactive selection gallery
│   │   ├── JsonExport.tsx        # Standardized publishing payload viewer, copy & download
│   │   └── SettingsModal.tsx     # Session-based Gemini AI key config & character limit defaults
│   ├── data/
│   │   └── sampleArticles.ts     # Curated Malayalam & English newsroom demonstration copy
│   ├── services/
│   │   └── aiService.ts          # Core service functions: detection, translation, NER & Gemini connector
│   ├── tests/
│   │   └── verify.mjs            # Automated verification test suite
│   ├── types/
│   │   └── index.ts              # Strict TypeScript interfaces and schemas
│   ├── App.tsx                   # Central newsroom workspace orchestrator
│   ├── index.css                 # Tailwind directives, animations & Malayalam font rules
│   └── main.tsx                  # Application bootstrap entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 5. Getting Started & Local Installation

### Prerequisites
- Node.js (version 18.0.0 or higher; tested on Node v24.16.0)
- npm or pnpm

### Installation Steps

1. **Clone or navigate to the repository:**
   ```bash
   cd c:/Users/HP/Documents/online
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Run the automated test suite:**
   ```bash
   npm test
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready bundle will be compiled to `dist/`.

---

## 6. AI Processing & Demo Mode Architecture

### Out-of-the-Box Demo Mode (Zero Credentials Required)
To ensure the application is immediately testable and 100% reliable during intern assessment demonstrations without requiring external cloud accounts or billing:
- **Heuristic Language Detection:** Analyzes the proportion of Unicode Malayalam script characters (`[\u0D00-\u0D7F]`) relative to non-whitespace tokens.
- **Curated High-Fidelity Samples:** Includes realistic Kerala news stories (e.g., IMD Monsoon Yellow Alert, Kochi Water Metro Expansion, ISRO Gaganyaan Safety Test) with meticulously reviewed journalistic Malayalam and English copy.
- **Local Fallback Heuristics:** For custom journalist input entered during demo mode, deterministic rule-based sentence segmentation and regional entity/keyword extractors operate locally. Demo outputs are transparently labeled with `Demo Mode` badges so assessors know precisely what is running.

### Optional Live Gemini AI Integration
If live neural translation and generative capabilities are desired:
1. Click the **Settings** gear icon in the header.
2. Enter a valid Google Gemini API key (e.g. from Google AI Studio).
3. The key is stored **exclusively in temporary browser session memory (`sessionStorage`)** and is never written to disk, sent to external servers, or committed to Git.
4. When configured, NewsBridge AI leverages Google's `gemini-1.5-flash` model with temperature 0.2 to preserve factual accuracy, dates, named entities, and numbers without hallucination.

---

## 7. Structured JSON Publishing Schema (Section 12 Compliance)

The application outputs valid, structured JSON formatted according to the assessment specification:

```json
{
  "sourceLanguage": "malayalam",
  "translatedLanguage": "english",
  "english": {
    "headline": "Heavy Rain Likely in Kerala Soon: Yellow Alert Issued",
    "summary": "The India Meteorological Department (IMD) has issued a yellow alert across multiple districts of Kerala anticipating heavy rainfall.",
    "article": "Heavy rainfall accompanied by thunderstorms is very likely to lash Kerala over the next four days..."
  },
  "malayalam": {
    "headline": "സംസ്ഥാനത്ത് ശക്തമായ മഴയ്ക്ക് സാധ്യത",
    "summary": "കാലാവസ്ഥാ വകുപ്പ് വിവിധ ജില്ലകളിൽ യെല്ലോ അലർട്ട് പ്രഖ്യാപിച്ചു. മലയോര, തീരദേശ മേഖലകളിൽ ജാഗ്രതാ നിർദ്ദേശം നൽകി.",
    "article": "സംസ്ഥാനത്ത് വരും ദിവസങ്ങളിൽ ശക്തമായ മഴയ്ക്ക് സാധ്യതയെന്ന് കാലാവസ്ഥാ വകുപ്പ് അറിയിച്ചു..."
  },
  "entities": {
    "people": [
      "K. Santhosh (IMD Director)",
      "Pinarayi Vijayan (Chief Minister)"
    ],
    "places": [
      "Kerala",
      "Idukki",
      "Wayanad",
      "Kozhikode",
      "Pathanamthitta",
      "Arabian Sea"
    ],
    "organisations": [
      "IMD (India Meteorological Department)",
      "SDMA (State Disaster Management Authority)"
    ]
  },
  "keywords": [
    "Rain",
    "Kerala",
    "Yellow Alert",
    "Weather",
    "Monsoon",
    "IMD"
  ],
  "reviewStatus": "pending"
}
```

---

## 8. Assumptions & Design Decisions

1. **Brand Context:** The user interface adheres strictly to the brand identity instructions: red, charcoal, and white color scheme; the exact tagline *"A smarter bridge from newsroom to reader."*; contextual label *"Newsroom workflow concept for Manorama Online"*; and no competitor branding or unsupported claims.
2. **Reactivity:** Any edit made to the Malayalam or English headlines immediately updates the publication preview, the live news ticker, character counters, and the generated JSON payload.
3. **No Heavy Backend Needed:** To keep the assessment self-contained, light, and easy to run on any machine without database or Docker dependencies, state management and business logic are cleanly organized inside React and modular TypeScript service layers.

---

## 9. Known Limitations & Future Roadmap

- **Audio/Speech Synthesis:** Future iterations could incorporate Malayalam text-to-speech (TTS) for automated voiceover generation in TV bulletin clips.
- **CMS Direct Webhook:** Adding direct REST API or GraphQL integration to push approved JSON payloads straight into Manorama Online's editorial CMS.
- **Dialect & Stylebook Checking:** Integrating custom Malayala Manorama orthography rules and stylebook guidelines for standardizing Malayalam spelling and terminology across regional bureaux.

---

## 10. License & Assessment Attribution

Created as a technical assessment submission for the Software Engineer Intern role at Malayala Manorama / Manorama Online.
All trademarks and brand names belong to their respective holders and are referenced strictly for academic and assessment concept demonstration purposes.
