import React, { useEffect } from 'react';
import { ArrowRight, Mail, Linkedin, MapPin } from 'lucide-react';
import PreviewNav from '../components/quadrants/PreviewNav';
import ThinkingSystem from '../components/quadrants/ThinkingSystem';

const Portfolio2027Preview = () => {
  useEffect(() => {
    document.title = 'UXExpertise.com — Portfolio 2027';
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <PreviewNav />

      <main id="main-content">
        <ThinkingSystem />

        <section id="about" className="py-20 px-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">About Sandra</h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            I'm a UX strategist and researcher with 10+ years helping government organizations,
            educators, and multidisciplinary teams solve complex problems through evidence-based
            design.
          </p>
          <p className="text-slate-400 leading-relaxed">
            My approach combines UX research, experience strategy, customer experience, and
            Human-Centered AI — turning research into meaningful action. I follow three simple
            rules: evidence before opinion, context before solution, collaboration before handoff.
          </p>
        </section>

        <section id="resume" className="py-12 px-6 max-w-3xl mx-auto border-t border-white/5">
          <h2 className="text-xl font-bold text-white mb-3">Résumé</h2>
          <p className="text-sm text-slate-400">
            Full résumé available on request.{' '}
            <a
              href="mailto:sigraves@hotmail.com"
              className="text-orange-400 hover:text-orange-300 transition-colors font-medium"
            >
              Email me
            </a>{' '}
            for a copy.
          </p>
        </section>

        <section id="work" className="py-12 px-6 max-w-3xl mx-auto border-t border-white/5">
          <h2 className="text-xl font-bold text-white mb-4">Additional Work</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { href: '/waru', label: 'WarU', desc: 'Organizational transformation' },
              { href: '/energy', label: 'Energy Provider', desc: 'Product strategy & CX' },
              { href: '/utsa', label: 'UTSA', desc: 'UX education & mentorship' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-orange-500/30 hover:bg-orange-500/[0.04] transition-all duration-200"
              >
                <p className="font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="py-20 px-6 max-w-3xl mx-auto border-t border-white/5"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-slate-400 mb-8 max-w-xl">
            Whether you're improving an experience, modernizing services, or exploring
            Human-Centered AI, I'd welcome the opportunity to connect.
          </p>
          <div className="space-y-4">
            <a
              href="mailto:sigraves@hotmail.com"
              className="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors group"
            >
              <Mail className="w-5 h-5 text-orange-500" />
              <span className="font-medium">sigraves@hotmail.com</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <a
              href="https://www.linkedin.com/in/sandragraves/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-slate-300 hover:text-orange-400 transition-colors group"
            >
              <Linkedin className="w-5 h-5 text-orange-500" />
              <span className="font-medium">linkedin.com/in/sandragraves</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <div className="flex items-center gap-3 text-slate-400">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span>San Antonio, TX</span>
            </div>
          </div>
        </section>

        <footer className="py-8 px-6 border-t border-white/5 text-center">
          <p className="text-xs text-slate-600">
            © 2027 Sandra Graves — UXExpertise.com — Designed and developed by Sandra Graves
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio2027Preview;
