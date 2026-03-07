# WattCoach — SP Group AI Energy Behaviour Change
## Product Requirements Document (PRD) v1

> Generated via all-plan (designer + Codex research + reviewer)
> Challenge: HackOMania 2026 — SP Group Track: "AI for Actionable Energy Behaviour Change"
> Date: 2026-03-07

---

## Executive Summary

**Product Name**: WattCoach

**Tagline**: "Your AI energy coach — turning half-hourly data into daily habits that help the grid."

**Core Pitch**: WattCoach is an explainable AI demand-response coach built on SP Group's half-hourly electricity data. It transforms raw interval data into a personalised, measurable behaviour-change loop — not a prettier dashboard, but a **next-best-action engine** that closes the loop from data to action to verified outcome.

**Why we win**: Every existing solution (OhmConnect, Sense, Nest, SP App) shows data. None of them closes the loop with explainable, verified behaviour change tied to grid-level impact. WattCoach does exactly that, in language a Senior Data Scientist in demand response will immediately recognise as credible.

---

## Problem Statement

The SP App already provides half-hourly electricity data. The gap is not data access — it is **data translation**:

| Pain Point | Current Reality | WattCoach Fix |
|---|---|---|
| Users see numbers, not meaning | 380.7 kWh/month for 4-room HDB with no context | Plain-language explanation of what drove usage |
| No actionable next step | "Here is your peak usage" with no guidance | "Run your washer after 11pm — saves S$8/month" |
| No verification of change | App shows historical data, not whether advice worked | Before/after baseline comparison per recommendation |
| No grid connection | Individual usage with no sense of collective impact | Grid Helper Score — how much peak stress did you relieve? |
| No habit formation | One-off tips with no tracking | Streaks, weekly missions, flexibility score over time |

**Judging criteria alignment**:
- Impact (30%): Demonstrated through before/after kWh reduction, CO2 avoided, S$ saved per household
- Relevance (15%): Built for Singapore HDB households, SP Group half-hourly data, real tariff figures
- Solution Complexity (20%): AI used intentionally — LLM for explanation + coaching only, deterministic analytics for signal extraction
- Product Execution (35%): Working end-to-end demo with real data flow, not a mock-up

---

## Singapore Context (Research-Backed)

### Household Energy Profile
- Average 4-room HDB: **380.7 kWh/month** (2024, MSE/EMA data)
- Average 5-room/executive HDB: **464.0 kWh/month**
- Electricity tariff: **S$0.2911/kWh** (Jan-Mar 2026, regulated)
- Grid emission factor: **0.402 kg CO2/kWh** (2024)
- Top energy users in a home: air-conditioner, refrigerator, water heater, washing machine, lighting (~80% of use)

### Savings Potential (Defensible Numbers)
| Behaviour Change | Monthly Saving | Annual Saving |
|---|---|---|
| 5% overall reduction (4-room HDB) | S$5.54 / 7.7 kg CO2 | S$66 |
| 10% overall reduction | S$11.08 / 15.3 kg CO2 | S$133 |
| Use fan instead of air-con | — | S$441/year (NEA) |
| Shift AC timing (pre-cool, auto-off 2am) | — | ~S$100-150/year (est.) |
| Shift laundry to off-peak (11pm-7am on TOU plan) | S$3-8/month | S$40-100/year |

### Motivation Signal
- **4 in 5 Singapore households** are motivated to save energy if they can see cost savings (NEA survey)
- SP Group's residential demand response pilot: **>50% of participants reduced usage by >20%** during activation events
- Smart meter rollout is near-nationwide — the data infrastructure exists

### Peak/Off-Peak Context
- SP Group's regulated tariff is **flat** (no TOU differential by default)
- Peak/off-peak matters through **retailer TOU plans** (e.g. Senoko: off-peak 11pm-7am; Geneco: off-peak 7pm-7am)
- Demo strategy: show value for both regulated (via grid stability contribution) and TOU plan users (via bill savings)

---

## Solution: WattCoach

### Core Philosophy
> Not a dashboard. A **next-best-action engine** with closed-loop verification.

### Three-Layer Architecture

