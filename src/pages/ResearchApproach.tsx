import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ChevronDown, Search, Compass, ClipboardList, GitBranch,
  Microscope, MessageCircleQuestion, BarChart3, Brain, FileStack,
  LayoutGrid, Sparkles, Users, Target, ArrowUp, Copy, Check,
  AlertTriangle, Info,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// ── Accent color system ──────────────────────────────────────────────
type Accent = {
  hex: string;
  bg: string;
  bgLight: string;
  border: string;
  text: string;
  headerBg: string;
  chipBg: string;
  chipText: string;
  chipBorder: string;
};

const ACCENTS: Record<string, Accent> = {
  navy:    { hex: '#1e3a5f', bg: 'bg-[#1e3a5f]',    bgLight: 'bg-[#1e3a5f]/5',  border: 'border-[#1e3a5f]/30',  text: 'text-[#1e3a5f]',    headerBg: 'bg-[#1e3a5f]',    chipBg: 'bg-[#1e3a5f]/10',  chipText: 'text-[#1e3a5f]',    chipBorder: 'border-[#1e3a5f]/20'  },
  blue:    { hex: '#2563eb', bg: 'bg-blue-600',      bgLight: 'bg-blue-50',       border: 'border-blue-200',       text: 'text-blue-700',      headerBg: 'bg-blue-800',      chipBg: 'bg-blue-100',      chipText: 'text-blue-700',     chipBorder: 'border-blue-200'      },
  teal:    { hex: '#0d9488', bg: 'bg-teal-600',       bgLight: 'bg-teal-50',       border: 'border-teal-200',       text: 'text-teal-700',      headerBg: 'bg-teal-800',      chipBg: 'bg-teal-100',      chipText: 'text-teal-700',     chipBorder: 'border-teal-200'      },
  purple:  { hex: '#7c3aed', bg: 'bg-violet-600',     bgLight: 'bg-violet-50',     border: 'border-violet-200',     text: 'text-violet-700',    headerBg: 'bg-violet-800',    chipBg: 'bg-violet-100',    chipText: 'text-violet-700',   chipBorder: 'border-violet-200'    },
  orange:  { hex: '#ea580c', bg: 'bg-orange-600',     bgLight: 'bg-orange-50',      border: 'border-orange-200',     text: 'text-orange-700',    headerBg: 'bg-orange-800',    chipBg: 'bg-orange-100',    chipText: 'text-orange-700',   chipBorder: 'border-orange-200'   },
  green:   { hex: '#16a34a', bg: 'bg-green-600',     bgLight: 'bg-green-50',      border: 'border-green-200',      text: 'text-green-700',     headerBg: 'bg-green-800',     chipBg: 'bg-green-100',     chipText: 'text-green-700',    chipBorder: 'border-green-200'    },
  magenta: { hex: '#c026d3', bg: 'bg-fuchsia-600',    bgLight: 'bg-fuchsia-50',    border: 'border-fuchsia-200',    text: 'text-fuchsia-700',   headerBg: 'bg-fuchsia-800',   chipBg: 'bg-fuchsia-100',   chipText: 'text-fuchsia-700',  chipBorder: 'border-fuchsia-200'  },
  burgundy:{ hex: '#9f1239', bg: 'bg-rose-800',       bgLight: 'bg-rose-50',       border: 'border-rose-200',      text: 'text-rose-700',      headerBg: 'bg-rose-900',      chipBg: 'bg-rose-100',     chipText: 'text-rose-700',     chipBorder: 'border-rose-200'     },
  brown:   { hex: '#78350f', bg: 'bg-amber-800',      bgLight: 'bg-amber-50',      border: 'border-amber-200',      text: 'text-amber-800',     headerBg: 'bg-amber-900',     chipBg: 'bg-amber-100',    chipText: 'text-amber-800',    chipBorder: 'border-amber-200'    },
  indigo:  { hex: '#4f46e5', bg: 'bg-indigo-600',     bgLight: 'bg-indigo-50',     border: 'border-indigo-200',     text: 'text-indigo-700',    headerBg: 'bg-indigo-800',    chipBg: 'bg-indigo-100',    chipText: 'text-indigo-700',   chipBorder: 'border-indigo-200'   },
  turquoise:{hex: '#0891b2',bg: 'bg-cyan-600',        bgLight: 'bg-cyan-50',       border: 'border-cyan-200',       text: 'text-cyan-700',      headerBg: 'bg-cyan-800',      chipBg: 'bg-cyan-100',      chipText: 'text-cyan-700',     chipBorder: 'border-cyan-200'     },
  gold:    { hex: '#ca8a04', bg: 'bg-yellow-600',     bgLight: 'bg-yellow-50',     border: 'border-yellow-200',     text: 'text-yellow-700',    headerBg: 'bg-yellow-800',    chipBg: 'bg-yellow-100',    chipText: 'text-yellow-700',   chipBorder: 'border-yellow-200'   },
};

// ── Copy-to-clipboard hook ───────────────────────────────────────────
function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };
  return { copied, copy };
}

