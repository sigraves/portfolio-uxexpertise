import React from 'react';
import { Heart, Linkedin, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ showResearchLink = false }: { showResearchLink?: boolean }) => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Let's <span className="text-orange-500">Connect</span>
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experienced UX strategist and researcher helping organizations solve complex problems through evidence-based design, experience strategy, and Human-Centered AI.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-orange-500 shrink-0" aria-hidden="true" />
                <a
                  href="https://www.linkedin.com/in/sandragraves/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                  aria-label="Sandra Graves on LinkedIn (opens in new tab)"
                >
                  linkedin.com/in/sandragraves
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" aria-hidden="true" />
                <a
                  href="tel:2103430851"
                  className="text-gray-300 hover:text-orange-500 transition-colors duration-200"
                  aria-label="Call Sandra at 210-343-0851"
                >
                  210-343-0851
                </a>
              </div>
              <div className="flex items-center gap-3">
                {showResearchLink ? (
                  <Link
                    to="/research"
                    aria-label="View Research Approach"
                    className="text-orange-500 hover:text-orange-300 transition-colors duration-200 shrink-0"
                  >
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </Link>
                ) : (
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0" aria-hidden="true" />
                )}
                <span className="text-gray-300">Living in San Antonio, TX</span>
              </div>
            </div>
          </div>

          {/* Quick Links — matches header nav exactly */}
          <nav aria-label="Site navigation">
            <h2 className="text-xl font-bold mb-6">Quick Links</h2>
            <div className="space-y-3">
              <a
                href="/#expertise"
                className="block text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                Expertise
              </a>
              <a
                href="/#case-studies"
                className="block text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                My Work
              </a>
              <a
                href="/#about"
                className="block text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                About
              </a>
              <a
                href="/#process"
                className="block text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                Process
              </a>
              <a
                href="#contact"
                className="block text-gray-300 hover:text-orange-500 transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </nav>

          {/* Social Links & CTA */}
          <div>
            <h2 className="text-xl font-bold mb-6">Let's Work Together</h2>

            <a
              href="https://www.linkedin.com/in/sandragraves/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-center mb-3"
              aria-label="Connect with Sandra on LinkedIn (opens in new tab)"
            >
              Connect on LinkedIn
            </a>
            <a
              href="mailto:sigraves@hotmail.com"
              className="block w-full border border-gray-600 text-gray-300 px-6 py-3 rounded-full font-semibold hover:border-orange-500 hover:text-orange-400 transition-all duration-200 text-center"
              aria-label="Email Sandra Graves"
            >
              Email Sandra
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <span>Designed and developed by Sandra Graves</span>
              <a
                href="https://uxexpertise.com/research"
                aria-label="View The Research Playbook"
                className="text-orange-500 hover:text-orange-300 transition-colors duration-200"
              >
                <Heart className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-300">
              <span>© 2026 Sandra Graves</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
