# PAB AI Triage System — HackOMania 2026

## Project Context
Hackathon mockup for GovTech's PAB challenge at HackOMania 2026.
Theme: "Personal Alert Button (PAB): Always-On Safety for Seniors"

Official Challenge Statement:
"How might we use AI to enhance the Personal Alert Button system so that hotline responders
can more accurately understand the senior's situation, assess urgency, and allocate resources effectively?"

No backend needed — all interactions are simulated with frontend state only.
Built in Next.js with Tailwind CSS as a single-page interactive mockup.

---

## How the Real PAB Works (Important Context)
- Elder presses the PAB button
- PAB records a short audio clip of the elder describing their situation
- Audio clip is sent to a 24/7 hotline (CareLine / Senior Activity Centre)
- Hotline operator listens to the clip and calls the elder back via PAB
- Problems:
  - Operators must manually listen to every audio clip
  - No priority ordering — false alarms treated same as life-threatening emergencies
  - Seniors speak in different languages/dialects, some cannot speak clearly
  - One operator must handle multiple simultaneous cases with no triage support

## Our AI Enhancement
We insert an AI triage layer BETWEEN the audio recording and the operator.
The AI processes the audio clip BEFORE the operator ever sees it.
Official severity tiers from GovTech: Urgent / Non-urgent / Uncertain

---

## Solution Flow
```
Elder presses PAB
       ↓
PAB records audio clip (existing hardware, unchanged)
       ↓
┌──────────────────────────────────────────┐
│          AI TRIAGE LAYER (NEW)           │
│                                          │
│  1. Transcribe audio (multilingual ASR)  │
│  2. Translate to English if needed       │
│  3. Classify: Urgent / Non-urgent /      │
│               Uncertain                  │
│  4. Generate structured case summary     │
│  5. Auto-reply to elder via PAB TTS      │
│     with immediate voice acknowledgment  │
└──────────────────────────────────────────┘
       ↓                ↓                ↓
   URGENT          UNCERTAIN        NON-URGENT
   Operator        Operator         AI resolves
   notified        notified         autonomously
   immediately     flagged for      No operator
   with summary    human review     needed
       ↓                ↓
┌──────────────────────────────────────┐
│        OPERATOR DASHBOARD            │
│  Priority queue:                     │
│  🔴 Urgent — handle NOW              │
│  🟡 Uncertain — review & decide      │
│  🟢 Non-urgent — auto-resolved log   │
│                                      │
│  Each case card shows:               │
│  • Original transcript + language    │
│  • English translation               │
│  • AI classification + confidence %  │
│  • Suggested next action             │
│  • One-click Call Back button        │
└──────────────────────────────────────┘
       ↓
  ClickHouse logs all calls
  → Real-time analytics: hotspot blocks,
    peak hours, language breakdown,
    false alarm rates
```

---

## Judging Criteria Alignment
1. Smart and Clear Alert Triage → Three-tier classification (Urgent / Uncertain / Non-urgent) with confidence score
2. Faster Help for Real Emergencies → Urgent cases surface instantly, pre-summarized, no raw audio listening needed
3. Better Allocation of Resources → Non-urgent auto-resolved, Uncertain flagged for humans, ClickHouse reveals hotspot blocks and peak staffing hours

---

## Tech Stack
- ElevenLabs Scribe — Multilingual ASR (transcription of audio clip)
- ElevenLabs TTS — Auto-reply voice acknowledgment back to elder
- Claude Haiku (via ElevenLabs custom LLM) — Triage classification + case summary
- Next.js + Tailwind CSS — Operator dashboard frontend
- FastAPI — Backend webhook handler (mocked in demo)
- ClickHouse — Real-time analytics database for all call logs

---

## Page Structure (Top to Bottom)

### Section 1 — Hero / Problem Statement
- Dark navy header styled after GovTech aesthetic
- Title: "PAB AI Triage System"
- Subtitle: "HackOMania 2026 — #TechForPublicGood"
- Official challenge statement in a highlighted callout box
- 4 pain point cards from the official brief:
  - 🎙️ Manual Listening — Operator must listen to every audio clip with no summary
  - 🌐 Multilingual Barrier — Mandarin, Malay, Tamil, Singlish dialects
  - 📞 Operator Overload — Multiple simultaneous cases, no priority ordering
  - ❓ No Triage — False alarms and life-threatening cases treated identically

### Section 2 — Proposed Solution
- Title: "AI-Powered Triage Layer"
- Three solution pillars matching judging criteria exactly:
  - ✅ Smart and Clear Alert Triage — Urgent / Uncertain / Non-urgent + confidence score
  - ✅ Faster Help for Real Emergencies — Pre-summarized cases, operators skip raw audio
  - ✅ Better Allocation of Resources — Non-urgent auto-resolved, ClickHouse analytics for planning