```
Layer 1: Signal Extraction (Deterministic Analytics)
  Half-hourly intervals -> Baseline by weekday/hour -> Peak spike detection
  -> Recurring habit detection -> Shiftable load windows

Layer 2: AI Explanation & Coaching (Claude API)
  Structured insight objects -> Plain-language explanation
  -> Personalised recommendations -> Conversational Q&A

Layer 3: Behaviour Change Loop (Frontend)
  Before/after tracking -> Streak gamification
  -> Grid Helper Score -> Weekly missions -> Verified impact report
```

### Key Features (MVP for 24 Hours)

#### Feature 1: AI Energy Coach Chat
- User asks: "Why was my bill high last Tuesday?"
- WattCoach responds with interval-data-grounded explanation:
  - "Your AC ran for 4 hours from 8pm-12am on Tuesday, which accounts for 62% of that evening's spike."
- User asks: "What should I do tonight?"
- WattCoach responds with 3 ranked actions:
  1. "Pre-cool your home at 6pm for 30 min, then raise thermostat to 25°C — saves ~0.8 kWh tonight"
  2. "Schedule laundry after 11pm if you are on a TOU plan — saves S$1.20 this cycle"
  3. "Turn off standby devices before bed — saves ~0.15 kWh/night"
- Each recommendation includes: estimated kWh saved, S$ saved, CO2 avoided, confidence level

#### Feature 2: Peak-Shift Simulator (WOW DEMO MOMENT)
- Interactive half-hourly chart for "today"
- User can toggle recommended actions ON/OFF
- Chart updates in real-time showing:
  - Projected kWh shift from peak (7pm-11pm) to off-peak
  - Estimated cost savings (S$)
  - CO2 reduction (kg)
  - Grid contribution: "You would reduce peak demand by X% during tonight's stress window"
- Before/after side-by-side comparison

#### Feature 3: Grid Helper Score
- Weekly score (0-100) measuring how much peak-window stress this household avoided
- Broken down by:
  - Peak hours avoided (e.g. "You used 15% less during 7-11pm vs your baseline")
  - Shiftable load shifted (e.g. "You ran 3 of 5 laundry cycles off-peak")
  - Demand response events participated in
- Framing: "Your home is a Flexible Grid Asset" — language the energy data scientist will immediately respect

#### Feature 4: Habit Tracker with Streaks
- "Off-peak laundry streak: 4 days"
- "AC pre-cool habit: 2 of 7 days this week"
- Weekly mission: "Shift 3 high-energy activities to off-peak this week — earn your Grid Hero badge"
- Progress bar with estimated cumulative savings

#### Feature 5: Explainable Impact Dashboard
- Month-over-month comparison: actual kWh vs. baseline (counterfactual without behaviour change)
- Per-recommendation tracking: "Did the user follow this advice? What was the actual outcome?"
- Aggregate: S$ saved, kg CO2 avoided, peak kW reduced
- "Your changes this month equivalent to: X trees planted / X km not driven"

---

## Technical Architecture

### Stack (24hr buildable)
| Component | Technology | Rationale |
|---|---|---|
| Frontend | Next.js + Tailwind CSS | Already in project, single-page demo |
| AI Coach | Claude API (claude-haiku-4-5) | Fast, cost-effective for conversational coaching |
| Analytics | TypeScript (frontend) | Deterministic signal extraction, no backend needed for demo |
| Mock Data | Hardcoded JSON + generated intervals | Realistic 90-day half-hourly dataset |
| State | React useState | All interactions are frontend state only |

### Why NOT MCP + RAG
- MCP: unnecessary overhead — not integrating multiple external tool providers
- RAG: overkill for a hackathon — structured insight objects instead of document retrieval
- The judge is a data scientist; correct, simple architecture is more credible than buzzword complexity
- Use Claude API **only where AI genuinely adds value**: natural language explanation and coaching
- Use deterministic code for **signal extraction**: peak detection, baseline calculation, anomaly flagging

### Mock Data Schema
```typescript
interface HalfHourlyInterval {
  ts: string;              // ISO 8601 with SGT offset
  kwh: number;             // Consumption this half-hour
  day_type: 'weekday' | 'weekend';
  hour_bin: number;        // 0-47 (half-hour slots)
  estimated_carbon_kg: number;
  tariff_cents_per_kwh: number;
  activity_hint?: 'sleeping' | 'cooking' | 'laundry' | 'cooling' | 'idle';
  peak_flag: boolean;      // 7pm-11pm on weekdays
  baseline_kwh: number;    // Rolling 4-week same-slot average
  excess_kwh: number;      // kwh - baseline_kwh
  shiftable_candidate: boolean;
}

interface Household {
  household_id: string;
  flat_type: '4-room HDB' | '5-room HDB' | 'Condo' | 'Landed';
  has_aircon: boolean;
  has_ev: boolean;
  tariff_plan: 'regulated' | 'tou';
  tou_offpeak_start?: number;  // hour (e.g. 23 = 11pm)
  intervals: HalfHourlyInterval[];
}
```

