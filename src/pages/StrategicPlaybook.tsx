import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ChevronDown, Compass, ClipboardList, GitBranch,
  Microscope, MessageCircleQuestion, BarChart3, Brain, FileStack,
  LayoutGrid, Sparkles, Users, Target, ArrowUp, Info,
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

// ── Reusable bits ────────────────────────────────────────────────────
function Callout({ icon, children, variant = 'info', accentHex }: { icon?: React.ReactNode; children: React.ReactNode; variant?: 'info' | 'warning'; accentHex?: string }) {
  const styles = variant === 'warning'
    ? 'bg-amber-50 border-amber-200 text-amber-900'
    : 'bg-gray-50 border-gray-200 text-gray-800';
  return (
    <div className={`flex gap-3 items-start rounded-xl border px-5 py-4 text-sm leading-relaxed ${styles}`}>
      {icon ?? (variant === 'warning' ? <Info className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" /> : <Info className="w-5 h-5 shrink-0 mt-0.5 text-gray-400" />)}
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

function SectionLabel({ children, accentHex }: { children: React.ReactNode; accentHex: string }) {
  return <p className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: accentHex }}>{children}</p>;
}

function BulletList({ items, accentHex }: { items: string[]; accentHex: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
          <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function FlowSteps({ steps, accentHex }: { steps: string[]; accentHex: string }) {
  return (
    <div className="space-y-2">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800">
            {step}
          </div>
          {i < steps.length - 1 && <div className="text-center text-gray-400 text-lg leading-none">↓</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

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
  { id: 'translation',   number: '①', title: 'Research Translation™',           description: 'Turn research findings into language that business leaders can understand, evaluate, and act upon.', icon: <Compass className="w-5 h-5" />,             accentKey: 'navy'    },
  { id: 'exec-comm',     number: '②', title: 'Executive Communication™',        description: 'Communicate research clearly, concisely, and confidently so leaders can make informed decisions faster.', icon: <ClipboardList className="w-5 h-5" />,     accentKey: 'blue'    },
  { id: 'biz-metrics',   number: '③', title: 'Business Metrics for Researchers™', description: 'Understand the measurements leaders use to evaluate organizational, customer, and product performance.', icon: <GitBranch className="w-5 h-5" />,     accentKey: 'teal'    },
  { id: 'stakeholder',   number: '④', title: 'Stakeholder Psychology™',         description: 'Understand what different stakeholders value, fear, question, and need before they support a recommendation.', icon: <Microscope className="w-5 h-5" />,        accentKey: 'purple'  },
  { id: 'influence',     number: '⑤', title: 'Influence Without Authority™',    description: 'Build support, alignment, and momentum even when you do not directly manage the people making the decision.', icon: <MessageCircleQuestion className="w-5 h-5"/>, accentKey: 'orange'  },
  { id: 'storytelling',  number: '⑥', title: 'Strategic Storytelling™',          description: 'Transform research evidence into a clear and memorable story that supports action.', icon: <BarChart3 className="w-5 h-5" />,          accentKey: 'green'   },
  { id: 'prioritization',number: '⑦', title: 'Prioritization Frameworks™',       description: 'Help teams determine which problems, opportunities, recommendations, or initiatives should be addressed first.', icon: <Brain className="w-5 h-5" />,            accentKey: 'magenta' },
  { id: 'roi',           number: '⑧', title: 'Research ROI™',                    description: 'Demonstrate how research contributes to better decisions, reduced risk, improved experiences, and organizational value.', icon: <FileStack className="w-5 h-5" />,        accentKey: 'burgundy'},
  { id: 'product-strategy', number: '⑨', title: 'Product Strategy™',            description: 'Connect research evidence to product direction, customer value, roadmap decisions, and long-term organizational goals.', icon: <LayoutGrid className="w-5 h-5" />,         accentKey: 'brown'   },
  { id: 'ai-strategy',   number: '⑩', title: 'AI Strategy™',                    description: 'Use artificial intelligence strategically while preserving human judgment, research integrity, privacy, and trust.', icon: <Sparkles className="w-5 h-5" />,        accentKey: 'indigo'  },
  { id: 'change-mgmt',   number: '⑪', title: 'Change Management™',              description: 'Help organizations move from approving a recommendation to successfully adopting the change.', icon: <Users className="w-5 h-5" />,              accentKey: 'turquoise'},
  { id: 'leader',        number: '⑫', title: 'The Strategic Research Leader™',  description: 'Bring together research expertise, business understanding, influence, communication, leadership, and measurable impact.', icon: <Target className="w-5 h-5" />,            accentKey: 'gold'   },
];

// ── Component ───────────────────────────────────────────────────────
const StrategicPlaybook = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <a href="#strategic-main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gray-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg">
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
      <section id="strategic-main" tabIndex={-1} className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-4">Personal Reference Library</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            The Strategic Playbook<span className="text-gray-400 text-3xl align-super">™</span>
          </h1>
          <p className="text-gray-300 text-xl font-medium mb-4">From Insight to Impact<span className="text-gray-400 text-base align-super">™</span></p>
          <p className="text-gray-300 text-lg leading-relaxed mb-5 max-w-2xl mx-auto">
            Research creates understanding. Strategy creates action.
          </p>
          <p className="text-gray-300 text-base leading-relaxed mb-5 max-w-2xl mx-auto">
            The Strategic Playbook™ is designed to help researchers move beyond delivering findings and become trusted strategic partners. It focuses on translating evidence into business language, influencing decisions, supporting organizational goals, and demonstrating measurable impact.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Use this playbook when you need to connect research to business priorities, communicate with leadership, guide decision-making, build stakeholder trust, or help an organization move from insight to action.
          </p>
        </div>
      </section>

      {/* Strategic Journey Roadmap */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Strategic Research Journey</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Use this roadmap to navigate the complete strategic research lifecycle. Each numbered step corresponds to a section of The Strategic Playbook™.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/hero-strategic.png"
              alt="The Strategic Playbook Strategic Research Journey roadmap."
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
            <h2 className="text-xl font-bold text-gray-900 whitespace-nowrap">Strategic Playbook Library</h2>
            <div className="h-px bg-gray-300 flex-1 max-w-xs" />
          </div>
          <p className="text-sm text-gray-500">Select any numbered section below to explore a specific stage of the strategic research lifecycle.</p>
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
                  <li>Think of this playbook as your personal strategic research operating system.</li>
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

                      {/* ── 1. Research Translation™ ── */}
                      {acc.id === 'translation' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Turn research findings into language that business leaders can understand, evaluate, and act upon.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed mb-2">Research loses value when stakeholders understand the finding but do not understand its importance.</p>
                            <p className="text-sm text-gray-700 leading-relaxed">A strategic researcher does more than report what users said or did. The researcher connects evidence to customer impact, business consequences, decisions, and measurable outcomes.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Research Translation™ Framework</SectionLabel>
                            <FlowSteps accentHex={accent.hex} steps={[
                              'Research Finding — What did users say, do, experience, or fail to complete?',
                              'User Impact — How does the issue affect the customer, employee, learner, or user?',
                              'Business Impact — How could the issue affect revenue, cost, adoption, productivity, risk, retention, satisfaction, or organizational performance?',
                              'Recommendation — What action should the organization consider?',
                              'Expected Outcome — What should improve if the recommendation is implemented?',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Questions to Ask</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'What happened?', 'Why did it happen?', 'Who is affected?',
                              'Why should the organization care?', 'What decision does this evidence support?',
                              'What should happen next?', 'How will success be measured?',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Example</SectionLabel>
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-3 text-sm">
                              <p><strong className="text-gray-900">Research Finding:</strong> Users abandoned the application during the fourth step.</p>
                              <p><strong className="text-gray-900">User Impact:</strong> The process felt longer and more complicated than expected.</p>
                              <p><strong className="text-gray-900">Business Impact:</strong> Abandonment may reduce completed applications, increase acquisition costs, and create additional support requests.</p>
                              <p><strong className="text-gray-900">Recommendation:</strong> Remove unnecessary fields, clarify the remaining steps, and add a progress indicator.</p>
                              <p><strong className="text-gray-900">Expected Outcome:</strong> Improved completion rates, reduced abandonment, and fewer support requests.</p>
                            </div>
                          </div>
                          <Callout accentHex={accent.hex}>
                            <strong>GrandTastic Rule:</strong> Never leave an insight without explaining why it matters.
                          </Callout>
                        </>
                      )}

                      {/* ── 2. Executive Communication™ ── */}
                      {acc.id === 'exec-comm' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Communicate research clearly, concisely, and confidently so leaders can make informed decisions faster.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Executives often have limited time and must evaluate many competing priorities. They usually need the decision, evidence, risk, and recommended action before they need the full research history.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>What Executives Need</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'The problem', 'The supporting evidence', 'The business consequence',
                              'The recommended action', 'The expected outcome', 'The risk of taking no action', 'The decision required',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Executive Communication Structure</SectionLabel>
                            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                              <p><strong className="text-gray-900">Lead with the decision.</strong> State what leadership needs to understand, approve, prioritize, or reconsider.</p>
                              <p><strong className="text-gray-900">Support it with evidence.</strong> Use the strongest findings, behavioral patterns, metrics, or customer examples.</p>
                              <p><strong className="text-gray-900">Explain the impact.</strong> Connect the evidence to business goals, customer outcomes, operational performance, or organizational risk.</p>
                              <p><strong className="text-gray-900">Recommend the next step.</strong> Make the requested action clear.</p>
                            </div>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Useful Formats</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'One-page executive brief', 'Five-minute research update', 'One-slide decision summary',
                              'Thirty-minute research presentation', 'Leadership email summary', 'Decision memo',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Five-Minute Update Template</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'What we studied', 'What we learned', 'Why it matters',
                              'What we recommend', 'What decision is needed',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Avoid</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'Long methodological explanations before presenting the finding',
                              'Large amounts of unprioritized data',
                              'Research language that stakeholders do not understand',
                              'Recommendations without evidence',
                              'Findings without a clear decision or next step',
                            ]} />
                          </div>
                        </>
                      )}

                      {/* ── 3. Business Metrics for Researchers™ ── */}
                      {acc.id === 'biz-metrics' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Understand the measurements leaders use to evaluate organizational, customer, and product performance.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Researchers do not need to become accountants or data scientists, but they should understand the metrics connected to the experiences they study.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Core Business Metrics</SectionLabel>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {[
                                ['Revenue', 'Income generated by the organization.'],
                                ['Conversion Rate', 'The percentage of users who complete a desired action.'],
                                ['Retention', 'The percentage of customers or users who continue using a service over time.'],
                                ['Adoption', 'The extent to which people begin using a product, feature, process, or service.'],
                                ['Completion Rate', 'The percentage of users who successfully finish a task or process.'],
                                ['Abandonment Rate', 'The percentage of users who begin but do not complete a task.'],
                                ['Customer Satisfaction — CSAT', 'A measurement of customer satisfaction with a product, service, or interaction.'],
                                ['Net Promoter Score — NPS', 'A measurement of how likely customers are to recommend an organization, product, or service.'],
                                ['Customer Effort Score — CES', 'A measurement of how easy or difficult it was for a customer to complete a task.'],
                                ['Cost to Serve', 'The operational cost of supporting a customer.'],
                                ['Customer Lifetime Value', 'The estimated value a customer contributes throughout the relationship.'],
                                ['Task Success Rate', 'The percentage of users who complete a task correctly.'],
                                ['Time on Task', 'The amount of time required to complete a task.'],
                                ['Call Volume', 'The number of customer or support calls received.'],
                                ['Productivity', 'The amount of work completed relative to time, effort, or resources.'],
                                ['Return on Investment — ROI', 'The value generated compared with the cost of an investment.'],
                              ].map(([name, desc]) => (
                                <div key={name} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                  <p className="text-sm font-bold text-gray-900 mb-1">{name}</p>
                                  <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Researcher's Metric Questions</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'Which business metric could this experience affect?',
                              'What user behavior contributes to the metric?',
                              'What baseline exists today?',
                              'What should improve after the recommendation?',
                              'How will the organization measure success?',
                              'What evidence can research contribute?',
                            ]} />
                          </div>
                          <Callout variant="warning" accentHex={accent.hex}>
                            <strong>Important Reminder:</strong> Do not claim that research caused a business result unless the evidence supports that conclusion. Clearly distinguish between direct measurement, contribution, correlation, and reasonable expectation.
                          </Callout>
                        </>
                      )}

                      {/* ── 4. Stakeholder Psychology™ ── */}
                      {acc.id === 'stakeholder' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Understand what different stakeholders value, fear, question, and need before they support a research recommendation.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">The same research finding may need to be communicated differently depending on the audience.</p>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {[
                              { role: 'Executive Leaders', asks: 'What is the business impact, risk, cost, or strategic opportunity?', values: 'Clarity, evidence, measurable outcomes, speed, and alignment with organizational goals.' },
                              { role: 'Product Managers', asks: 'What should we build, change, test, or prioritize next?', values: 'Customer needs, roadmap clarity, prioritization, feasibility, and measurable product outcomes.' },
                              { role: 'Designers', asks: 'What experience problem are we solving?', values: 'User behavior, unmet needs, usability evidence, patterns, and design direction.' },
                              { role: 'Engineers', asks: 'What is required, how serious is the issue, and can it be implemented?', values: 'Specificity, technical feasibility, clear requirements, severity, and prioritization.' },
                              { role: 'Marketing', asks: 'What motivates customers, and how should we communicate value?', values: 'Audience understanding, behavior, perception, trust, messaging, and differentiation.' },
                              { role: 'Operations', asks: 'Can the organization support this change consistently?', values: 'Efficiency, staffing, process clarity, training, scalability, and operational impact.' },
                              { role: 'Legal, Compliance, and Accessibility', asks: 'What risks, obligations, barriers, or compliance concerns exist?', values: 'Documentation, standards, traceability, risk mitigation, and equitable access.' },
                            ].map(s => (
                              <div key={s.role} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <p className={`text-sm font-bold mb-2 ${accent.text}`}>{s.role}</p>
                                <p className="text-xs text-gray-600 mb-1"><strong>They often ask:</strong> {s.asks}</p>
                                <p className="text-xs text-gray-600"><strong>They value:</strong> {s.values}</p>
                              </div>
                            ))}
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Stakeholder Preparation Questions</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'What does this stakeholder care about most?',
                              'What decision can this person influence?',
                              'What concerns might create resistance?',
                              'What evidence will build confidence?',
                              'What language will make the finding relevant?',
                              'What do I need from this stakeholder?',
                            ]} />
                          </div>
                        </>
                      )}

                      {/* ── 5. Influence Without Authority™ ── */}
                      {acc.id === 'influence' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Build support, alignment, and momentum even when you do not directly manage the people making the decision.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Researchers often influence roadmaps, priorities, policies, designs, and organizational decisions without having formal authority over those areas.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Sources of Influence</SectionLabel>
                            <div className="flex flex-wrap gap-2">
                              {['Credibility', 'Trust', 'Evidence', 'Preparation', 'Facilitation', 'Relationships', 'Consistency', 'Business understanding', 'Clear communication', 'Follow-through'].map(s => (
                                <span key={s} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${accent.chipBg} ${accent.chipText} ${accent.chipBorder}`}>{s}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Influence Process</SectionLabel>
                            <FlowSteps accentHex={accent.hex} steps={[
                              'Understand the decision — Know what is being decided, who owns it, and when it must be made.',
                              'Map the stakeholders — Identify supporters, decision-makers, blockers, advisors, and affected groups.',
                              'Understand motivations — Determine what each stakeholder values and what concerns may create resistance.',
                              'Build alignment early — Do not wait until the final presentation to introduce important findings.',
                              'Make participation easy — Give stakeholders clear choices, evidence, and next steps.',
                              'Document decisions — Record what was decided, why it was decided, and what happens next.',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>When Stakeholders Disagree</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'Return to the shared goal',
                              'Separate evidence from opinion',
                              'Identify the unresolved assumption',
                              'Clarify the decision criteria',
                              'Recommend additional research when needed',
                              'Document tradeoffs',
                              'Avoid turning disagreement into personal conflict',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Reflection Questions</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'Am I trying to win an argument or improve a decision?',
                              'Have I understood the stakeholder\u2019s constraints?',
                              'Have I communicated the evidence clearly?',
                              'Is the recommendation realistic?',
                              'What would make the decision safer or easier?',
                            ]} />
                          </div>
                        </>
                      )}

                      {/* ── 6. Strategic Storytelling™ ── */}
                      {acc.id === 'storytelling' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Transform research evidence into a clear and memorable story that supports action.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Stakeholders may forget individual statistics, quotes, or charts, but they are more likely to remember a coherent story about the customer problem, its consequences, and the opportunity to improve it.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Strategic Story Structure</SectionLabel>
                            <FlowSteps accentHex={accent.hex} steps={[
                              'Context — What is happening?',
                              'Customer or User Goal — What is the person trying to accomplish?',
                              'Barrier — What prevents success?',
                              'Evidence — What did research reveal?',
                              'Consequence — What happens to the user and the organization?',
                              'Opportunity — What could improve?',
                              'Recommendation — What should happen next?',
                              'Outcome — What measurable result should the organization expect?',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Storytelling Tools</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'Customer quotes', 'Behavioral examples', 'Journey maps', 'Before-and-after scenarios',
                              'Data visualizations', 'Experience timelines', 'Service blueprints', 'Video clips',
                              'Research highlights', 'Decision summaries',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Use Emotion Carefully</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Emotion can help stakeholders understand the human experience, but it should support — not replace — evidence.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Avoid</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'Using one dramatic quote as proof of a broad pattern',
                              'Presenting findings without context',
                              'Overloading the story with unnecessary details',
                              'Manipulating the audience emotionally',
                              'Hiding contradictory evidence',
                              'Ending without a recommendation',
                            ]} />
                          </div>
                        </>
                      )}

                      {/* ── 7. Prioritization Frameworks™ ── */}
                      {acc.id === 'prioritization' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Help teams determine which problems, opportunities, recommendations, or initiatives should be addressed first.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Research often identifies more needs than an organization can address at once. Prioritization helps teams make transparent decisions based on agreed criteria.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Common Frameworks</SectionLabel>
                            <div className="space-y-3">
                              {[
                                ['Impact vs. Effort', 'Compares the expected value of an action with the effort required to complete it.'],
                                ['RICE', 'Reach × Impact × Confidence ÷ Effort'],
                                ['ICE', 'Impact × Confidence × Ease'],
                                ['Opportunity Scoring', 'Evaluates the importance of a customer need compared with current satisfaction.'],
                                ['Risk Matrix', 'Compares the likelihood of a problem with the severity of its consequences.'],
                                ['Weighted Scoring', 'Assigns agreed weights to criteria such as customer value, business value, risk, cost, effort, and strategic alignment.'],
                                ['Decision Tree', 'Maps possible choices, consequences, risks, and outcomes.'],
                              ].map(([name, desc]) => (
                                <div key={name} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                  <p className="text-sm font-bold text-gray-900 mb-1">{name}</p>
                                  <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Suggested Prioritization Criteria</SectionLabel>
                            <div className="flex flex-wrap gap-2">
                              {['Customer impact', 'Business impact', 'Strategic alignment', 'Risk', 'Accessibility', 'Compliance', 'Frequency', 'Severity', 'Reach', 'Cost', 'Effort', 'Confidence', 'Dependencies', 'Time sensitivity'].map(c => (
                                <span key={c} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${accent.chipBg} ${accent.chipText} ${accent.chipBorder}`}>{c}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Prioritization Workshop Process</SectionLabel>
                            <FlowSteps accentHex={accent.hex} steps={[
                              'Define the decision',
                              'Agree on criteria',
                              'Review the evidence',
                              'Score independently',
                              'Discuss differences',
                              'Identify dependencies',
                              'Confirm priorities',
                              'Document the rationale',
                              'Assign owners and next steps',
                            ]} />
                          </div>
                          <Callout accentHex={accent.hex}>
                            <strong>Important Reminder:</strong> A prioritization score supports judgment. It does not replace judgment.
                          </Callout>
                        </>
                      )}

                      {/* ── 8. Research ROI™ ── */}
                      {acc.id === 'roi' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Demonstrate how research contributes to better decisions, reduced risk, improved experiences, and organizational value.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">The value of research is not limited to revenue. Research may prevent costly mistakes, improve efficiency, reduce uncertainty, identify unmet needs, strengthen adoption, or help teams invest resources more wisely.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Types of Research Value</SectionLabel>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {[
                                ['Revenue Contribution', 'Research supports improvements that may increase conversion, retention, adoption, or customer value.'],
                                ['Cost Reduction', 'Research helps reduce rework, support calls, training needs, inefficient processes, or unnecessary development.'],
                                ['Risk Reduction', 'Research identifies usability, accessibility, compliance, trust, safety, or adoption risks before they become larger problems.'],
                                ['Time Savings', 'Research helps teams make decisions faster or complete tasks more efficiently.'],
                                ['Improved Decision Confidence', 'Research replaces assumptions with evidence.'],
                                ['Customer and Employee Outcomes', 'Research improves satisfaction, effort, accessibility, trust, productivity, or task success.'],
                              ].map(([name, desc]) => (
                                <div key={name} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                  <p className="text-sm font-bold text-gray-900 mb-1">{name}</p>
                                  <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Research Value Statement Template</SectionLabel>
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 leading-relaxed italic">
                              "Because research identified ____________________, the organization was able to ____________________, which contributed to ____________________."
                            </div>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Example</SectionLabel>
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700 leading-relaxed">
                              Because research identified that users misunderstood the eligibility requirements, the team clarified the application content before development, which reduced the risk of building an experience that users could not complete successfully.
                            </div>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Evidence to Capture</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'Baseline metric', 'Research finding', 'Decision influenced', 'Action taken',
                              'Outcome measured', 'Stakeholders involved', 'Cost avoided', 'Time saved',
                              'Risk reduced', 'Lessons learned',
                            ]} />
                          </div>
                          <Callout variant="warning" accentHex={accent.hex}>
                            <strong>Important Reminder:</strong> Use careful language. Research may influence, support, enable, contribute to, or reduce the risk of an outcome. Do not claim sole credit without evidence.
                          </Callout>
                        </>
                      )}

                      {/* ── 9. Product Strategy™ ── */}
                      {acc.id === 'product-strategy' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Connect research evidence to product direction, customer value, roadmap decisions, and long-term organizational goals.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Strategic researchers help teams understand not only whether an experience works, but whether the organization is solving the right problem for the right people.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Product Strategy Elements</SectionLabel>
                            <div className="flex flex-wrap gap-2">
                              {['Vision', 'Customer problem', 'Target audience', 'Value proposition', 'Product goals', 'Competitive context', 'Strategic opportunities', 'Roadmap priorities', 'Success metrics', 'Risks and assumptions', 'Product-market fit', 'North Star metric'].map(e => (
                                <span key={e} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${accent.chipBg} ${accent.chipText} ${accent.chipBorder}`}>{e}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Strategic Research Questions</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'What customer problem are we solving?', 'How important is the problem?',
                              'Who experiences it?', 'How do people solve it today?', 'What alternatives exist?',
                              'What assumptions support the strategy?', 'What evidence challenges the strategy?',
                              'What customer behavior would indicate value?', 'What should the organization measure?',
                              'What would cause the strategy to fail?',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Research Across the Product Lifecycle</SectionLabel>
                            <div className="space-y-3">
                              {[
                                ['Discovery', 'Understand needs, behaviors, context, and opportunities.'],
                                ['Definition', 'Clarify the problem, audience, assumptions, and desired outcomes.'],
                                ['Design and Development', 'Evaluate concepts, workflows, prototypes, and usability.'],
                                ['Launch', 'Assess readiness, expectations, trust, comprehension, and adoption.'],
                                ['Post-Launch', 'Measure behavior, satisfaction, performance, and emerging needs.'],
                              ].map(([phase, desc]) => (
                                <div key={phase} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                  <p className={`text-sm font-bold mb-1 ${accent.text}`}>{phase}</p>
                                  <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Callout accentHex={accent.hex}>
                            <strong>Important Reminder:</strong> Do not allow research to become limited to validating decisions that have already been made.
                          </Callout>
                        </>
                      )}

                      {/* ── 10. AI Strategy™ ── */}
                      {acc.id === 'ai-strategy' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Use artificial intelligence strategically while preserving human judgment, research integrity, privacy, and trust.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">AI can increase speed and support analysis, but it can also introduce bias, hallucinations, privacy concerns, overconfidence, and weak decision-making when used without appropriate oversight.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Strategic AI Uses</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'Research planning', 'Interview guide development', 'Literature and competitive review',
                              'Note organization', 'Preliminary coding', 'Pattern exploration',
                              'Workshop preparation', 'Drafting executive summaries',
                              'Generating alternative hypotheses', 'Creating discussion prompts',
                              'Research repository support', 'Scenario development',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Human Responsibilities</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'Define the research question', 'Choose appropriate methods', 'Protect participant privacy',
                              'Evaluate data quality', 'Validate AI-generated outputs', 'Identify bias',
                              'Interpret context', 'Resolve contradictions', 'Make ethical decisions',
                              'Communicate uncertainty', 'Approve final conclusions',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>AI Evaluation Questions</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'What problem are we using AI to solve?', 'Is AI necessary?',
                              'What data is being used?', 'Is sensitive information protected?',
                              'Who may be harmed or excluded?', 'How will the output be validated?',
                              'What human oversight is required?', 'Can the result be explained?',
                              'What happens when the AI is wrong?', 'How will trust be established?',
                              'How will success be measured?',
                            ]} />
                          </div>
                          <Callout accentHex={accent.hex}>
                            <strong>Human-Centered AI Principle:</strong> AI should strengthen human understanding and decision-making, not replace human responsibility.
                          </Callout>
                        </>
                      )}

                      {/* ── 11. Change Management™ ── */}
                      {acc.id === 'change-mgmt' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Help organizations move from approving a recommendation to successfully adopting the change.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">A good recommendation may still fail when people do not understand the change, trust it, know how to use it, or receive the support required to adopt it.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Change Management Questions</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'Who will be affected?', 'What behavior must change?',
                              'What concerns may create resistance?', 'What knowledge or skills are required?',
                              'What communication is needed?', 'What leadership support is required?',
                              'What tools, training, or documentation are needed?', 'How will adoption be measured?',
                              'What feedback mechanisms will exist?', 'Who owns ongoing maintenance?',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Change Journey</SectionLabel>
                            <FlowSteps accentHex={accent.hex} steps={[
                              'Awareness — People understand why the change is happening.',
                              'Understanding — People understand what will change.',
                              'Readiness — People have the knowledge, tools, and support they need.',
                              'Adoption — People begin using the new process, service, or product.',
                              'Reinforcement — The organization monitors, supports, and improves the change.',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Adoption Metrics</SectionLabel>
                            <div className="flex flex-wrap gap-2">
                              {['Usage', 'Completion', 'Compliance', 'Training participation', 'Support requests', 'Satisfaction', 'Time to proficiency', 'Error rate', 'Feature adoption', 'Process adherence', 'Qualitative feedback'].map(m => (
                                <span key={m} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${accent.chipBg} ${accent.chipText} ${accent.chipBorder}`}>{m}</span>
                              ))}
                            </div>
                          </div>
                          <Callout accentHex={accent.hex}>
                            <strong>Important Reminder:</strong> Launching something is not the same as achieving adoption.
                          </Callout>
                        </>
                      )}

                      {/* ── 12. The Strategic Research Leader™ ── */}
                      {acc.id === 'leader' && (
                        <>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Purpose</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">Bring together research expertise, business understanding, influence, communication, leadership, and measurable impact.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Why It Matters</SectionLabel>
                            <p className="text-sm text-gray-700 leading-relaxed">A strategic research leader does more than manage studies. The leader helps an organization ask better questions, make better decisions, build research maturity, and keep human needs visible within business strategy.</p>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Strategic Leadership Capabilities</SectionLabel>
                            <div className="flex flex-wrap gap-2">
                              {['Research judgment', 'Business understanding', 'Executive communication', 'Stakeholder influence', 'Ethical leadership', 'Facilitation', 'Decision support', 'Mentoring', 'Research operations', 'Measurement', 'Change leadership', 'Human-centered AI', 'Systems thinking', 'Thought leadership', 'Public speaking'].map(c => (
                                <span key={c} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${accent.chipBg} ${accent.chipText} ${accent.chipBorder}`}>{c}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>Leadership Questions</SectionLabel>
                            <BulletList accentHex={accent.hex} items={[
                              'What decisions does the organization need to make?',
                              'What evidence is missing?', 'Whose perspective is absent?',
                              'What assumptions remain untested?', 'What risks are being overlooked?',
                              'How can research support the business goal?', 'What outcome should be measured?',
                              'How can the organization build lasting research capability?',
                              'How can I help others think more strategically?',
                            ]} />
                          </div>
                          <div>
                            <SectionLabel accentHex={accent.hex}>From Researcher to Strategic Leader</SectionLabel>
                            <FlowSteps accentHex={accent.hex} steps={[
                              'Researcher — I uncover insights.',
                              'Strategic Thinker — I connect the evidence.',
                              'Trusted Advisor — I influence decisions.',
                              'Strategic Partner — I help create business impact.',
                              'Change Leader — I help shape the future.',
                            ]} />
                          </div>
                          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 space-y-2 text-sm text-gray-700 leading-relaxed">
                            <p className="font-bold text-gray-900">Final Reflection</p>
                            <p>Every strong researcher learns methods.</p>
                            <p>Every strategic researcher learns how to connect evidence to action.</p>
                            <p>Every research leader develops a philosophy that helps others make better decisions.</p>
                            <p>The goal is not only to conduct excellent research.</p>
                            <p>The goal is to ensure that research improves what an organization chooses to do next.</p>
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
            src="/images/hero-strategic.png"
            alt="The Strategic Playbook Strategic Research Journey roadmap."
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

export default StrategicPlaybook;
