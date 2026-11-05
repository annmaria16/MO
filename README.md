# NewsBridge AI

> **A smarter bridge from newsroom to reader.**

*Newsroom workflow concept for Malayala Manorama / Manorama Online — Software Engineer Intern Technical Assessment.*

---

## 1. Executive Summary

**NewsBridge AI** is an editorial newsroom assistant concept engineered for **Malayala Manorama / Manorama Online**. Redesigned around a linear, intuitive editorial workflow, it eliminates cluttered multi-panel dashboards in favor of five clearly numbered sequential stages:

```
[1. INPUT ARTICLE] → [2. AI PROCESSING] → [3. REVIEW & EDIT] → [4. PUBLISHING PREVIEWS] → [5. JSON EXPORT]
```

A first-time user can immediately enter wire copy or reporter dispatches in English or Malayalam, inspect the bidirectional AI processing pipeline, review and edit headlines and summaries side-by-side with character limit constraints, preview how the story looks across **five realistic publication formats** using exact official Manorama logos, monitor a live breaking news ticker, and export standards-compliant publishing JSON.

---

## 2. Redesigned Workflow Stages

### Stage 1 — Enter Your News Article
- Clean, prominent headline and large article input textarea.
- Automatic script detection with manual override options (`Auto Detect`, `English`, `Malayalam`).
- Live word and character counting (`words • characters`).
- Quick-load buttons for curated demonstration articles:
  - **Sample English:** Kochi Water Metro fleet expansion.
  - **Sample Malayalam:** Kerala Monsoon yellow weather alert.
- Clear button and prominent **"Analyse & Translate Article"** action trigger.

### Stage 2 — AI Processing Engine
- Visual state transition during automated pipeline execution.
- Four distinct analysis milestones:
  1. Source Language Detection (`Malayalam` ↔ `English`)
  2. Bidirectional Machine Translation
  3. Constrained Headline & Summary Crafting
  4. Named Entity Recognition (NER) & Topical Keyword Indexing
- Transparent **Demo Mode** indicator clarifying that output is generated locally for demonstration purposes unless configured with live Gemini AI credentials.

### Stage 3 — Review & Edit Content (Side-by-Side Editorial Desk)
- **LEFT Column (English Content):**
  - Editable Headline with real-time character budget counter and limit validation.
  - Editable Lead Summary with character length tracking.
  - Editable Full Article body text.
  - One-click copy buttons for each field.
- **RIGHT Column (Malayalam Content):**
  - Editable Malayalam Headline with Unicode font rendering and character limit validation.
  - Editable Malayalam Lead Summary.
  - Editable Malayalam Full Article body.
  - One-click copy buttons for each field.
- **Review Status Lifecycle Selector:**
  - `Pending Review`
  - `Reviewed`
  - `Approved for Preview`
- **Immediate Reactivity:** Any edit made to either headline or article immediately updates all 5 publication previews, the news ticker, and the export JSON.

### Stage 4 — Preview Your News Across Publication Platforms
Five separate tabs displaying realistic multi-channel publication previews with exact supplied official assets:
1. **🌐 Online Website:** Uses `public/brand/manorama-online-banner.png` (from `manorama-online.png`), category navigation, breaking strip, hero image, timestamp byline, summary callout box, and social tools.
2. **📱 Mobile Website:** Uses `manorama-online.png` within an iPhone device frame with status bar, category header, responsive imagery, and quick-read navigation.
3. **📺 TV Bulletin:** Uses `public/brand/manorama-news.png` within a 16:9 news studio broadcast screen featuring a live bug (`LIVE ●`), broadcast clock, lower-third breaking news banner, and `TOP 5 BULLETINS` sidebar.
4. **📰 English Newspaper:** Uses the English masthead portion of `public/brand/manorama-newspaper.png` (`manorama-newspaper-en.png`), vintage broadsheet texture, traditional headline serif typography, drop cap, and print columns.
5. **📰 Malayalam Newspaper:** Uses the Malayalam masthead portion of `public/brand/manorama-newspaper.png` (`manorama-newspaper-ml.png`), Kerala edition styling, proper Malayalam typography, and newspaper columns.

### AI-Extracted Key Information (Secondary Section)
- Compact, non-distracting metadata index.
- Extracted **People**, **Places**, **Organisations**, and **Keywords & Tags**.

### Stage 5 — Export Publishing JSON
- Strict Section 12 JSON schema compliance with synchronized review status.
- One-click **Copy JSON** with confirmation toast.
- **Download JSON** payload file (`newsbridge-publish-<timestamp>.json`).
- Collapsible/expandable syntax preview.

### Live Scrolling News Ticker
- Continuous marquee ticker displaying the active edited headline.
- Language switcher (`മലയാളം` | `English`).
- Pause and resume controls (`⏸` / `▶`).
- Real-time updates as the journalist edits content.

---

## 3. Exact Official Brand Assets

All brand assets are preserved in their original pixel dimensions and aspect ratios inside `public/brand/`:

| Publication Platform | Asset File | Source |
| :--- | :--- | :--- |
| **Online Website Preview** | `public/brand/manorama-online-banner.png` | Cropped banner from supplied `manorama-online.png` |
| **Mobile Website Preview** | `public/brand/manorama-online-banner.png` | Cropped banner from supplied `manorama-online.png` |
| **TV Bulletin Preview** | `public/brand/manorama-news.png` | Supplied Manorama News broadcast channel logo |
| **English Newspaper Preview** | `public/brand/manorama-newspaper-en.png` | English masthead cropped from supplied `manorama-newspaper.png` |
| **Malayalam Newspaper Preview** | `public/brand/manorama-newspaper-ml.png` | Malayalam masthead cropped from supplied `manorama-newspaper.png` |

---

## 4. Technology Stack

- **Frontend:** React 18 with TypeScript
- **Tooling & Bundler:** Vite 5
- **Styling:** Tailwind CSS 3 (Newspaper white, editorial red, charcoal, slate)
- **Typography:** Google Fonts (`Inter`, `Anek Malayalam`, `Noto Sans Malayalam`, `Merriweather`, `Playfair Display`)
- **Icons:** Lucide React
- **Verification:** Automated Node.js ESM test suite (`src/tests/verify.mjs`)

---

## 5. Local Setup & Execution

### Prerequisites
- Node.js (v18.0.0 or higher; tested on Node v24.16.0)
- npm

### Instructions

1. **Navigate to the workspace:**
   ```bash
   cd c:/Users/HP/Documents/online
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your web browser.
4. **Execute verification test suite:**
   ```bash
   npm test
   ```
5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 6. Verification & Test Results

Run `npm test` to execute the automated verification suite:
- ✅ Exact brand asset files exist in `public/brand/`
- ✅ Malayalam script detection verified
- ✅ English text detection verified
- ✅ Empty text handling verified
- ✅ Headline within-limit validation verified
- ✅ Headline over-limit warning verified
- ✅ Section 12 JSON schema structure verified
- ✅ Review status options (`Pending Review`, `Reviewed`, `Approved for Preview`) verified
- ✅ JSON serialization and parsing verified
- ✅ All 5 publication preview platforms verified

---

## 7. Assessment Context

Built as a technical assessment submission for the Software Engineer Intern role at Malayala Manorama / Manorama Online.
NewsBridge AI remains a conceptual newsroom assistant tool and does not claim to be an officially released product of Malayala Manorama.
