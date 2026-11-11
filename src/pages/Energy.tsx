import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Lightbulb,
  Zap,
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Smile,
  Sparkles,
} from 'lucide-react';
import FourQuadrant from '../components/FourQuadrant';
import Footer from '../components/Footer';

type TouchpointId = 'highBill' | 'usage' | 'callSupport' | 'saveEnergy' | 'confidence';

interface Touchpoint {
  id: TouchpointId;
  emoji: string;
  label: string;
  icon: typeof HelpCircle;
  customerExperience: string;
  uxApproach: string;
  improvement: string;
}

const touchpoints: Touchpoint[] = [
  {
    id: 'highBill',
    emoji: '😕',
    label: 'High Bill',
    icon: HelpCircle,
    customerExperience: 'Why is my electricity bill so high?',
    uxApproach: 'Understand billing confusion, expectations, and perceived energy usage.',
    improvement: 'Make charges and consumption easier to understand.',
  },
  {
    id: 'usage',
    emoji: '⚡',
    label: 'Usage',
    icon: Zap,
    customerExperience: 'I\u2019m barely using electricity. How can I owe this much?',
    uxApproach: 'Investigate how customers interpret their consumption and where information is missing.',
    improvement: 'Connect energy usage patterns with billing information.',
  },
  {
    id: 'callSupport',
    emoji: '😣',
    label: 'Call Support',
    icon: AlertCircle,
    customerExperience: 'I need to call someone to explain this bill.',
    uxApproach: 'Identify recurring questions, unmet information needs, and reasons customers contact support.',
    improvement: 'Provide clearer self-service answers to reduce unnecessary calls.',
  },
  {
    id: 'saveEnergy',
    emoji: '😊',
    label: 'Save Energy',
    icon: Check,
    customerExperience: 'Now I understand what I can do to use less energy.',
    uxApproach: 'Explore useful guidance, conservation tools, savings opportunities, and incentives.',
    improvement: 'Help customers make informed decisions about reducing consumption.',
  },
  {
    id: 'confidence',
    emoji: '😄',
    label: 'Confidence',
    icon: Smile,
    customerExperience: 'I know how to manage my energy use and where to find help.',
    uxApproach: 'Evaluate whether information and guidance help customers understand their options and take action.',
    improvement: 'Improve customer confidence and reduce avoidable support demand.',
  },
];

const frictionIds: TouchpointId[] = ['highBill', 'usage', 'callSupport'];

