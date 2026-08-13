import React from 'react';
import { CheckCircle, AlertTriangle, GitCompare } from 'lucide-react';

const strengths = [
  { title: 'Human-first sequencing', summary: 'Conducting human thematic analysis before AI queries prevents contamination — the single most important methodological decision.' },
  { title: 'Transparent rationale', summary: 'Each methodological choice is explained and justified — not common in exploratory studies.' },
  { title: 'Honest self-critique', summary: 'Sections 1.11 and 1.12 are genuinely candid — the researcher does not oversell findings.' },
  { title: 'Practical impact', summary: 'The "Car Cry Validation" outcome demonstrates real-world application quickly.' },
  { title: 'Rubric defined before scoring', summary: 'Defining the rubric prior to analysis reduces post-hoc rationalisation.' },
];

const concerns = [
  { title: 'Single-rater reliability', detail: 'The researcher built the baseline, selected quotes, designed the rubric, and applied all scores herself. There is no way to verify that the "hidden patterns" were not unconsciously shaped by prior familiarity with participants or the client\'s framing.' },
  { title: 'Scoring ceiling unclear', detail: 'The original rubric did not clearly define what would constitute a 5/5 on Hidden Feeling Detection. This has been resolved in the updated rubric (Section 1.7).' },
  { title: 'Prompt priming', detail: 'The prompt included worked examples ("emotional contradictions," "hidden coping mechanisms") — this is directional priming, reducing the distinction between emergent and forced detection.' },
  { title: 'Subjective quote selection', detail: '"Most emotionally rich" selection criteria were applied by a single rater. Without a second reviewer, this selection remains vulnerable to confirmation bias.' },
  { title: 'Untested hypothesis', detail: 'The "predict future patterns" arm of the hypothesis was not tested and should be dropped or explicitly scoped for future research.' },
  { title: 'Participant validation absent', detail: 'The study makes claims about hidden feelings without participant confirmation. The proposed Participant Recognition Rate should be a priority, not optional.' },
];

const minorObservations = [
  { text: 'The term "reliable" in the original scoring table was used informally. In qualitative research, reliability has a specific meaning. The researcher likely means "valid" or "scored according to rubric." — Corrected in updated rubric (Section 1.7).' },
  { text: 'The three AI tools are described as representing "a range of architectures and training approaches," but no evidence is provided to support this claim. It is a reasonable assumption, but should be stated as such.' },
  { text: 'The additional hidden patterns identified in Section 1.8 ("after closer reading") were presented without clarity on when they were identified relative to AI scoring. — Clarified in Section 1.8 with a timing note.' },
];

const learnings = [
  { area: 'Scoring rubric', learning: 'The ceiling of the Hidden Feeling Detection scale was unclear. Now defined: 5/5 requires detection + meaningful interpretation.' },
  { area: 'Single-rater design', learning: 'Already acknowledged, but the reviewer emphasised its significance. A second reviewer is essential in future iterations.' },
  { area: 'Prompt priming', learning: 'Claimed the prompt was neutral, but the worked examples are directional priming. Now acknowledged explicitly.' },
  { area: 'Quote selection', learning: '"Most emotionally rich" is subjective. A second reviewer should confirm selection in future studies.' },
  { area: 'Untested hypothesis', learning: 'The "predict future patterns" claim was not tested. Scoped for future research or removed.' },
  { area: 'Participant validation', learning: 'The reviewer strongly supported the Participant Recognition Rate. Prioritised for the next phase.' },
];

const actions = [
  { area: 'Scoring rubric', action: 'Clarified the 5/5 ceiling — now requires both detection and meaningful interpretation.' },
  { area: 'Prompt design', action: 'Remove worked examples from the prompt to reduce directional priming.' },
  { area: 'Quote selection', action: 'Include a second reviewer to confirm information-rich case selection.' },
  { area: 'Hypothesis', action: 'Drop the "predict future patterns" arm or scope it explicitly for a future study.' },
  { area: 'Participant validation', action: 'Run the Participant Recognition Rate survey as a priority, not an optional step.' },
  { area: 'Terminology', action: 'Use "valid" rather than "reliable" to describe scoring consistency.' },
];

