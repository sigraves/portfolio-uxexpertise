import { useState, useCallback } from 'react';
import {
  Layers,
  RotateCcw,
  Eye,
  ChevronDown,
  CheckCircle2,
  GripVertical,
  Lightbulb,
  Sparkles,
  Users,
} from 'lucide-react';
import FourQuadrant from './FourQuadrant';

type QuadrantId = 'Q1' | 'Q2' | 'Q3' | 'Q4';

interface Finding {
  id: string;
  title: string;
  short: string;
  evidence: string;
  recommendation: string;
  correctQuadrant: QuadrantId;
  reasoning: string;
}

const findings: Finding[] = [
  {
    id: 'F1',
    title: 'Billing Confusion',
    short: 'Customers cannot interpret electricity charges, leading to repeated support calls.',
    evidence:
      'Customer interviews revealed that 8 of 10 participants could not identify which line item drove their bill increase. Support call logs showed billing questions were the top contact reason, peaking after each billing cycle.',
    recommendation:
      'Redesign the bill layout with plain-language summaries and a visual breakdown of charges, reducing avoidable support calls.',
    correctQuadrant: 'Q1',
    reasoning:
      'High user impact — it affects every customer who receives a bill — and low effort because it is a content and layout change, not a system overhaul.',
  },
  {
    id: 'F2',
    title: 'Gamified Energy Tips',
    short: 'Customers want personalized guidance on reducing consumption but rarely visit the tips page.',
    evidence:
      'Journey mapping showed the energy-tips page had a 4% click-through rate from the billing dashboard. Interviewees expressed interest in saving energy but did not know the page existed.',
    recommendation:
      'Surface contextual tips inline with bill summaries and introduce reward points for energy-saving actions.',
    correctQuadrant: 'Q1',
    reasoning:
      'High impact — it directly addresses customer motivation to save money — and moderate-to-low effort because the tips content already exists; the work is placement and a lightweight rewards layer.',
  },
  {
    id: 'F3',
    title: 'Full App Redesign',
    short: 'The mobile app looks dated compared to competitors, but functions without major complaints.',
    evidence:
      'Usability testing showed customers complete key tasks successfully. Aesthetic feedback was noted but did not block task completion or cause drop-off.',
    recommendation:
      'Defer a full visual refresh until higher-impact experience gaps are addressed; iterate the design system incrementally.',
    correctQuadrant: 'Q4',
    reasoning:
      'Low impact — the app works and customers are not blocked — and high effort because a full redesign consumes significant design and engineering time with no measurable behavior change.',
  },
  {
    id: 'F4',
    title: 'Accessibility Audit',
    short: 'Screen-reader users struggle with the billing dashboard, but represent a small segment of logins.',
    evidence:
      'An accessibility review identified 12 WCAG Level A and AA issues on the dashboard. Analytics showed assistive-technology users were under 2% of sessions, though the sample may be underreported.',
    recommendation:
      'Fix the most critical screen-reader barriers in the next sprint and schedule a full audit as part of the design-system roadmap.',
    correctQuadrant: 'Q2',
    reasoning:
      'Moderate-to-high impact for affected users and the organization&rsquo;s compliance posture, but high effort to remediate comprehensively. Prioritize the critical barriers first.',
  },
  {
    id: 'F5',
    title: 'Email Reminder Copy',
    short: 'Payment reminder emails use unclear language, causing some customers to miss due dates.',
    evidence:
      'A content review found the subject line and body used internal jargon. A small sample of customers reported confusion about when payment was due.',
    recommendation:
      'Rewrite reminder templates with plain language, a clear due date, and a direct payment link.',
    correctQuadrant: 'Q3',
    reasoning:
      'Low impact — it affects a narrow window of the billing cycle and a subset of customers — and low effort because it is a content-only change. Quick win, but not a strategic priority.',
  },
];

const quadrants: Record<QuadrantId, { label: string; subtitle: string; color: string; bg: string }> = {
  Q1: {
    label: 'Quick Wins',
    subtitle: 'High Impact · Low Effort',
    color: '#059669',
    bg: '#0596690D',
  },
  Q2: {
    label: 'Major Projects',
    subtitle: 'High Impact · High Effort',
    color: '#f97316',
    bg: '#f973160D',
  },
  Q3: {
    label: 'Fill-Ins',
    subtitle: 'Low Impact · Low Effort',
    color: '#0ea5e9',
    bg: '#0ea5e90D',
  },
  Q4: {
    label: 'Time Sinks',
    subtitle: 'Low Impact · High Effort',
    color: '#be185d',
    bg: '#be185d0D',
  },
};

