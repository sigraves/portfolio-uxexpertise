import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ACCENT = '#059669'; /* emerald-600 */

const frameworks = [
  {
    id: 'question',
    title: 'Ask the Right Question',
    description: 'Define the problem before designing the solution.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/energy-01-the-clients-question.png',
  },
  {
    id: 'people',
    title: 'Understand People',
    description: 'Research reveals motivations, behaviors, and unmet needs.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/energy-02-inside-the-customers-mind.png',
  },
  {
    id: 'opportunities',
    title: 'Discover Opportunities',
    description: 'Identify the moments where experience can influence behavior.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/energy-03-moments-that-matter2.png',
  },
  {
    id: 'decisions',
    title: 'Make Strategic Decisions',
    description: 'Prioritize what creates the greatest customer and business value.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/energy-04-choosing-what-matters.png',
  },
  {
    id: 'purpose',
    title: 'Design with Purpose',
    description: 'Transform research into thoughtful, validated experiences.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/energy-05-from-ideas-to-interface.png',
  },
  {
    id: 'impact',
    title: 'Measure Meaningful Impact',
    description: 'Connect research, design decisions, customer behavior, and business value.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/energy-06-from-insight-to-impact2.png',
  },
];

const CPSEnergyCaseStudy = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#cps-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-emerald-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header />

      {/* Hero with background image */}
      <section
        id="cps-main"
        className="relative min-h-[600px] flex items-center bg-cover"
        style={{ backgroundImage: "url('https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/Energy-bg.png')", backgroundPosition: 'center right' }}
        tabIndex={-1}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative container mx-auto px-6 max-w-7xl pt-32 pb-20">
          <div className="max-w-[48%]">
            <p className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: ACCENT }}>
              UX Research &middot; Product Strategy &middot; UX/UI Design
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">
              From Awareness to Action&#8482;
            </h1>
            <p className="text-gray-100 text-lg leading-relaxed mb-6">
              Working as a UX consultant, I partnered with an Energy Provider to rethink how customers
              interacted with their digital experience. The challenge extended beyond improving a customer
              portal&mdash;it was about helping people understand their energy usage, recognize the impact
              of their actions, and stay motivated to build lasting habits.
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              Because this consulting engagement was completed under a Non-Disclosure Agreement (NDA),
              company branding, proprietary interfaces, and operational details have been removed.
              Rather than showcasing confidential deliverables, this case study focuses on the research
              process, strategic thinking, and UX methodology that guided the work. The following
              frameworks illustrate how research evolved into customer-centered decisions that supported
              both user needs and business objectives.
            </p>
          </div>
        </div>
      </section>

      {/* Back nav */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 transition-colors duration-200 font-medium text-sm hover:text-emerald-600"
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
            Designing with Intention&#8482;
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mb-5" style={{ backgroundColor: ACCENT }} />
          <p className="text-gray-500 text-center mb-14 max-w-2xl mx-auto">
            Every meaningful experience begins with understanding people&mdash;not pixels. Explore the
            research, strategy, and design decisions that transformed a business challenge into a
            customer-centered solution.
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
                    <div className="px-8 pb-10 animate-fadeIn">
                      <div className="border-t border-gray-100 pt-8">
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-auto rounded-2xl shadow-md"
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
            Interested in this kind of <span style={{ color: ACCENT }}>work?</span>
          </h2>
          <p className="text-gray-300 mb-10 text-sm">
            Open to senior UX research and strategy engagements&mdash;utilities, enterprise, federal, and remote contracts.
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

export default CPSEnergyCaseStudy;
