import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ExternalLink, Brain, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ACCENT = '#8B1A3A';

const frameworks = [
  {
    id: 'journey',
    title: 'The Influential Journey\u2122',
    description:
      'Every experience teaches us something, but meaningful growth comes from solving increasingly complex problems. This journey illustrates how my focus evolved from understanding individual experiences to influencing organizational strategy.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/1-WarU_The_Journey.png?raw=true',
  },
  {
    id: 'compass',
    title: 'The Research Compass\u2122',
    description:
      'Research is more than collecting information\u2014it\u2019s about asking better questions. The Research Compass\u2122 represents the mindset I use to uncover meaningful insights, balance business and user needs, and support informed decision-making.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/2-WarU_ResearchCompass.png?raw=true',
  },
  {
    id: 'sixsteps',
    title: 'The 6-Step Approach\u2122',
    description:
      'Every project follows a repeatable approach grounded in research, collaboration, testing, and continuous learning. This framework illustrates how I move from discovery to measurable outcomes while keeping people at the center of every decision.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/3-WarU_6Steps.png?raw=true',
  },
  {
    id: 'everyone',
    title: 'Designing for Everyone\u2122',
    description:
      'Great experiences happen when every perspective is understood. This framework reflects how I identify goals, frustrations, motivations, and opportunities across the people impacted by a solution before recommending change.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/4-WarU_Designing4Everyone.png?raw=true',
  },
  {
    id: 'clarity',
    title: 'Complexity to Clarity\u2122',
    description:
      'Sometimes the most valuable discovery isn\u2019t improving a product\u2014it\u2019s uncovering the real organizational challenge. This framework demonstrates how deeper research transformed isolated improvements into scalable systems, shared knowledge, and evidence-based decision making.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/5-WarU_ComplexityClarity.png?raw=true',
  },
  {
    id: 'business',
    title: 'Business Needs vs. User Needs\u2122',
    description:
      'Successful experiences are created where business objectives and user needs intersect. This framework helps align research, testing, and recommendations with measurable outcomes that benefit both organizations and the people they serve.',
    image: 'https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/6-WarU_BusinessvsUsers.png?raw=true',
  },
];

const WarUCaseStudy = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#waru-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#8B1A3A] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header />

      {/* Hero with background image */}
      <section
        id="waru-main"
        className="relative min-h-[600px] flex items-center bg-cover bg-center-right"
        style={{ backgroundImage: "url('https://github.com/sigraves/portfolio-uxexpertise/blob/main/images/WarU2-bg.png?raw=true')", backgroundPosition: 'center right' }}
        tabIndex={-1}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative container mx-auto px-6 max-w-7xl pt-32 pb-20">
          <div className="max-w-[48%]">
            <p className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: ACCENT }}>
              UX Research · Experience Strategy · Human-Centered AI
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">
              Lessons from the Journey
            </h1>
            <p className="text-gray-100 text-lg leading-relaxed">
              Over the past several years, my role evolved from supporting individual learning experiences
              to solving increasingly complex organizational challenges. While much of this work cannot
              be shared publicly, the frameworks on this page represent the research, strategy, and
              lessons that shaped my thinking and continue to guide how I solve complex problems.
            </p>
          </div>
        </div>
      </section>

      {/* Back nav */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 transition-colors duration-200 font-medium text-sm hover:text-[#8B1A3A]"
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
            Lessons from the Journey
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mb-5" style={{ backgroundColor: ACCENT }} />
          <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">
            Six frameworks that capture how I approach research, strategy, and human-centered design.
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
                  {/* Accordion trigger */}
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

                  {/* Expanded image */}
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

      {/* From Research to Strategy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            From Research to Experience Strategy
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full mb-5" style={{ backgroundColor: ACCENT }} />
          <p className="text-gray-500 text-center mb-14 max-w-2xl mx-auto">
            Research only creates value when it shapes decisions. These are the inflection points where findings moved from insight into strategy.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Synthesis',
                body: 'Dozens of interviews, usability sessions, and data points were distilled into a handful of recurring themes. The goal was not more data — it was a clearer picture of what the data meant.',
              },
              {
                step: '02',
                title: 'Prioritization',
                body: 'Not every insight deserved action. I weighed effort against impact, sequenced recommendations around organizational readiness, and framed trade-offs so stakeholders could decide with confidence.',
              },
              {
                step: '03',
                title: 'Recommendation',
                body: 'Findings became a roadmap — not a report. Each recommendation connected back to evidence, tied to a measurable outcome, and gave leadership a path forward they could trust.',
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-5"
                  style={{ backgroundColor: ACCENT }}
                  aria-hidden="true"
                >
                  {step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human Judgment + AI Workflow */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-5">
              <Sparkles className="w-4 h-4" style={{ color: ACCENT }} aria-hidden="true" />
              <span className="text-sm font-semibold text-gray-700">Supporting Capability</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Human Judgment + AI Workflow
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full mb-5" style={{ backgroundColor: ACCENT }} />
            <p className="text-gray-500 max-w-2xl mx-auto">
              AI accelerated parts of the work — but every decision, interpretation, and recommendation remained a human responsibility. Here is how the two worked together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Human-led */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: ACCENT }} aria-hidden="true">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Human-Led</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Framing the research questions and deciding what to study',
                  'Interpreting nuance — tone, hesitation, context a transcript cannot capture',
                  'Weighing trade-offs and prioritizing what to act on',
                  'Stakeholder alignment and presenting recommendations',
                  'Final accountability for every decision made',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: ACCENT }} aria-hidden="true" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI-assisted */}
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gray-800" aria-hidden="true">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI-Assisted</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Transcribing interviews and surfacing recurring keywords',
                  'Drafting initial affinity maps from raw notes',
                  'Summarizing long documents for faster review',
                  'Generating structure options for presentations',
                  'Accelerating turnaround — never replacing judgment',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-gray-400" aria-hidden="true" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Boundary callout */}
          <div className="mt-8 flex items-start gap-4 bg-white rounded-2xl border-2 p-7" style={{ borderColor: ACCENT }}>
            <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" style={{ color: ACCENT }} aria-hidden="true" />
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Where the line is drawn</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                AI never decided what the research meant, what to recommend, or what to build. It shortened the distance
                between data and decision — but the decision itself always belonged to a person who understood the
                context, the stakeholders, and the consequences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Interested in this kind of <span style={{ color: ACCENT }}>work?</span>
          </h2>
          <p className="text-gray-300 mb-10">
            Open to senior UX research and design strategy roles — federal, enterprise, and remote contracts.
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

export default WarUCaseStudy;
