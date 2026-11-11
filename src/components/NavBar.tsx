import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import FourQuadrant from './FourQuadrant';

const navLinks = [
  { href: '#about', label: 'About Me' },
  { href: '#resume', label: 'Résumé' },
  { href: '#case-studies', label: 'Case Studies' },
  { href: '#contact', label: 'Contact' },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[#E9FAF3]/90 backdrop-blur-md border-b border-teal-900/10' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-5 sm:px-6 py-3" aria-label="Primary">
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-gray-800 hover:text-teal-700 transition-colors"
        >
          <span className="hidden sm:inline">UXExpertise</span>
          <FourQuadrant size={18} />
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-teal-900/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#E9FAF3] border-b border-teal-900/10">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-gray-700 hover:text-teal-700 transition-colors py-2"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
