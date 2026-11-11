import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decks } from '../cards/deckData';
import type { Deck, PlayCard } from '../cards/types';
import DeckStack from '../cards/DeckStack';
import PlayCardView from '../cards/PlayCardView';
import NavBar from '../components/NavBar';
import { ArrowRight, Mail, Linkedin, MapPin, FileText, Layers } from 'lucide-react';

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
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-teal-700/60 mb-3">
              UXExpertise
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
            <h2 className="text-2xl font-bold text-gray-900">About Sandra</h2>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              I'm a UX strategist and researcher with 10+ years helping government organizations,
              educators, and multidisciplinary teams solve complex problems through evidence-based
              design.
            </p>
            <p>
              My approach combines UX research, experience strategy, customer experience, and
              Human-Centered AI. I follow three rules: evidence before opinion, context before
              solution, collaboration before handoff.
            </p>
            <p className="text-teal-700 font-semibold">
              I built this card experience because I believe the best way to understand how someone
              thinks is not to read their accomplishments — it is to work through a problem with
              them.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            RÉSUMÉ
            ════════════════════════════════════════════════ */}
        <section id="resume" className="py-12 px-6 max-w-3xl mx-auto border-t border-teal-900/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Résumé</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Full résumé available on request.{' '}
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
              { label: 'WarU', desc: 'Organizational transformation', color: '#8B1A3A', href: '/waru' },
              { label: 'Energy Provider', desc: 'Product strategy & CX', color: '#059669', href: null },
              { label: 'UTSA', desc: 'UX education & mentorship', color: '#f97316', href: null },
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
            Whether you're improving an experience, modernizing services, or exploring
            Human-Centered AI — I'd welcome the opportunity to connect.
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

        <footer className="py-8 px-6 border-t border-teal-900/10 text-center">
          <p className="text-xs text-gray-400">
            © Sandra Graves — UXExpertise.com — Play My Thinking™
          </p>
        </footer>
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
              : undefined
          }
        />
      )}
    </div>
  );
};

export default Home;
