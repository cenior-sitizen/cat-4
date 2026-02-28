"use client";

import { useState, useEffect, useCallback } from "react";

type ScenarioKey =
  | "urgent_fall"
  | "urgent_chest"
  | "uncertain_unwell"
  | "uncertain_rambling"
  | "nonurgent";

interface Scenario {
  readonly severity: string;
  readonly confidence: number;
  readonly language: string;
  readonly transcript: string;
  readonly translation: string;
  readonly category: string;
  readonly block: string;
  readonly summary: string;
  readonly aiReply: string;
  readonly color: string;
  readonly caseId: string;
  readonly buttonLabel: string;
  readonly buttonEmoji: string;
  readonly langTag: string;
  readonly processingTime: string;
}

interface CaseItem {
  readonly id: string;
  readonly scenario: Scenario;
  readonly timestamp: string;
  readonly resolved: boolean;
  readonly isNew: boolean;
}

interface Stats {
  readonly total: number;
  readonly urgent: number;
  readonly uncertain: number;
  readonly autoResolved: number;
}

interface DemoState {
  readonly step: number;
  // 0=idle, 1=recording+scenario, 2=sending to AI, 3=AI processing, 4=result, 5=reply
  readonly selectedScenario: ScenarioKey | null;
  readonly cases: readonly CaseItem[];
  readonly processingSteps: readonly string[];
  readonly stats: Stats;
}

const SCENARIOS: Record<ScenarioKey, Scenario> = {
  urgent_fall: {
    severity: "Urgent",
    confidence: 94,
    language: "Mandarin",
    transcript:
      "Wǒ diē dǎo le... zhàn bù qǐlái... tuǐ hěn tòng... wǒ zài cèsuǒ lǐ... dìbǎn hěn huá...",
    translation:
      "I fell down... cannot get up... my leg hurts a lot... I am in the toilet... the floor is slippery...",
    category: "Fall / Injury",
    block: "Blk 85 Toa Payoh Lorong 4",
    summary:
      "Elder reports a fall in the bathroom with leg pain and inability to stand. Slippery floor mentioned. Immediate physical assistance required.",
    aiReply:
      "Help is being arranged for you now. Please stay calm and do not move. An operator will call you back through the PAB very soon.",
    color: "red",
    caseId: "PAB-2026-001",
    buttonLabel: "Wǒ diē dǎo le... zhàn bù qǐlái...",
    buttonEmoji: "🔴",
    langTag: "Mandarin 中文",
    processingTime: "1.8s",
  },
  urgent_chest: {
    severity: "Urgent",
    confidence: 91,
    language: "Tamil",
    transcript:
      "Ennaku maarbu valikkuthu... mūccuvidamudiyala... romba kashtama irukku... yārāvadhu vandhu help pannuṅga please...",
    translation:
      "I have chest pain... I cannot breathe properly... it is very difficult... someone please come and help me...",
    category: "Chest Pain / Breathing",
    block: "Blk 44 Ang Mo Kio Ave 3",
    summary:
      "Elder reports chest pain with breathing difficulty. Potentially cardiac event. Immediate medical response required — advise ambulance dispatch.",
    aiReply:
      "I can hear you are in pain. Help is being arranged right now. Try to sit upright and breathe slowly. An operator will call you through the PAB very soon.",
    color: "red",
    caseId: "PAB-2026-004",
    buttonLabel: "Ennaku maarbu valikkuthu...",
    buttonEmoji: "🔴",
    langTag: "Tamil தமிழ்",
    processingTime: "2.1s",
  },
  uncertain_unwell: {
    severity: "Uncertain",
    confidence: 61,
    language: "Malay",
    transcript:
      "Saya rasa tak sedap badan, kepala pusing, tapi tak tau serius ke tidak... mungkin sebab cuaca panas kot...",
    translation:
      "I feel unwell, my head is spinning, but not sure if it is serious or not... maybe because of the hot weather...",
    category: "Feeling Unwell",
    block: "Blk 23 Bedok North Ave 2",
    summary:
      "Elder reports dizziness and general unwellness but uncertain of severity. Attributes it to weather. Operator follow-up recommended to assess condition.",
    aiReply:
      "I heard you and I am getting someone to check on you shortly. Please sit down and stay where you are.",
    color: "yellow",
    caseId: "PAB-2026-002",
    buttonLabel: "Saya rasa tak sedap badan, pening...",
    buttonEmoji: "🟡",
    langTag: "Malay / Melayu",
    processingTime: "2.0s",
  },
  uncertain_rambling: {
    severity: "Uncertain",
    confidence: 53,
    language: "Mandarin",
    transcript:
      "Wǒ bù zhīdào zěnme le... jīntiān yīzhí tóuyūn... chī le yào yě méi yòng... jiǎo yě suān... zuótiān yě shì zhèyàng... bù xiǎng máfan nǐmen dànshì zhēn de hěn nánshòu...",
    translation:
      "I don't know what's wrong... been dizzy all day... took medicine but it didn't help... my legs are sore too... yesterday was the same... don't want to trouble you all but I really feel terrible...",
    category: "Multiple Symptoms",
    block: "Blk 67 Queenstown Rd",
    summary:
      "Elder reports persistent dizziness over two days, ineffective medication, and leg soreness. Reluctant to seek help. Multiple symptoms suggest need for human assessment.",
    aiReply:
      "I hear you. It sounds like you have not been feeling well for some time. Someone will check on you shortly — you are not troubling us at all.",
    color: "yellow",
    caseId: "PAB-2026-005",
    buttonLabel: "Wǒ bù zhīdào zěnme le... yīzhí tóuyūn...",
    buttonEmoji: "🟡",
    langTag: "Mandarin 中文",
    processingTime: "2.6s",
  },
  nonurgent: {
    severity: "Non-urgent",
    confidence: 97,
    language: "English (Singlish)",
    transcript:
      "Aiyah sorry sorry, I press wrongly lah, I am fine, no need to come, I just accidentally knock the button when cleaning.",
    translation:
      "Accidental press. Elder confirmed they are fine. Button was knocked during cleaning.",
    category: "Accidental Press",
    block: "Blk 12 Jurong West St 61",
    summary:
      "Accidental button activation confirmed by elder — knocked during cleaning. No injury or distress detected. No operator action required.",
    aiReply:
      "No worries at all! Glad you are safe. No action needed. Press the button again anytime you need real help.",
    color: "green",
    caseId: "PAB-2026-003",
    buttonLabel: "Aiyah sorry, I press wrongly lah...",
    buttonEmoji: "🟢",
    langTag: "English / Singlish",
    processingTime: "1.2s",
  },
};

