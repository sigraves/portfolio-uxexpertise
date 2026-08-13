import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { href: '/#expertise', label: 'Expertise' },
  { href: '/#case-studies', label: 'My Work', children: [
    { href: '/waru', label: 'WarU' },
    { href: '/energy', label: 'Energy Provider' },
    { href: '/utsa', label: 'UTSA' },
  ]},
  { href: '#contact', label: 'Contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <nav className="container mx-auto px-6 py-4" aria-label="Primary navigation">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5" aria-label="Sandra Graves — Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-black tracking-tight">SG</span>
            </div>
            <div className="text-lg font-bold leading-tight">
              <span className="text-gray-900">Sandra</span>
              <span className="text-orange-500"> Graves</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href} className="relative group">
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium inline-flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  {/* Dropdown */}
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100"
        >
          <div className="container mx-auto px-6 py-2">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href}>
                  <button
                    className="w-full flex items-center justify-between text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium py-3 border-b border-gray-100"
                    onClick={() => setExpandedMobile(expandedMobile === item.label ? null : item.label)}
                    aria-expanded={expandedMobile === item.label}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMobile === item.label ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                  {expandedMobile === item.label && (
                    <div className="pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium py-2.5 border-b border-gray-100 last:border-0"
                          onClick={() => { setIsMobileMenuOpen(false); setExpandedMobile(null); }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium py-3 border-b border-gray-100 last:border-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
