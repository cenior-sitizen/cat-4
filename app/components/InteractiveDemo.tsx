"use client";

import { useState, useEffect, useCallback } from "react";

type ScenarioKey = "critical" | "urgent" | "nonurgent";

interface Scenario {
  readonly severity: number;
  readonly badge: string;
  readonly language: string;
  readonly transcript: string;
  readonly category: string;
  readonly block: string;
  readonly summary: string;
  readonly aiReply: string;
  readonly color: string;
  readonly buttonLabel: string;
  readonly buttonEmoji: string;
}

interface CaseItem {
  readonly id: string;
  readonly scenario: Scenario;
  readonly timestamp: string;
  readonly resolved: boolean;
}

interface DemoState {
  readonly step: number;
  readonly selectedScenario: ScenarioKey | null;
  readonly cases: readonly CaseItem[];
  readonly processingText: string;
  readonly showClassification: boolean;
}

const SCENARIOS: Record<ScenarioKey, Scenario> = {
  critical: {
    severity: 1,
    badge: "🔴 Critical",
    language: "Mandarin",
    transcript:
      '"Wǒ diē dǎo le, zhàn bù qǐlái..." (I fell down, cannot get up)',
    category: "Fall",
    block: "Blk 85 Toa Payoh",
    summary:
      "Elderly reported a fall, unable to stand. Immediate assistance required.",
    aiReply:
      "Help is on the way. Please stay calm and do not move. An operator will reach you very soon.",
    color: "red",
    buttonLabel: "I fell down and cannot get up",
    buttonEmoji: "🔴",
  },
  urgent: {
    severity: 2,
    badge: "🟡 Urgent",
    language: "Malay",
    transcript:
      '"Saya rasa sakit dada, tapi tak pasti serius..." (I feel chest pain, not sure if serious)',
    category: "Chest Pain",
    block: "Blk 23 Bedok North",
    summary:
      "Elderly reporting chest discomfort. Needs assessment, may require medical attention.",
    aiReply:
      "I hear you. Please sit down and rest. An operator will call you back shortly to check on you.",
    color: "yellow",
    buttonLabel: "I feel chest pain, not sure serious",
    buttonEmoji: "🟡",
  },
  nonurgent: {
    severity: 3,
    badge: "🟢 Non-Urgent",
    language: "English",
    transcript:
      '"Oh sorry, I think I pressed it by accident. I am fine lah."',
    category: "Accidental Press",
    block: "Blk 12 Jurong West",
    summary: "Accidental button press confirmed. No action required.",
    aiReply:
      "No worries at all! Glad you are safe. If you ever need help, just press the button again.",
    color: "green",
    buttonLabel: "I just pressed by accident, I'm okay",
    buttonEmoji: "🟢",
  },
};

const INITIAL_STATE: DemoState = {
  step: 0,
  selectedScenario: null,
  cases: [],
  processingText: "",
  showClassification: false,
};

function generateCaseId(caseNumber: number): string {
  return `#PAB-2025-${String(caseNumber).padStart(3, "0")}`;
}