const Energy = () => {
  const navigate = useNavigate();
  const [activeTouchpoint, setActiveTouchpoint] = useState<TouchpointId>('highBill');
  const [improved, setImproved] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Energy Company — From Friction to Flow | UXExpertise';
    return () => {
      document.title = 'UXExpertise — Play My Thinking';
    };
  }, []);

  const activeTp = touchpoints.find((t) => t.id === activeTouchpoint)!;
  const isFrictionPoint = frictionIds.includes(activeTouchpoint);
  const showImprovedState = improved && isFrictionPoint;

  const getDisplayEmoji = (tp: Touchpoint) => {
    if (improved && frictionIds.includes(tp.id)) {
      if (tp.id === 'highBill') return '🙂';
      if (tp.id === 'usage') return '😊';
      if (tp.id === 'callSupport') return '😌';
    }
    return tp.emoji;
  };

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeTouchpoint]);

  const handleKeyDown = (e: React.KeyboardEvent, id: TouchpointId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTouchpoint(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#E9FAF3] text-gray-800">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-teal-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#E9FAF3]/90 backdrop-blur-md border-b border-teal-900/10">
        <div className="flex items-center justify-between px-5 sm:px-6 py-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-teal-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Home</span>
          </button>
          <div className="flex items-center gap-2">
            <FourQuadrant size={16} />
            <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
              Energy Company
            </span>
            <span className="text-xs text-gray-400 hidden sm:inline">
              From Friction to Flow™
            </span>
          </div>
        </div>
      </header>

      <main id="main-content" className="px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-2xl mx-auto">
          {/* Title block */}
          <div className="text-center mb-6 sm:mb-8 animate-pmt-reveal">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              Energy Company — From Friction to Flow
              <span className="text-[#059669] text-lg sm:text-xl align-top">™</span>
            </h1>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              Explore how customer friction can become a clearer, more confident experience.
            </p>
          </div>

          {/* Problem + Solution summary card */}
          <div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 animate-pmt-reveal"
            style={{ border: '2px solid #05966920' }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#05966910' }}>
                    <span className="text-xs font-black" style={{ color: '#059669' }}>!</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#059669' }}>
                    The Challenge — How Might We?
                  </p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  How might we help customers understand their electricity bills, reduce energy
                  consumption, and discover savings opportunities while decreasing billing-related
                  customer support complaints?
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#05966910' }}>
                    <Lightbulb className="w-3.5 h-3.5" style={{ color: '#059669' }} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#059669' }}>
                    The Solution
                  </p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  My team and I conducted customer interviews, mapped customer journeys, and performed
                  usability testing to uncover billing frustrations, identify opportunities for
                  energy-saving guidance and incentives, and deliver actionable recommendations to
                  improve the customer experience and reduce avoidable support calls.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive electrical journey */}
          <div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 animate-pmt-reveal"
            style={{ border: '2px solid #05966920' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: '#05966910' }}>
                <Zap className="w-4 h-4" style={{ color: '#059669' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#059669' }}>
                  Customer Journey
                </span>
              </div>
              <span className="text-xs text-gray-400">
                Click a touchpoint to explore
              </span>
            </div>

            {/* Electrical line with touchpoints */}
            <div className="relative py-8 sm:py-10">
              {/* The electrical line */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 rounded-full overflow-hidden" style={{ background: '#e5e7eb' }}>
                {/* Animated current */}
                <div
                  className={`h-full rounded-full ${improved ? 'energy-current-smooth' : 'energy-current-friction'}`}
                  style={{
                    background: improved
                      ? 'linear-gradient(90deg, #059669, #34d399, #059669)'
                      : 'linear-gradient(90deg, #059669, #fbbf24, #ef4444, #fbbf24, #059669)',
                    backgroundSize: '200% 100%',
                  }}
                />
              </div>

              {/* Touchpoint nodes */}
              <div className="relative flex items-center justify-between">
                {touchpoints.map((tp) => {
                  const isActive = activeTouchpoint === tp.id;
                  const isFriction = frictionIds.includes(tp.id);
                  const showImproved = improved && isFriction;
                  const emoji = getDisplayEmoji(tp);
                  const isPositive = showImproved || !isFriction;

                  return (
                    <div key={tp.id} className="flex flex-col items-center relative z-10">
                      {/* Touchpoint button */}
                      <button
                        onClick={() => setActiveTouchpoint(tp.id)}
                        onKeyDown={(e) => handleKeyDown(e, tp.id)}
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold transition-all duration-300 ${
                          isActive
                            ? 'scale-125 shadow-lg ring-4'
                            : 'scale-100 hover:scale-110 shadow-md'
                        }`}
                        style={{
                          background: isPositive ? '#059669' : '#f59e0b',
                          color: '#fff',
                          // ring color
                          boxShadow: isActive
                            ? isPositive
                              ? '0 0 0 4px #05966930, 0 4px 12px rgba(0,0,0,0.15)'
                              : '0 0 0 4px #f59e0b30, 0 4px 12px rgba(0,0,0,0.15)'
                            : '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                        aria-label={`${tp.label} touchpoint${showImproved ? ' (improved)' : ''}`}
                        aria-pressed={isActive}
                      >
                        <span aria-hidden="true">{emoji}</span>
                      </button>

                      {/* Label */}
                      <span
                        className={`mt-2 text-xs font-bold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`}
                      >
                        {tp.label}
                      </span>

                      {/* Spark animation for friction points in original mode */}
                      {isActive && isFriction && !improved && (
                        <div className="absolute -top-1 -right-1 energy-spark" aria-hidden="true">
                          <Zap className="w-3 h-3 text-amber-500" />
                        </div>
                      )}

                      {/* Check mark for improved friction points */}
                      {isActive && showImproved && (
                        <div className="absolute -top-1 -right-1 energy-check-pop" aria-hidden="true">
                          <Check className="w-3 h-3 text-green-600 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Touchpoint detail panel */}
            <div ref={panelRef} className="mt-2 animate-pmt-reveal" key={`${activeTouchpoint}-${improved}`}>
              {/* Touchpoint header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: showImprovedState ? '#05966910' : isFrictionPoint ? '#f59e0b10' : '#05966910' }}
                >
                  {getDisplayEmoji(activeTp)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {activeTp.label}
                  </p>
                  <p className="text-xs text-gray-400">
                    {showImprovedState ? 'Improved Experience' : isFrictionPoint ? 'Friction Point' : 'Positive Touchpoint'}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                {/* Customer Experience */}
                <div className="rounded-lg p-3 bg-gray-50 border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Customer Experience
                  </p>
                  {showImprovedState ? (
                    <p className="text-sm text-gray-700 leading-relaxed italic">
                      {activeTp.improvement}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-700 leading-relaxed italic">
                      &ldquo;{activeTp.customerExperience}&rdquo;
                    </p>
                  )}
                </div>

                {/* My UX Approach */}
                <div
                  className="rounded-lg p-3 border"
                  style={{ background: '#05966908', borderColor: '#05966920' }}
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#059669' }} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#059669' }}>
                        My UX Approach
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {activeTp.uxApproach}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience Improvement (always shown) */}
                <div
                  className="rounded-lg p-3 border"
                  style={{ background: '#05966908', borderColor: '#05966920' }}
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#059669' }} />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#059669' }}>
                        Experience Improvement
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {activeTp.improvement}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Illustrative label */}
              <p className="text-xs text-gray-400 text-center mt-4 italic">
                Illustrative scenario — not from a specific project or engagement.
              </p>
            </div>
          </div>

          {/* Reveal the Improved Journey toggle */}
          <div className="text-center mb-6">
            <button
              onClick={() => setImproved(!improved)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg ${
                improved
                  ? 'text-white bg-[#059669] hover:bg-[#059669]/90'
                  : 'text-[#059669] bg-white border-2 border-[#059669]/30 hover:border-[#059669]/50'
              }`}
              aria-pressed={improved}
            >
              {improved ? (
                <>
                  <ArrowLeft className="w-4 h-4" />
                  Show Original Journey
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Reveal the Improved Journey
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Status message */}
          <p className="text-center text-xs text-gray-400 mb-4">
            {improved
              ? 'Showing the improved journey — friction points transformed into positive experiences.'
              : 'Showing the original journey with friction points at High Bill, Usage, and Call Support.'}
          </p>

          {/* Keyboard hint */}
          <p className="text-center text-xs text-gray-400 hidden sm:block">
            Tab to navigate · Enter or Space to select a touchpoint
          </p>

          {/* Key Insight */}
          <div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-8 animate-pmt-reveal"
            style={{ border: '2px solid #05966930' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: '#05966910' }}
              >
                <Lightbulb className="w-5 h-5" style={{ color: '#059669' }} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#059669' }}>
                  Key Insight
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  &ldquo;Customer friction isn&rsquo;t always where organizations expect it to be. By listening
                  to customers, mapping their journeys, and observing their interactions, I uncover gaps
                  between business assumptions and actual experiences&mdash;turning research findings into
                  insights that help clients prioritize meaningful improvements.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Energy;
