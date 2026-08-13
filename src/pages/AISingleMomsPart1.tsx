import React from 'react';
import {
  Search, Zap, Brain, XCircle, Database, Microscope,
  GitCompare, FlaskConical, Target, Layers, CheckCircle,
  AlertCircle, ExternalLink,
} from 'lucide-react';

const FIGMA_URL =
  'https://www.figma.com/design/5dtX0wL4HRCIFyLVoBtrGw/AI-Assisted-Empathy-Research-Process?node-id=12-1899&t=r8zLonxtXJdmfBbj-1';

const aiExtractionRows = [
  { tool: 'DeepSeek', icon: <Search className="w-4 h-4" />, iconBg: 'bg-blue-600', status: 'complete', highlights: '7 themes + quotes; caught car cry space, scheduled sadness, shame-hope tension, children\'s empathy deepening guilt.' },
  { tool: 'ChatGPT', icon: <Zap className="w-4 h-4" />, iconBg: 'bg-teal-600', status: 'complete', highlights: 'Themes table, emotion table, relationship map — no hidden patterns.' },
  { tool: 'Gemini', icon: <Brain className="w-4 h-4" />, iconBg: 'bg-green-600', status: 'complete', highlights: 'Structured drivers, emotional landscape, ethical caveats — partial hidden patterns.' },
  { tool: 'Claude', icon: <XCircle className="w-4 h-4" />, iconBg: 'bg-red-500', status: 'failed', highlights: 'Repeated "capacity constraints" after 10+ attempts (free tier unreliable).' },
];

const additionalHiddenPatterns = [
  { id: 'P1', pattern: 'The disappeared self', detail: 'Identity erosion beyond exhaustion — the self has been absorbed entirely by roles.' },
  { id: 'P3/P4', pattern: 'Protective silence toward children', detail: "Speechlessness as a coping mechanism — not knowing what to say becomes the response." },
  { id: 'P5', pattern: 'Trauma-blocking intimacy', detail: 'Isolation is not chosen solitude; it is trauma-enforced withdrawal.' },
];

const productIdeas = [
  { concept: 'Car Cry Validation', description: '"I Need a Moment" — one-tap audio mode with soft validation message, optional 5–10 min timer, private voice note.' },
  { concept: 'Guilt-to-Growth Journal', description: 'AI-assisted journaling with reframing prompts (e.g., "What would you tell a friend?"). On-device storage.' },
  { concept: 'Non-Dating Meetups', description: 'In-app schedule of moderated, low-pressure audio/video circles. Anonymous RSVP.' },
  { concept: 'Flexibility Negotiation', description: 'Interactive script builder for requesting flexible work hours + chatbot to practise the conversation.' },
];

const improvements = [
  { area: 'Scoring', change: 'Clarify the ceiling of the Hidden Feeling Detection scale — 5/5 now requires meaningful interpretation, not just detection.' },
  { area: 'Sample', change: 'Include all 10 original responses (not just the 6 deepest) to test pattern consistency.' },
  { area: 'Data type', change: 'Move from short quotes to full conversation transcripts for richer context.' },
  { area: 'Reviewer', change: 'Include a second reviewer from the start to catch blind spots and strengthen the rubric before analysis.' },
  { area: 'Participant validation', change: 'Replace the Hidden Feeling Detection score with a Participant Recognition Rate — ask original participants to confirm whether each detected pattern feels true.' },
  { area: 'Prompt neutrality', change: 'Remove worked examples from the prompt to reduce directional priming.' },
];

const limitations = [
  { label: 'Small sample', detail: '6 quotes — directional, not generalisable.' },
  { label: 'Quote selection bias', detail: 'I selected the deepest responses from a pool of 10. This enriches emotional depth but may not represent the full range. Selection was made by a single rater.' },
  { label: 'Single-rater design', detail: 'I built the baseline and applied the rubric. A second reviewer would strengthen validity.' },
  { label: 'Prompt-dependent', detail: 'Findings are tied to one specific prompt; different phrasing could change outputs.' },
  { label: 'Convenience sample', detail: "Participants were recruited from the client's network — may not represent all single mothers." },
  { label: 'Untested hypothesis arm', detail: 'The claim about predicting future patterns was not tested and is scoped for future research.' },
];




const AI_PROMPT = `"Extract the top 5–7 recurring themes from these anonymized single-mother conversations. Focus on emotional needs, practical constraints, and support gaps. For each theme, provide a one-sentence summary and an example quote from the text. Also note any subtle or unexpected patterns that a less careful reader might miss. Examples include emotional contradictions (e.g., shame and hope coexisting), hidden coping mechanisms (e.g., a specific routine or ritual), or where the subtext differs from the explicit text."`;

