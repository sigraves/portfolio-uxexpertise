import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ACCENT = '#f97316'; /* orange-500 */

const frameworks = [
  {
    id: 'thinkers',
    title: 'Developing UX Thinkers\u2122',
    description:
      'Great UX begins with curiosity and empathy. Before students learned wireframes or prototypes, they learned how to observe, listen, analyze, and understand the people behind every problem before recommending solutions.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/1-UTSA-thinkers.png',
  },
  {
    id: 'confidence',
    title: 'Building UX Confidence\u2122',
    description:
      'Many students believed confidence came from having all the answers. I taught the opposite. Confidence grows by talking to users, conducting interviews, listening with empathy, and allowing real conversations to shape better decisions.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/2-UTSA-confidence.png',
  },
  {
    id: 'screens',
    title: 'Beyond the Screen\u2122',
    description:
      'Beautiful interfaces attract attention, but meaningful experiences solve problems. I challenged students to think beyond aesthetics and design solutions that are useful, accessible, research-driven, and measurable.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/3-UTSA-screens2.png',
  },
  {
    id: 'philosophy',
    title: 'My Classroom Philosophy\u2122',
    description:
      'The classroom should be a place where curiosity is encouraged, questions are welcomed, and mistakes become opportunities to learn. My goal was to create confident professionals\u2014not simply teach design tools.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/4-UTSA-philosophy.png',
  },
  {
    id: 'career',
    title: 'From Curiosity to Career\u2122',
    description:
      'Every student begins with potential. My role was to help them develop the mindset, practical skills, confidence, and communication abilities needed to transition from the classroom into professional UX careers.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/5-UTSA-career2.png',
  },
  {
    id: 'insights',
    title: 'Student Insights\u2122',
    description:
      'Teaching dozens of aspiring UX professionals reinforced an important lesson: success doesn\u2019t come from memorizing UX methods\u2014it comes from developing curiosity, confidence, and a genuine desire to understand people. One of the most rewarding moments was watching students discover that conducting user interviews and usability testing became their favorite part of the design process.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/6-UTSA-insights.png',
  },
];

const UTSACaseStudy = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#utsa-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header />

      {/* Hero with background image */}
      <section
        id="utsa-main"
        className="relative min-h-[600px] flex items-center bg-cover"
        style={{ backgroundImage: "url('https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/UTSA-herobackground.png')", backgroundPosition: 'center right' }}
        tabIndex={-1}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative container mx-auto px-6 max-w-7xl pt-32 pb-20">
          <div className="max-w-[48%]">
            <p className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: ACCENT }}>
              UX Education &middot; Mentorship &middot; Human-Centered Thinking
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">
              Lessons from the Classroom
            </h1>
            <p className="text-gray-100 text-lg leading-relaxed">
              Teaching UX was never about helping students master software&mdash;it was about helping
              them develop the mindset, confidence, and critical thinking needed to solve real problems.
              The frameworks below represent the lessons I emphasized throughout the bootcamp and the
              mentoring philosophy that helped prepare aspiring UX professionals for meaningful careers.
            </p>
          </div>
        </div>
      </section>

      {/* Back nav */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 transition-colors duration-200 font-medium text-sm hover:text-orange-500"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Frameworks */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Lessons from the Classroom
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mb-5" style={{ backgroundColor: ACCENT }} />
          <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">
            Six frameworks that shaped how I taught, mentored, and inspired the next generation of UX professionals.
          </p>

          <div className="space-y-5">
            {frameworks.map(({ id, title, description, image }) => {
              const isOpen = openId === id;
              return (
                <div
                  key={id}
                  className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm transition-all duration-200 overflow-hidden hover:shadow-md"
                  style={isOpen ? { borderColor: ACCENT } : undefined}
                >
                  <button
                    onClick={() => toggle(id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-8 py-7 flex items-start justify-between gap-6 group"
                  >
                    <div className="flex items-start gap-5 flex-1 min-w-0">
                      <div className="w-1 h-12 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                          {title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed pr-4">
                          {description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold transition-colors duration-150" style={{ color: ACCENT }}>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          Explore My Thought Process
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className="w-5 h-5 shrink-0 transition-transform duration-300 mt-1"
                      style={{ color: ACCENT, transform: isOpen ? 'rotate(180deg)' : 'none' }}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="px-8 pb-8 animate-fadeIn">
                      <div className="border-t border-gray-100 pt-6">
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-auto rounded-2xl"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Want to talk about <span style={{ color: ACCENT }}>teaching or mentorship?</span>
          </h2>
          <p className="text-gray-300 mb-10">
            Open to conversations about UX education, curriculum design, and helping the next generation of designers find their path.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:sigraves@hotmail.com"
              className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
              style={{ backgroundColor: ACCENT }}
            >
              Email Sandra
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border-2 border-gray-500 text-gray-300 px-8 py-4 rounded-full font-bold text-lg hover:border-white hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UTSACaseStudy;