const Part2Content = () => (
  <div className="divide-y divide-gray-100">

    {/* 2.1 Purpose */}
    <div className="py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 items-start mb-6">
          <div className="bg-orange-500 text-white p-3 rounded-xl shrink-0"><GitCompare className="w-6 h-6" /></div>
          <div>
            <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">Section 2.1</span>
            <h3 className="text-xl font-bold text-gray-900">Purpose of the Second Study</h3>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-5">
          <p className="text-gray-700 text-sm leading-relaxed font-medium">
            The reviewer was told: <span className="italic">"You are not constrained in what you can say — I want your honest, unfiltered feedback."</span>
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { num: '01', text: 'Test whether another researcher would reach similar conclusions.' },
            { num: '02', text: 'Identify blind spots or hidden patterns missed in the original study.' },
            { num: '03', text: 'Surface methodological weaknesses not fully acknowledged in Part 1.' },
          ].map((item) => (
            <div key={item.num} className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
              <p className="text-orange-300 text-3xl font-bold mb-2">{item.num}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 2.2 Overall Impression */}
    <div className="py-12 px-6 bg-orange-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">Section 2.2 — Second Reviewer's Overall Impression</p>
        <blockquote className="bg-white border-l-4 border-orange-400 rounded-r-2xl p-6 shadow-sm">
          <p className="text-gray-700 text-base leading-relaxed italic">
            "This is a thoughtful, self-aware exploratory study with genuine practical value. The researcher demonstrates methodological honesty throughout — acknowledging limitations openly and reflecting critically on her own design choices. That said, several areas warrant closer scrutiny."
          </p>
          <footer className="mt-3 text-orange-600 text-xs font-bold uppercase tracking-widest">— Claude (Independent Second Reviewer)</footer>
        </blockquote>
      </div>
    </div>

    {/* 2.3 Strengths */}
    <div className="py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-5">Section 2.3 — Strengths Identified by the Second Reviewer</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {strengths.map((s) => (
            <div key={s.title} className="bg-green-50 border border-green-100 rounded-2xl p-5 flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{s.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 2.4 Concerns */}
    <div className="py-12 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-5">Section 2.4 — Concerns and Challenges Raised</p>
        <div className="space-y-3">
          {concerns.map((c) => (
            <div key={c.title} className="bg-white border border-amber-100 rounded-2xl p-5 flex gap-3 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">{c.title}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 2.5 Minor Observations */}
    <div className="py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Section 2.5 — Minor Observations</p>
        <div className="space-y-3">
          {minorObservations.map((o, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 flex gap-3">
              <span className="text-gray-400 text-xs font-bold bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-gray-600 text-sm leading-relaxed">{o.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* 2.6 Summary Verdict */}
    <div className="py-12 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">Section 2.6 — Second Reviewer's Summary Verdict</p>
        <blockquote className="bg-white/5 border border-white/10 rounded-2xl p-7">
          <p className="text-gray-200 text-base leading-relaxed italic">
            "This is a credible, carefully reasoned exploratory study that is honest about what it can and cannot claim. Its findings are directional, not generalisable — and the researcher says so. The most important next steps are: adding a second human rater, tightening the scoring rubric ceiling, returning to participants for validation, and removing or scoping the untested 'future patterns' hypothesis. The methodology is promising enough to warrant a larger follow-up study. This reviewer would support it moving forward with the revisions noted above."
          </p>
          <footer className="mt-4 text-orange-400 text-xs font-bold uppercase tracking-widest">— Claude (Independent Second Reviewer)</footer>
        </blockquote>
      </div>
    </div>

    {/* 2.7 What I Learned */}
    <div className="py-12 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Section 2.7 — What I Learned from the Second Review</p>
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-gray-500 font-bold text-xs uppercase tracking-wider w-40">Area</th>
                <th className="text-left px-5 py-3 text-gray-500 font-bold text-xs uppercase tracking-wider">Learning</th>
              </tr>
            </thead>
            <tbody>
              {learnings.map((row, i) => (
                <tr key={row.area} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}>
                  <td className="px-5 py-4 font-semibold text-gray-900 text-sm align-top">{row.area}</td>
                  <td className="px-5 py-4 text-gray-600 text-sm leading-relaxed align-top">{row.learning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* 2.8 What I Will Do Differently */}
    <div className="py-12 px-6 bg-orange-50">
      <div className="max-w-4xl mx-auto">
        <p className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">Section 2.8 — What I Will Do Differently (Based on Second Review)</p>
        <div className="overflow-x-auto rounded-2xl border border-orange-100 shadow-sm">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-orange-100 border-b border-orange-200">
                <th className="text-left px-5 py-3 text-orange-900 font-bold text-xs uppercase tracking-wider w-40">Area</th>
                <th className="text-left px-5 py-3 text-orange-900 font-bold text-xs uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((row, i) => (
                <tr key={row.area} className={`border-b border-orange-50 ${i % 2 === 0 ? 'bg-white' : 'bg-orange-50/50'}`}>
                  <td className="px-5 py-4 font-semibold text-gray-900 text-sm align-top">{row.area}</td>
                  <td className="px-5 py-4 text-gray-700 text-sm leading-relaxed align-top">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
);

export default Part2Content;
