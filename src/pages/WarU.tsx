import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Home,
  Search,
  Users,
  Compass,
  TestTube,
  ShieldCheck,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import FourQuadrant from '../components/FourQuadrant';
import Footer from '../components/Footer';

interface AssessmentOption {
  letter: string;
  text: string;
  correct: boolean;
}

interface AssessmentScreen {
  id: string;
  icon: typeof Search;
  iconLabel: string;
  capability: string;
  scenario: string;
  question: string;
  options: AssessmentOption[];
  hint: string;
  explanation: string;
  isLast?: boolean;
}

const screens: AssessmentScreen[] = [
  {
    id: 'research',
    icon: Search,
    iconLabel: 'UX Research',
    capability: 'UX Research',
    scenario:
      'A team wants to redesign a learning experience, but the underlying user problem has not been validated.',
    question: 'What should happen first?',
    options: [
      { letter: 'A', text: 'Begin redesigning the interface.', correct: false },
      { letter: 'B', text: 'Investigate user needs and existing evidence.', correct: true },
      { letter: 'C', text: 'Ask stakeholders to choose their preferred solution.', correct: false },
    ],
    hint: 'Before designing a solution, it helps to understand the problem you are solving. Whose experience matters most here?',
    explanation:
      'I apply user-centered research thinking to understand needs, examine existing experiences, and help teams make evidence-informed design decisions.',
  },
  {
    id: 'collaboration',
    icon: Users,
    iconLabel: 'Collaboration',
    capability: 'Collaboration',
    scenario:
      'Stakeholders have different opinions about what should be improved.',
    question: 'How should the team move forward?',
    options: [
      { letter: 'A', text: 'Follow the most senior stakeholder\u2019s preference.', correct: false },
      { letter: 'B', text: 'Facilitate a discussion around user needs, evidence, and shared goals.', correct: true },
      { letter: 'C', text: 'Build every requested feature.', correct: false },
    ],
    hint: 'Different perspectives can be valuable when they are connected to shared evidence and a common goal.',
    explanation:
      'I collaborate across roles, connect perspectives, and help translate stakeholder needs and user evidence into a shared direction.',
  },
  {
    id: 'strategy',
    icon: Compass,
    iconLabel: 'UX Strategy',
    capability: 'UX Strategy',
    scenario:
      'Research identifies several opportunities, but the team has limited time and resources.',
    question: 'How should priorities be established?',
    options: [
      { letter: 'A', text: 'Implement the easiest changes first.', correct: false },
      { letter: 'B', text: 'Evaluate user impact, evidence, feasibility, and organizational goals.', correct: true },
      { letter: 'C', text: 'Choose whichever recommendation receives the most votes.', correct: false },
    ],
    hint: 'Impact and feasibility together give a clearer picture than ease or popularity alone.',
    explanation:
      'I connect research findings with practical recommendations, helping teams understand priorities, constraints, and trade-offs.',
  },
  {
    id: 'testing',
    icon: TestTube,
    iconLabel: 'Testing & Validation',
    capability: 'Testing and Validation',
    scenario:
      'A new learning experience looks polished and stakeholders approve the design.',
    question: 'What provides stronger evidence that the experience works?',
    options: [
      { letter: 'A', text: 'Positive reactions to its appearance.', correct: false },
      { letter: 'B', text: 'Testing representative tasks with users and evaluating the results.', correct: true },
      { letter: 'C', text: 'Assuming that approval means the experience is effective.', correct: false },
    ],
    hint: 'Appearance and approval are signals, not proof. What would reveal whether real users can actually use it?',
    explanation:
      'I bring usability evaluation and iterative improvement into the design process, helping identify friction and opportunities before decisions are finalized.',
  },
  {
    id: 'ai',
    icon: ShieldCheck,
    iconLabel: 'Responsible AI Support',
    capability: 'Responsible AI Support',
    scenario:
      'AI generates a summary of research observations.',
    question: 'What should happen before using that summary to support a recommendation?',
    options: [
      { letter: 'A', text: 'Accept it because AI can process information quickly.', correct: false },
      { letter: 'B', text: 'Validate the summary against approved evidence and apply professional judgment.', correct: true },
      { letter: 'C', text: 'Replace the original research notes with the AI summary.', correct: false },
    ],
    hint: 'Speed does not equal accuracy. Who is ultimately responsible for the recommendation?',
    explanation:
      'I use AI as a support tool where appropriate to accelerate organization, synthesis, and documentation while retaining human responsibility for accuracy, interpretation, confidentiality, and recommendations.',
    isLast: true,
  },
];

type AnswerState = 'unanswered' | 'correct' | 'revealed';