### AI Insight Object (fed to Claude for explanation)
```typescript
interface EnergyInsight {
  type: 'peak_spike' | 'recurring_habit' | 'anomaly' | 'shift_opportunity';
  period: string;
  evidence: {
    peak_kwh: number;
    baseline_kwh: number;
    excess_kwh: number;
    peak_contribution_pct: number;
  };
  recommendation: {
    action: string;
    appliance_hint: string;
    shift_to: string;
    estimated_kwh_saved: number;
    estimated_sgd_saved: number;
    estimated_co2_kg_saved: number;
    confidence: 'high' | 'medium' | 'low';
  };
}
```

Claude's role: receive structured insight objects -> generate plain-language explanation + personalised advice. NOT raw interval processing.

### Metric Definitions & Assumptions (Technical Defensibility)

**Important**: All appliance-level attribution is **heuristic inference** from whole-home half-hourly data — not NILM disaggregation. This must be communicated correctly in the demo ("likely driven by", "estimated", "probable").

| Metric | Definition | Calculation |
|---|---|---|
| Baseline kWh | Rolling 4-week average of the same half-hour slot on the same day-type | `avg(kwh[same_slot, same_day_type, last_28_days])` |
| Peak window | Weekday 7pm-11pm (slots 38-45) — aligns with grid stress hours | Hardcoded for Singapore context |
| Excess kWh | `kwh - baseline_kwh` for each slot | Deterministic; never < 0 in display |
| Appliance attribution | Pattern heuristics: recurring 1.0-1.5 kWh spikes = likely washer; sustained 0.6-1.0 kWh for 3+ slots = likely AC | Always presented as "likely" / "estimated" |
| Grid Helper Score | `(peak_avoided_pct * 0.5) + (offpeak_shift_rate * 0.3) + (dr_participation * 0.2)` scaled to 0-100 | Deterministic rule, not ML |
| Confidence badge | High = evidence in 4+ of last 7 matching slots; Medium = 2-3; Low = 1 or inferred | Slot-match frequency count |
| Peak reduction % | `(baseline_peak_kwh - projected_peak_kwh) / baseline_peak_kwh * 100` | Shown only for the toggled simulator, not as historical fact |
| 45 MW extrapolation | `0.8 kW avg reduction * 56,250 households = 45 MW` — presented as illustrative scenario, not measured outcome | Clearly labeled as projection |

**LLM Fallback Strategy**:
- All numeric values (kWh, S$, CO2, %) are computed deterministically in code and passed as structured context to Claude — Claude never calculates numbers
- If Claude API is unavailable: show pre-computed insight cards with static explanation text (no chat mode)
- For unexpected judge questions: constrain the system prompt to only answer questions about the household's data; gracefully redirect off-topic queries to "I can only analyse your energy data"
- All Claude outputs go through a post-processing check: if any number in the response differs from the injected context values, replace with "see the data card above"

---

## Demo Script (For Judges)

### Setup
- Persona: "Meet Mdm Tan, 64, living in a 4-room HDB in Toa Payoh with 2 grandchildren."
- Show 90-day mock half-hourly data loaded

### Demo Flow (8-10 minutes)

**Act 1: The Problem (1 min)**
- Show SP App as-is: here is the half-hourly chart. "What does this mean? What should Mdm Tan do?"
- Answer: nothing. Raw data. No guidance.

**Act 2: WattCoach AI Chat (2 min)**
- Mdm Tan types: "Why was my electricity so high on Tuesday night?"
- WattCoach responds with explainable attribution: AC + laundry overlap, 62% of evening spike
- She asks: "What can I do tonight to save money?"
- WattCoach gives 3 ranked actions with S$ savings, CO2 avoided, confidence score

**Act 3: Peak-Shift Simulator (3 min)** [WOW MOMENT]
- Show tonight's projected usage on half-hourly chart
- Toggle "Pre-cool AC at 6pm" ON — chart updates, peak window drops
- Toggle "Schedule laundry after 11pm" ON — another drop
- Live counter: "You would save S$4.20 tonight and reduce peak demand by 18% from your usual 9pm load"
- Call out to judge: "This is what demand response looks like at the household level — measurable, explainable, actionable."

