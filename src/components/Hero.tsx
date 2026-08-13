import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image — artwork lives on the right, content on the left */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/Home-bg.png')" }}
        aria-hidden="true"
      />

      {/* Left-side content — ~48% width, never overlaps right-side artwork */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-[48%]">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-6">
              UX Strategist &amp; Researcher
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-8">
              Where research{' '}
              <span className="text-orange-500">becomes strategy.</span>
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-xl">
              With 10+ years of experience, I've helped government organizations, educators, and
              multidisciplinary teams understand complex problems and turn research into
              meaningful action—combining UX research, experience strategy, customer
              experience, and Human-Centered AI.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-lg font-bold text-lg md:text-xl transition-colors duration-200 shadow-lg"
            >
              Let's Connect
            </a>

            <p className="text-sm font-medium text-gray-500 tracking-wide mt-10">
              Design with Evidence. Lead with Purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
