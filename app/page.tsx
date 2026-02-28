import InteractiveDemo from "./components/InteractiveDemo";

const PAIN_POINTS = [
  {
    icon: "🎙️",
    title: "Manual Listening",
    description:
      "Operators must manually listen to every 10-second audio clip — no transcript, no summary, no context",
    accent: "bg-red-500/20",
  },
  {
    icon: "🌐",
    title: "Multilingual Barrier",
    description:
      "Elders speak Mandarin, Malay, Tamil, or Singlish — operators may not understand the language or dialect",
    accent: "bg-cyan-500/20",
  },
  {
    icon: "📞",
    title: "Operator Overload",
    description:
      "SAC / CareLine operators handle multiple concurrent PAB calls with no priority ordering or triage support",
    accent: "bg-amber-500/20",
  },
  {
    icon: "❓",
    title: "No Triage",
    description:
      "Accidental button presses and life-threatening emergencies are treated identically — no severity classification",
    accent: "bg-purple-500/20",
  },
] as const;

const SOLUTION_PILLARS = [
  {
    num: "01",
    title: "Smart & Clear Alert Triage",
    description:
      "Three-tier classification (Urgent / Uncertain / Non-urgent) with confidence score — operators receive structured context before calling the elder back",
    accent: "border-t-cyan-500",
  },
  {
    num: "02",
    title: "Faster Help for Real Emergencies",
    description:
      "AI processes the 10-second audio clip in under 2.5 seconds — operators get a translated transcript, severity, and summary ready before the callback",
    accent: "border-t-red-500",
  },
  {
    num: "03",
    title: "Better Allocation of Resources",
    description:
      "Non-urgent cases auto-resolved by AI with automated confirmation callbacks. Operators focus on urgent and uncertain cases. ClickHouse analytics reveal hotspot blocks and peak staffing hours",
    accent: "border-t-green-500",
  },
] as const;

const PIPELINE_STEPS = [
  {
    num: "01",
    icon: "🔴",
    name: "PAB Button Press",
    description:
      "Elder presses the wireless PAB button — PRESS, TELL, WAIT flow activates the 4G device",
    tech: "PAB Device (4G)",
    highlight: false,
  },
  {
    num: "02",
    icon: "🎙️",
    name: "10s Audio Recording",
    description:
      "PAB records a 10-second audio clip of the elder describing their situation via built-in mic",
    tech: "PAB Hardware",
    highlight: false,
  },
  {
    num: "03",
    icon: "🧠",
    name: "AI Triage Layer",
    description:
      "Transcribe, translate, classify severity, and generate a structured case summary in under 2.5s",
    tech: "ElevenLabs + Claude",
    highlight: true,
  },
  {
    num: "04",
    icon: "🏷️",
    name: "Classification",
    description:
      "Urgent / Uncertain / Non-urgent with confidence score — AI replies to elder via PAB speaker",
    tech: "Claude Haiku",
    highlight: false,
  },
  {
    num: "05",
    icon: "📊",
    name: "Operator Dashboard",
    description:
      "SAC / CareLine operator sees pre-triaged cases and calls elder back via PAB with full context",
    tech: "Next.js",
    highlight: false,
  },
  {
    num: "06",
    icon: "📈",
    name: "ClickHouse Analytics",
    description:
      "Every call logged for hotspot blocks, peak hours, language breakdown, and staffing insights",
    tech: "ClickHouse",
    highlight: false,
  },
] as const;

const TECH_STACK = [
  { name: "ElevenLabs", role: "Voice AI (ASR + TTS)", icon: "🎙️" },
  { name: "Claude Haiku", role: "Triage Classification LLM", icon: "🧠" },
  { name: "Next.js", role: "Operator Dashboard", icon: "⚛️" },
  { name: "FastAPI", role: "Backend Webhook Handler", icon: "⚡" },
  { name: "ClickHouse", role: "Real-time Analytics DB", icon: "🗄️" },
] as const;

const SAFEGUARD_CARDS = [
  {
    icon: "🧑‍💼",
    title: "AI Assists, Never Replaces",
    description:
      "AI handles transcription, translation, and triage — but every Urgent and Uncertain case is routed to a human operator who makes the final call. The operator always has override authority.",
    accent: "border-t-cyan-500",
    tag: "Philosophy",
  },
  {
    icon: "🛡️",
    title: "Auto-Resolve Safety Net",
    description:
      "Non-urgent cases auto-resolved by AI still receive an automated confirmation callback within 15 minutes. All auto-resolved cases are logged for daily supervisor audit.",
    accent: "border-t-green-500",
    tag: "Safeguard",
  },
  {
    icon: "📊",
    title: "Confidence Threshold Rule",
    description:
      "If AI confidence is below 70%, the case is always classified as Uncertain and escalated to an operator — even if the model's best guess is Non-urgent. Low confidence never auto-resolves.",
    accent: "border-t-yellow-500",
    tag: "Failsafe",
  },
  {
    icon: "🎙️",
    title: "ASR Fallback Strategy",
    description:
      "When speech recognition fails due to dialect, background noise, or silence, the system defaults to Uncertain and routes to an operator with the raw audio preserved for manual review.",
    accent: "border-t-red-500",
    tag: "Resilience",
  },
] as const;