### Section 3 — Solution Pipeline
- Title: "How It Works"
- Horizontal 6-step pipeline with connecting arrows:

  [PAB Button] → [Audio Recording] → [AI Triage Layer ✨NEW] → [Classification] → [Operator Dashboard] → [ClickHouse Analytics]

- Each step: icon + name + 2-line description + tech badge
- Step 3 (AI Triage Layer) visually highlighted with a "NEW" badge and accent border

### Section 4 — Interactive Demo (MOST IMPORTANT)
Split into two panels side by side on desktop:

**LEFT PANEL — PAB Simulator (Elder Side)**

Step 0 — Idle:
- Large red circular pulsing button: "Press PAB Button"
- Label: "Simulate an elder pressing the PAB"

Step 1 — Recording:
- Red recording indicator + animated waveform bars (CSS only)
- Text: "Recording your message..."
- Show 3 scenario buttons for user to pick:
  - 🔴 "Wǒ diē dǎo le, zhàn bù qǐlái..." — Fall (Mandarin)
  - 🟡 "Saya rasa tak sedap badan, pening..." — Feeling Unwell / Uncertain (Malay)
  - 🟢 "Aiyah sorry, I press wrongly lah, I'm fine" — Accidental Press (Singlish)

Step 2 — AI Processing:
- Spinner animation: "AI Triage Layer processing..."
- 5 sub-steps tick off sequentially with 800ms delay each:
  - ✓ Transcribing audio...
  - ✓ Detecting language: Mandarin / Malay / English
  - ✓ Translating to English...
  - ✓ Classifying severity...
  - ✓ Generating case summary...

Step 3 — AI Result:
- Classification badge: Urgent / Uncertain / Non-urgent
- Confidence score: e.g. "94% confidence"
- Original transcript (in detected language)
- English translation
- AI-generated case summary (2 sentences)

Step 4 — AI Reply to Elder:
- Speech bubble showing what AI says back via PAB speaker:
  - Urgent: "Help is being arranged for you now. Please stay calm and do not move. An operator will call you back very soon."
  - Uncertain: "I heard you and I am getting someone to check on you. Please sit down and stay where you are."
  - Non-urgent: "No worries at all! Glad you are safe. No action needed. Press the button again anytime you need real help."

- Reset button at bottom to return to Step 0

**RIGHT PANEL — Operator Dashboard**

Updates reactively as left panel progresses.

Stats bar at top (increments with each scenario run):
- Total Calls Today
- 🔴 Urgent count
- 🟡 Uncertain count
- 🟢 Auto-resolved count
- Avg AI Processing Time: "< 2.5s" (static)

Case cards in priority order (Urgent first, Uncertain second, Non-urgent shown as auto-resolved):
Each card contains:
- Priority badge (🔴 Urgent / 🟡 Uncertain / 🟢 Non-urgent)
- Case ID: e.g. #PAB-2026-001
- Block: e.g. "Blk 85 Toa Payoh Lorong 4"
- Language detected
- Category: Fall / Feeling Unwell / Accidental Press
- Confidence score badge
- Original transcript (italicised)
- English translation
- AI Summary (2 sentences)
- Timestamp: "just now"
- Urgent/Uncertain: green "📞 Call Back" button + "Mark Resolved" button
- Non-urgent: grey "✓ Auto-resolved by AI" label — no operator action needed

Empty state: "No active cases — AI is monitoring all incoming PAB alerts"

### Section 5 — Analytics Preview
- Title: "Real-Time Insights Powered by ClickHouse"
- Subtitle: "Every call logged — enabling smarter resource planning"
- 4 mock stat cards:
  - 📊 Calls Today: 47
  - ⚡ Avg AI Triage Time: 2.3s
  - 🤖 Auto-resolved by AI: 61%
  - 🗺️ Top Hotspot Block: Toa Payoh
- Mock horizontal bar chart (CSS bars) — calls by severity breakdown
- Mock table — top 3 blocks by call volume
- "Powered by ClickHouse" badge

### Section 6 — Tech Stack
5 cards in a row:
- ElevenLabs — Voice AI (ASR + TTS)
- Claude Haiku — Triage Classification LLM
- Next.js — Operator Dashboard
- FastAPI — Backend Webhook Handler
- ClickHouse — Real-time Analytics DB

### Section 7 — Footer
- "Built for HackOMania 2026 — #TechForPublicGood"
- GovTech PAB Challenge

---