const SectionHead = ({ color, icon, label, title }: { color: string; icon: React.ReactNode; label: string; title: string }) => (
  <div className="flex gap-4 items-start mb-6">
    <div className={`${color} text-white p-3 rounded-xl shrink-0`} aria-hidden="true">{icon}</div>
    <div>
      <span className={`text-xs font-bold uppercase tracking-widest`} style={{ color: 'inherit' }}>{label}</span>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
  </div>
);

const Part1Content = () => (
  <div className="divide-y divide-gray-100">

    {/* 1.1 About + Research Rationale */}
    <div className="py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-start mb-6">
          <div className="bg-blue-600 text-white p-3 rounded-xl shrink-0"><Database className="w-6 h-6" /></div>
          <div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Section 1.1 – 1.3</span>
            <h3 className="text-xl font-bold text-gray-900">Study Design & Research Rationale</h3>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { q: 'Why short quotes?', a: "The client's existing data consisted of brief, emotionally dense responses. Short quotes are a valid unit of analysis for exploratory qualitative research — they capture the essence of a lived moment without requiring lengthy transcription." },
            { q: 'Why 6 of 10 responses?', a: 'Information-rich case sampling (Patton, 2015) — selecting the most emotionally dense responses for in-depth analysis. The remaining 4 will be included in a larger-scale study.' },
            { q: 'Why this prompt sequence?', a: 'Human thematic analysis was completed before any AI queries — a deliberate control condition. The human baseline was established first to provide a neutral benchmark; I did not adjust it after seeing AI results.' },
          ].map((item) => (
            <div key={item.q} className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <p className="font-bold text-blue-900 text-sm mb-2">{item.q}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Recruitment</p>
          <p className="text-gray-600 text-sm leading-relaxed">Convenience sample from the client's speaker network. Screener: single mother, at least one child under 18, employed full- or part-time. 10 responses total; 6 most emotionally rich selected (information-rich case sampling). Selection made by a single researcher — acknowledged limitation.</p>
        </div>
      </div>
    </div>

    {/* 1.4 Participant Data */}
    <div className="py-12 px-6 bg-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-start mb-6">
          <div className="bg-blue-600 text-white p-3 rounded-xl shrink-0"><Database className="w-6 h-6" /></div>
          <div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Section 1.4</span>
            <h3 className="text-xl font-bold text-gray-900">Participant Data — Six Anonymized Quotes</h3>
          </div>
        </div>
        <div className="bg-blue-600 rounded-2xl p-5 mb-5">
          <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-2">Open-Ended Prompt Given to Each Participant</p>
          <p className="text-white text-sm italic leading-relaxed">"What is one moment from the past month that captures both your hardest challenge and your deepest hope as a single mother?"</p>
        </div>
        <a
          href="https://drive.google.com/file/d/1RCYgdxTtLvRlv1MIfzN4fOHJp9N2IB4t/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Single Mom Voices
        </a>
      </div>
    </div>

    {/* 1.5 Human Baseline */}
    <div className="py-12 px-6 bg-orange-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-start mb-6">
          <div className="bg-orange-500 text-white p-3 rounded-xl shrink-0"><Microscope className="w-6 h-6" /></div>
          <div>
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Section 1.5</span>
            <h3 className="text-xl font-bold text-gray-900">Human Baseline (Established Before AI Queries)</h3>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">I performed line-by-line inductive coding of all six quotes before running any AI queries. This baseline served as the benchmark against which all AI outputs were scored.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
            <p className="font-bold text-gray-900 text-sm mb-3">Surface themes identified</p>
            <div className="flex flex-wrap gap-2">
              {['Exhaustion', 'Financial strain', 'Guilt', 'Isolation', 'Shame', 'Hope'].map((t) => (
                <span key={t} className="bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
            <p className="font-bold text-gray-900 text-sm mb-3">Hidden patterns noted (prior to AI)</p>
            <ul className="text-gray-600 text-sm space-y-1.5">
              {['Car as private cry space (P2)', 'Scheduled/rationed sadness — 10 minutes exactly', "Children's \"it's okay\" deepening guilt (P3)", 'Aspiration and shame coexisting (P6)', 'Silence around formal support systems'].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-orange-400 mt-0.5 shrink-0">•</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* 1.6 AI Extraction */}
    <div className="py-12 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-start mb-6">
          <div className="bg-teal-600 text-white p-3 rounded-xl shrink-0"><Brain className="w-6 h-6" /></div>
          <div>
            <span className="text-teal-600 text-xs font-bold uppercase tracking-widest">Section 1.6</span>
            <h3 className="text-xl font-bold text-gray-900">AI Extraction — Same Prompt Used for All Models</h3>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-5">
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-3">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Identical prompt sent to all AI models</p>
          </div>
          <div className="px-6 py-5">
            <p className="font-mono text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">{AI_PROMPT}</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-gray-500 font-bold text-xs uppercase tracking-wider w-28">AI Tool</th>
                <th className="text-left px-5 py-3 text-gray-500 font-bold text-xs uppercase tracking-wider w-24">Response</th>
                <th className="text-left px-5 py-3 text-gray-500 font-bold text-xs uppercase tracking-wider">Output Highlights</th>
              </tr>
            </thead>
            <tbody>
              {aiExtractionRows.map((row, i) => (
                <tr key={row.tool} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                  <td className="px-5 py-4 align-top">
                    <div className="flex items-center gap-2">
                      <div className={`${row.iconBg} text-white p-1.5 rounded-lg shrink-0`}>{row.icon}</div>
                      <span className="font-bold text-gray-900 text-sm">{row.tool}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${row.status === 'complete' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {row.status === 'complete' ? 'Complete' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-sm leading-relaxed align-top">{row.highlights}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* 1.7 Scoring Rubric + Results */}
    <div className="py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-start mb-6">
          <div className="bg-violet-600 text-white p-3 rounded-xl shrink-0"><GitCompare className="w-6 h-6" /></div>
          <div>
            <span className="text-violet-600 text-xs font-bold uppercase tracking-widest">Section 1.7</span>
            <h3 className="text-xl font-bold text-gray-900">Scoring Rubric & Results</h3>
          </div>
        </div>
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5 mb-5">
          <p className="text-violet-800 text-xs font-bold uppercase tracking-widest mb-4">Rubric (Defined Before Analysis)</p>
          <div className="overflow-x-auto rounded-xl border border-violet-100">
            <table className="w-full text-xs min-w-[560px]">
              <thead>
                <tr className="bg-violet-100 border-b border-violet-200">
                  <th className="text-left px-4 py-3 text-violet-800 font-bold uppercase tracking-wider w-14">Score</th>
                  <th className="text-left px-4 py-3 text-violet-800 font-bold uppercase tracking-wider">Surface Accuracy</th>
                  <th className="text-left px-4 py-3 text-violet-800 font-bold uppercase tracking-wider">Hidden Feeling Detection</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { score: 5, surface: 'All major themes correctly identified', hidden: 'Multiple subtle patterns detected accurately and explained with meaningful interpretation' },
                  { score: 4, surface: 'Most themes, one minor omission', hidden: 'At least two hidden patterns surfaced with supporting evidence' },
                  { score: 3, surface: 'Half of major themes', hidden: 'One hidden pattern noted' },
                  { score: 2, surface: 'Few themes, major omissions', hidden: 'No hidden patterns, but emotional tone inferred' },
                  { score: 1, surface: 'Irrelevant or hallucinated themes', hidden: 'Completely misses subtext' },
                ].map((row, i) => (
                  <tr key={row.score} className={`border-b border-violet-50 ${i % 2 === 0 ? 'bg-white' : 'bg-violet-50/40'}`}>
                    <td className="px-4 py-3">
                      <span className={`font-bold text-sm ${row.score >= 4 ? 'text-green-600' : row.score === 3 ? 'text-amber-600' : 'text-red-500'}`}>{row.score}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 leading-relaxed">{row.surface}</td>
                    <td className="px-4 py-3 text-gray-700 leading-relaxed">{row.hidden}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-violet-700 text-xs mt-3 leading-relaxed"><span className="font-bold">Success threshold:</span> ≥4 on Surface Accuracy and ≥2 on Hidden Feeling Detection.</p>
        </div>

        <a
          href="https://drive.google.com/file/d/1cEhzlACwysnCfRpd2RJbJLBIUsn6IVIv/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-150"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          See Scoring Results
        </a>
      </div>
    </div>

    {/* 1.8 Findings */}
    <div className="py-12 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-start mb-8">
          <div className="bg-rose-600 text-white p-3 rounded-xl shrink-0"><FlaskConical className="w-6 h-6" /></div>
          <div>
            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">Section 1.8</span>
            <h3 className="text-xl font-bold text-white">Findings — What AI Got Right vs. Missed</h3>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h4 className="text-white font-bold">What AI Got Right — Surface Patterns</h4>
          </div>
          <p className="text-gray-400 text-sm mb-3">All models correctly identified these six themes with accurate quotes and emotion tags:</p>
          <div className="flex flex-wrap gap-2">
            {['Exhaustion', 'Financial strain', 'Guilt', 'Isolation', 'Shame', 'Hope'].map((t) => (
              <span key={t} className="bg-green-900/30 border border-green-800/40 text-green-300 text-xs font-semibold px-3 py-1.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <a
            href="https://drive.google.com/file/d/1mLxQW9PXSNj6dKbka3fRsoSiBPeZMgV9/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-150"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            What AI Missed — Hidden Feelings
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">Additional Hidden Patterns (Identified After Closer Reading — Not Part of Original Scoring Baseline)</p>
          <div className="space-y-3">
            {additionalHiddenPatterns.map((p) => (
              <div key={p.pattern} className="flex gap-3">
                <span className="bg-gray-700 text-gray-300 text-xs font-bold px-2 py-0.5 rounded shrink-0 h-fit">{p.id}</span>
                <div>
                  <p className="text-gray-200 text-sm font-semibold">{p.pattern}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* 1.9 Verdict */}
    <div className="py-12 px-6 bg-gray-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-3">Section 1.9 — Original Verdict</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
          <p className="text-gray-200 text-base leading-relaxed">
            AI is a powerful research assistant for speed and scale. It can reliably detect surface patterns and, in some cases (DeepSeek), surface multiple hidden dynamics. However, hidden-pattern detection is inconsistent across tools and highly dependent on prompt design. No model achieved full human-level interpretation. The most valuable outcome is not a verdict on AI's limits, but a validated methodology for using AI as a first-pass empathy detector and stress-testing it against human judgment.
          </p>
        </div>
      </div>
    </div>

    {/* 1.10 Immediate Outcome */}
    <div className="py-12 px-6 bg-green-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-start mb-6">
          <div className="bg-green-600 text-white p-3 rounded-xl shrink-0"><Target className="w-6 h-6" /></div>
          <div>
            <span className="text-green-700 text-xs font-bold uppercase tracking-widest">Section 1.10 — Immediate Outcome Already Taken</span>
            <h3 className="text-xl font-bold text-gray-900">From Research to Real Impact</h3>
          </div>
        </div>
        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm mb-5">
          <p className="text-gray-700 text-sm leading-relaxed">
            Presented initial findings to a local single-mother support group (12 members). They unanimously requested the "Car Cry Validation" audio as a near-term deliverable. A 3-minute validation message was recorded and shared; the group reported that hearing <span className="font-semibold text-gray-900">"It's okay to cry in your car"</span> normalised their private grief. This feedback directly shaped the product ideas below and will inform a future talk for a regional church network.
          </p>
        </div>
        <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-sm mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-600 text-white p-2 rounded-lg"><Layers className="w-4 h-4" /></div>
            <div>
              <h4 className="font-bold text-gray-900">Product / Feature Ideas</h4>
              <p className="text-gray-500 text-xs">Conceptual — ready for prototyping if funding or partnerships emerge</p>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-green-100">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-green-50 border-b border-green-100">
                  <th className="text-left px-5 py-3 text-green-800 font-bold text-xs uppercase tracking-wider w-48">Support Concept</th>
                  <th className="text-left px-5 py-3 text-green-800 font-bold text-xs uppercase tracking-wider">Feature Description</th>
                </tr>
              </thead>
              <tbody>
                {productIdeas.map((row, i) => (
                  <tr key={row.concept} className={`border-b border-green-50 ${i % 2 === 0 ? 'bg-white' : 'bg-green-50/30'}`}>
                    <td className="px-5 py-4 font-semibold text-gray-900 text-sm align-top">{row.concept}</td>
                    <td className="px-5 py-4 text-gray-600 text-sm leading-relaxed align-top">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-6">
          <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors duration-200 shadow-md">
            <ExternalLink className="w-4 h-4" /> View Figma Process Flow
          </a>
        </div>
      </div>
    </div>

    {/* 1.11 What I Would Do Differently */}
    <div className="py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Section 1.11 — What I Would Do Differently</p>
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-gray-500 font-bold text-xs uppercase tracking-wider w-40">Area</th>
                <th className="text-left px-5 py-3 text-gray-500 font-bold text-xs uppercase tracking-wider">What I Would Change</th>
              </tr>
            </thead>
            <tbody>
              {improvements.map((row, i) => (
                <tr key={row.area} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                  <td className="px-5 py-4 font-semibold text-gray-900 text-sm align-top">{row.area}</td>
                  <td className="px-5 py-4 text-gray-600 text-sm leading-relaxed align-top">{row.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* 1.12 Limitations */}
    <div className="py-12 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Section 1.12 — Honest Limitations</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {limitations.map((l) => (
            <div key={l.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-1">{l.label}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{l.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

  </div>
);

export default Part1Content;