const MOCK_BLOCK_DATA = [
  { block: "Blk 85 Toa Payoh Lorong 4", calls: 12, severity: "68%" },
  { block: "Blk 23 Bedok North Ave 2", calls: 8, severity: "42%" },
  { block: "Blk 12 Jurong West St 61", calls: 6, severity: "18%" },
] as const;

function PipelineConnector() {
  return (
    <div className="hidden lg:flex items-center flex-shrink-0 -mx-0.5">
      <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
        <line
          x1="0"
          y1="6"
          x2="20"
          y2="6"
          stroke="#94a3b8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <polygon points="20,2.5 28,6 20,9.5" fill="#94a3b8" />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ━━ Section 1: Hero / Problem Statement ━━ */}
      <section className="relative bg-[#0a1628] dot-grid text-white py-24 px-6 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628]/80 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400/80 mb-6 font-mono">
            HackOMania 2026 &middot; #TechForPublicGood
          </p>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-4 tracking-tight leading-[1.1]">
            PAB AI Triage System
          </h1>
          <p className="text-sm text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered triage for the Personal Alert Button — giving SAC /
            CareLine operators structured context{" "}
            <span className="text-cyan-400/90">before</span> they call the elder
            back
          </p>

          {/* Challenge Statement */}
          <div className="max-w-3xl mx-auto mb-16 text-left">
            <div className="border-l-2 border-cyan-400/50 pl-6 py-1">
              <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-400/60 mb-3 font-mono">
                GovTech Challenge Statement
              </p>
              <p className="text-base md:text-lg text-gray-300/90 leading-relaxed font-display italic">
                &ldquo;How might we use AI to enhance the Personal Alert Button
                system so that hotline responders can more accurately understand
                the senior&apos;s situation, assess urgency, and allocate
                resources effectively?&rdquo;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {PAIN_POINTS.map((card, i) => (
              <div
                key={card.title}
                className="animate-fade-in-up group bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-left hover:bg-white/[0.06] transition-colors"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${card.accent} flex items-center justify-center text-xl mb-4`}
                >
                  {card.icon}
                </div>
                <h3 className="text-sm font-semibold tracking-wide mb-2">
                  {card.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-gray-400">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Section 2: Proposed Solution ━━ */}
      <section className="py-24 px-6 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-600 mb-3 font-mono">
              Our Approach
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-5">
              AI-Powered Triage Layer
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              We insert an AI triage layer between the PAB&apos;s 10-second
              audio recording and the SAC / CareLine operator. The AI processes
              every clip in under 2.5 seconds — transcribing, translating,
              classifying, and summarizing — so operators have full context
              ready before they call the elder back via the PAB&apos;s two-way
              4G speaker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {SOLUTION_PILLARS.map((card) => (
              <div
                key={card.num}
                className={`bg-white rounded-xl border border-gray-200/80 border-t-2 ${card.accent} p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <span className="text-xs font-mono text-gray-300 mb-3 block">
                  {card.num}
                </span>
                <h3 className="text-base font-semibold text-gray-900 mb-3 leading-snug">
                  {card.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Section 3: Solution Pipeline ━━ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3 font-mono">
              System Architecture
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-gray-900">
              How It Works
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-center">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.name} className="flex items-center flex-1 min-w-0">
                <div
                  className={`rounded-xl p-5 w-full text-center transition-all ${
                    step.highlight
                      ? "bg-gradient-to-br from-cyan-50 to-sky-50 border-2 border-cyan-300 animate-glow-border"
                      : "bg-white border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <span className="text-lg">{step.icon}</span>
                    {step.highlight && (
                      <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-cyan-600 text-white tracking-wider">
                        NEW
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-gray-300 block mb-1">
                    {step.num}
                  </span>
                  <h3 className="text-xs font-bold text-gray-900 mb-1.5">
                    {step.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
                    {step.description}
                  </p>
                  <span className="inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                    {step.tech}
                  </span>
                </div>
                {i < PIPELINE_STEPS.length - 1 && <PipelineConnector />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Section 4: Interactive Demo ━━ */}
      <section className="py-24 px-6 bg-[#faf9f7]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3 font-mono">
              Live Demonstration
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-3">
              Interactive Demo
            </h2>
            <p className="text-gray-500 text-sm">
              Press the PAB button to simulate an elder&apos;s call — watch AI
              process the 10s audio clip and deliver structured context to the
              operator
            </p>
          </div>
          <InteractiveDemo />
        </div>
      </section>

      {/* ━━ Section 5: Safeguards & Design Philosophy ━━ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3 font-mono">
              Responsible AI
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">
              Safeguards &amp; Design Philosophy
            </h2>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
              AI augments the operator&apos;s workflow — it never replaces human
              judgment. Every design decision prioritises elder safety with
              built-in failsafes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {SAFEGUARD_CARDS.map((card) => (
              <div
                key={card.title}
                className={`bg-white rounded-xl border border-gray-200/80 border-t-2 ${card.accent} p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{card.icon}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 uppercase tracking-wider">
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              {
                label: "PDPA Compliant",
                detail: "Audio processed in-memory, no PII stored long-term",
              },
              {
                label: "10s Clip Aware",
                detail: "Incomplete recordings auto-flagged for operator",
              },
              {
                label: "Cost Efficient",
                detail: "~$0.003 per triage call via Claude Haiku",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200/80 rounded-full px-4 py-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                <span className="text-[11px] text-gray-700 font-medium">
                  {item.label}
                </span>
                <span className="text-[10px] text-gray-400">
                  — {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Section 6: Analytics Preview (Dark) ━━ */}
      <section className="relative py-24 px-6 bg-[#0a1628] dot-grid text-white overflow-hidden">
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/60 mb-3 font-mono">
              Data-Driven Insights
            </p>
            <h2 className="font-display text-3xl md:text-4xl mb-3">
              Real-Time Analytics
            </h2>
            <p className="text-gray-400 text-sm">
              Every PAB call logged — enabling smarter staffing and resource
              allocation for SAC / CareLine operators
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: "📊",
                label: "Calls Today",
                value: "47",
                color: "text-white",
              },
              {
                icon: "⚡",
                label: "Avg AI Triage Time",
                value: "2.3s",
                color: "text-cyan-400",
              },
              {
                icon: "🤖",
                label: "Auto-resolved by AI",
                value: "61%",
                color: "text-green-400",
              },
              {
                icon: "🗺️",
                label: "Top Hotspot Block",
                value: "Toa Payoh",
                color: "text-amber-400",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 text-center"
              >
                <span className="text-xl">{stat.icon}</span>
                <p
                  className={`text-2xl font-bold mt-2 font-mono ${stat.color}`}
                >
                  {stat.value}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Severity Breakdown */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-200 mb-5">
                Calls by Severity
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Urgent", pct: 28, color: "bg-red-500" },
                  { label: "Uncertain", pct: 11, color: "bg-yellow-400" },
                  { label: "Non-urgent", pct: 61, color: "bg-green-500" },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-400">{bar.label}</span>
                      <span className="font-mono text-gray-300">
                        {bar.pct}%
                      </span>
                    </div>
                    <div className="w-full bg-white/[0.06] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${bar.color} transition-all duration-1000`}
                        style={{ width: `${bar.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Blocks Table */}
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-gray-200 mb-5">
                Top Blocks by Call Volume
              </h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] text-gray-500 border-b border-white/[0.06]">
                    <th className="text-left pb-2.5 font-medium">Block</th>
                    <th className="text-right pb-2.5 font-medium">Calls</th>
                    <th className="text-right pb-2.5 font-medium">Urgent</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_BLOCK_DATA.map((row) => (
                    <tr
                      key={row.block}
                      className="border-b border-white/[0.04]"
                    >
                      <td className="py-2.5 text-gray-300 text-xs">
                        {row.block}
                      </td>
                      <td className="py-2.5 text-right font-mono text-gray-400 text-xs">
                        {row.calls}
                      </td>
                      <td className="py-2.5 text-right font-mono text-gray-400 text-xs">
                        {row.severity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-8">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400/80 border border-yellow-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-status-pulse" />
              Powered by ClickHouse
            </span>
          </div>
        </div>
      </section>

      {/* ━━ Section 6: Tech Stack ━━ */}
      <section className="py-24 px-6 bg-[#faf9f7]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3 font-mono">
              Built With
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-gray-900">
              Tech Stack
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="bg-white rounded-xl border border-gray-200/80 p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span className="text-2xl">{tech.icon}</span>
                <h3 className="text-sm font-semibold text-gray-900 mt-2.5">
                  {tech.name}
                </h3>
                <p className="text-[11px] text-gray-400 mt-1">{tech.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Section 7: Footer ━━ */}
      <footer className="bg-[#0a1628] text-gray-500 py-10 px-6 text-center">
        <p className="text-sm">
          Built for <span className="text-gray-300">HackOMania 2026</span>{" "}
          &mdash; #TechForPublicGood
        </p>
        <p className="mt-1.5 text-xs text-gray-600">GovTech PAB Challenge</p>
      </footer>
    </div>
  );
}