function severityColor(color: string): string {
  switch (color) {
    case "red":
      return "bg-red-100 text-red-800 border-red-300";
    case "yellow":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "green":
      return "bg-green-100 text-green-800 border-green-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
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

export default function InteractiveDemo() {
  const [state, setState] = useState<DemoState>(INITIAL_STATE);

  const handlePabPress = useCallback(() => {
    setState((prev) => ({ ...prev, step: 1 }));
  }, []);

  // Auto-advance from connecting (step 1) to scenario selection (step 2)
  useEffect(() => {
    if (state.step !== 1) return;
    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, step: 2 }));
    }, 2000);
    return () => clearTimeout(timer);
  }, [state.step]);

  const handleScenarioSelect = useCallback((key: ScenarioKey) => {
    setState((prev) => ({
      ...prev,
      step: 3,
      selectedScenario: key,
      processingText: "",
      showClassification: false,
    }));
  }, []);

  // Typing effect for transcript during processing (step 3)
  useEffect(() => {
    if (state.step !== 3 || !state.selectedScenario) return;

    const scenario = SCENARIOS[state.selectedScenario];
    const words = scenario.transcript.split(" ");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        const wordsToShow = words.slice(0, currentIndex + 1).join(" ");
        setState((prev) => ({ ...prev, processingText: wordsToShow }));
        currentIndex++;
      } else {
        clearInterval(interval);
        // Show classification after transcript finishes
        setTimeout(() => {
          setState((prev) => ({ ...prev, showClassification: true }));
          // Auto-advance to step 4 after showing classification
          setTimeout(() => {
            setState((prev) => {
              const newCase: CaseItem = {
                id: generateCaseId(prev.cases.length + 1),
                scenario,
                timestamp: "just now",
                resolved: false,
              };
              return {
                ...prev,
                step: 4,
                cases: [...prev.cases, newCase],
              };
            });
          }, 1500);
        }, 800);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [state.step, state.selectedScenario]);

  const handleReset = useCallback(() => {
    setState((prev) => ({
      ...INITIAL_STATE,
      cases: prev.cases,
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
    (a, b) => a.scenario.severity - b.scenario.severity
  );

  const totalCalls = state.cases.length;
  const criticalCalls = state.cases.filter(
    (c) => c.scenario.severity === 1
  ).length;

  const currentScenario = state.selectedScenario
    ? SCENARIOS[state.selectedScenario]
    : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Panel — PAB Simulator */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-h-[500px] flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          PAB Simulator — Elderly Side
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Simulates the elderly person&apos;s experience
        </p>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Step 0 — Idle */}
          {state.step === 0 && (
            <div className="text-center animate-fade-in-up">
              <button
                onClick={handlePabPress}
                className="w-40 h-40 rounded-full bg-red-600 text-white font-bold text-lg animate-pulse-glow cursor-pointer hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                Press PAB<br />Button
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Tap to simulate an emergency call
              </p>
            </div>
          )}

          {/* Step 1 — Connecting */}
          {state.step === 1 && (
            <div className="text-center animate-fade-in-up">
              <p className="text-lg font-semibold text-gray-700 mb-6">
                Connecting to AI Agent...
              </p>
              <div className="flex items-end justify-center gap-1.5 h-10">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-2 bg-blue-500 rounded-full animate-waveform"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-400">
                ElevenLabs AI Agent answering...
              </p>
            </div>
          )}

          {/* Step 2 — Scenario Selection */}
          {state.step === 2 && (
            <div className="w-full space-y-3 animate-fade-in-up">
              <p className="text-center text-sm text-gray-600 mb-4">
                AI Agent: &quot;Hello, I understand you need help. What happened?&quot;
              </p>
              <p className="text-center text-xs text-gray-400 mb-2">
                Select a scenario to simulate:
              </p>
              {(
                [
                  ["critical", "Mandarin 中文"],
                  ["urgent", "Malay / Melayu"],
                  ["nonurgent", "English"],
                ] as const
              ).map(([key, lang]) => {
                const s = SCENARIOS[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleScenarioSelect(key)}
                    className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">
                        {s.buttonEmoji} {s.buttonLabel}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-600">
                        {lang}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 3 — AI Processing */}
          {state.step === 3 && currentScenario && (
            <div className="w-full space-y-4 animate-fade-in-up">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin-slow" />
                <span className="text-sm font-medium text-blue-600">
                  AI is processing...
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 min-h-[80px]">
                <p className="text-xs text-gray-400 mb-2">Transcript:</p>
                <p className="text-sm text-gray-700 italic">
                  {state.processingText}
                  <span className="inline-block w-0.5 h-4 bg-gray-400 animate-pulse ml-0.5 align-middle" />
                </p>
              </div>

              {state.showClassification && (
                <div className="animate-fade-in-up space-y-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold border ${severityColor(currentScenario.color)}`}
                    >
                      {currentScenario.badge}
                    </span>
                    <span className="text-sm text-gray-600">
                      {currentScenario.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Language detected: {currentScenario.language}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4 — AI Response */}
          {state.step === 4 && currentScenario && (
            <div className="w-full space-y-4 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold border ${severityColor(currentScenario.color)}`}
                >
                  {currentScenario.badge}
                </span>
                <span className="text-sm text-gray-600">
                  {currentScenario.category} • {currentScenario.language}
                </span>
              </div>

              <div className="relative bg-blue-50 rounded-2xl rounded-tl-sm p-5 border border-blue-200">
                <p className="text-xs font-semibold text-blue-600 mb-2">
                  AI Agent Response:
                </p>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {currentScenario.aiReply}
                </p>
              </div>

              <p className="text-xs text-green-600 font-medium text-center">
                ✓ Case routed to operator dashboard
              </p>
            </div>
          )}
        </div>

        {/* Reset Button */}
        {state.step > 0 && (
          <button
            onClick={handleReset}
            className="mt-6 w-full py-2.5 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            ↻ Reset Simulation
          </button>
        )}
      </div>

      {/* Right Panel — Operator Dashboard */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 min-h-[500px] flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Operator Dashboard — Live Cases
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Updates in real-time as calls come in
        </p>

        <div className="flex-1 overflow-y-auto space-y-3">
          {sortedCases.length === 0 ? (
            <div className="flex-1 flex items-center justify-center h-full min-h-[200px]">
              <p className="text-gray-400 text-sm">No active cases</p>
            </div>
          ) : (
            sortedCases.map((c) => (
              <div
                key={c.id}
                className={`border-l-4 ${severityBorder(c.scenario.color)} bg-gray-50 rounded-lg p-4 transition-all duration-300 ${c.resolved ? "opacity-40" : ""}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${severityColor(c.scenario.color)}`}
                    >
                      {c.scenario.badge}
                    </span>
                    <span className="text-xs font-mono text-gray-500">
                      {c.id}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{c.timestamp}</span>
                </div>

                <div
                  className={`space-y-1 ${c.resolved ? "line-through" : ""}`}
                >
                  <p className="text-sm font-medium text-gray-800">
                    {c.scenario.block}
                  </p>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>🗣️ {c.scenario.language}</span>
                    <span>📋 {c.scenario.category}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {c.scenario.summary}
                  </p>
                </div>

                {!c.resolved && (
                  <button
                    onClick={() => handleResolve(c.id)}
                    className="mt-3 text-xs px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors cursor-pointer"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Analytics Strip */}
        <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">{totalCalls}</p>
            <p className="text-xs text-gray-500">Total Calls</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{criticalCalls}</p>
            <p className="text-xs text-gray-500">Critical</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">&lt; 2s</p>
            <p className="text-xs text-gray-500">Avg Response</p>
          </div>
        </div>
      </div>
    </div>
  );
}