/* Labels shown while processing (pending state) */
const PROCESSING_PENDING = [
  "Transcribing 10s audio clip...",
  "Detecting language...",
  "Translating to English...",
  "Classifying severity...",
  "Generating case summary...",
];

function getProcessingResult(index: number, s: Scenario): string {
  switch (index) {
    case 0:
      return "Transcribed audio clip (10s recording)";
    case 1:
      return `Language detected: ${s.language}`;
    case 2:
      return "Translated to English";
    case 3:
      return `Classified: ${s.severity} (${s.confidence}% confidence)`;
    case 4:
      return "Case summary generated";
    default:
      return "";
  }
}

const INITIAL_STATS: Stats = {
  total: 0,
  urgent: 0,
  uncertain: 0,
  autoResolved: 0,
};

const INITIAL_STATE: DemoState = {
  step: 0,
  selectedScenario: null,
  cases: [],
  processingSteps: [],
  stats: INITIAL_STATS,
};

const FLOW_STEPS = [
  { label: "PAB Press" },
  { label: "Record" },
  { label: "Send to AI" },
  { label: "AI Triage" },
  { label: "Result" },
  { label: "Reply" },
] as const;

/* ── Severity styling helpers ── */

function severityBadge(color: string): string {
  switch (color) {
    case "red":
      return "bg-red-100 text-red-700 border-red-200";
    case "yellow":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "green":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

function severityBadgeDark(color: string): string {
  switch (color) {
    case "red":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    case "yellow":
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
    case "green":
      return "bg-green-500/15 text-green-400 border-green-500/30";
    default:
      return "bg-gray-500/15 text-gray-400 border-gray-500/30";
  }
}

function severityBorder(color: string): string {
  switch (color) {
    case "red":
      return "border-l-red-500";
    case "yellow":
      return "border-l-yellow-500";
    case "green":
      return "border-l-green-500";
    default:
      return "border-l-gray-500";
  }
}

function severityDot(severity: string): string {
  switch (severity) {
    case "Urgent":
      return "🔴";
    case "Uncertain":
      return "🟡";
    case "Non-urgent":
      return "🟢";
    default:
      return "⚪";
  }
}

function severityOrder(severity: string): number {
  switch (severity) {
    case "Urgent":
      return 1;
    case "Uncertain":
      return 2;
    case "Non-urgent":
      return 3;
    default:
      return 4;
  }
}

/* ── Progress Bar Component ── */
function FlowProgress({ currentStep }: { readonly currentStep: number }) {
  return (
    <div className="flex items-center gap-0 mb-5 px-1">
      {FLOW_STEPS.map((fs, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        return (
          <div key={fs.label} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                      ? "bg-cyan-500 text-white ring-2 ring-cyan-200"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? "✓" : i + 1}
              </div>
              <span
                className={`text-[8px] mt-1 text-center leading-tight truncate w-full ${
                  isActive
                    ? "text-cyan-600 font-semibold"
                    : isCompleted
                      ? "text-green-600"
                      : "text-gray-400"
                }`}
              >
                {fs.label}
              </span>
            </div>
            {i < FLOW_STEPS.length - 1 && (
              <div
                className={`h-px flex-shrink-0 w-full -mt-3 ${
                  isCompleted ? "bg-green-300" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── System narration label ── */
function SystemLabel({
  tech,
  children,
}: {
  readonly tech: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700 uppercase tracking-wider whitespace-nowrap">
        {tech}
      </span>
      <span className="text-xs text-gray-400">{children}</span>
    </div>
  );
}

export default function InteractiveDemo() {
  const [state, setState] = useState<DemoState>(INITIAL_STATE);

  const handlePabPress = useCallback(() => {
    setState((prev) => ({ ...prev, step: 1 }));
  }, []);

  const handleScenarioSelect = useCallback((key: ScenarioKey) => {
    setState((prev) => ({
      ...prev,
      step: 2,
      selectedScenario: key,
      processingSteps: [],
    }));
  }, []);

  // Auto-advance from "sending" (step 2) to "AI processing" (step 3)
  useEffect(() => {
    if (state.step !== 2) return;
    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, step: 3 }));
    }, 1800);
    return () => clearTimeout(timer);
  }, [state.step]);

  // Sequential processing sub-steps (step 3)
  useEffect(() => {
    if (state.step !== 3 || !state.selectedScenario) return;

    const scenario = SCENARIOS[state.selectedScenario];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < PROCESSING_PENDING.length) {
        const result = getProcessingResult(stepIndex, scenario);
        setState((prev) => ({
          ...prev,
          processingSteps: [...prev.processingSteps, result],
        }));
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setState((prev) => ({ ...prev, step: 4 }));
        }, 600);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [state.step, state.selectedScenario]);

  // Auto-advance from result (step 4) to AI reply (step 5)
  useEffect(() => {
    if (state.step !== 4 || !state.selectedScenario) return;

    const scenario = SCENARIOS[state.selectedScenario];
    const timer = setTimeout(() => {
      setState((prev) => {
        const newCase: CaseItem = {
          id: `#${scenario.caseId}`,
          scenario,
          timestamp: "just now",
          resolved: scenario.severity === "Non-urgent",
          isNew: true,
        };
        const newStats: Stats = {
          total: prev.stats.total + 1,
          urgent:
            prev.stats.urgent + (scenario.severity === "Urgent" ? 1 : 0),
          uncertain:
            prev.stats.uncertain +
            (scenario.severity === "Uncertain" ? 1 : 0),
          autoResolved:
            prev.stats.autoResolved +
            (scenario.severity === "Non-urgent" ? 1 : 0),
        };
        return {
          ...prev,
          step: 5,
          cases: [...prev.cases, newCase],
          stats: newStats,
        };
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [state.step, state.selectedScenario]);

  // Clear "isNew" flash
  useEffect(() => {
    const hasNew = state.cases.some((c) => c.isNew);
    if (!hasNew) return;
    const timer = setTimeout(() => {
      setState((prev) => ({
        ...prev,
        cases: prev.cases.map((c) => (c.isNew ? { ...c, isNew: false } : c)),
      }));
    }, 2000);
    return () => clearTimeout(timer);
  }, [state.cases]);

  const handleReset = useCallback(() => {
    setState((prev) => ({
      ...INITIAL_STATE,
      cases: prev.cases,
      stats: prev.stats,
    }));
  }, []);

  const handleResolve = useCallback((caseId: string) => {
    setState((prev) => ({
      ...prev,
      cases: prev.cases.map((c) =>
        c.id === caseId ? { ...c, resolved: true } : c
      ),
    }));
  }, []);

  const sortedCases = [...state.cases].sort(
    (a, b) =>
      severityOrder(a.scenario.severity) -
      severityOrder(b.scenario.severity)
  );

  const currentScenario = state.selectedScenario
    ? SCENARIOS[state.selectedScenario]
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ━━ Left Panel — PAB Simulator (Light) ━━ */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-7 min-h-[600px] flex flex-col">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-status-pulse" />
          <h3 className="text-sm font-semibold text-gray-900 tracking-wide">
            PAB Device — Elder&apos;s Home
          </h3>
        </div>
        <p className="text-xs text-gray-400 mb-4 ml-[18px]">
          Wireless 4G device with two-way communication
        </p>

        <FlowProgress currentStep={state.step} />

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Step 0 — Idle */}
          {state.step === 0 && (
            <div className="text-center animate-fade-in-up">
              <div className="relative w-44 h-44 flex items-center justify-center mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-red-400/15 animate-ripple-out" />
                <div
                  className="absolute inset-0 rounded-full border border-red-400/10 animate-ripple-out"
                  style={{ animationDelay: "0.8s" }}
                />
                <button
                  onClick={handlePabPress}
                  className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white font-bold text-base animate-pulse-glow cursor-pointer hover:from-red-600 hover:to-red-800 transition-colors flex items-center justify-center shadow-2xl"
                >
                  <span className="leading-tight text-center">
                    Press PAB
                    <br />
                    Button
                  </span>
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-400">
                Elder presses the red button when in distress
              </p>
              <p className="text-[10px] text-gray-300 mt-1">
                Blue button cancels accidental presses
              </p>
            </div>
          )}

          {/* Step 1 — Recording + Scenario Selection */}
          {state.step === 1 && (
            <div className="w-full space-y-3 animate-fade-in-up">
              <SystemLabel tech="PAB Device">
                Recording 10-second audio clip via 4G
              </SystemLabel>

              <div className="bg-red-50/50 border border-red-100 rounded-xl p-3">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-medium text-red-600">
                    Recording audio clip...
                  </span>
                  <span className="text-[10px] text-red-400 font-mono ml-auto">
                    10s
                  </span>
                </div>
                <div className="flex items-end justify-center gap-1.5 h-5">
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-red-400/60 rounded-full animate-waveform"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-gray-500 text-center">
                What does the elder say into the PAB?
              </p>

              <div className="space-y-2 max-h-[260px] overflow-y-auto">
                {(
                  Object.entries(SCENARIOS) as [ScenarioKey, Scenario][]
                ).map(([key, s]) => (
                  <button
                    key={key}
                    onClick={() => handleScenarioSelect(key)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all cursor-pointer bg-gray-50/50 hover:bg-gray-50 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[12px] text-gray-600 group-hover:text-gray-900 transition-colors leading-snug">
                        {s.buttonEmoji}{" "}
                        <span className="italic">
                          &ldquo;{s.buttonLabel}&rdquo;
                        </span>
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono whitespace-nowrap mt-0.5">
                        {s.langTag}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Sending audio to AI Triage Layer */}
          {state.step === 2 && currentScenario && (
            <div className="w-full space-y-4 animate-fade-in-up">
              <SystemLabel tech="PAB → AI Layer">
                Audio clip captured, sending to AI Triage Layer
              </SystemLabel>

              <div className="bg-gray-50 rounded-xl p-5 text-center space-y-3">
                <p className="text-sm text-gray-700">
                  10s audio clip recorded{" "}
                  <span className="text-green-600 font-medium">✓</span>
                </p>
                <p className="text-xs text-gray-400 italic px-2">
                  &ldquo;{currentScenario.transcript}&rdquo;
                </p>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-[10px] text-gray-400 font-mono">
                    PAB
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-cyan-600 font-mono font-medium">
                    AI Triage Layer
                  </span>
                </div>
                <p className="text-[11px] text-cyan-500 animate-pulse font-mono">
                  Sending audio for analysis...
                </p>
              </div>
            </div>
          )}

          {/* Step 3 — AI Processing (5 sub-steps with results) */}
          {state.step === 3 && currentScenario && (
            <div className="w-full space-y-4 animate-fade-in-up">
              <SystemLabel tech="ElevenLabs + Claude">
                AI Triage Layer analysing audio clip
              </SystemLabel>

              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin-slow" />
                <span className="text-sm font-medium text-cyan-600">
                  Processing...
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                {state.processingSteps.map((result, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 animate-slide-in"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-[10px]">✓</span>
                    </span>
                    <span className="text-[12px] text-gray-700">{result}</span>
                  </div>
                ))}
                {state.processingSteps.length < 5 && (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" />
                    </span>
                    <span className="text-[12px] text-gray-400">
                      {PROCESSING_PENDING[state.processingSteps.length]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4 — Classification Result */}
          {state.step === 4 && currentScenario && (
            <div className="w-full space-y-4 animate-fade-in-up">
              <SystemLabel tech="Claude Haiku">
                Triage complete — preparing for operator
              </SystemLabel>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityBadge(currentScenario.color)}`}
                >
                  {severityDot(currentScenario.severity)}{" "}
                  {currentScenario.severity}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  {currentScenario.confidence}% confidence
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-600 border border-cyan-100">
                  ⚡ {currentScenario.processingTime}
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                    Original ({currentScenario.language})
                  </p>
                  <p className="text-[12px] text-gray-600 italic">
                    &ldquo;{currentScenario.transcript}&rdquo;
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                    English Translation
                  </p>
                  <p className="text-[12px] text-gray-800">
                    {currentScenario.translation}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
                    AI Summary for Operator
                  </p>
                  <p className="text-[12px] text-gray-800">
                    {currentScenario.summary}
                  </p>
                </div>
              </div>

              <p className="text-xs text-cyan-500 text-center animate-pulse font-mono">
                Sending voice acknowledgment to elder...
              </p>
            </div>
          )}

          {/* Step 5 — AI Reply to Elder + Routing */}
          {state.step === 5 && currentScenario && (
            <div className="w-full space-y-3 animate-fade-in-up">
              <SystemLabel tech="ElevenLabs TTS">
                AI replying to elder via PAB speaker
              </SystemLabel>

              <div className="flex items-center gap-3 mb-1">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${severityBadge(currentScenario.color)}`}
                >
                  {severityDot(currentScenario.severity)}{" "}
                  {currentScenario.severity}
                </span>
                <span className="text-xs text-gray-400">
                  {currentScenario.category}
                </span>
                <span className="text-[10px] font-mono text-cyan-600 ml-auto">
                  ⚡ {currentScenario.processingTime}
                </span>
              </div>

              <div className="relative bg-cyan-50 rounded-2xl rounded-tl-sm p-4 border border-cyan-200/60">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">🔊</span>
                  <p className="text-[10px] font-semibold text-cyan-600 uppercase tracking-wider">
                    AI Reply to Elder (via PAB speaker)
                  </p>
                </div>
                <p className="text-[13px] text-gray-800 leading-relaxed">
                  &ldquo;{currentScenario.aiReply}&rdquo;
                </p>
              </div>

              <div className="bg-green-50 border border-green-200/60 rounded-lg p-3">
                <div className="flex items-center justify-center gap-1.5 text-xs text-green-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Case sent to SAC / CareLine Operator →
                </div>
                <p className="text-[10px] text-green-600/80 mt-1 text-center">
                  {currentScenario.severity === "Non-urgent"
                    ? "Auto-resolved by AI — no operator action needed. Logged for records."
                    : currentScenario.severity === "Urgent"
                      ? "Operator receives full summary and calls elder back via PAB with context ready."
                      : "Flagged for review — operator calls elder back to assess with AI summary ready."}
                </p>
              </div>
            </div>
          )}
        </div>

        {state.step > 0 && (
          <button
            onClick={handleReset}
            className="mt-4 w-full py-2.5 rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all cursor-pointer tracking-wide"
          >
            ↻ RESET — TRY ANOTHER SCENARIO
          </button>
        )}
      </div>

      {/* ━━ Right Panel — Operator Dashboard (Dark) ━━ */}
      <div className="bg-[#0f1729] rounded-2xl shadow-xl border border-[#1e2d42] p-7 min-h-[600px] flex flex-col">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-status-pulse" />
          <h3 className="text-sm font-semibold text-gray-200 tracking-wide">
            SAC / CareLine Operator Dashboard
          </h3>
        </div>
        <p className="text-[11px] text-gray-500 mb-4 ml-[18px]">
          Operator sees pre-triaged cases — ready to call elder back with
          context
        </p>

        {/* Stats Bar */}
        <div className="mb-4 p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl grid grid-cols-5 gap-1 text-center">
          <div>
            <p className="text-base font-bold font-mono text-gray-100">
              {state.stats.total}
            </p>
            <p className="text-[9px] text-gray-500 mt-0.5">TOTAL</p>
          </div>
          <div>
            <p className="text-base font-bold font-mono text-red-400">
              {state.stats.urgent}
            </p>
            <p className="text-[9px] text-gray-500 mt-0.5">URGENT</p>
          </div>
          <div>
            <p className="text-base font-bold font-mono text-yellow-400">
              {state.stats.uncertain}
            </p>
            <p className="text-[9px] text-gray-500 mt-0.5">UNCERTAIN</p>
          </div>
          <div>
            <p className="text-base font-bold font-mono text-green-400">
              {state.stats.autoResolved}
            </p>
            <p className="text-[9px] text-gray-500 mt-0.5">AUTO</p>
          </div>
          <div>
            <p className="text-base font-bold font-mono text-cyan-400">
              &lt;2.5s
            </p>
            <p className="text-[9px] text-gray-500 mt-0.5">AVG AI</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5">
          {sortedCases.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center h-full min-h-[200px] gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-green-500/20 animate-ripple-out" />
                <div className="w-3 h-3 rounded-full bg-green-500/30 animate-pulse" />
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs">
                  No active cases
                </p>
                <p className="text-gray-600 text-[10px] mt-1">
                  AI is monitoring all incoming PAB alerts
                </p>
                <p className="text-gray-600 text-[10px]">
                  Cases will appear here pre-triaged and ready for action
                </p>
              </div>
            </div>
          ) : (
            sortedCases.map((c) => (
              <div
                key={c.id}
                className={`border-l-2 ${severityBorder(c.scenario.color)} bg-white/[0.03] border border-white/[0.06] rounded-lg p-3.5 transition-all duration-500 ${
                  c.resolved ? "opacity-40" : ""
                } ${c.isNew ? "ring-1 ring-cyan-500/30 bg-cyan-500/[0.04]" : ""}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${severityBadgeDark(c.scenario.color)}`}
                    >
                      {severityDot(c.scenario.severity)}{" "}
                      {c.scenario.severity}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      {c.id}
                    </span>
                    <span className="text-[9px] font-mono text-cyan-500">
                      ⚡ {c.scenario.processingTime}
                    </span>
                    {c.isNew && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-600">
                    {c.timestamp}
                  </span>
                </div>

                <div
                  className={`space-y-1 ${c.resolved && c.scenario.severity !== "Non-urgent" ? "line-through" : ""}`}
                >
                  <p className="text-xs font-medium text-gray-200">
                    {c.scenario.block}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] text-gray-500">
                    <span>🗣️ {c.scenario.language}</span>
                    <span>📋 {c.scenario.category}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${severityBadgeDark(c.scenario.color)}`}
                    >
                      {c.scenario.confidence}%
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 italic">
                    &ldquo;{c.scenario.transcript}&rdquo;
                  </p>
                  <p className="text-[11px] text-gray-400">
                    → {c.scenario.translation}
                  </p>
                  <p className="text-[11px] text-gray-300 mt-0.5">
                    {c.scenario.summary}
                  </p>
                </div>

                <div className="mt-2.5 flex gap-2">
                  {c.scenario.severity === "Non-urgent" ? (
                    <span className="text-[10px] px-2.5 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                      ✓ Auto-resolved by AI — no callback needed
                    </span>
                  ) : c.resolved ? (
                    <span className="text-[10px] px-2.5 py-1 rounded bg-white/[0.05] text-gray-500 border border-white/[0.08]">
                      ✓ Elder called back &amp; resolved
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleResolve(c.id)}
                        className="text-[10px] px-3 py-1 rounded bg-green-600 hover:bg-green-500 text-white transition-colors cursor-pointer font-medium"
                      >
                        📞 Call Elder Back via PAB
                      </button>
                      <button
                        onClick={() => handleResolve(c.id)}
                        className="text-[10px] px-3 py-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-gray-400 border border-white/[0.1] transition-colors cursor-pointer"
                      >
                        Resolve
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