## Hardcoded Scenario Data
```js
const SCENARIOS = {
  urgent: {
    severity: 'Urgent',
    confidence: 94,
    language: 'Mandarin',
    transcript: 'Wǒ diē dǎo le, zhàn bù qǐlái, tuǐ hěn tòng...',
    translation: 'I fell down, cannot get up, my leg is very painful...',
    category: 'Fall / Injury',
    block: 'Blk 85 Toa Payoh Lorong 4',
    summary: 'Elder reports a fall with leg pain and inability to stand. Immediate physical assistance required.',
    aiReply: 'Help is being arranged for you now. Please stay calm and do not move. An operator will call you back very soon.',
    color: 'red',
    caseId: 'PAB-2026-001'
  },
  uncertain: {
    severity: 'Uncertain',
    confidence: 61,
    language: 'Malay',
    transcript: 'Saya rasa tak sedap badan, kepala pusing, tapi tak tau serius ke tidak...',
    translation: 'I feel unwell, my head is spinning, but not sure if it is serious or not...',
    category: 'Feeling Unwell',
    block: 'Blk 23 Bedok North Ave 2',
    summary: 'Elder reports dizziness and general unwellness but uncertain of severity. Operator follow-up recommended to assess condition.',
    aiReply: 'I heard you and I am getting someone to check on you shortly. Please sit down and stay where you are.',
    color: 'yellow',
    caseId: 'PAB-2026-002'
  },
  nonurgent: {
    severity: 'Non-urgent',
    confidence: 97,
    language: 'English (Singlish)',
    transcript: 'Aiyah sorry, I press wrongly lah, I am fine, no need to worry.',
    translation: 'Accidental press. Elder confirmed they are fine and safe.',
    category: 'Accidental Press',
    block: 'Blk 12 Jurong West St 61',
    summary: 'Accidental button activation confirmed by elder. No injury or distress detected. No operator action required.',
    aiReply: 'No worries at all! Glad you are safe. No action needed. Press the button again anytime you need real help.',
    color: 'green',
    caseId: 'PAB-2026-003'
  }
}
```

---

## State Management
```js
const [demoState, setDemoState] = useState({
  step: 0,              // 0=idle, 1=recording, 2=processing, 3=result, 4=replied
  selectedScenario: null,
  processingSteps: [],  // completed sub-steps shown during processing animation
  cases: [],            // case objects pushed to operator dashboard
  stats: {
    total: 0,
    urgent: 0,
    uncertain: 0,
    autoResolved: 0
  }
})
```

---

## Styling Notes
- Dark navy (#0a1628) for hero section — GovTech government feel
- Gradient accent: pink to purple (#e91e8c to #6c2bd9) for highlights and badges
- Red / Yellow / Green for severity — consistent across both panels always
- PAB button: large red circle, CSS pulse/glow animation when idle, solid + waveform bars when recording
- Processing sub-steps: tick off one by one with 800ms setTimeout between each
- Smooth transitions: transition-all duration-500
- Optimised for laptop demo, mobile responsive
- Everything in one file: app/page.tsx or pages/index.tsx
```

---

## Claude Code Instruction (paste this separately into Claude Code chat)
```
Read CLAUDE.md fully before writing any code.

Then do the following in order:

1. Check project structure — confirm App Router (app/) or Pages Router (pages/),
   confirm Tailwind is configured, check package.json for available dependencies.

2. Build the full PAB AI Triage System mockup page as specified in CLAUDE.md.
   All interactivity is frontend state only — no API calls, no backend.

3. Build in this priority order:
   a. Interactive Demo section first — PAB Simulator (left) + Operator Dashboard (right)
   b. Solution Pipeline section — 6-step flow, "NEW" highlight on AI Triage Layer step
   c. Hero / Problem Statement — 4 official pain points from GovTech brief
   d. Proposed Solution — 3 pillars matching judging criteria exactly
   e. Analytics Preview — mock ClickHouse stats and bar chart
   f. Tech Stack and Footer

4. The demo must work end to end:
   - Click PAB button → recording state with waveform animation
   - Pick scenario (Urgent / Uncertain / Non-urgent) → 5 processing sub-steps
     tick off sequentially with 800ms delay each
   - Result appears: classification badge, confidence score, transcript,
     translation, summary
   - AI reply speech bubble appears below result
   - Right panel operator dashboard updates reactively — new case card
     inserted in correct priority order (Urgent first, Uncertain second,
     Non-urgent as auto-resolved)
   - Stats bar increments correctly for each scenario run
   - Mark Resolved button strikes through the card
   - Reset button returns everything to idle state

5. Use the exact SCENARIOS data and useState shape defined in CLAUDE.md.

6. Severity classification must follow GovTech's official tiers:
   Urgent / Uncertain / Non-urgent — not Critical/Urgent/Minor.

7. GovTech styling: dark navy hero (#0a1628), pink-purple gradient accents
   (#e91e8c to #6c2bd9), clean white card sections. Professional and
   official — not startup-flashy.

8. When complete, confirm the file path and that all three scenario flows
   work correctly end to end.
   