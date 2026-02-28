import InteractiveDemo from "./components/InteractiveDemo";

const PIPELINE_STEPS = [
  {
    icon: "🔴",
    name: "PAB Button Press",
    description: "Elderly presses the Personal Alert Button during an emergency",
    tech: "IoT Hardware",
    techColor: "bg-red-100 text-red-700",
  },
  {
    icon: "🤖",
    name: "ElevenLabs AI Agent",
    description: "AI voice agent answers the call, understands any language, assesses the situation",
    tech: "ElevenLabs",
    techColor: "bg-purple-100 text-purple-700",
  },
  {
    icon: "⚡",
    name: "FastAPI Backend",
    description: "Processes AI output, classifies severity, triggers appropriate workflows",
    tech: "Python FastAPI",
    techColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🗄️",
    name: "ClickHouse DB",
    description: "Stores call data in real-time for analytics and historical tracking",
    tech: "ClickHouse",
    techColor: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: "📊",
    name: "Operator Dashboard",
    description: "Operators see prioritized, pre-summarized cases with AI-generated context",
    tech: "Next.js",
    techColor: "bg-green-100 text-green-700",
  },
] as const;

const TECH_STACK = [
  { name: "ElevenLabs", role: "Voice AI Agent", icon: "🎙️" },
  { name: "Next.js", role: "Operator Dashboard", icon: "⚛️" },
  { name: "FastAPI", role: "Backend Webhook Handler", icon: "⚡" },
  { name: "ClickHouse", role: "Real-time Analytics DB", icon: "🗄️" },
  { name: "GovTech PAB", role: "IoT Hardware", icon: "🔴" },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Section 1: Hero / Problem Statement ── */}
      <section className="bg-[#0a1628] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-blue-300 mb-4">
            GovTech PAB Enhancement
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            PAB AI Triage System
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Current PAB connects elderly directly to hotline operators who struggle with
            multilingual callers, mumbling, and cannot prioritize severity across multiple
            simultaneous calls.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                emoji: "🗣️",
                title: "Multilingual Barrier",
                description:
                  "Elderly speak Mandarin, Malay, Tamil, Singlish dialects — operators may not understand",
              },
              {
                emoji: "📞",
                title: "Operator Overload",
                description:
                  "One operator handles multiple calls with no priority ordering or context",
              },
              {
                emoji: "⏱️",
                title: "No Triage",
                description:
                  "Severe and non-urgent cases are treated exactly the same way",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left"
              >
                <span className="text-3xl">{card.emoji}</span>
                <h3 className="text-lg font-semibold mt-3 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-400">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Proposed Solution ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI-Powered Voice Triage Layer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              An ElevenLabs AI Agent intercepts the call, understands the situation in any
              language, classifies severity, responds to the elderly instantly, and routes
              cases to operators in priority order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                emoji: "✅",
                title: "Multilingual Understanding",
                description:
                  "Auto language detection + multilingual response in Mandarin, Malay, Tamil, English",
              },
              {
                emoji: "✅",
                title: "AI Pre-Handling",
                description:
                  "AI handles non-urgent cases on the spot, freeing operators for real emergencies",
              },
              {
                emoji: "✅",
                title: "Prioritized Queue",
                description:
                  "Operators receive pre-summarized, priority-sorted case queue with full context",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <span className="text-2xl">{card.emoji}</span>
                <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Solution Pipeline ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How The System Works
          </h2>

          <div className="flex flex-col lg:flex-row items-stretch gap-2">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.name} className="flex items-center flex-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 w-full text-center">
                  <span className="text-3xl">{step.icon}</span>
                  <h3 className="text-sm font-bold text-gray-900 mt-3 mb-2">
                    {step.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                    {step.description}
                  </p>
                  <span
                    className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${step.techColor}`}
                  >
                    {step.tech}
                  </span>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <span className="hidden lg:block text-2xl text-gray-300 mx-1 flex-shrink-0">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Interactive Demo ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Interactive Demo
            </h2>
            <p className="text-gray-500">
              Try the PAB AI Triage flow — press the button and walk through a simulated call
            </p>
          </div>
          <InteractiveDemo />
        </div>
      </section>

      {/* ── Section 5: Tech Stack ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-center"
              >
                <span className="text-3xl">{tech.icon}</span>
                <h3 className="text-sm font-bold text-gray-900 mt-2">
                  {tech.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{tech.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Footer ── */}
      <footer className="bg-[#0a1628] text-gray-400 py-8 px-6 text-center text-sm">
        <p>Built for GovTech Hackathon 2025</p>
        <p className="mt-1 text-gray-500">Team CAT-4</p>
      </footer>
    </div>
  );
}
