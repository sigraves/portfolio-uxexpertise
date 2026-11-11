import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decks } from '../cards/deckData';
import type { Deck, PlayCard } from '../cards/types';
import DeckStack from '../cards/DeckStack';
import PlayCardView from '../cards/PlayCardView';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import FourQuadrant from '../components/FourQuadrant';
import { ArrowRight, Mail, Linkedin, MapPin, FileText, Layers, Briefcase, GraduationCap, Award } from 'lucide-react';
import PrioritizationLab from '../components/PrioritizationLab';

const Home = () => {
  const navigate = useNavigate();
  const [drawnCards, setDrawnCards] = useState<PlayCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    document.title = 'UXExpertise — Play My Thinking';
  }, []);

  const handleDeckClick = (deck: Deck) => {
    setDrawnCards(deck.cards);
    setCurrentCardIndex(0);
  };

  const handleCloseCard = () => {
    setDrawnCards([]);
    setCurrentCardIndex(0);
  };

  const handleNextCard = () => {
    if (currentCardIndex < drawnCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const activeCard = drawnCards[currentCardIndex] ?? null;

  return (
    <div className="min-h-screen bg-[#E9FAF3] text-gray-800">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-teal-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <NavBar />

      <main id="main-content">
        {/* ════════════════════════════════════════════════
            THE CARD TABLE
            ════════════════════════════════════════════════ */}
        <section
          className="felt-table relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-12 overflow-hidden"
          aria-label="Play My Thinking — Interactive card table"
        >
          {/* Ambient embers */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-teal-700/15"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  bottom: '-10px',
                  width: '2px',
                  height: '2px',
                  animation: `ember-float ${15 + Math.random() * 10}s linear infinite`,
                  animationDelay: `${Math.random() * 12}s`,
                }}
              />
            ))}
          </div>

          {/* Table center logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] select-none" aria-hidden="true">
            <div className="text-[180px] sm:text-[280px] font-black text-teal-800 leading-none">
              ♠♥♦♣
            </div>
          </div>

          {/* Title */}
          <div className="relative z-10 text-center mb-8 sm:mb-12 animate-pmt-reveal">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-teal-700/60 mb-3 flex items-center justify-center gap-2">
              UXExpertise
              <FourQuadrant size={14} />
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
              Play My Thinking
              <span className="text-teal-600 text-2xl sm:text-3xl align-top">™</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-md mx-auto leading-relaxed">
              Draw a card. Explore a real UX challenge.<br />
              Flip it to see how I think.
            </p>
          </div>

          {/* Decks */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 max-w-4xl w-full">
            {decks.map((deck, i) => (
              <DeckStack
                key={deck.suit}
                deck={deck}
                index={i}
                onClick={() => handleDeckClick(deck)}
              />
            ))}
          </div>

          {/* Skip the game link */}
          <div className="relative z-10 mt-10 sm:mt-14 text-center">
            <button
              onClick={() => {
                document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-teal-700/50 hover:text-teal-700/90 transition-colors font-medium"
            >
              <Layers className="w-4 h-4" />
              Prefer traditional navigation? Browse my work
            </button>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            ABOUT ME
            ════════════════════════════════════════════════ */}
        <section id="about" className="py-20 px-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <span className="text-teal-600 text-lg font-bold">♦</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Research. Strategy. Results. And a Little Curiosity.</h2>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              I&rsquo;m a UX strategist and researcher with 20+ years of professional experience helping
              organizations, educators, and multidisciplinary teams navigate complex challenges through
              human-centered thinking and evidence-based design.
            </p>
            <p>
              My work connects UX research, customer experience, strategic decision-making, and
              Human-Centered AI. I&rsquo;ve earned recognition through YouRock Awards and leadership
              commendations, but what matters most to me is helping teams understand their users, make
              better decisions, and create experiences that work.
            </p>
            <p className="font-bold text-gray-900">
              I follow three rules: evidence before opinion, context before solution, and collaboration
              before handoff.
            </p>
            <p className="text-teal-700 font-semibold">
              I built Play My Thinking&trade; because I believe the best way to understand how someone
              thinks isn&rsquo;t to read a list of accomplishments&mdash;it&rsquo;s to experience how they
              approach a problem.
            </p>
          </div>

          {/* Achievement cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {/* Experience */}
            <div
              className="bg-white rounded-2xl p-6 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 animate-pmt-reveal"
              style={{ border: '2px solid #05966920' }}
            >
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-5 h-5 text-teal-600" />
              </div>
              <p className="text-4xl font-black text-gray-900 leading-none">20+</p>
              <p className="text-xs font-medium text-gray-500 mt-2 leading-snug">
                Years of Professional Experience
              </p>
            </div>

            {/* Mentorship */}
            <div
              className="bg-white rounded-2xl p-6 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 animate-pmt-reveal"
              style={{ border: '2px solid #05966920' }}
            >
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-5 h-5 text-teal-600" />
              </div>
              <p className="text-4xl font-black text-gray-900 leading-none">100+</p>
              <p className="text-xs font-medium text-gray-500 mt-2 leading-snug">
                Students Mentored
              </p>
            </div>

            {/* Recognition */}
            <div
              className="bg-white rounded-2xl p-6 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 animate-pmt-reveal"
              style={{ border: '2px solid #05966920' }}
            >
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                <Award className="w-5 h-5 text-teal-600" />
              </div>
              <p className="text-lg font-black text-gray-900 leading-tight">YouRock Awards</p>
              <p className="text-xs font-medium text-gray-500 mt-2 leading-snug">
                & Leadership Recognition
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            RESUME
            ════════════════════════════════════════════════ */}
        <section id="resume" className="py-12 px-6 max-w-3xl mx-auto border-t border-teal-900/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Resume</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Full resume available on request.{' '}
            <a
              href="mailto:sigraves@hotmail.com"
              className="text-teal-600 hover:text-teal-700 transition-colors font-medium"
            >
              Email me
            </a>{' '}
            for a copy, or connect on{' '}
            <a
              href="https://www.linkedin.com/in/sandragraves/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 transition-colors font-medium"
            >
              LinkedIn
            </a>
            .
          </p>
        </section>

        {/* ════════════════════════════════════════════════
            CASE STUDIES
            ════════════════════════════════════════════════ */}
        <section id="case-studies" className="py-12 px-6 max-w-4xl mx-auto border-t border-teal-900/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Case Studies</h2>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            Traditional write-ups of my professional work. Each one will eventually connect to a
            card deck above.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { label: 'WarU', desc: 'Organizational Transformation', color: '#8B1A3A', href: '/waru' },
              { label: 'Energy Provider', desc: 'Product Strategy & CX', color: '#059669', href: '/energy' },
              { label: 'UTSA', desc: 'UX Education & Mentorship', color: '#f97316', href: '/utsa' },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => item.href && navigate(item.href)}
                className={`group rounded-xl p-5 transition-all duration-200 hover:shadow-lg ${item.href ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
                style={{ border: `3px solid ${item.color}`, backgroundColor: '#FFFFFF' }}
                role={item.href ? 'link' : undefined}
                tabIndex={item.href ? 0 : undefined}
                onKeyDown={(e) => {
                  if (item.href && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    navigate(item.href);
                  }
                }}
              >
                <div className="w-8 h-1.5 rounded-full mb-3" style={{ background: item.color }} />
                <p className="font-bold text-gray-900 mb-1 group-hover:text-teal-700 transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500">{item.desc}</p>
                <p className="text-xs text-gray-400 mt-3 italic">
                  {item.href ? 'Click to explore the interactive experience' : 'Content being migrated from the live site'}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            THE PRIORITIZATION LAB™
            ════════════════════════════════════════════════ */}
        <PrioritizationLab />

        {/* ════════════════════════════════════════════════
            CONTACT
            ════════════════════════════════════════════════ */}
        <section id="contact" className="py-20 px-6 max-w-3xl mx-auto border-t border-teal-900/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <span className="text-teal-600 text-lg font-bold">♠</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Let's Connect</h2>
          </div>
          <p className="text-gray-600 mb-8 max-w-xl">
            <span className="block text-gray-900 font-bold text-lg mb-2">
              What If You&rsquo;re Solving the Wrong Problem?
            </span>
            That&rsquo;s where I come in. I challenge assumptions, uncover what matters, and connect
            research, strategy, and human-centered thinking to decisions that move experiences forward.
          </p>
          <div className="space-y-4">
            <a
              href="mailto:sigraves@hotmail.com"
              className="flex items-center gap-3 text-gray-700 hover:text-teal-700 transition-colors group"
            >
              <Mail className="w-5 h-5 text-teal-600" />
              <span className="font-medium">sigraves@hotmail.com</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="https://www.linkedin.com/in/sandragraves/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-700 hover:text-teal-700 transition-colors group"
            >
              <Linkedin className="w-5 h-5 text-teal-600" />
              <span className="font-medium">linkedin.com/in/sandragraves</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <div className="flex items-center gap-3 text-gray-500">
              <MapPin className="w-5 h-5 text-teal-600" />
              <span>San Antonio, TX</span>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* ════════════════════════════════════════════════
          ACTIVE CARD OVERLAY
          ════════════════════════════════════════════════ */}
      {activeCard && (
        <PlayCardView
          card={activeCard}
          index={currentCardIndex}
          total={drawnCards.length}
          onClose={handleCloseCard}
          onPrev={handlePrevCard}
          onNext={handleNextCard}
          onExploreProject={
            activeCard.projectRef?.includes('WarU')
              ? () => navigate('/waru')
              : activeCard.projectRef?.includes('Energy')
                ? () => navigate('/energy')
                : activeCard.projectRef?.includes('UTSA')
                  ? () => navigate('/utsa')
                  : undefined
          }
        />
      )}
    </div>
  );
};

export default Home;
