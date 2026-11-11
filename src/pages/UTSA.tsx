import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Lightbulb,
  Sprout,
  Lightbulb as Bulb,
  Rocket,
  Puzzle,
  GraduationCap,
  Network,
  Layers,
  Workflow,
  Figma,
  Brain,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import FourQuadrant from '../components/FourQuadrant';
import Footer from '../components/Footer';

type StudentId = 'careful' | 'creative' | 'fast' | 'doubting';

interface StudentProfile {
  id: StudentId;
  emoji: string;
  label: string;
  icon: typeof Sprout;
  color: string;
  colorRgb: string;
  challenge: string;
  mentorship: string;
  question: string;
  growth: string;
}

const students: StudentProfile[] = [
  {
    id: 'careful',
    emoji: '🌱',
    label: 'The Careful Learner',
    icon: Sprout,
    color: '#0f766e',
    colorRgb: '15, 118, 110',
    challenge:
      'Needs additional time to process information, develop understanding, and build confidence.',
    mentorship:
      'I provide patience, individualized attention, smaller learning steps, and encouragement without rushing the student.',
    question: 'What do you understand so far, and what question would help you move forward?',
    growth:
      'The student learns to trust their thinking, gradually builds confidence, and begins asking meaningful questions independently.',
  },
  {
    id: 'creative',
    emoji: '💡',
    label: 'The Creative Thinker',
    icon: Bulb,
    color: '#c2410c',
    colorRgb: '194, 65, 12',
    challenge:
      'Has exciting ideas but sometimes struggles to connect them to user needs or evidence.',
    mentorship:
      'I encourage creative exploration while guiding ideas toward user research, information architecture, and strategic design decisions.',
    question: 'What user problem does your idea solve?',
    growth:
      'The student learns to combine creativity with evidence, research, and purposeful problem-solving.',
  },
  {
    id: 'fast',
    emoji: '🚀',
    label: 'The Fast-Moving Student',
    icon: Rocket,
    color: '#7c3aed',
    colorRgb: '124, 58, 237',
    challenge:
      'Moves quickly toward solutions without always investigating the underlying problem.',
    mentorship:
      'I challenge assumptions, introduce decision-making frameworks, and encourage discovery before jumping into design.',
    question: 'What evidence tells you this is the right problem to solve?',
    growth:
      'The student develops stronger critical thinking, patience with discovery, and more intentional design decisions.',
  },
  {
    id: 'doubting',
    emoji: '🧩',
    label: 'The Self-Doubting Student',
    icon: Puzzle,
    color: '#be185d',
    colorRgb: '190, 24, 93',
    challenge:
      'Hesitates to experiment because mistakes or criticism feel like failure.',
    mentorship:
      'I create a supportive learning environment, normalize iteration, encourage experimentation, and use constructive feedback to build resilience.',
    question: 'What did this attempt teach you, and what would you change?',
    growth:
      'The student becomes more comfortable making mistakes, learning from feedback, and making independent decisions.',
  },
];

