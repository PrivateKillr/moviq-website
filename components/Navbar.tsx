'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_NAME } from '@/app/constants';

const navLinks = [
  { label: 'Start', href: '/#kierowca', anchor: 'kierowca' },
  { label: 'Praca od zaraz', href: '/#praca-od-zaraz', anchor: 'praca-od-zaraz' },
  { label: 'Aplikuj', href: '/#aplikuj', anchor: 'aplikuj' },
  { label: 'Wypłaty', href: '/#wyplaty', anchor: 'wyplaty' },
  { label: 'FAQ', href: '/#faq', anchor: 'faq' },
  { label: 'Kontakt', href: '/kontakt' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor?: string) => {
    if (anchor) {
      // If we're on a different page, let Next.js handle navigation
      if (pathname !== '/') {
        // Don't prevent default - let Next.js navigate
        setIsOpen(false);
        return;
      }
      
      // We're on home page, prevent default and scroll smoothly
      e.preventDefault();
      setIsOpen(false);
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Focus management for accessibility
        element.setAttribute('tabIndex', '-1');
        element.focus();
      }
    } else {
      setIsOpen(false);
    }
  };

  // WCAG 2.2: Keyboard navigation for mobile menu
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  // WCAG 2.2: Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#020617]/95 backdrop-blur-sm shadow-lg border-b border-gray-800' : 'bg-[#020617]/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
              <div className="relative h-12 md:h-16 w-auto">
                <Image
                  src="/images/moviq_logo.png"
                  alt={COMPANY_NAME}
                  width={160}
                  height={60}
                  className="h-12 md:h-16 w-auto object-contain"
                  priority
                  unoptimized
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.anchor)}
                className="text-white hover:text-[#34D399] focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-2 focus-visible:rounded transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/panel-kierowcy"
              className="bg-[#34D399] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#10b981] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded transition-all duration-200"
              style={{
                boxShadow: '0 4px 20px rgba(52, 211, 153, 0.3)',
              }}
            >
              Panel kierowcy
            </Link>
          </div>

          {/* Mobile menu button - WCAG 2.2: Keyboard accessible with ARIA */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={handleKeyDown}
              className="text-white hover:text-[#34D399] focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-2 focus-visible:rounded transition-colors duration-200"
              aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - WCAG 2.2: Proper ARIA and keyboard navigation */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden pb-4 bg-[#0D1020] rounded-lg mt-2 border border-gray-800"
            role="menu"
            aria-label="Menu nawigacyjne"
          >
            <nav className="flex flex-col space-y-4 px-4 pt-4" role="menubar">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.anchor)}
                  className="text-white hover:text-[#34D399] focus-visible:outline-2 focus-visible:outline-[#34D399] focus-visible:outline-offset-2 focus-visible:rounded transition-colors duration-200 font-medium py-2"
                  role="menuitem"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/panel-kierowcy"
                className="bg-[#34D399] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#10b981] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded transition-all duration-200 text-center mt-2"
                onClick={() => setIsOpen(false)}
                role="menuitem"
                style={{
                  boxShadow: '0 4px 20px rgba(52, 211, 153, 0.3)',
                }}
              >
                Panel kierowcy
              </Link>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}