interface QuestionResult {
  attempts: number;
  state: AnswerState;
  selectedLetter: string | null;
  wrongLetters: string[];
}

const WarU = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [results, setResults] = useState<Record<string, QuestionResult>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | 'reveal'>('correct');
  const [showFinal, setShowFinal] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const screen = screens[currentScreen];
  const totalScreens = screens.length;
  const result = results[screen.id];
  const isResolved = result?.state === 'correct' || result?.state === 'revealed';

  useEffect(() => {
    document.title = 'WarU — Experience My Thinking | UXExpertise';
    return () => {
      document.title = 'UXExpertise — Play My Thinking';
    };
  }, []);

  // Reset local selection when screen changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFeedbackType('correct');
  }, [currentScreen]);

  const handleSelectAnswer = (letter: string) => {
    if (isResolved) return;

    const option = screen.options.find((o) => o.letter === letter);
    if (!option) return;

    setSelectedAnswer(letter);

    const existing = results[screen.id];
    const attempts = (existing?.attempts ?? 0) + 1;
    const wrongLetters = [...(existing?.wrongLetters ?? [])];

    if (option.correct) {
      setShowFeedback(true);
      setFeedbackType('correct');
      setResults((prev) => ({
        ...prev,
        [screen.id]: {
          attempts,
          state: 'correct',
          selectedLetter: letter,
          wrongLetters,
        },
      }));
    } else {
      wrongLetters.push(letter);
      if (attempts >= 2) {
        // Second wrong attempt — reveal correct answer
        setShowFeedback(true);
        setFeedbackType('reveal');
        setResults((prev) => ({
          ...prev,
          [screen.id]: {
            attempts,
            state: 'revealed',
            selectedLetter: letter,
            wrongLetters,
          },
        }));
      } else {
        // First wrong attempt
        setShowFeedback(true);
        setFeedbackType('incorrect');
        setResults((prev) => ({
          ...prev,
          [screen.id]: {
            attempts,
            state: 'unanswered',
            selectedLetter: letter,
            wrongLetters,
          },
        }));
      }
    }
  };

  const handleNext = () => {
    if (!isResolved) return;
    if (currentScreen < totalScreens - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      setShowFinal(true);
    }
  };

  const handlePrev = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleRestart = () => {
    setResults({});
    setSelectedAnswer(null);
    setShowFeedback(false);
    setFeedbackType('correct');
    setShowFinal(false);
    setCurrentScreen(0);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (showFinal) return;
      if (e.key === 'ArrowRight' && isResolved) {
        e.preventDefault();
        if (currentScreen < totalScreens - 1) {
          setCurrentScreen(currentScreen + 1);
        } else {
          setShowFinal(true);
        }
      } else if (e.key === 'ArrowLeft' && currentScreen > 0) {
        e.preventDefault();
        setCurrentScreen(currentScreen - 1);
      }
    },
    [isResolved, currentScreen, showFinal, totalScreens]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Scroll to feedback when it appears
  useEffect(() => {
    if (showFeedback && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [showFeedback]);

  const wrongLetters = result?.wrongLetters ?? [];
  const correctLetter = screen.options.find((o) => o.correct)?.letter ?? '';

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
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B1A3A]">
              WarU
            </span>
            <span className="text-xs text-gray-400 hidden sm:inline">
              Experience My Thinking™
            </span>
          </div>
        </div>
      </header>

      <main id="main-content" className="px-4 sm:px-6 py-6 sm:py-10">
        {!showFinal ? (
          <div className="max-w-2xl mx-auto">
            {/* Title block */}
            <div className="text-center mb-6 sm:mb-8 animate-pmt-reveal">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                WarU — Experience My Thinking
                <span className="text-[#8B1A3A] text-lg sm:text-xl align-top">™</span>
              </h1>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                Five quick questions. Work through each one to see how I approach UX challenges.
              </p>
            </div>

            {/* Problem + Solution summary card */}
            <div
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 animate-pmt-reveal"
              style={{ border: '2px solid #8B1A3A20' }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#8B1A3A10' }}>
                      <span className="text-xs font-black" style={{ color: '#8B1A3A' }}>!</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#8B1A3A' }}>
                      The Problem
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Learning and development teams must navigate complex requirements, stakeholder
                    expectations, and evolving learner needs while ensuring learning experiences remain
                    usable, accessible, and effective.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#8B1A3A10' }}>
                      <Lightbulb className="w-3.5 h-3.5" style={{ color: '#8B1A3A' }} />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#8B1A3A' }}>
                      The Solution
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    I apply UX research, human-centered design, stakeholder collaboration, and usability
                    evaluation to identify gaps, improve learning experiences, and translate complex
                    requirements into clear, actionable recommendations that support informed decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mb-8" role="progressbar" aria-valuenow={currentScreen + 1} aria-valuemin={1} aria-valuemax={totalScreens}>
              {screens.map((s, i) => {
                const r = results[s.id];
                const isDone = r?.state === 'correct' || r?.state === 'revealed';
                const isCurrent = i === currentScreen;
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-2"
                  >
                    <button
                      onClick={() => i <= currentScreen || isDone ? setCurrentScreen(i) : undefined}
                      disabled={i > currentScreen && !isDone}
                      className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#8B1A3A] text-white scale-110 shadow-md'
                          : isDone
                            ? 'bg-teal-600 text-white hover:scale-105'
                            : i < currentScreen
                              ? 'bg-teal-600/20 text-teal-700 cursor-pointer hover:bg-teal-600/30'
                              : 'bg-gray-200 text-gray-400'
                      }`}
                      aria-label={`Question ${i + 1}: ${s.iconLabel}${isDone ? ' (completed)' : isCurrent ? ' (current)' : ''}`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : i + 1}
                    </button>
                    {i < totalScreens - 1 && (
                      <div className={`w-4 sm:w-8 h-0.5 ${i < currentScreen ? 'bg-teal-600/40' : 'bg-gray-200'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Assessment panel */}
            <div
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 animate-pmt-reveal"
              style={{ border: '2px solid #8B1A3A20' }}
            >
              {/* Capability badge */}
              <div className="flex items-center justify-center mb-5">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: '#8B1A3A10' }}
                >
                  <screen.icon className="w-4 h-4" style={{ color: '#8B1A3A' }} />
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: '#8B1A3A' }}
                  >
                    {screen.iconLabel}
                  </span>
                </div>
              </div>

              {/* Scenario */}
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Scenario
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed">
                  {screen.scenario}
                </p>
              </div>

              {/* Question */}
              <div className="mb-5">
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  {screen.question}
                </p>
              </div>

              {/* Answer options */}
              <div className="space-y-3 mb-5" role="group" aria-label="Answer choices">
                {screen.options.map((opt) => {
                  const isSelected = selectedAnswer === opt.letter;
                  const wasWrong = wrongLetters.includes(opt.letter);
                  const showCorrect = isResolved && opt.correct;
                  const showWrong = wasWrong && !opt.correct;
                  const isDisabled = isResolved || (result?.attempts === 1 && result?.state === 'unanswered' && wasWrong);

                  return (
                    <button
                      key={opt.letter}
                      onClick={() => handleSelectAnswer(opt.letter)}
                      disabled={isDisabled}
                      className={`w-full text-left rounded-xl border-2 p-4 transition-all duration-200 flex items-center gap-3 ${
                        showCorrect
                          ? 'border-green-500 bg-green-50'
                          : showWrong
                            ? 'border-red-400 bg-red-50'
                            : isSelected
                              ? 'border-[#8B1A3A] bg-[#8B1A3A]5'
                              : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm'
                      } ${isDisabled && !showCorrect && !showWrong ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      aria-pressed={isSelected}
                    >
                      <span
                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{
                          background: showCorrect ? '#22c55e' : showWrong ? '#ef4444' : isSelected ? '#8B1A3A' : '#f3f4f6',
                          color: showCorrect || showWrong || isSelected ? '#fff' : '#6b7280',
                        }}
                      >
                        {showCorrect ? <Check className="w-4 h-4" /> : showWrong ? <X className="w-4 h-4" /> : opt.letter}
                      </span>
                      <span className="text-sm sm:text-base text-gray-700 leading-snug">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback area */}
              {showFeedback && (
                <div ref={answerRef} className="animate-pmt-reveal">
                  {/* Correct feedback */}
                  {feedbackType === 'correct' && (
                    <div
                      className="rounded-xl p-4 mb-4 border-2 border-green-400 bg-green-50"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center animate-badge-pop">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-sm font-bold text-green-800">
                          That&rsquo;s the approach I would take.
                        </p>
                      </div>
                      <p className="text-xs text-green-700 ml-10">
                        Let me share how this connects to my work.
                      </p>
                    </div>
                  )}

                  {/* Incorrect (first attempt) feedback */}
                  {feedbackType === 'incorrect' && (
                    <div
                      className="rounded-xl p-4 mb-4 border-2 border-red-400 bg-red-50"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center animate-badge-pop">
                          <X className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-sm font-bold text-red-800">
                          Not quite — try once more.
                        </p>
                      </div>
                      <p className="text-xs text-red-700 ml-10 leading-relaxed">
                        {screen.hint}
                      </p>
                    </div>
                  )}

                  {/* Reveal (second wrong attempt) feedback */}
                  {feedbackType === 'reveal' && (
                    <div
                      className="rounded-xl p-4 mb-4 border-2 border-red-400 bg-red-50"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center animate-badge-pop">
                          <X className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-sm font-bold text-red-800">
                          The strongest answer is {correctLetter}.
                        </p>
                      </div>
                      <p className="text-xs text-red-700 ml-10">
                        Let me share why — and how this connects to my work.
                      </p>
                    </div>
                  )}

                  {/* Explanation panel — shown after resolution */}
                  {isResolved && (
                    <div
                      className="rounded-xl p-4 border"
                      style={{ background: '#8B1A3A08', borderColor: '#8B1A3A20' }}
                    >
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8B1A3A' }} />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: '#8B1A3A' }}>
                            How I Support WarU
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {screen.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Illustrative scenario label */}
              <p className="text-xs text-gray-400 text-center mt-5 italic">
                Illustrative scenario — not from a specific project or engagement.
              </p>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                disabled={currentScreen === 0}
                className={`flex items-center gap-1.5 text-sm font-semibold rounded-lg px-4 py-2.5 transition-all ${
                  currentScreen > 0
                    ? 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer'
                    : 'text-gray-300 bg-gray-50 border border-gray-100 cursor-not-allowed'
                }`}
                aria-label="Previous question"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Restart experience"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restart
              </button>

              <button
                onClick={handleNext}
                disabled={!isResolved}
                className={`flex items-center gap-1.5 text-sm font-bold rounded-lg px-5 py-2.5 transition-all ${
                  isResolved
                    ? 'text-white bg-[#8B1A3A] hover:bg-[#8B1A3A]/90 cursor-pointer shadow-md hover:shadow-lg'
                    : 'text-white/50 bg-gray-300 cursor-not-allowed'
                }`}
                aria-label={screen.isLast ? 'See summary' : 'Next question'}
              >
                {screen.isLast ? 'See Summary' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Keyboard hint */}
            <p className="text-center mt-4 text-xs text-gray-400 hidden sm:block">
              Use arrow keys to navigate · Tab to select answers
            </p>
          </div>
        ) : (
          /* ════════════════════════════════════════
              FINAL SCREEN — What I Bring to Your Team
              ════════════════════════════════════════ */
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 animate-pmt-reveal">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: '#8B1A3A10' }}>
                <Sparkles className="w-4 h-4" style={{ color: '#8B1A3A' }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#8B1A3A' }}>
                  Complete
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                What I Bring to Your Team
              </h1>
              <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
                I connect research, human-centered thinking, collaboration, and evidence-informed
                decisions to create better experiences.
              </p>
            </div>

            {/* Five strength cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {screens.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.id}
                    className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all animate-pmt-reveal"
                    style={{
                      border: '2px solid #8B1A3A20',
                      animationDelay: `${i * 100}ms`,
                      animationFillMode: 'both',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: '#8B1A3A10' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: '#8B1A3A' }} />
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-1.5">
                      {s.capability}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {s.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Closing message */}
            <div
              className="rounded-2xl p-6 sm:p-8 mb-8 text-center animate-pmt-reveal"
              style={{ background: 'linear-gradient(135deg, #8B1A3A, #8B1A3Add)' }}
            >
              <p className="text-base sm:text-lg text-white font-bold leading-relaxed mb-2">
                Every challenge is different. The thinking is the same.
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                Evidence before opinion. Context before solution. Collaboration before handoff.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white bg-[#8B1A3A] hover:bg-[#8B1A3A]/90 transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
              >
                <Home className="w-4 h-4" />
                Return to Portfolio
              </button>
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-all w-full sm:w-auto justify-center"
              >
                <RotateCcw className="w-4 h-4" />
                Restart Experience
              </button>
            </div>

            {/* Illustrative scenario label */}
            <p className="text-xs text-gray-400 text-center mt-8 italic max-w-md mx-auto">
              All scenarios in this experience are illustrative and do not represent specific project
              details, outcomes, or confidential information.
            </p>
          </div>
        )}
      </main>

      {/* Key Insight */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <div
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 animate-pmt-reveal"
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
                &ldquo;My UX mindset doesn&rsquo;t stop at traditional product design. I apply research,
                systems thinking, and human-centered principles to complex learning
                environments&mdash;connecting stakeholder needs, learner experiences, and organizational
                goals to help teams make informed decisions.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default WarU;