const quadrantOrder: QuadrantId[] = ['Q1', 'Q2', 'Q3', 'Q4'];

interface Placement {
  findingId: string;
  quadrant: QuadrantId;
}

const PrioritizationLab = () => {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>(null);
  const [expandedEvidence, setExpandedEvidence] = useState<string | null>(null);
  const [showReasoning, setShowReasoning] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [touchPlacing, setTouchPlacing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const allPlaced = placements.length === findings.length;

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleHeaderKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleOpen();
      }
    },
    [toggleOpen]
  );

  const handleDragStart = useCallback((e: React.DragEvent, findingId: string) => {
    setDraggedId(findingId);
    e.dataTransfer.setData('text/plain', findingId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, quadrant: QuadrantId) => {
      e.preventDefault();
      const findingId = e.dataTransfer.getData('text/plain') || draggedId;
      if (!findingId) return;
      setPlacements((prev) => {
        const filtered = prev.filter((p) => p.findingId !== findingId);
        return [...filtered, { findingId, quadrant }];
      });
      setDraggedId(null);
    },
    [draggedId]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleTouchSelect = useCallback((findingId: string) => {
    setSelectedFindingId((prev) => (prev === findingId ? null : findingId));
    setTouchPlacing(true);
  }, []);

  const handleTouchPlace = useCallback(
    (quadrant: QuadrantId) => {
      if (!selectedFindingId) return;
      setPlacements((prev) => {
        const filtered = prev.filter((p) => p.findingId !== selectedFindingId);
        return [...filtered, { findingId: selectedFindingId, quadrant }];
      });
      setSelectedFindingId(null);
      setTouchPlacing(false);
    },
    [selectedFindingId]
  );

  const handleReset = useCallback(() => {
    setPlacements([]);
    setSelectedFindingId(null);
    setExpandedEvidence(null);
    setShowReasoning(false);
    setTouchPlacing(false);
  }, []);

  const handleKeyDownFinding = useCallback(
    (e: React.KeyboardEvent, findingId: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTouchSelect(findingId);
      }
    },
    [handleTouchSelect]
  );

  const handleKeyDownQuadrant = useCallback(
    (e: React.KeyboardEvent, quadrant: QuadrantId) => {
      if ((e.key === 'Enter' || e.key === ' ') && selectedFindingId) {
        e.preventDefault();
        handleTouchPlace(quadrant);
      }
    },
    [selectedFindingId, handleTouchPlace]
  );

  const removeFinding = useCallback((findingId: string) => {
    setPlacements((prev) => prev.filter((p) => p.findingId !== findingId));
  }, []);

  const getFinding = (id: string) => findings.find((f) => f.id === id)!;
  const getQuadrant = (id: string) => placements.find((p) => p.findingId === id)?.quadrant;
  const isPlaced = (id: string) => placements.some((p) => p.findingId === id);
  const isCorrect = (id: string) => {
    const p = placements.find((p) => p.findingId === id);
    return p?.quadrant === getFinding(id).correctQuadrant;
  };

  const correctCount = findings.filter((f) => isCorrect(f.id)).length;

  return (
    <section id="prioritization-lab" className="py-16 px-4 sm:px-6 max-w-5xl mx-auto border-t border-teal-900/10">
      {/* Accordion header — always visible */}
      <div
        role="button"
        tabIndex={0}
        onClick={toggleOpen}
        onKeyDown={handleHeaderKeyDown}
        aria-expanded={isOpen}
        aria-controls="prioritization-lab-content"
        className="flex items-center gap-3 cursor-pointer select-none rounded-xl p-3 -ml-3 transition-colors hover:bg-teal-500/5 focus:bg-teal-500/5"
      >
        <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
          <FourQuadrant size={20} />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1">
          The Prioritization Lab
          <span className="text-teal-600 text-sm sm:text-base align-top">™</span>
          <span className="text-gray-400 font-medium text-base sm:text-lg"> — Experience the Trade-Offs</span>
        </h2>
        <ChevronDown
          className={`w-6 h-6 text-teal-600 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </div>

      {/* Collapsible lab content */}
      <div
        id="prioritization-lab-content"
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
      <p className="text-gray-600 text-sm mb-2 max-w-2xl leading-relaxed mt-4">
        Five fictional research findings. Drag each one onto the Impact/Effort matrix where it belongs.
        When you&rsquo;re done, reveal my strategic reasoning to compare your thinking with mine.
      </p>
      <p className="text-xs text-gray-400 italic mb-8">
        Interactive exercise — findings are illustrative and do not represent specific project data.
      </p>

      {/* Unplaced findings tray */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-teal-700/60 mb-3">
          Research Findings ({findings.length - placements.length} remaining)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {findings.map((f) => {
            if (isPlaced(f.id)) return null;
            const isSelected = selectedFindingId === f.id;
            return (
              <div
                key={f.id}
                draggable
                onDragStart={(e) => handleDragStart(e, f.id)}
                onDragEnd={handleDragEnd}
                onClick={() => handleTouchSelect(f.id)}
                onKeyDown={(e) => handleKeyDownFinding(e, f.id)}
                role="button"
                tabIndex={0}
                aria-label={`Research finding: ${f.title}. ${isSelected ? 'Selected — tap a quadrant to place.' : 'Tap or drag to place.'}`}
                aria-pressed={isSelected}
                className={`group rounded-xl p-4 bg-white border-2 transition-all duration-200 cursor-grab active:cursor-grabbing animate-pmt-reveal ${
                  isSelected
                    ? 'border-teal-500 shadow-lg ring-2 ring-teal-400/40 scale-[1.02]'
                    : 'border-gray-200 hover:border-teal-400 hover:shadow-md'
                } ${draggedId === f.id ? 'opacity-40' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5 hidden sm:block" aria-hidden="true" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 mb-1">{f.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{f.short}</p>
                    {/* Expandable evidence */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedEvidence(expandedEvidence === f.id ? null : f.id);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700 mt-2 transition-colors"
                      aria-expanded={expandedEvidence === f.id}
                      aria-controls={`evidence-${f.id}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {expandedEvidence === f.id ? 'Hide evidence' : 'View research evidence'}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${expandedEvidence === f.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expandedEvidence === f.id && (
                      <div
                        id={`evidence-${f.id}`}
                        className="mt-2 rounded-lg bg-gray-50 border border-gray-100 p-3 animate-pmt-reveal"
                      >
                        <p className="text-xs text-gray-600 leading-relaxed">{f.evidence}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {placements.length > 0 && !allPlaced && (
          <p className="text-xs text-gray-400 mt-3 italic">
            {touchPlacing && selectedFindingId
              ? 'Tap a quadrant to place the selected finding.'
              : 'Drag findings onto the matrix, or tap to select then tap a quadrant.'}
          </p>
        )}
      </div>

      {/* Impact/Effort matrix */}
      <div className="relative mb-6">
        {/* Axis labels */}
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Low Effort</span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">High Effort</span>
        </div>
        <div className="flex gap-3">
          {/* Y-axis label */}
          <div className="flex flex-col items-center justify-between py-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 [writing-mode:vertical-rl] rotate-180">
              High Impact
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 [writing-mode:vertical-rl] rotate-180">
              Low Impact
            </span>
          </div>

          {/* 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            {quadrantOrder.map((qId) => {
              const q = quadrants[qId];
              const placedHere = placements.filter((p) => p.quadrant === qId);
              return (
                <div
                  key={qId}
                  onDrop={(e) => handleDrop(e, qId)}
                  onDragOver={handleDragOver}
                  onClick={() => touchPlacing && selectedFindingId && handleTouchPlace(qId)}
                  onKeyDown={(e) => handleKeyDownQuadrant(e, qId)}
                  role={selectedFindingId ? 'button' : undefined}
                  tabIndex={selectedFindingId ? 0 : undefined}
                  aria-label={`${q.label} — ${q.subtitle}${placedHere.length > 0 ? `, contains ${placedHere.length} finding${placedHere.length > 1 ? 's' : ''}` : ''}${selectedFindingId ? '. Press Enter to place selected finding here.' : ''}`}
                  className={`rounded-2xl p-4 min-h-[180px] sm:min-h-[220px] transition-all duration-200 ${
                    touchPlacing && selectedFindingId
                      ? 'cursor-pointer hover:ring-2 hover:ring-teal-400/50'
                      : ''
                  }`}
                  style={{
                    backgroundColor: q.bg,
                    border: `2px solid ${q.color}25`,
                  }}
                >
                  {/* Quadrant header */}
                  <div className="mb-3">
                    <p className="text-sm font-bold" style={{ color: q.color }}>
                      {q.label}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">{q.subtitle}</p>
                  </div>

                  {/* Placed findings */}
                  <div className="space-y-2">
                    {placedHere.map((p) => {
                      const f = getFinding(p.findingId);
                      const correct = isCorrect(p.findingId);
                      return (
                        <div
                          key={p.findingId}
                          className="rounded-lg bg-white border px-3 py-2 flex items-center gap-2 animate-pmt-reveal"
                          style={{ borderColor: `${q.color}30` }}
                        >
                          <span className="text-xs font-bold text-gray-700 flex-1">{f.title}</span>
                          {showReasoning && (
                            correct ? (
                              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#059669' }} />
                            ) : (
                              <span
                                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                                style={{ background: '#f59e0b20', color: '#b45309' }}
                              >
                                Should be {quadrants[f.correctQuadrant].label}
                              </span>
                            )
                          )}
                          {!showReasoning && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFinding(p.findingId);
                              }}
                              className="text-gray-300 hover:text-gray-500 transition-colors text-xs"
                              aria-label={`Remove ${f.title} from ${q.label}`}
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Empty hint */}
                  {placedHere.length === 0 && (
                    <p className="text-[10px] text-gray-300 italic mt-2">Drop findings here</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress + actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Layers className="w-4 h-4 text-teal-600" />
          <span>
            {placements.length} of {findings.length} placed
            {showReasoning && ` · ${correctCount} match my prioritization`}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Reset all placements"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={() => setShowReasoning(!showReasoning)}
            disabled={!allPlaced}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
              allPlaced
                ? 'text-white bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg cursor-pointer'
                : 'text-white/50 bg-gray-300 cursor-not-allowed'
            }`}
            aria-label="Reveal strategic reasoning"
          >
            <Lightbulb className="w-4 h-4" />
            {showReasoning ? 'Hide My Reasoning' : 'Reveal My Strategic Reasoning'}
          </button>
        </div>
      </div>

      {/* Strategic reasoning panel */}
      {showReasoning && allPlaced && (
        <div className="rounded-2xl bg-white border-2 p-6 sm:p-8 animate-pmt-reveal" style={{ borderColor: '#05966930' }}>
          <div className="flex items-start gap-4 mb-5">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#05966910' }}>
              <Sparkles className="w-5 h-5" style={{ color: '#059669' }} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#059669' }}>
                My Strategic Reasoning
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Here&rsquo;s how I would prioritize each finding — and why. The goal isn&rsquo;t just sorting;
                it&rsquo;s connecting evidence to action.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {findings.map((f) => {
              const q = quadrants[f.correctQuadrant];
              const userQ = getQuadrant(f.id);
              const matched = userQ === f.correctQuadrant;
              return (
                <div key={f.id} className="rounded-xl border p-4" style={{ borderColor: `${q.color}20`, backgroundColor: `${q.color}05` }}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-bold text-gray-900">{f.title}</p>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${q.color}15`, color: q.color }}
                        >
                          {q.label}
                        </span>
                        {matched ? (
                          <CheckCircle2 className="w-4 h-4" style={{ color: '#059669' }} />
                        ) : (
                          <span className="text-[10px] text-gray-400 italic">
                            You placed in {userQ ? quadrants[userQ].label : '—'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed mb-2">
                        <span className="font-bold text-gray-700">Recommendation:</span> {f.recommendation}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-bold text-gray-700">Why:</span> {f.reasoning}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Keyboard hint */}
      <p className="text-center text-xs text-gray-400 mt-6 mb-6 hidden sm:block">
        How to Play: Select a research finding, then choose where it belongs on the matrix. Once you&rsquo;ve placed all five, reveal my strategic reasoning.
      </p>
        </div>
      </div>

      {/* How I Facilitate Workshops card — always visible */}
      <div
        className="rounded-2xl shadow-lg p-6 sm:p-8 animate-pmt-reveal"
        style={{ backgroundColor: '#FFF6D5', border: '2px solid #E8D89A' }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#E8D89A30' }}
          >
            <Users className="w-5 h-5" style={{ color: '#8B6914' }} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-800">
              How I Facilitate Workshops
            </p>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
              One of my favorite ways to engage stakeholders and users is through interactive remote
              workshops like this one. I create space for different perspectives, encourage participants
              to challenge assumptions, and guide conversations without giving away the answers. The goal
              isn&rsquo;t to make everyone think like me&mdash;it&rsquo;s to help teams think critically,
              collaborate, and reach evidence-informed decisions together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrioritizationLab;
