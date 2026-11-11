import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
        scrolled ? 'bg-[#0a1a14]/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-5 sm:px-6 py-3" aria-label="Primary">
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-amber-50/90 hover:text-white transition-colors"
        >
          <span className="hidden sm:inline">UXExpertise</span>
          <span className="text-amber-400">2027</span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-amber-50/60 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} className="text-amber-50" /> : <Menu size={20} className="text-amber-50" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a1a14] border-b border-white/5">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-amber-50/70 hover:text-white transition-colors py-2"
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
