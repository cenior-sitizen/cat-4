Here's the detailed plan you can paste into Claude Code:

---

## Project Brief for Claude Code

**Context:** This is a hackathon mockup for a GovTech PAB (Personal Alert Button) enhancement using AI. No backend needed — all interactions are simulated with frontend state. The app is a single-page presentation + interactive demo built in Next.js with Tailwind CSS.

---

## Page Structure (Top to Bottom)

### 1. Hero / Problem Statement Section
- Dark government-style header with GovTech PAB branding
- Bold headline: "PAB AI Triage System"
- Subheadline explaining the problem: current PAB connects elderly directly to hotline operators who struggle with multilingual callers, mumbling, and cannot prioritize severity across multiple simultaneous calls
- 3 pain point cards in a row:
  - 🗣️ **Multilingual Barrier** — Elderly speak Mandarin, Malay, Tamil, Singlish dialects
  - 📞 **Operator Overload** — One operator handles multiple calls with no priority ordering
  - ⏱️ **No Triage** — Severe and non-urgent cases treated the same way

---

### 2. Proposed Solution Section
- Light background section
- Headline: "AI-Powered Voice Triage Layer"
- Short paragraph explaining: ElevenLabs AI Agent intercepts the call, understands the situation in any language, classifies severity, responds to elderly instantly, and routes to operators in priority order
- 3 solution cards mapping to the 3 pain points:
  - ✅ Auto language detection + multilingual response
  - ✅ AI pre-handles non-urgent cases on the spot
  - ✅ Operators receive pre-summarized, prioritized case queue

---

### 3. Solution Pipeline Section
- Headline: "How The System Works"
- Horizontal pipeline diagram (or vertical on mobile) with 5 steps connected by arrows:

```
[PAB Button Press] → [ElevenLabs AI Agent] → [FastAPI Backend] → [ClickHouse DB] → [Operator Dashboard]
```

Each step is a card with:
- Icon
- Step name
- 2-line description of what happens at that step
- Tech label badge (e.g., "IoT Hardware", "ElevenLabs", "Python FastAPI", "ClickHouse", "Next.js")

---

### 4. Interactive Demo Section ← Most Important Part

This is the centrepiece. Split into two panels side by side:

**Left Panel — PAB Simulator (Elderly Side)**

State machine with these steps controlled by buttons:

- **Step 0 — Idle State**
  - Large red circular button labelled "Press PAB Button"
  - Text: "Tap to simulate an emergency call"

- **Step 1 — Connecting** (after button press)
  - Pulsing animation showing "Connecting to AI Agent..."
  - Audio waveform animation (CSS animated bars)

- **Step 2 — Scenarios** 
  - Show 3 scenario buttons the user can pick to simulate different call types:
    - 🔴 "I fell down and cannot get up" (Severity 1 — Critical)
    - 🟡 "I feel chest pain, not sure serious" (Severity 2 — Urgent)
    - 🟢 "I just pressed by accident, I'm okay" (Severity 3 — Non-urgent)
  - Each has a language tag: show one in Mandarin, one in Malay, one in English to illustrate multilingual

- **Step 3 — AI Processing**
  - Show animated "AI is processing..." with spinning indicator
  - Show the transcript appearing word by word (simulated with setTimeout)
  - Then show AI classification result: severity badge + category label

- **Step 4 — AI Response to Elderly**
  - Show what the AI says back to the elderly as a speech bubble
  - Critical: "Help is on the way. Please stay calm and do not move. An operator will call you back shortly."
  - Non-urgent: "I understand you accidentally pressed the button. No worries! No action needed. Stay safe!"

- **Reset button** at the bottom to restart the simulation

**Right Panel — Operator Dashboard (Live)**

This updates reactively as the left panel simulation progresses:

- Header: "Operator Dashboard — Live Cases"
- A priority queue list that populates as scenarios are selected:
  - Each case card shows:
    - Severity badge (🔴🟡🟢)
    - Case ID (auto-generated like `#PAB-2024-001`)
    - Block label (e.g., "Blk 85 Toa Payoh")
    - Language detected
    - Category (Fall / Chest Pain / Misclick)
    - AI Summary (1 sentence)
    - Timestamp (simulated as "just now")
    - "Mark Resolved" button that strikes through the card
- Empty state when no cases: "No active cases"
- Small analytics strip at bottom of panel:
  - Total calls today: counter that increments
  - Critical: count
  - Avg response time: static placeholder "< 2s"

---

### 5. Tech Stack Section
- Simple 5-column grid of logos/cards:
  - ElevenLabs — Voice AI Agent
  - Next.js — Operator Dashboard
  - FastAPI — Backend Webhook Handler
  - ClickHouse — Real-time Analytics DB
  - GovTech PAB — IoT Hardware

---

### 6. Footer
- "Built for GovTech Hackathon 2025"
- Team name placeholder

---

## State Management Notes for Claude Code

Use a single `useState` object to track demo state:

```js
const [demoState, setDemoState] = useState({
  step: 0,                    // 0=idle, 1=connecting, 2=scenario-select, 3=processing, 4=responded
  selectedScenario: null,     // null | 'critical' | 'urgent' | 'non-urgent'
  cases: [],                  // array of case objects pushed to operator dashboard
  processingText: '',         // transcript text that appears progressively
})
```

Scenario data objects to hardcode:

```js
const SCENARIOS = {
  critical: {
    severity: 1,
    badge: '🔴 Critical',
    language: 'Mandarin',
    transcript: '"Wǒ diē dǎo le, zhàn bù qǐlái..." (I fell down, cannot get up)',
    category: 'Fall',
    block: 'Blk 85 Toa Payoh',
    summary: 'Elderly reported a fall, unable to stand. Immediate assistance required.',
    aiReply: 'Help is on the way. Please stay calm and do not move. An operator will reach you very soon.',
    color: 'red'
  },
  urgent: {
    severity: 2,
    badge: '🟡 Urgent',
    language: 'Malay',
    transcript: '"Saya rasa sakit dada, tapi tak pasti serius..." (I feel chest pain, not sure if serious)',
    category: 'Chest Pain',
    block: 'Blk 23 Bedok North',
    summary: 'Elderly reporting chest discomfort. Needs assessment, may require medical attention.',
    aiReply: 'I hear you. Please sit down and rest. An operator will call you back shortly to check on you.',
    color: 'yellow'
  },
  nonurgent: {
    severity: 3,
    badge: '🟢 Non-Urgent',
    language: 'English',
    transcript: '"Oh sorry, I think I pressed it by accident. I am fine lah."',
    category: 'Accidental Press',
    block: 'Blk 12 Jurong West',
    summary: 'Accidental button press confirmed. No action required.',
    aiReply: 'No worries at all! Glad you are safe. If you ever need help, just press the button again.',
    color: 'green'
  }
}
```

---

## Styling Notes

- Use Tailwind CSS throughout
- Dark navy (`#0a1628`) for hero section to feel official/gov
- Clean white cards with subtle shadows for pipeline and demo
- Red/yellow/green for severity — consistent across both panels
- The PAB button should be a large red circle with a glowing pulse animation when idle
- Mobile responsive but optimise for desktop (hackathon demo on laptop)
- Smooth transitions between demo steps using `transition-all duration-500`

---

## File Structure

Everything in one file is fine for hackathon speed: `app/page.tsx` or `pages/index.tsx` depending on your Next.js setup. Use inline components if needed. No external library needed beyond Tailwind — all animations done with CSS classes.