const UTSA = () => {
  const navigate = useNavigate();
  const [activeStudent, setActiveStudent] = useState<StudentId | null>(null);
  const [showBeyondGrad, setShowBeyondGrad] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const beyondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'UTSA — From Potential to Professional | UXExpertise';
    return () => {
      document.title = 'UXExpertise — Play My Thinking';
    };
  }, []);

  const activeProfile = students.find((s) => s.id === activeStudent);

  useEffect(() => {
    if (activeStudent && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeStudent]);

  useEffect(() => {
    if (showBeyondGrad && beyondRef.current) {
      beyondRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [showBeyondGrad]);

  const handleStudentKeyDown = (e: React.KeyboardEvent, id: StudentId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveStudent(id);
    }
  };

  const handleOutcomeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setShowBeyondGrad(!showBeyondGrad);
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
            <FourQuadrant size={16} />
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Home</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">
              UTSA
            </span>
            <span className="text-xs text-gray-400 hidden sm:inline">
              From Potential to Professional™
            </span>
          </div>
        </div>
      </header>

      <main id="main-content" className="px-4 sm:px-6 py-6 sm:py-10">
        <div className="max-w-3xl mx-auto">
          {/* Title block */}
          <div className="text-center mb-6 sm:mb-8 animate-pmt-reveal">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              UTSA — From Potential to Professional
              <span className="text-[#f97316] text-lg sm:text-xl align-top">™</span>
            </h1>
            <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">
              Different Students. Different Needs. One Goal: Independent Success.
            </p>
          </div>

          {/* Problem + Solution summary card */}
          <div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 animate-pmt-reveal"
            style={{ border: '2px solid #f9731620' }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#f9731610' }}>
                    <span className="text-xs font-black" style={{ color: '#f97316' }}>!</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#f97316' }}>
                    The Problem
                  </p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Students from diverse backgrounds entered UX and development education with
                  different abilities, confidence levels, and fears of making mistakes, often limiting
                  their willingness to explore and learn.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#f9731610' }}>
                    <Lightbulb className="w-3.5 h-3.5" style={{ color: '#f97316' }} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#f97316' }}>
                    The Solution
                  </p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I combined active listening, personalized mentorship, and real-world experience to
                  build students&rsquo; confidence, teach them to ask better questions, and embrace mistakes
                  as learning opportunities&mdash;shifting their focus from fear of failure to a passion for
                  solving real user problems.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive mentorship flowchart */}
          <div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 animate-pmt-reveal"
            style={{ border: '2px solid #f9731620' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: '#f9731610' }}>
                <Workflow className="w-4 h-4" style={{ color: '#f97316' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#f97316' }}>
                  Mentorship Flowchart
                </span>
              </div>
              <span className="text-xs text-gray-400">
                Click a student to explore
              </span>
            </div>

            {/* Flowchart */}
            <div className="flex flex-col items-center">
              {/* Start node — rounded rectangle */}
              <div
                className="rounded-full px-6 py-3 text-center font-bold text-sm text-white shadow-md"
                style={{ background: '#f97316' }}
              >
                MEET THE STUDENT
              </div>

              {/* Arrow down */}
              <FlowArrow color="#f97316" />

              {/* Decision diamond */}
              <div className="relative" style={{ width: '200px', height: '80px' }}>
                <div
                  className="absolute inset-0 flex items-center justify-center text-center text-xs font-bold text-white"
                  style={{
                    background: '#f97316',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  }}
                >
                  <span className="px-8">WHAT DOES THIS STUDENT NEED?</span>
                </div>
              </div>

              {/* Desktop: branching lines to 4 students */}
              <div className="hidden md:block w-full relative mt-2" style={{ height: '40px' }}>
                {/* Horizontal connector line */}
                <div className="absolute top-0 left-[12.5%] right-[12.5%] h-0.5" style={{ background: '#d1d5db' }} />
                {/* Vertical drops to each student */}
                {students.map((s, i) => (
                  <div
                    key={s.id}
                    className="absolute top-0 w-0.5 transition-all duration-300"
                    style={{
                      left: `${12.5 + i * 25}%`,
                      height: '40px',
                      background: activeStudent === s.id ? s.color : '#d1d5db',
                      opacity: activeStudent === s.id ? 1 : 0.5,
                      transform: 'translateX(-50%)',
                    }}
                  />
                ))}
              </div>

              {/* Mobile: single vertical arrow */}
              <div className="md:hidden">
                <FlowArrow color="#d1d5db" small />
              </div>

              {/* Four student profile boxes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 w-full">
                {students.map((s) => {
                  const isActive = activeStudent === s.id;
                  return (
                    <div key={s.id} className="flex flex-col items-center">
                      {/* Mobile arrow */}
                      <div className="md:hidden mb-2">
                        <FlowArrow
                          color={isActive ? s.color : '#d1d5db'}
                          small
                          active={isActive}
                        />
                      </div>

                      <button
                        onClick={() => setActiveStudent(s.id)}
                        onKeyDown={(e) => handleStudentKeyDown(e, s.id)}
                        className={`w-full rounded-xl p-3 sm:p-4 text-center transition-all duration-300 border-2 ${
                          isActive
                            ? 'shadow-lg scale-[1.03]'
                            : 'shadow-sm hover:shadow-md hover:scale-[1.01]'
                        }`}
                        style={{
                          borderColor: isActive ? s.color : '#e5e7eb',
                          background: isActive ? `rgba(${s.colorRgb}, 0.05)` : '#ffffff',
                        }}
                        aria-pressed={isActive}
                        aria-label={`${s.label} — click to explore this student profile`}
                      >
                        <div className="text-2xl mb-1.5" aria-hidden="true">
                          {s.emoji}
                        </div>
                        <p
                          className="text-xs sm:text-sm font-bold leading-tight"
                          style={{ color: isActive ? s.color : '#374151' }}
                        >
                          {s.label}
                        </p>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Converging lines to final outcome — desktop */}
              <div className="hidden md:block w-full relative" style={{ height: '40px' }}>
                {/* Vertical rises from each student */}
                {students.map((s, i) => (
                  <div
                    key={s.id}
                    className="absolute bottom-0 w-0.5 transition-all duration-300"
                    style={{
                      left: `${12.5 + i * 25}%`,
                      height: '40px',
                      background: activeStudent === s.id ? s.color : '#d1d5db',
                      opacity: activeStudent === s.id ? 1 : 0.5,
                      transform: 'translateX(-50%)',
                    }}
                  />
                ))}
                {/* Horizontal connector */}
                <div className="absolute bottom-0 left-[12.5%] right-[12.5%] h-0.5" style={{ background: '#d1d5db' }} />
                {/* Center rise to outcome */}
                <div
                  className="absolute bottom-0 left-1/2 w-0.5 h-40 transition-all duration-300"
                  style={{
                    background: activeStudent ? '#f97316' : '#d1d5db',
                    opacity: activeStudent ? 1 : 0.5,
                    transform: 'translateX(-50%)',
                  }}
                />
              </div>

              {/* Mobile arrow to outcome */}
              <div className="md:hidden">
                <FlowArrow
                  color={activeStudent ? '#f97316' : '#d1d5db'}
                  small
                  active={!!activeStudent}
                />
              </div>

              {/* Final outcome box */}
              <button
                onClick={() => setShowBeyondGrad(!showBeyondGrad)}
                onKeyDown={handleOutcomeKeyDown}
                className={`rounded-xl px-6 py-4 text-center font-bold text-white shadow-lg transition-all duration-300 border-2 ${
                  showBeyondGrad ? 'scale-[1.03]' : 'hover:scale-[1.01]'
                }`}
                style={{
                  background: '#f97316',
                  borderColor: showBeyondGrad ? '#f97316' : 'transparent',
                  boxShadow: showBeyondGrad
                    ? '0 0 0 4px #f9731630, 0 4px 12px rgba(0,0,0,0.15)'
                    : '0 4px 12px rgba(0,0,0,0.1)',
                }}
                aria-pressed={showBeyondGrad}
                aria-label="Independent, confident, career-ready — click to see beyond graduation"
              >
                <div className="flex items-center gap-2 justify-center">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-sm sm:text-base">
                    INDEPENDENT, CONFIDENT, CAREER-READY
                  </span>
                </div>
              </button>

              {/* Supporting statement */}
              <p className="text-xs sm:text-sm text-gray-500 text-center mt-4 max-w-md leading-relaxed">
                Different mentorship paths. One shared goal: helping students develop the confidence,
                judgment, and adaptability to succeed professionally.
              </p>

              {/* Chevron hint for outcome button */}
              {!showBeyondGrad && (
                <button
                  onClick={() => setShowBeyondGrad(true)}
                  className="text-gray-400 hover:text-[#f97316] transition-colors mt-2"
                  aria-label="Reveal beyond graduation section"
                >
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </button>
              )}
            </div>

            {/* Student detail panel */}
            {activeProfile && (
              <div
                ref={panelRef}
                key={activeProfile.id}
                className="mt-8 rounded-xl p-5 sm:p-6 animate-pmt-reveal"
                style={{
                  background: `rgba(${activeProfile.colorRgb}, 0.03)`,
                  border: `2px solid rgba(${activeProfile.colorRgb}, 0.15)`,
                }}
                role="region"
                aria-label={`${activeProfile.label} mentorship details`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: `rgba(${activeProfile.colorRgb}, 0.1)` }}
                  >
                    {activeProfile.emoji}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: activeProfile.color }}>
                      {activeProfile.label}
                    </p>
                    <p className="text-xs text-gray-400">Student Profile</p>
                  </div>
                </div>

                {/* Four labeled sections */}
                <div className="space-y-3">
                  <DetailSection
                    label="Student Challenge"
                    text={activeProfile.challenge}
                    color={activeProfile.color}
                    colorRgb={activeProfile.colorRgb}
                  />
                  <DetailSection
                    label="How I Adapt My Mentorship"
                    text={activeProfile.mentorship}
                    color={activeProfile.color}
                    colorRgb={activeProfile.colorRgb}
                  />
                  <DetailSection
                    label="The Question I Ask"
                    text={activeProfile.question}
                    color={activeProfile.color}
                    colorRgb={activeProfile.colorRgb}
                    italic
                  />
                  <DetailSection
                    label="The Growth I Encourage"
                    text={activeProfile.growth}
                    color={activeProfile.color}
                    colorRgb={activeProfile.colorRgb}
                  />
                </div>
              </div>
            )}

            {/* Illustrative label */}
            <p className="text-xs text-gray-400 text-center mt-5 italic">
              Illustrative archetypes representing different mentoring needs — not identifiable former students.
            </p>
          </div>

          {/* Beyond Graduation section — revealed when outcome is clicked */}
          {showBeyondGrad && (
            <div
              ref={beyondRef}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 animate-pmt-reveal"
              style={{ border: '2px solid #f9731620' }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: '#f9731610' }}>
                  <GraduationCap className="w-4 h-4" style={{ color: '#f97316' }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#f97316' }}>
                    Beyond Graduation
                  </span>
                </div>
              </div>

              <div className="text-center mb-5">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed italic font-medium">
                  &ldquo;My success as a mentor isn&rsquo;t measured by how many answers I give students,
                  but by how confidently they learn to find answers without me.&rdquo;
                </p>
              </div>

              <div className="rounded-lg p-4 bg-gray-50 border border-gray-100 mb-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  My mentorship focused on helping students develop critical thinking, strategic
                  questioning, problem-solving, confidence, and professional readiness — the capabilities
                  that matter most when they transition from the classroom to the workplace.
                </p>
              </div>

              <div className="rounded-lg p-4" style={{ background: '#f9731608', border: '1px solid #f9731620' }}>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#f97316' }} />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Former students have gone on to professional careers, subject to verification of
                    approved project information.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tools & Thinking section */}
          <div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 animate-pmt-reveal"
            style={{ border: '2px solid #f9731620' }}
          >
            <div className="flex items-center justify-center mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: '#f9731610' }}>
                <Layers className="w-4 h-4" style={{ color: '#f97316' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#f97316' }}>
                  Tools &amp; Thinking
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Network, label: 'Visio', desc: 'Process Mapping' },
                { icon: Figma, label: 'Figma', desc: 'UX Design & Prototyping' },
                { icon: Layers, label: 'Information Architecture', desc: 'Organizing Complex Information' },
                { icon: Brain, label: 'AI', desc: 'Research & Thinking Support' },
              ].map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.label}
                    className="rounded-xl p-4 text-center border-2 hover:shadow-md transition-all"
                    style={{ borderColor: '#f9731520', background: '#f9731605' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2"
                      style={{ background: '#f9731610' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: '#f97316' }} />
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">
                      {tool.label}
                    </p>
                    <p className="text-xs text-gray-500 leading-snug">
                      {tool.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-gray-400 text-center mt-4 italic max-w-md mx-auto">
              These represent current professional capabilities. AI support reflects present-day practice,
              not necessarily the original UTSA teaching engagement.
            </p>
          </div>

          {/* Key Insight */}
          <div
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 animate-pmt-reveal"
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
                  &ldquo;The most effective mentorship begins with listening, not teaching. When I helped
                  students replace their fear of mistakes with curiosity about users, they developed the
                  confidence to ask better questions, think independently, and approach UX and development
                  with purpose and passion.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white bg-[#f97316] hover:bg-[#f97316]/90 transition-all shadow-md hover:shadow-lg"
            >
              <FourQuadrant size={16} />
              Return to Portfolio
            </button>
          </div>

          {/* Keyboard hint */}
          <p className="text-center mt-4 text-xs text-gray-400 hidden sm:block">
            Tab to navigate · Enter or Space to select a student profile
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

/* FlowArrow component — vertical connector with arrowhead */
function FlowArrow({
  color,
  small,
  active,
}: {
  color: string;
  small?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center ${small ? 'my-1' : 'my-2'} transition-opacity duration-300`}
      style={{ opacity: active === false ? 0.5 : 1 }}
    >
      <div
        className={`w-0.5 ${small ? 'h-6' : 'h-8'}`}
        style={{ background: color }}
      />
      <div
        className="w-0 h-0"
        style={{
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `7px solid ${color}`,
        }}
      />
    </div>
  );
}

/* DetailSection — one of the four labeled sections in the student panel */
function DetailSection({
  label,
  text,
  color,
  colorRgb,
  italic,
}: {
  label: string;
  text: string;
  color: string;
  colorRgb: string;
  italic?: boolean;
}) {
  return (
    <div
      className="rounded-lg p-3 border"
      style={{ background: '#ffffff', borderColor: `rgba(${colorRgb}, 0.1)` }}
    >
      <div className="flex items-start gap-2">
        <div
          className="w-1 h-4 rounded-full flex-shrink-0 mt-1"
          style={{ background: color }}
        />
        <div>
          <p
            className="text-xs font-bold uppercase tracking-wider mb-1"
            style={{ color }}
          >
            {label}
          </p>
          <p className={`text-sm text-gray-700 leading-relaxed ${italic ? 'italic' : ''}`}>
            {italic ? `\u201C${text}\u201D` : text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UTSA;