// ── Reusable bits ────────────────────────────────────────────────────
function Callout({ icon, children, variant = 'info', accentHex }: { icon?: React.ReactNode; children: React.ReactNode; variant?: 'info' | 'warning'; accentHex?: string }) {
  const styles = variant === 'warning'
    ? 'bg-amber-50 border-amber-200 text-amber-900'
    : 'bg-gray-50 border-gray-200 text-gray-800';
  return (
    <div className={`flex gap-3 items-start rounded-xl border px-5 py-4 text-sm leading-relaxed ${styles}`}>
      {icon ?? (variant === 'warning' ? <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" /> : <Info className="w-5 h-5 shrink-0 mt-0.5 text-gray-400" />)}
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

function PromptCard({ title, prompt, accentHex }: { title: string; prompt: string; accentHex: string }) {
  const { copied, copy } = useCopy();
  const id = title;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: accentHex }}>{title}</p>
        <button
          onClick={() => copy(prompt, id)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
          aria-label={`Copy ${title} prompt`}
        >
          {copied === id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied === id ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{prompt}</p>
    </div>
  );
}

function Th({ children, accent }: { children: React.ReactNode; accent: Accent }) {
  return <th className={`px-4 py-3 text-left font-bold text-xs uppercase tracking-widest text-white whitespace-nowrap ${accent.headerBg}`}>{children}</th>;
}
function Td({ children, bold }: { children: React.ReactNode; bold?: boolean }) {
  return <td className={`px-4 py-3 align-top leading-relaxed text-gray-700 ${bold ? 'font-bold text-gray-900' : ''}`}>{children}</td>;
}
function ScrollTable({ headers, rows, accent, minWidth = 800 }: { headers: string[]; rows: React.ReactNode[][]; accent: Accent; minWidth?: number }) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100">
      <table className="w-full text-xs border-collapse bg-white" style={{ minWidth: `${minWidth}px` }}>
        <thead><tr>{headers.map((h, i) => <Th key={i} accent={accent}>{h}</Th>)}</tr></thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}>
              {row.map((cell, j) => <Td key={j} bold={j === 0}>{cell}</Td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────

const foundationsItems = [
  { h: 'Research Purpose', d: 'Clarify what decision the research must inform before choosing any method.' },
  { h: 'Research Questions', d: 'Frame open, specific questions that guide inquiry without presupposing the answer.' },
  { h: 'Assumptions & Hypotheses', d: 'Surface and document assumptions so they can be tested rather than silently relied on.' },
  { h: 'Qualitative vs. Quantitative', d: 'Qualitative explores why and how; quantitative measures how often and how much.' },
  { h: 'Generative vs. Evaluative', d: 'Generative discovers problems and opportunities; evaluative tests existing solutions.' },
  { h: 'Attitudinal vs. Behavioral', d: 'Attitudinal captures what people say; behavioral captures what people do.' },
  { h: 'Ethics & Informed Consent', d: 'Participants must understand what they are agreeing to and can withdraw at any time.' },
  { h: 'Bias Awareness', d: 'Actively check for confirmation, selection, researcher, and recency bias throughout.' },
  { h: 'Accessibility & Inclusion', d: 'Recruit diverse participants and ensure methods and materials are accessible.' },
  { h: 'Research Limitations', d: 'State what the study can and cannot conclude; scope limits explicitly.' },
  { h: 'Evidence Quality', d: 'Prefer triangulated evidence over single-source claims; weight findings accordingly.' },
  { h: 'Researcher Neutrality', d: 'Report what the evidence shows, not what the researcher or stakeholder hopes to see.' },
  { h: 'When Research Is Not the Answer', d: 'If the decision is already made, the timeline is too short, or no question exists, research will not help.' },
];

const planningItems = [
  'Research objective', 'Business objective', 'Research questions', 'Stakeholders',
  'Target participants', 'Recruitment criteria', 'Method selection', 'Sample-size considerations',
  'Timeline', 'Budget', 'Risks', 'Dependencies',
  'Consent and privacy', 'Roles and responsibilities', 'Communication plan', 'Success criteria',
];

const planningTable: React.ReactNode[][] = [
  ['Decision', 'What decision will this research inform?'],
  ['Audience', 'Who needs the findings?'],
  ['Participants', 'Whose experience must be represented?'],
  ['Method', 'What method best answers the question?'],
  ['Timing', 'When are findings needed?'],
  ['Evidence', 'What will count as credible evidence?'],
  ['Impact', 'How will the findings be used?'],
];

const methodDecisionGroups = [
  {
    label: 'Understand behaviors and motivations',
    items: ['User interviews', 'Contextual inquiry', 'Ethnographic observation', 'Diary study', 'Field study'],
  },
  {
    label: 'Discover unmet needs',
    items: ['Generative interviews', 'Jobs-to-be-Done interviews', 'Stakeholder interviews', 'Concept exploration', 'Participatory research'],
  },
  {
    label: 'Improve navigation or information architecture',
    items: ['Card sorting', 'Tree testing', 'First-click testing', 'Content testing'],
  },
  {
    label: 'Evaluate a design',
    items: ['Moderated usability testing', 'Unmoderated usability testing', 'Prototype testing', 'Accessibility evaluation', 'Heuristic evaluation'],
  },
  {
    label: 'Measure attitudes or satisfaction',
    items: ['Surveys', 'System Usability Scale (SUS)', 'Customer Satisfaction (CSAT)', 'Customer Effort Score (CES)', 'Net Promoter Score (NPS)'],
  },
  {
    label: 'Compare alternatives',
    items: ['Concept testing', 'Preference testing', 'A/B testing', 'Multivariate testing'],
  },
  {
    label: 'Prioritize opportunities or features',
    items: ['Kano analysis', 'MaxDiff', 'Ranking surveys', 'Dot voting', 'Impact-effort matrix'],
  },
];

type MethodRow = {
  name: string; usedFor: string; stage: string; participants: string; time: string;
  metrics: string; strengths: string; limitations: string; deliverable: string;
  types: string[];
};
const methodsLibrary: MethodRow[] = [
  { name: 'Stakeholder interviews', usedFor: 'Aligning on goals, constraints, and decisions', stage: 'Generative', participants: '5–10', time: '45–60 min', metrics: 'Alignment, priorities, assumptions surfaced', strengths: 'Builds buy-in; surfaces hidden constraints', limitations: 'Self-reported; may not reflect user reality', deliverable: 'Stakeholder summary, alignment map', types: ['Qualitative', 'Generative', 'Attitudinal'] },
  { name: 'User interviews', usedFor: 'Understanding behaviors, motivations, and needs', stage: 'Generative', participants: '8–12', time: '45–60 min', metrics: 'Themes, pain points, quotes', strengths: 'Deep contextual understanding', limitations: 'What people say ≠ what they do', deliverable: 'Interview insights, themes', types: ['Qualitative', 'Generative', 'Attitudinal'] },
  { name: 'Contextual inquiry', usedFor: 'Observing work in its real environment', stage: 'Generative', participants: '4–8', time: '1–3 hours', metrics: 'Workflow steps, tool usage, interruptions', strengths: 'Reveals real vs. reported behavior', limitations: 'Time-intensive; small sample', deliverable: 'Workflow map, observation notes', types: ['Qualitative', 'Generative', 'Behavioral'] },
  { name: 'Ethnography', usedFor: 'Deep cultural and contextual understanding', stage: 'Generative', participants: 'Small, extended', time: 'Days–weeks', metrics: 'Cultural patterns, environmental factors', strengths: 'Richest contextual data', limitations: 'Very time-intensive; observer effect', deliverable: 'Ethnographic report', types: ['Qualitative', 'Generative', 'Behavioral'] },
  { name: 'Field study', usedFor: 'Studying users in their actual environment', stage: 'Generative', participants: '5–10', time: '2–4 hours', metrics: 'Environmental factors, workarounds', strengths: 'Real-world context', limitations: 'Logistics; scheduling complexity', deliverable: 'Field study report', types: ['Qualitative', 'Generative', 'Behavioral'] },
  { name: 'Diary study', usedFor: 'Tracking behavior and emotions over time', stage: 'Generative', participants: '5–7', time: '5–7 days', metrics: 'Frequency, friction, emotional tracking', strengths: 'Captures longitudinal patterns', limitations: 'Participant dropout; self-reporting bias', deliverable: 'Diary analysis, behavior patterns', types: ['Qualitative', 'Generative', 'Behavioral'] },
  { name: 'Focus groups', usedFor: 'Group dynamics and shared attitudes', stage: 'Generative', participants: '6–10 per group', time: '90 min', metrics: 'Group attitudes, reactions', strengths: 'Surface group norms; fast ideation', limitations: 'Groupthink; dominant voices', deliverable: 'Focus group summary', types: ['Qualitative', 'Generative', 'Attitudinal'] },
  { name: 'Participatory design', usedFor: 'Co-creating solutions with users', stage: 'Generative', participants: '4–8', time: '1–2 hours', metrics: 'Co-created artifacts, ideas', strengths: 'Users as partners; surfaces latent needs', limitations: 'Requires skilled facilitation', deliverable: 'Co-designed artifacts', types: ['Qualitative', 'Generative', 'Attitudinal'] },
  { name: 'Surveys', usedFor: 'Measuring attitudes at scale', stage: 'Generative / Evaluative', participants: '100+', time: 'Days to collect', metrics: 'NPS, CSAT, SUS, custom scales', strengths: 'Scalable; quantifiable', limitations: 'No behavioral context; low response rates', deliverable: 'Survey report, charts', types: ['Quantitative', 'Attitudinal'] },
  { name: 'Usability testing', usedFor: 'Identifying usability issues in a design', stage: 'Evaluative', participants: '5–8', time: '45–60 min', metrics: 'Task success, error rate, time on task', strengths: 'Direct observation of user struggles', limitations: 'Small sample; moderated bias', deliverable: 'Usability report, findings', types: ['Qualitative', 'Evaluative', 'Behavioral'] },
  { name: 'Prototype testing', usedFor: 'Validating concepts before development', stage: 'Evaluative', participants: '6–8', time: '30–45 min', metrics: 'Comprehension, perceived usefulness', strengths: 'Early validation; low cost', limitations: 'Prototype fidelity limits realism', deliverable: 'Prototype test findings', types: ['Qualitative', 'Evaluative', 'Behavioral'] },
  { name: 'Concept testing', usedFor: 'Evaluating appeal of a concept', stage: 'Evaluative', participants: '6–8', time: '30–45 min', metrics: 'Preference, comprehension, intent', strengths: 'Fast feedback on direction', limitations: 'No behavioral data', deliverable: 'Concept test summary', types: ['Qualitative', 'Evaluative', 'Attitudinal'] },
  { name: 'Card sorting', usedFor: 'Understanding mental models of information', stage: 'Evaluative', participants: '15–20', time: '20–30 min', metrics: 'Category agreement, mental models', strengths: 'Reveals user IA expectations', limitations: 'Does not test navigation', deliverable: 'IA recommendation', types: ['Quantitative', 'Evaluative', 'Behavioral'] },
  { name: 'Tree testing', usedFor: 'Evaluating findability of information', stage: 'Evaluative', participants: '50+', time: '10–15 min', metrics: 'Success rate, time, directness', strengths: 'Validates IA at scale', limitations: 'No visual design context', deliverable: 'Tree test report', types: ['Quantitative', 'Evaluative', 'Behavioral'] },
  { name: 'First-click testing', usedFor: 'Testing where users click first', stage: 'Evaluative', participants: '20+', time: '5 min', metrics: 'First-click accuracy, time', strengths: 'Quick validation of navigation', limitations: 'Single interaction only', deliverable: 'Click map, findings', types: ['Quantitative', 'Evaluative', 'Behavioral'] },
  { name: 'Five-second testing', usedFor: 'Measuring first impressions', stage: 'Evaluative', participants: '20+', time: '5 seconds', metrics: 'Recall, impression, comprehension', strengths: 'Fast feedback on visual design', limitations: 'No task-based data', deliverable: 'Five-second test summary', types: ['Quantitative', 'Evaluative', 'Attitudinal'] },
  { name: 'Accessibility testing', usedFor: 'Identifying barriers for users with disabilities', stage: 'Evaluative', participants: '5–8 + automated', time: 'Varies', metrics: 'WCAG conformance, issue severity', strengths: 'Legal compliance; inclusive design', limitations: 'Cannot catch all real-world barriers', deliverable: 'Accessibility report', types: ['Mixed Methods', 'Evaluative', 'Behavioral'] },
  { name: 'Heuristic evaluation', usedFor: 'Expert review against usability principles', stage: 'Evaluative', participants: '3–5 experts', time: '2–4 hours', metrics: 'Heuristic violations, severity', strengths: 'Fast; catches obvious issues', limitations: 'Expert bias; not user data', deliverable: 'Heuristic evaluation report', types: ['Qualitative', 'Evaluative', 'Behavioral'] },
  { name: 'Cognitive walkthrough', usedFor: 'Stepping through a task from a user perspective', stage: 'Evaluative', participants: '1–3 experts', time: '1–2 hours', metrics: 'Task success prediction, pain points', strengths: 'Identifies learning barriers', limitations: 'Expert perspective, not real users', deliverable: 'Walkthrough findings', types: ['Qualitative', 'Evaluative', 'Behavioral'] },
  { name: 'Competitive analysis', usedFor: 'Benchmarking against competitors', stage: 'Generative', participants: 'N/A', time: '1–2 days', metrics: 'Feature comparison, positioning', strengths: 'Industry context; gap identification', limitations: 'Surface-level; no user data', deliverable: 'Competitive matrix', types: ['Mixed Methods', 'Generative'] },
  { name: 'Analytics review', usedFor: 'Understanding actual user behavior', stage: 'Generative / Evaluative', participants: 'N/A', time: '2–4 hours', metrics: 'Drop-off, conversion, time on page', strengths: 'Real behavioral data at scale', limitations: 'No context for why', deliverable: 'Analytics report', types: ['Quantitative', 'Behavioral'] },
  { name: 'Heatmaps', usedFor: 'Visualizing where users click and scroll', stage: 'Evaluative', participants: 'N/A', time: 'Ongoing', metrics: 'Click density, scroll depth', strengths: 'Visual pattern identification', limitations: 'No intent; can mislead', deliverable: 'Heatmap report', types: ['Quantitative', 'Evaluative', 'Behavioral'] },
  { name: 'Session recordings', usedFor: 'Watching real user sessions', stage: 'Evaluative', participants: 'N/A', time: 'Ongoing', metrics: 'Rage clicks, dead clicks, session paths', strengths: 'Real behavior; context-rich', limitations: 'No direct user feedback', deliverable: 'Session analysis', types: ['Qualitative', 'Evaluative', 'Behavioral'] },
  { name: 'A/B testing', usedFor: 'Comparing two variants to see which performs better', stage: 'Evaluative', participants: 'Thousands', time: 'Days–weeks', metrics: 'Conversion, engagement, task success', strengths: 'Causal evidence; high confidence', limitations: 'Requires traffic; tests one variable', deliverable: 'Experiment report', types: ['Quantitative', 'Evaluative', 'Behavioral'] },
  { name: 'Longitudinal research', usedFor: 'Tracking changes over extended periods', stage: 'Generative / Evaluative', participants: '10–20', time: 'Weeks–months', metrics: 'Behavior change, adoption, retention', strengths: 'Captures real evolution', limitations: 'Expensive; participant attrition', deliverable: 'Longitudinal study report', types: ['Mixed Methods', 'Behavioral'] },
  { name: 'Customer journey research', usedFor: 'Mapping the end-to-end experience', stage: 'Generative', participants: '4–8', time: '1–2 hours', metrics: 'Friction points, emotional journey, touchpoints', strengths: 'Holistic view; surfaces gaps', limitations: 'Time-intensive; requires synthesis', deliverable: 'Journey map', types: ['Qualitative', 'Generative', 'Attitudinal'] },
  { name: 'Service blueprinting', usedFor: 'Mapping front-stage and back-stage processes', stage: 'Generative', participants: 'Cross-functional', time: '1–2 days', metrics: 'Handoffs, process gaps, alignment', strengths: 'Aligns teams; surfaces hidden work', limitations: 'Requires cross-functional participation', deliverable: 'Service blueprint', types: ['Mixed Methods', 'Generative'] },
  { name: 'Jobs-to-be-Done research', usedFor: 'Understanding the job a user is hiring a product to do', stage: 'Generative', participants: '8–12', time: '45–60 min', metrics: 'Job statements, needs, outcomes', strengths: 'Focuses on outcomes, not features', limitations: 'Requires skilled interviewing', deliverable: 'JTBD framework, opportunity map', types: ['Qualitative', 'Generative', 'Attitudinal'] },
  { name: 'Kano analysis', usedFor: 'Prioritizing features by user satisfaction', stage: 'Evaluative', participants: '50+', time: 'Survey + analysis', metrics: 'Feature categories (must-be, one-dimensional, attractive)', strengths: 'Data-driven prioritization', limitations: 'Survey design is critical', deliverable: 'Kano model, priority chart', types: ['Quantitative', 'Evaluative', 'Attitudinal'] },
  { name: 'MaxDiff', usedFor: 'Measuring preference among many options', stage: 'Evaluative', participants: '100+', time: 'Survey', metrics: 'Preference scores, rank order', strengths: 'Better than simple ranking; forces trade-offs', limitations: 'Requires statistical analysis', deliverable: 'MaxDiff report', types: ['Quantitative', 'Evaluative', 'Attitudinal'] },
];

const methodFilters = ['Qualitative', 'Quantitative', 'Mixed Methods', 'Generative', 'Evaluative', 'Behavioral', 'Attitudinal'];

// Question Library data
type QuestionCategory = { category: string; questions: string[] };
type QuestionAudience = { tab: string; categories: QuestionCategory[] };
const questionLibrary: QuestionAudience[] = [
  {
    tab: 'Users',
    categories: [
      { category: 'Background and context', questions: ['Tell me about your role and what you do day-to-day.', 'How long have you been using [product/process]?', 'What does a typical day look like for you?'] },
      { category: 'Current behavior', questions: ['Walk me through how you currently complete [task].', 'What tools do you use to get this done?', 'How often do you do this?'] },
      { category: 'Goals', questions: ['What are you trying to achieve when you use [product]?', 'What does success look like for you?', 'What would make this easier?'] },
      { category: 'Motivations', questions: ['What made you start using this?', 'What would make you stop?', 'What is the most rewarding part of this process?'] },
      { category: 'Pain points', questions: ['Where do you get stuck or frustrated?', 'What is the hardest part of this process?', 'If you could change one thing, what would it be?'] },
      { category: 'Workarounds', questions: ['Have you found a way around [problem]?', 'Is there anything you do that the tool was not designed for?', 'Do you use any other tools alongside this?'] },
      { category: 'Decision-making', questions: ['How do you decide which option to choose?', 'Who else is involved in this decision?', 'What information do you need before deciding?'] },
      { category: 'Trust', questions: ['How much do you trust the information you see here?', 'What would make you trust it more?', 'Have you ever doubted the results?'] },
      { category: 'Expectations', questions: ['What did you expect to happen when you started?', 'Was anything surprising?', 'What would have made this clearer?'] },
      { category: 'Accessibility', questions: ['Do you use any assistive technology?', 'Is there anything that makes this hard to see, hear, or use?', 'Have you needed to adjust settings to use this?'] },
      { category: 'Product feedback', questions: ['What works well for you?', 'What is missing?', 'If this feature disappeared tomorrow, how would you feel?'] },
      { category: 'Closing questions', questions: ['Is there anything I should have asked but did not?', 'What else should I know about your experience?', 'Would you be willing to participate in future research?'] },
    ],
  },
  {
    tab: 'Stakeholders & Business Partners',
    categories: [
      { category: 'Business goals', questions: ['What business outcome are you trying to achieve?', 'How does this project connect to broader strategy?'] },
      { category: 'Problem definition', questions: ['What problem are you trying to solve?', 'Who is most affected by this problem?'] },
      { category: 'Assumptions', questions: ['What assumptions are you making about users?', 'What if those assumptions are wrong?'] },
      { category: 'Risks', questions: ['What happens if we do nothing?', 'What is the biggest risk of this project?'] },
      { category: 'Constraints', questions: ['What constraints are we working within?', 'What is non-negotiable?'] },
      { category: 'Priorities', questions: ['What matters most — speed, quality, or cost?', 'What is the priority order of these features?'] },
      { category: 'Success measures', questions: ['How will we know this is successful?', 'What metrics matter to you?'] },
      { category: 'Decision ownership', questions: ['Who makes the final decision?', 'Who else needs to approve this?'] },
      { category: 'Existing evidence', questions: ['What research or data already exists?', 'What do we already know?'] },
      { category: 'Research expectations', questions: ['What do you hope this research will tell you?', 'What would change your mind?'] },
    ],
  },
  {
    tab: 'Executives',
    categories: [
      { category: 'Decision focus', questions: [
        'What decision must this research inform?',
        'What happens if we do nothing?',
        'What risk are we trying to reduce?',
        'What evidence would change your mind?',
        'What outcome would make this effort successful?',
        'Which tradeoffs are acceptable?',
        'Who must act on these findings?',
      ] },
    ],
  },
  {
    tab: 'Product Managers',
    categories: [
      { category: 'Product decisions', questions: [
        'What user problem is this feature intended to solve?',
        'What assumptions support the roadmap decision?',
        'How will success be measured?',
        'What constraints are already known?',
        'Which findings could change prioritization?',
      ] },
    ],
  },
  {
    tab: 'Designers',
    categories: [
      { category: 'Design decisions', questions: [
        'What design assumptions are most uncertain?',
        'Which user behavior is the design trying to support?',
        'Where do users have the greatest cognitive burden?',
        'What alternatives have been considered?',
        'What feedback would be most useful now?',
      ] },
    ],
  },
  {
    tab: 'Engineers',
    categories: [
      { category: 'Technical constraints', questions: [
        'What technical constraints may affect the experience?',
        'Which assumptions carry the most implementation risk?',
        'What telemetry is currently available?',
        'What is difficult or costly to change?',
        'What should research understand before testing?',
      ] },
    ],
  },
  {
    tab: 'SMEs',
    categories: [
      { category: 'Domain expertise', questions: [
        'What must users understand or do correctly?',
        'What common mistakes occur?',
        'Which information is essential?',
        'Where do novices struggle?',
        'What does successful performance look like?',
      ] },
    ],
  },
  {
    tab: 'Customer Support',
    categories: [
      { category: 'Support insights', questions: [
        'What are the most common issues users contact you about?',
        'Where do users seem most confused?',
        'What questions do you hear most often?',
        'What issues are hardest to resolve?',
      ] },
    ],
  },
  {
    tab: 'Sales',
    categories: [
      { category: 'Sales insights', questions: [
        'What objections do prospects raise most?',
        'What features do prospects ask about most?',
        'What causes deals to stall?',
        'What do competitors offer that we do not?',
      ] },
    ],
  },
  {
    tab: 'Marketing',
    categories: [
      { category: 'Market insights', questions: [
        'How do customers describe the product in their words?',
        'What messaging resonates most?',
        'What segments are we missing?',
        'What research would help targeting?',
      ] },
    ],
  },
  {
    tab: 'Data Science',
    categories: [
      { category: 'Data insights', questions: [
        'What behavioral data is already available?',
        'What patterns have you noticed?',
        'What data is missing?',
        'What hypotheses need testing?',
      ] },
    ],
  },
  {
    tab: 'Accessibility',
    categories: [
      { category: 'Accessibility insights', questions: [
        'What barriers have users with disabilities reported?',
        'Which WCAG criteria are most at risk?',
        'What assistive technologies do users rely on?',
        'Where do automated tests and manual tests disagree?',
      ] },
    ],
  },
  {
    tab: 'Legal & Compliance',
    categories: [
      { category: 'Compliance insights', questions: [
        'What regulatory constraints affect this experience?',
        'What consent or disclosure requirements apply?',
        'What data privacy concerns exist?',
        'What risks should research avoid surfacing publicly?',
      ] },
    ],
  },
  {
    tab: 'Vendors & Partners',
    categories: [
      { category: 'Partner insights', questions: [
        'How does this integrate with your systems?',
        'What limitations should we be aware of?',
        'What feedback have you heard from your customers?',
        'What would make this partnership more effective?',
      ] },
    ],
  },
  {
    tab: 'AI Product Teams',
    categories: [
      { category: 'AI product insights', questions: [
        'What user problem is the AI solving?',
        'What happens when the AI is wrong?',
        'How transparent should the AI be to users?',
        'What guardrails are needed?',
        'How will we measure AI quality and trust?',
      ] },
    ],
  },
];

// Metrics Library
type MetricRow = { name: string; measures: string; formula: string; when: string; interpretation: string; strengths: string; limitations: string };
const metricsLibrary: MetricRow[] = [
  { name: 'Task success rate', measures: 'Whether users can complete a task', formula: '(Successful tasks / Total tasks) × 100', when: 'Usability testing', interpretation: 'Higher is better; compare across iterations', strengths: 'Simple, comparable', limitations: 'Does not measure quality or satisfaction' },
  { name: 'Completion rate', measures: 'Percentage of users who complete a flow', formula: '(Users who completed / Total users) × 100', when: 'Analytics, funnel analysis', interpretation: 'Low rates signal friction', strengths: 'Direct behavioral measure', limitations: 'Does not explain why users drop off' },
  { name: 'Error rate', measures: 'How often users make errors', formula: '(Errors / Total attempts) × 100', when: 'Usability testing', interpretation: 'High rates indicate usability issues', strengths: 'Pinpoints problem areas', limitations: 'Defining what counts as an error is subjective' },
  { name: 'Time on task', measures: 'How long a task takes', formula: 'Average time from start to completion', when: 'Usability testing', interpretation: 'Shorter is usually better', strengths: 'Objective measure', limitations: 'Fast does not mean successful' },
  { name: 'Time to completion', measures: 'Total time to reach a goal', formula: 'Time from entry to goal completion', when: 'Analytics, testing', interpretation: 'Compare against baseline and target', strengths: 'End-to-end measure', limitations: 'Affected by external factors' },
  { name: 'First-click success', measures: 'Whether the first click is correct', formula: '(Correct first clicks / Total) × 100', when: 'First-click testing', interpretation: 'Low rates indicate navigation problems', strengths: 'Quick diagnostic', limitations: 'Only measures one interaction' },
  { name: 'Navigation success', measures: 'Whether users find what they need', formula: '(Successful navigations / Total) × 100', when: 'Tree testing, usability', interpretation: 'Low rates signal IA problems', strengths: 'Tests IA directly', limitations: 'No visual design context' },
  { name: 'Directness', measures: 'Whether users take the shortest path', formula: '(Direct paths / Total paths) × 100', when: 'Tree testing', interpretation: 'Low directness suggests confusing IA', strengths: 'Measures efficiency', limitations: 'Does not capture satisfaction' },
  { name: 'Learnability', measures: 'How quickly users become proficient', formula: 'Time or errors across repeated trials', when: 'Longitudinal testing', interpretation: 'Faster improvement is better', strengths: 'Measures long-term usability', limitations: 'Requires repeated sessions' },
  { name: 'System Usability Scale (SUS)', measures: 'Perceived usability', formula: 'Sum of 10 scaled items × 2.5 (0–100)', when: 'Post-test survey', interpretation: '68 is average; above 80 is excellent', strengths: 'Validated, widely used', limitations: 'Self-reported; no diagnostic detail' },
  { name: 'Customer Satisfaction (CSAT)', measures: 'Satisfaction with a specific interaction', formula: '(Positive responses / Total) × 100', when: 'Post-interaction survey', interpretation: 'Higher is better', strengths: 'Simple, targeted', limitations: 'Context-dependent; can be inflated' },
  { name: 'Customer Effort Score (CES)', measures: 'How easy an interaction was', formula: 'Average of 1–7 or 1–5 scale', when: 'Post-interaction survey', interpretation: 'Lower effort is better', strengths: 'Predicts loyalty', limitations: 'Single-item; limited detail' },
  { name: 'Net Promoter Score (NPS)', measures: 'Likelihood to recommend', formula: '% Promoters − % Detractors', when: 'Survey', interpretation: 'Above 0 is good; above 50 is excellent', strengths: 'Simple, comparable across industries', limitations: 'Does not explain why; cultural bias' },
  { name: 'Single Ease Question (SEQ)', measures: 'Perceived difficulty of a single task', formula: '1–7 rating after each task', when: 'Usability testing', interpretation: 'Lower difficulty is better', strengths: 'Quick per-task measure', limitations: 'Self-reported; single item' },
  { name: 'Conversion rate', measures: 'Percentage of users who complete a goal', formula: '(Conversions / Total visitors) × 100', when: 'Analytics, A/B testing', interpretation: 'Higher is better; compare variants', strengths: 'Directly tied to business value', limitations: 'Does not explain why' },
  { name: 'Drop-off rate', measures: 'Where users abandon a flow', formula: '(Users at step N − Users at step N+1) / Users at step N × 100', when: 'Funnel analysis', interpretation: 'High drop-off signals friction', strengths: 'Pinpoints problem steps', limitations: 'No qualitative context' },
  { name: 'Activation rate', measures: 'Percentage of signups who reach a key milestone', formula: '(Activated users / Total signups) × 100', when: 'Product analytics', interpretation: 'Low rates signal onboarding gaps', strengths: 'Measures early engagement', limitations: 'Defining activation is context-specific' },
  { name: 'Adoption', measures: 'How widely a feature is used', formula: '(Users of feature / Total users) × 100', when: 'Post-launch analytics', interpretation: 'Low adoption may signal poor fit or awareness', strengths: 'Direct measure of uptake', limitations: 'Does not measure value' },
  { name: 'Retention', measures: 'Percentage of users who return over time', formula: '(Users active in period N / Users from period 0) × 100', when: 'Cohort analysis', interpretation: 'Higher retention indicates sustained value', strengths: 'Measures long-term value', limitations: 'Requires time; affected by external factors' },
  { name: 'Engagement', measures: 'Depth and frequency of interaction', formula: 'Sessions per user, time per session, actions per session', when: 'Product analytics', interpretation: 'Context-dependent', strengths: 'Rich behavioral signal', limitations: 'High engagement is not always positive' },
  { name: 'Feature usage', measures: 'How often specific features are used', formula: '(Feature users / Total users) × 100', when: 'Product analytics', interpretation: 'Low usage may signal low value or discoverability', strengths: 'Identifies valuable features', limitations: 'Does not explain why usage is low' },
  { name: 'Search success', measures: 'Whether users find what they search for', formula: '(Searches with a result click / Total searches) × 100', when: 'Search analytics', interpretation: 'Low rates signal poor search or content', strengths: 'Direct measure of search effectiveness', limitations: 'Does not measure satisfaction with results' },
  { name: 'Accessibility issue severity', measures: 'Impact of accessibility barriers', formula: 'Critical / Serious / Moderate / Minor (WCAG-based)', when: 'Accessibility testing', interpretation: 'Critical issues must be fixed before launch', strengths: 'Prioritizes remediation', limitations: 'Subjective severity assignment' },
  { name: 'Qualitative theme frequency', measures: 'How often a theme appears across participants', formula: 'Count of participants mentioning a theme / Total participants', when: 'Qualitative synthesis', interpretation: 'Higher frequency suggests stronger evidence', strengths: 'Quantifies qualitative data', limitations: 'Frequency ≠ importance' },
  { name: 'Severity ratings', measures: 'Impact of usability issues', formula: '1 (cosmetic) to 4 (critical)', when: 'Usability testing', interpretation: 'Critical issues block task completion', strengths: 'Prioritizes fixes', limitations: 'Subjective; varies by rater' },
  { name: 'Confidence level', measures: 'Statistical confidence in a result', formula: 'Typically 95% (p < 0.05)', when: 'Quantitative analysis', interpretation: 'Higher confidence reduces uncertainty', strengths: 'Standard statistical threshold', limitations: 'Does not imply practical significance' },
  { name: 'Statistical significance', measures: 'Whether a result is unlikely due to chance', formula: 'p-value < chosen alpha (e.g., 0.05)', when: 'A/B testing, surveys', interpretation: 'Significant results warrant attention', strengths: 'Reduces false positives', limitations: 'Significance ≠ importance; sensitive to sample size' },
  { name: 'Effect size', measures: 'Magnitude of a difference or relationship', formula: "Cohen's d, eta-squared, etc.", when: 'Quantitative analysis', interpretation: 'Larger effect sizes are more meaningful', strengths: 'Measures practical significance', limitations: 'Requires statistical expertise' },
];

// Synthesis
const synthesisItems = [
  { h: 'Cleaning and organizing notes', d: 'Transcribe, de-identify, and structure raw notes before analysis begins.' },
  { h: 'Interview coding', d: 'Tag segments of transcripts with descriptive and interpretive codes.' },
  { h: 'Affinity mapping', d: 'Cluster observations visually to surface patterns and relationships.' },
  { h: 'Theme development', d: 'Group related codes into themes that capture meaningful patterns.' },
  { h: 'Pattern identification', d: 'Look for recurring behaviors, needs, and pain points across participants.' },
  { h: 'Triangulation', d: 'Cross-check findings across methods, data sources, and participants.' },
  { h: 'Contradiction analysis', d: 'Actively look for and explain conflicting evidence rather than ignoring it.' },
  { h: 'Root-cause analysis', d: 'Push past symptoms to identify the underlying cause of a problem.' },
  { h: 'Evidence strength', d: 'Rate how strongly each finding is supported by the evidence.' },
  { h: 'Insight writing', d: 'Frame insights as explanations of why a pattern matters, not just descriptions.' },
  { h: 'Opportunity framing', d: 'Translate insights into actionable opportunities for the team.' },
  { h: 'Recommendation development', d: 'Propose specific actions grounded in the evidence.' },
  { h: 'Prioritization', d: 'Rank recommendations by impact, effort, and confidence.' },
  { h: 'Bias checks', d: 'Review synthesis for confirmation bias, cherry-picking, and overgeneralization.' },
  { h: 'Validation', d: 'Test findings with stakeholders, participants, or additional data before finalizing.' },
  { h: 'Connecting to business objectives', d: 'Map findings to the decisions and outcomes the research was commissioned to inform.' },
];

const synthesisTable: React.ReactNode[][] = [
  ['Observation', 'Something directly seen or heard'],
  ['Finding', 'A recurring fact supported by evidence'],
  ['Insight', 'An explanation of why the finding matters'],
  ['Implication', 'What the finding means for the experience or business'],
  ['Recommendation', 'A proposed action grounded in the evidence'],
];

// Deliverables
const deliverablesTable: React.ReactNode[][] = [
  ['Research plan', 'Define objectives, methods, and scope', 'Research team, stakeholders', 'Before a study begins', 'Objectives, methods, timeline, budget, roles'],
  ['Recruitment screener', 'Filter and select participants', 'Research team', 'Before recruitment', 'Screening questions, criteria, logistics'],
  ['Moderator guide', 'Structure sessions consistently', 'Researcher', 'During data collection', 'Script, probes, timing, tasks'],
  ['Interview guide', 'Structure interviews', 'Researcher', 'During data collection', 'Questions, probes, follow-ups'],
  ['Consent form', 'Ensure ethical participation', 'Participants, researcher', 'Before data collection', 'Purpose, risks, rights, data use'],
  ['Note-taking template', 'Capture consistent notes', 'Research team', 'During sessions', 'Structured fields, timestamps, quotes'],
  ['Affinity map', 'Visualize patterns in data', 'Research team, stakeholders', 'During synthesis', 'Clusters, themes, relationships'],
  ['Findings report', 'Document detailed findings', 'Research team, stakeholders', 'After synthesis', 'Themes, evidence, quotes, limitations'],
  ['Executive summary', 'Communicate key decisions and recommendations', 'Executives, leaders', 'After synthesis', 'Decisions, risks, impact, recommendations'],
  ['Research readout', 'Present findings to stakeholders', 'Stakeholders, product teams', 'After synthesis', 'Slides, key insights, discussion prompts'],
  ['Research presentation', 'Share findings formally', 'Any audience', 'After synthesis', 'Slides, visuals, narrative'],
  ['Journey map', 'Visualize the end-to-end experience', 'Product, design, stakeholders', 'After generative research', 'Stages, actions, emotions, pain points'],
  ['Service blueprint', 'Map front-stage and back-stage', 'Cross-functional teams', 'After generative research', 'Touchpoints, processes, roles, systems'],
  ['Persona', 'Represent key user segments', 'Design, product', 'After generative research', 'Demographics, goals, needs, behaviors'],
  ['User Experience Blueprint™', 'Comprehensive experience strategy', 'Leadership, product, design', 'After deep research', 'Strategy, journey, opportunities, recommendations'],
  ['Opportunity map', 'Prioritize opportunities', 'Product, design', 'After synthesis', 'Opportunities ranked by impact and effort'],
  ['Research repository', 'Store insights for reuse', 'All teams', 'Ongoing', 'Searchable insights, tags, evidence'],
  ['Insights dashboard', 'Track key metrics and themes', 'Stakeholders', 'Ongoing', 'Metrics, trends, alerts'],
  ['Research brief', 'Summarize a study for stakeholders', 'Stakeholders', 'Before or after a study', 'Objectives, methods, key findings'],
  ['Recommendation memo', 'Propose specific actions', 'Decision-makers', 'After synthesis', 'Recommendations, rationale, evidence'],
  ['Workshop readout', 'Document workshop outcomes', 'Workshop participants', 'After a workshop', 'Activities, outputs, decisions, next steps'],
];

// Frameworks
const frameworksTable: React.ReactNode[][] = [
  ['Research Compass™', 'Aligns research direction with the decision that must be informed', 'Planning, kickoff', 'Research direction document'],
  ['Influential Journey™', 'Maps the moments that shape user trust and influence', 'Generative research', 'Influence journey map'],
  ['User Experience Blueprint™', 'Translates research into a comprehensive experience strategy', 'After deep research', 'Experience strategy document'],
  ['Opportunity Canvas™', 'Frames and prioritizes opportunities from research', 'Synthesis, planning', 'Opportunity canvas'],
  ['Complexity to Clarity™', 'Simplifies complex systems into actionable understanding', 'Generative, synthesis', 'Clarity map'],
  ['Designing for Everyone™', 'Ensures accessibility and inclusion are built into research and design', 'Throughout research', 'Inclusion checklist and guidance'],
  ['Research-to-Action Blueprint', 'Connects findings to decisions, actions, and measurement', 'After synthesis', 'Action blueprint'],
  ['Experience Strategy Map', 'Visualizes the relationship between user experience and business strategy', 'Strategic planning', 'Strategy map'],
  ['Stakeholder Alignment Framework', 'Aligns stakeholders on goals, assumptions, and decisions', 'Planning, kickoff', 'Alignment document'],
  ['Evidence-to-Decision Model', 'Maps evidence strength to decision confidence', 'Synthesis, reporting', 'Evidence-decision matrix'],
];

// AI for UX Research
const aiSections = [
  { phase: 'Planning', items: ['Drafting research plans', 'Refining research questions', 'Identifying assumptions', 'Comparing methods', 'Creating recruitment criteria'] },
  { phase: 'Data Collection', items: ['Moderator-guide refinement', 'Interview-question improvement', 'Note organization', 'Follow-up question generation'] },
  { phase: 'Synthesis', items: ['Theme clustering', 'Coding assistance', 'Pattern comparison', 'Contradiction identification', 'Root-cause exploration', 'Summary drafting'] },
  { phase: 'Deliverables', items: ['Executive summaries', 'Research reports', 'Journey-map content', 'Persona drafts', 'Presentation outlines', 'Recommendation framing'] },
  { phase: 'Quality and Ethics', items: ['Bias checking', 'Hallucination review', 'Privacy', 'Confidentiality', 'Consent', 'Human validation', 'Evidence traceability'] },
];

const aiPrompts = [
  { title: 'Pattern Analysis', prompt: 'Analyze the following research notes for recurring patterns. Separate direct evidence from interpretation. Identify contradictions and missing evidence. Do not invent participant statements or conclusions.' },
  { title: 'Theme Clustering', prompt: 'Group the following observations into themes. For each theme, provide a label, a one-sentence description, and the supporting evidence. Flag any observations that do not fit a theme.' },
  { title: 'Assumption Surfacing', prompt: 'Review the following research plan and list every assumption it makes — about users, methods, sample, timeline, and outcomes. Rate each assumption as high, medium, or low risk.' },
  { title: 'Interview Question Refinement', prompt: 'Review the following interview questions. Identify any that are leading, double-barreled, or closed. Suggest improved open-ended versions. Do not add questions that were not implied by the original set.' },
  { title: 'Executive Summary Draft', prompt: 'Draft an executive summary from the following research findings. Lead with the decision the research informs. Include only evidence-backed statements. Mark any claim that lacks direct evidence as [needs validation].' },
  { title: 'Contradiction Check', prompt: 'Compare the following findings and identify any contradictions. For each contradiction, present the evidence on both sides and suggest how to resolve it through further research.' },
];

// Facilitation
const facilitationItems = [
  'Stakeholder kickoff', 'Research alignment workshop', 'Assumption mapping', 'How Might We',
  'Affinity mapping', 'Crazy 8s', 'Dot voting', 'Silent brainstorming',
  'Impact-effort prioritization', 'Risk mapping', 'Journey mapping',
  'Service blueprint workshop', 'Retrospective', 'Decision workshop',
  'Research readout', 'Conflict management', 'Inclusive participation',
  'Remote facilitation', 'Timeboxing', 'Consensus vs. consent',
];

const facilitationTable: React.ReactNode[][] = [
  ['Stakeholder kickoff', 'Align on goals and scope', '5–10 stakeholders', '60–90 min', 'Shared objectives, scope document'],
  ['Research alignment workshop', 'Align on research questions and methods', 'Cross-functional team', '90 min', 'Research plan draft'],
  ['Assumption mapping', 'Surface and prioritize assumptions', 'Product, design, research', '60 min', 'Assumption map'],
  ['How Might We', 'Reframe problems as opportunities', 'Cross-functional team', '30–45 min', 'HMW statements'],
  ['Affinity mapping', 'Cluster observations into themes', 'Research team, stakeholders', '1–2 hours', 'Affinity diagram'],
  ['Crazy 8s', 'Rapidly generate design ideas', 'Design team', '8 min', '8 sketches per person'],
  ['Dot voting', 'Prioritize ideas quickly', 'Any group', '10 min', 'Ranked ideas'],
  ['Silent brainstorming', 'Generate ideas without group influence', 'Any group', '15 min', 'Individual idea lists'],
  ['Impact-effort prioritization', 'Rank opportunities by value vs. effort', 'Product, design', '30 min', 'Priority matrix'],
  ['Risk mapping', 'Identify and assess risks', 'Cross-functional team', '45 min', 'Risk map'],
  ['Journey mapping', 'Visualize the end-to-end experience', 'Product, design, research', '1–2 hours', 'Journey map'],
  ['Service blueprint workshop', 'Map front-stage and back-stage processes', 'Cross-functional team', '2–4 hours', 'Service blueprint'],
  ['Retrospective', 'Reflect on what worked and what did not', 'Project team', '60 min', 'Action items, lessons'],
  ['Decision workshop', 'Make a specific decision together', 'Decision-makers', '60–90 min', 'Documented decision'],
  ['Research readout', 'Present findings and recommendations', 'Stakeholders', '30–60 min', 'Slides, decisions, next steps'],
];

// Research Impact
const impactItems = [
  'Decision influenced', 'Roadmap change', 'Risk reduced', 'Assumption invalidated',
  'Design improvement', 'Usability improvement', 'Accessibility improvement',
  'Adoption', 'Efficiency', 'Cost avoidance', 'Customer satisfaction',
  'Time saved', 'Rework reduced', 'Stakeholder alignment', 'Research reuse',
  'Organizational learning', 'Research maturity',
];

const impactTable: React.ReactNode[][] = [
  ['Product Decision', 'Roadmap or priority changed', 'Research shifted feature priority'],
  ['Risk Reduction', 'Assumption tested before build', 'Unusable concept stopped early'],
  ['Experience Improvement', 'Before-and-after usability metrics', 'Higher completion rate'],
  ['Efficiency', 'Time or rework reduced', 'Fewer design revisions'],
  ['Business Outcome', 'Adoption, conversion, retention, or support reduction', 'Improved activation'],
  ['Organizational Learning', 'Findings reused across teams', 'Research repository adoption'],
];

const afterReadout = [
  'Confirm ownership of recommendations.',
  'Document decisions made.',
  'Track what changes.',
  'Measure outcomes.',
  'Revisit unresolved questions.',
  'Add findings to the research repository.',
  'Share reusable insights across teams.',
  'Record lessons for future studies.',
];

// ── Accordion config ─────────────────────────────────────────────────
type AccordionDef = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accentKey: string;
};

const accordions: AccordionDef[] = [
  { id: 'foundations',    number: '①', title: 'Research Foundations',              description: 'Learn the principles that guide trustworthy, ethical, and decision-focused UX research.',           icon: <Compass className="w-5 h-5" />,             accentKey: 'navy'    },
  { id: 'planning',       number: '②', title: 'Planning Research',                  description: 'Turn any business need into a focused, realistic research plan with clear objectives and scope.', icon: <ClipboardList className="w-5 h-5" />,     accentKey: 'blue'    },
  { id: 'choosing',       number: '③', title: 'Choosing the Right Research Method', description: 'Use the decision guide to match your question, product stage, and evidence needs to the right method.', icon: <GitBranch className="w-5 h-5" />,     accentKey: 'teal'    },
  { id: 'methods',        number: '④', title: 'Research Methods Library',           description: 'Search and filter a complete reference of qualitative, quantitative, evaluative, and strategic methods.', icon: <Microscope className="w-5 h-5" />,        accentKey: 'purple'  },
  { id: 'questions',      number: '⑤', title: 'Question Library',                   description: 'Browse reusable interview questions organized by audience and research purpose.',                              icon: <MessageCircleQuestion className="w-5 h-5"/>, accentKey: 'orange'  },
  { id: 'metrics',        number: '⑥', title: 'Metrics Library',                     description: 'Find definitions, formulas, interpretation guidance, and limitations for common UX and product metrics.',    icon: <BarChart3 className="w-5 h-5" />,          accentKey: 'green'   },
  { id: 'synthesis',      number: '⑦', title: 'Research Synthesis',                  description: 'Transform raw observations and data into credible themes, insights, and recommendations.', icon: <Brain className="w-5 h-5" />,            accentKey: 'magenta' },
  { id: 'deliverables',   number: '⑧', title: 'Research Deliverables',              description: 'Select and create the right research output for your audience and the decision it must inform.', icon: <FileStack className="w-5 h-5" />,        accentKey: 'burgundy'},
  { id: 'frameworks',     number: '⑨', title: 'Research Frameworks™',               description: 'Reference original and adapted frameworks that structure thinking across the research lifecycle.',                            icon: <LayoutGrid className="w-5 h-5" />,         accentKey: 'brown'   },
  { id: 'ai',             number: '⑩', title: 'AI for UX Research',                  description: 'Use AI to accelerate planning, synthesis, and deliverables while keeping the researcher accountable for judgment.', icon: <Sparkles className="w-5 h-5" />,        accentKey: 'indigo'  },
  { id: 'facilitation',   number: '⑪', title: 'Facilitation Toolkit',               description: 'Facilitate workshops, alignment sessions, and synthesis with proven activities and guidance.',     icon: <Users className="w-5 h-5" />,              accentKey: 'turquoise'},
  { id: 'impact',         number: '⑫', title: 'Research Impact & Measurement',      description: 'Connect research to product decisions, business outcomes, and measurable organizational change.',             icon: <Target className="w-5 h-5" />,            accentKey: 'gold'   },
];

// ── Component ───────────────────────────────────────────────────────
const ResearchApproach = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  // Methods search + filter
  const [methodSearch, setMethodSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState<string | null>(null);
  const filteredMethods = useMemo(() => {
    return methodsLibrary.filter(m => {
      const matchesSearch = !methodSearch ||
        m.name.toLowerCase().includes(methodSearch.toLowerCase()) ||
        m.usedFor.toLowerCase().includes(methodSearch.toLowerCase());
      const matchesFilter = !methodFilter || m.types.includes(methodFilter);
      return matchesSearch && matchesFilter;
    });
  }, [methodSearch, methodFilter]);

  // Question library search + tab
  const [qSearch, setQSearch] = useState('');
  const [qTab, setQTab] = useState(questionLibrary[0].tab);
  const filteredQuestions = useMemo(() => {
    const audience = questionLibrary.find(a => a.tab === qTab) ?? questionLibrary[0];
    if (!qSearch) return audience.categories;
    const s = qSearch.toLowerCase();
    return audience.categories
      .map(c => ({ ...c, questions: c.questions.filter(q => q.toLowerCase().includes(s) || c.category.toLowerCase().includes(s)) }))
      .filter(c => c.questions.length > 0);
  }, [qSearch, qTab]);

  // Back to top
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lightbox for roadmap image
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <a href="#research-main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gray-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg">
        Skip to main content
      </a>
      <Header />

      <div className="bg-white shadow-sm pt-20">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium text-sm">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section id="research-main" tabIndex={-1} className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-4">Personal Reference Library</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            The Research Playbook<span className="text-gray-400 text-3xl align-super">™</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-5 max-w-2xl mx-auto">
            A personal UX research operating system for planning studies, selecting methods, asking better questions, synthesizing findings, and translating evidence into action.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
            This evolving library brings together research methods, metrics, questions, frameworks, facilitation techniques, AI-supported workflows, and practical guidance that can be referenced throughout the full research lifecycle.
          </p>
        </div>
      </section>

      {/* UX Research Journey Roadmap */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your UX Research Journey</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Use this roadmap to navigate the complete UX research lifecycle. Each numbered step corresponds to a section of The Research Playbook™.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/The_Foundation.png"
              alt="The Research Playbook UX Research Journey roadmap."
              onClick={() => setLightboxOpen(true)}
              className="w-full max-w-4xl rounded-2xl shadow-lg border border-gray-200 cursor-zoom-in transition-transform duration-200 hover:scale-[1.01]"
            />
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="py-8 text-center">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px bg-gray-300 flex-1 max-w-xs" />
            <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">Research Playbook Library</h2>
            <div className="h-px bg-gray-300 flex-1 max-w-xs" />
          </div>
          <p className="text-sm text-gray-500">Select any numbered section below to explore a specific stage of the research lifecycle.</p>
        </div>
      </div>

      {/* Accordions */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-5xl space-y-4">
          {/* How to Use This Playbook */}
          <div className="rounded-2xl bg-blue-50 border border-blue-200 px-6 py-5">
            <div className="flex gap-3 items-start">
              <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
              <div>
                <p className="text-sm font-bold text-blue-900 mb-2">How to Use This Playbook</p>
                <ul className="space-y-1.5 text-sm text-blue-800 leading-relaxed">
                  <li>If you're new to a project, follow the sections in numerical order.</li>
                  <li>If you're solving a specific problem, jump directly to the section you need using the roadmap above.</li>
                  <li>Think of this playbook as your personal UX research operating system.</li>
                </ul>
              </div>
            </div>
          </div>

          {accordions.map((acc) => {
            const accent = ACCENTS[acc.accentKey];
            const isOpen = openId === acc.id;
            return (
              <div key={acc.id} className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
                <h2>
                  <button
                    onClick={() => toggle(acc.id)}
                    aria-expanded={isOpen}
                    className={`w-full flex items-center justify-between gap-4 text-left px-6 py-5 transition-colors duration-200 ${isOpen ? accent.bgLight : 'bg-white hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-lg font-bold shadow-md" style={{ backgroundColor: accent.hex }}>
                        {acc.number}
                      </div>
                      <div>
                        <p className={`text-xl font-bold leading-snug ${isOpen ? accent.text : 'text-gray-900'}`}>{acc.title}</p>
                        <p className="text-sm text-gray-500 mt-0.5 leading-snug">{acc.description}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} style={{ color: accent.hex }} aria-hidden="true" />
                  </button>
                </h2>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 animate-fadeIn">
                    <div className="border-l-4 pl-5 space-y-5" style={{ borderColor: accent.hex }}>

                      {/* ── 1. Foundations ── */}
                      {acc.id === 'foundations' && (
                        <>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {foundationsItems.map(f => (
                              <div key={f.h} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <p className="text-sm font-bold text-gray-900 mb-1">{f.h}</p>
                                <p className="text-xs text-gray-600 leading-relaxed">{f.d}</p>
                              </div>
                            ))}
                          </div>
                          <Callout accentHex={accent.hex}>
                            Begin with the decision the research must inform — not with a favorite method.
                          </Callout>
                        </>
                      )}

                      {/* ── 2. Planning ── */}
                      {acc.id === 'planning' && (
                        <>
                          <div className="flex flex-wrap gap-2">
                            {planningItems.map(p => (
                              <span key={p} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${accent.chipBg} ${accent.chipText} ${accent.chipBorder}`}>
                                {p}
                              </span>
                            ))}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 mb-3">Research-Plan Checklist</p>
                            <ScrollTable headers={['Planning Element', 'Key Question']} rows={planningTable} accent={accent} minWidth={500} />
                          </div>
                        </>
                      )}

                      {/* ── 3. Choosing ── */}
                      {acc.id === 'choosing' && (
                        <>
                          <p className="text-sm font-bold text-gray-900">I need to…</p>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {methodDecisionGroups.map(g => (
                              <div key={g.label} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <p className={`text-sm font-bold mb-3 ${accent.text}`}>{g.label}</p>
                                <ul className="space-y-1.5">
                                  {g.items.map(item => (
                                    <li key={item} className="flex gap-2 text-sm text-gray-700">
                                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {/* ── 4. Methods Library ── */}
                      {acc.id === 'methods' && (
                        <>
                          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                            <div className="relative w-full sm:max-w-xs">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Search methods…"
                                value={methodSearch}
                                onChange={e => setMethodSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                              />
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {methodFilters.map(f => (
                                <button
                                  key={f}
                                  onClick={() => setMethodFilter(prev => prev === f ? null : f)}
                                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${methodFilter === f ? `${accent.chipBg} ${accent.chipText} ${accent.chipBorder}` : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                                >
                                  {f}
                                </button>
                              ))}
                            </div>
                          </div>
                          <ScrollTable
                            headers={['Method', 'Best Used For', 'Stage', 'Participants', 'Time', 'Metrics / Evidence', 'Strengths', 'Limitations', 'Deliverable']}
                            rows={filteredMethods.map(m => [m.name, m.usedFor, m.stage, m.participants, m.time, m.metrics, m.strengths, m.limitations, m.deliverable])}
                            accent={accent}
                            minWidth={1100}
                          />
                          {filteredMethods.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No methods match your search.</p>}
                        </>
                      )}

                      {/* ── 5. Question Library ── */}
                      {acc.id === 'questions' && (
                        <>
                          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-2">
                            <div className="relative w-full sm:max-w-xs">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="text"
                                placeholder="Search questions…"
                                value={qSearch}
                                onChange={e => setQSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {questionLibrary.map(a => (
                              <button
                                key={a.tab}
                                onClick={() => setQTab(a.tab)}
                                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${qTab === a.tab ? `${accent.chipBg} ${accent.chipText} ${accent.chipBorder}` : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                              >
                                {a.tab}
                              </button>
                            ))}
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {filteredQuestions.map(cat => (
                              <div key={cat.category} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <p className={`text-sm font-bold mb-3 ${accent.text}`}>{cat.category}</p>
                                <ul className="space-y-2">
                                  {cat.questions.map((q, i) => (
                                    <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} />
                                      {q}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          {filteredQuestions.length === 0 && <p className="text-sm text-gray-500 text-center py-4">No questions match your search.</p>}
                        </>
                      )}

                      {/* ── 6. Metrics ── */}
                      {acc.id === 'metrics' && (
                        <>
                          <ScrollTable
                            headers={['Metric', 'What It Measures', 'Formula / Calculation', 'When to Use', 'Interpretation', 'Strengths', 'Limitations']}
                            rows={metricsLibrary.map(m => [m.name, m.measures, m.formula, m.when, m.interpretation, m.strengths, m.limitations])}
                            accent={accent}
                            minWidth={1000}
                          />
                          <Callout variant="warning" accentHex={accent.hex}>
                            A metric is useful only when it is tied to a decision, baseline, target, or meaningful comparison. Do not present universal benchmarks as facts unless they are supported and contextualized.
                          </Callout>
                        </>
                      )}

                      {/* ── 7. Synthesis ── */}
                      {acc.id === 'synthesis' && (
                        <>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {synthesisItems.map(s => (
                              <div key={s.h} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <p className="text-sm font-bold text-gray-900 mb-1">{s.h}</p>
                                <p className="text-xs text-gray-600 leading-relaxed">{s.d}</p>
                              </div>
                            ))}
                          </div>
                          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                            <p className="text-sm font-bold text-gray-900 mb-3">Insight Formula</p>
                            <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                              {['Observation', 'Pattern', 'Meaning', 'Implication', 'Recommendation'].map((step, i, arr) => (
                                <React.Fragment key={step}>
                                  <span className={`px-3 py-1.5 rounded-lg ${accent.chipBg} ${accent.chipText}`}>{step}</span>
                                  {i < arr.length - 1 && <span className="text-gray-400">→</span>}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                          <ScrollTable headers={['Research Element', 'Meaning']} rows={synthesisTable} accent={accent} minWidth={500} />
                        </>
                      )}

                      {/* ── 8. Deliverables ── */}
                      {acc.id === 'deliverables' && (
                        <>
                          <ScrollTable
                            headers={['Deliverable', 'Purpose', 'Best Audience', 'When to Use', 'Typical Contents']}
                            rows={deliverablesTable}
                            accent={accent}
                            minWidth={900}
                          />
                          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                            <p className="text-sm font-bold text-gray-900 mb-3">Match the Deliverable to the Audience</p>
                            <ul className="space-y-2">
                              <li className="flex gap-2 text-sm text-gray-700"><span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} /><span><strong>Executives</strong> need decisions, risks, impact, and recommendations.</span></li>
                              <li className="flex gap-2 text-sm text-gray-700"><span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} /><span><strong>Product teams</strong> need evidence, priorities, and next steps.</span></li>
                              <li className="flex gap-2 text-sm text-gray-700"><span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} /><span><strong>Designers</strong> need behavioral detail and experience implications.</span></li>
                              <li className="flex gap-2 text-sm text-gray-700"><span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} /><span><strong>Engineers</strong> need constraints, scenarios, and implementation considerations.</span></li>
                              <li className="flex gap-2 text-sm text-gray-700"><span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} /><span><strong>Researchers</strong> need traceability, methods, evidence, and limitations.</span></li>
                            </ul>
                          </div>
                        </>
                      )}

                      {/* ── 9. Frameworks ── */}
                      {acc.id === 'frameworks' && (
                        <>
                          <ScrollTable
                            headers={['Framework', 'Purpose', 'Best Used During', 'Primary Output']}
                            rows={frameworksTable}
                            accent={accent}
                            minWidth={800}
                          />
                          <p className="text-xs text-gray-400 italic">
            Frameworks marked with ™ were developed by Sandra Graves. They are referenced here for personal use and are not presented as externally owned or published methodologies.
                          </p>
                        </>
                      )}

                      {/* ── 10. AI ── */}
                      {acc.id === 'ai' && (
                        <>
                          <Callout variant="warning" accentHex={accent.hex}>
                            AI can accelerate organization and analysis. The researcher remains responsible for context, interpretation, ethics, evidence, and decisions.
                          </Callout>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {aiSections.map(s => (
                              <div key={s.phase} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <p className={`text-sm font-bold mb-2 ${accent.text}`}>{s.phase}</p>
                                <ul className="space-y-1.5">
                                  {s.items.map(item => (
                                    <li key={item} className="flex gap-2 text-xs text-gray-700">
                                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 mb-3">Reusable Prompt Cards</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {aiPrompts.map(p => (
                                <PromptCard key={p.title} title={p.title} prompt={p.prompt} accentHex={accent.hex} />
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* ── 11. Facilitation ── */}
                      {acc.id === 'facilitation' && (
                        <>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {facilitationItems.map(f => (
                              <span key={f} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${accent.chipBg} ${accent.chipText} ${accent.chipBorder}`}>
                                {f}
                              </span>
                            ))}
                          </div>
                          <ScrollTable
                            headers={['Activity', 'Purpose', 'Participants', 'Typical Time', 'Output']}
                            rows={facilitationTable}
                            accent={accent}
                            minWidth={800}
                          />
                          <Callout accentHex={accent.hex}>
                            The facilitator guides the process, protects participation, clarifies decisions, and remains neutral about the outcome.
                          </Callout>
                        </>
                      )}

                      {/* ── 12. Impact ── */}
                      {acc.id === 'impact' && (
                        <>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {impactItems.map(i => (
                              <span key={i} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${accent.chipBg} ${accent.chipText} ${accent.chipBorder}`}>
                                {i}
                              </span>
                            ))}
                          </div>
                          <ScrollTable
                            headers={['Impact Area', 'Evidence to Capture', 'Example']}
                            rows={impactTable}
                            accent={accent}
                            minWidth={700}
                          />
                          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                            <p className="text-sm font-bold text-gray-900 mb-3">After the Readout</p>
                            <ul className="space-y-2">
                              {afterReadout.map(a => (
                                <li key={a} className="flex gap-2 text-sm text-gray-700">
                                  <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} />
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed roadmap view"
        >
          <img
            src="/images/The_Foundation.png"
            alt="The Research Playbook UX Research Journey roadmap."
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Close zoomed view"
          >
            <ArrowUp className="w-5 h-5 rotate-45" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResearchApproach;