**Act 4: Grid Helper Score (2 min)**
- Show weekly Grid Helper Score: 73/100
- "Mdm Tan shifted 4 of 6 high-load activities off-peak this week"
- "Her home is a Flexible Grid Asset — SP Group could send her a demand response signal and she is already trained to respond"

**Act 5: Impact Report (1 min)**
- Month-on-month: actual vs. baseline
- "Following WattCoach recommendations: 8.3% reduction, S$9.48 saved, 11.2 kg CO2 avoided"
- "If 100,000 households do this, peak demand drops by 45 MW — equivalent to a small peaker plant deferred"

**Closing line**: "WattCoach is not a prettier SP App. It is the AI layer between raw data and real behaviour change — closing the loop that no existing solution closes today."

---

## Page Structure (Frontend)

### Section 1: Hero
- SP Group blue (#003399 or similar) + SP Group aesthetic
- Title: "WattCoach"
- Subtitle: "AI-powered energy behaviour coach for Singapore households"
- SP Group + HackOMania 2026 branding

### Section 2: The Problem
- 4 pain point cards (data without meaning, no action, no verification, no grid connection)

### Section 3: Interactive Demo (MOST IMPORTANT — 70% of build time)

**Left Panel: AI Coach Chat**
- Chat interface: Mdm Tan's household profile shown
- Pre-loaded conversation starters ("Why was my bill high?", "What should I do tonight?")
- AI response with structured cards: action + savings + CO2 + confidence badge
- Typing animation, streamed response feel

**Right Panel: Half-Hourly Chart + Simulator**
- 48-slot bar chart for "today" (current day's projected usage)
- Toggle switches for each recommendation
- Live update: S$ saved counter, CO2 counter, peak reduction %
- Grid Helper Score badge (updates with toggles)

**Below: Habit Tracker Strip**
- Streak cards: Off-peak laundry | AC pre-cool | Standby off
- Weekly mission progress bar

### Section 4: Impact Dashboard
- Month-over-month comparison chart (actual vs. baseline)
- Per-recommendation card: "Did you follow this? Outcome: -0.8 kWh"
- Cumulative: S$ saved, CO2 avoided, "Grid Stress Avoided" in kW

### Section 5: How It Works (Technical)
- 3-layer architecture diagram: Signal Extraction -> AI Coaching -> Behaviour Loop
- Tech badges: Claude API, Next.js, SP Group half-hourly data

### Section 6: Footer
- "Built for HackOMania 2026 — SP Group Track: AI for Actionable Energy Behaviour Change"

---

## Hardcoded Demo Data

### Household Profile
```typescript
const MDM_TAN = {
  name: "Mdm Tan",
  flat_type: "4-room HDB",
  block: "Blk 247 Toa Payoh Central",
  household_size: 3,
  has_aircon: true,
  has_ev: false,
  tariff_plan: "regulated",
  monthly_avg_kwh: 412,  // slightly above 4-room average
  baseline_monthly_kwh: 380.7
}
```

### Pre-Built AI Coach Conversations
```typescript
const CONVERSATIONS = {
  why_high_tuesday: {
    question: "Why was my electricity so high last Tuesday night?",
    response: {
      explanation: "Your Tuesday evening (7pm-11pm) used 4.2 kWh — 68% above your usual Tuesday baseline of 2.5 kWh. The likely drivers: your air-conditioner ran continuously for 4 hours (estimated 2.8 kWh), and a washing machine cycle around 9pm (estimated 1.1 kWh). Running both at peak hours means paying full grid rates and adding to demand stress.",
      insight_type: "peak_spike",
      evidence: { peak_kwh: 4.2, baseline_kwh: 2.5, excess_kwh: 1.7, excess_pct: 68 }
    }
  },
  what_tonight: {
    question: "What should I do tonight to save money?",
    response: {
      recommendations: [
        {
          rank: 1,
          action: "Pre-cool your home at 6pm for 30 min, then raise thermostat to 25 degrees C",
          appliance: "Air-conditioner",
          shift_to: "Before 7pm (off-peak window)",
          kwh_saved: 0.8,
          sgd_saved: 0.23,
          co2_kg_saved: 0.32,
          confidence: "high"
        },
        {
          rank: 2,
          action: "Schedule your laundry cycle to start after 11pm",
          appliance: "Washing machine",
          shift_to: "After 11pm",
          kwh_saved: 1.1,
          sgd_saved: 0.32,
          co2_kg_saved: 0.44,
          confidence: "high"
        },
        {
          rank: 3,
          action: "Switch off TV and set-top box at the power point before bed",
          appliance: "Standby devices",
          shift_to: "Eliminate (not shift)",
          kwh_saved: 0.15,
          sgd_saved: 0.04,
          co2_kg_saved: 0.06,
          confidence: "medium"
        }
      ]
    }
  }
}
```

### Grid Helper Score
```typescript
const GRID_HELPER = {
  this_week: 73,
  last_week: 58,
  breakdown: {
    peak_hours_avoided_pct: 15,
    offpeak_laundry_streak: 4,
    demand_response_events: 0,
    ac_precool_habit: 3  // of 7 days
  },
  label: "Flex-Ready Home",
  next_milestone: { score: 80, label: "Grid Hero" }
}
```

### Impact Report
```typescript
const IMPACT_REPORT = {
  period: "February 2026",
  actual_kwh: 378,
  baseline_kwh: 412,
  reduction_kwh: 34,
  reduction_pct: 8.3,
  sgd_saved: 9.90,
  co2_kg_avoided: 13.7,
  recommendations_followed: 11,
  recommendations_total: 16,
  follow_rate_pct: 69,
  grid_contribution: "Equivalent to 0.8 kW peak demand reduction"
}
```

---

## Build Priority (24-Hour Timeline)

### True MVP (Must ship — 3 core deliverables)

| Priority | Feature | Time Estimate | Impact |
|---|---|---|---|
| P0 | **Interactive half-hourly chart + toggle simulator** | 3-4 hrs | WOW demo moment — non-negotiable |
| P0 | **Deterministic insight pipeline** (baseline, peak detection, recommendations) | 2-3 hrs | Engine that makes everything credible |
| P0 | **Controlled AI Coach chat** (Claude API, constrained prompts, 2-3 pre-built Q&A) | 2-3 hrs | Core differentiator — keep scope narrow |

**Ship these 3. Demo is viable with just these.**

### Stretch Goals (Add only if P0 is solid and time allows)

| Priority | Feature | Time Estimate | Impact |
|---|---|---|---|
| P1 | Grid Helper Score display | 1 hr | Credibility with DS judge |
| P1 | Impact Report before/after chart | 1-2 hrs | Demonstrated behaviour change |
| P2 | Habit Tracker + Streaks strip | 1-2 hrs | Gamification completeness |
| P2 | Hero + Problem Statement sections | 1 hr | Polish |
| P3 | How It Works + Footer | 1 hr | Completeness |

**Total MVP: ~7-10 hours. Full build: ~14-16 hours.**

**Scope discipline rule**: Do NOT start P1 until all 3 P0 features are demo-stable end-to-end.

---

## Judging Criteria Alignment

| Criterion | Weight | How WattCoach Delivers |
|---|---|---|
| Impact | 30% | Demonstrated S$ savings, CO2 avoided, peak kW reduced — grounded in real Singapore tariff and emission data. 100K household extrapolation = 45 MW peak deferral. |
| Relevance | 15% | Singapore HDB context, SP Group half-hourly data, real tariff (S$0.2911/kWh), NEA household profiles, demand response pilot stats. |
| Solution Complexity | 20% | AI used intentionally: LLM for explanation only, deterministic analytics for signal extraction. Correct layered architecture that a data scientist will respect. |
| Product Execution | 35% | Working end-to-end: real Claude API calls, live chart updates, streamed AI responses, before/after tracking. Judges can interact live. |

---

## Competitive Differentiation

| What others do | What WattCoach does differently |
|---|---|
| Show data | Close the loop: data -> action -> verified outcome |
| Generic tips | Interval-data-grounded, explainable recommendations |
| Bill savings only | Grid stability contribution + carbon impact |
| Advice without tracking | Per-recommendation follow-up: did you do it? what happened? |
| Generic gamification | Peak-shift streaks tied to real grid contribution |
| Dashboards | Conversational AI coach (ask anything about your data) |

---

## Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|
| Claude API latency in live demo | High | Low | Pre-stream responses, show loading state; have static fallback cards ready |
| Mock data feels fake | Medium | Medium | Generate realistic 90-day dataset with weekday/weekend patterns, AC spikes, laundry cycles |
| Chart complexity overruns time | High | Medium | Build static chart first, add toggle interactivity after basic layout works |
| TOU vs regulated tariff confusion | Medium | Low | Clarify in demo: "For SP regulated users, benefit is grid contribution + habit; TOU users also get direct bill savings" |
| Judge asks for real SP API data | Low | Low | Be upfront: "This is a demo with realistic mock data. In production, SP's AMI API feeds directly into this layer." |
| **Appliance attribution credibility challenge** | **High** | **Medium** | Always use "likely driven by", "estimated", "probable" — never claim certainty. Explicitly acknowledge in demo: "We use pattern heuristics since the SP App provides whole-home data, not device-level disaggregation." |
| **LLM numeric hallucination** | **High** | **Medium** | All numbers computed in code and injected as context. Claude never calculates — only explains. Post-process responses to verify numbers match injected values. |
| **Overclaiming behaviour change** | **Medium** | **Medium** | Clearly label impact report as "projected from following recommendations" — not observed real-world outcome. Use language: "If Mdm Tan followed these recommendations..." |
| Unexpected judge question derails LLM | Medium | Medium | Constrain system prompt to energy domain. Graceful redirect for off-topic: "I can only analyse your SP electricity data." |

---

## Success Criteria for Demo

- [ ] AI Coach responds to at least 2 different user questions with grounded, personalised answers
- [ ] Peak-Shift Simulator updates chart live when recommendations are toggled
- [ ] S$ saved and CO2 avoided counters update in real-time with toggles
- [ ] Grid Helper Score is visible and explained
- [ ] Impact Report shows before/after with specific numbers
- [ ] Judge can ask the AI Coach a spontaneous question and get a sensible answer
- [ ] Total demo runtime: under 10 minutes

---

## Appendix: Clarification Summary

**Readiness Score**: 84/100

| Dimension | Score | Status |
|---|---|---|
| Problem Clarity | 27/30 | Defined: energy behaviour change challenge with clear judging criteria |
| Functional Scope | 20/25 | Defined: AI coach, simulator, gamification, impact tracking |
| Success Criteria | 14/20 | Defined: judging rubric Impact/Relevance/Complexity/Execution |
| Constraints | 14/15 | Defined: 24hr hackathon, software-only, no hardware |
| Priority/MVP | 9/10 | Defined: MVP first, demo-ready end-to-end |

**Key Assumption**: Singapore tariff for demo purposes uses regulated rate S$0.2911/kWh; TOU savings calculations assume Senoko/Geneco-style off-peak plans.

---

## Inspiration Credits (from Codex Research)

| Idea | Status | How Integrated |
|---|---|---|
| "Demand Response Copilot" framing | Adopted | Core positioning and pitch language |
| Next-best-action engine (not dashboard) | Adopted | Defines entire product philosophy |
| Explainable counterfactuals | Adopted | Central to AI Coach response format |
| Closed-loop verification | Adopted | Impact Report + per-recommendation tracking |
| Grid Helper Score | Adopted | Key metric in demo Act 4 |
| RAG for tip library | Adapted | Singapore NEA tips as static JSON (not vector DB) |
| Peak-shift streaks | Adapted | Focused on grid-relevant habits, not generic badges |
| MCP integration | Discarded | Unnecessary complexity for 24hr hackathon |
| Full RL/time-series modelling | Discarded | Out of scope; pitch architecture is credible without it |
| Community comparison | Discarded | Privacy complexity, out of demo scope |

---

---

## Review Summary

| Dimension | Score |
|---|---|
| Clarity | 9/10 |
| Completeness | 8/10 |
| Feasibility | 8/10 |
| Risk Assessment | 7/10 |
| Requirement Alignment | 9/10 |
| **Overall** | **8.2/10** |

Review rounds: 1 (PASSED)

Reviewer (Codex) summary: "Strong plan with clear product thesis, good Singapore-specific grounding, and strong alignment to the challenge and judge profile. Main improvements applied: tighter metric definitions, explicit heuristic framing for appliance attribution, reduced MVP scope to 3 core deliverables, and LLM fallback strategy added."

---

*WattCoach — Turning half-hourly data into lasting habits that help the grid.*
