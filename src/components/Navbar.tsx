import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { ToraLogo } from './CoastalArt';

export type ModalType =
  | null
  | 'tickets'
  | 'trailer'
  | 'full-lineup'
  | 'artist-detail'
  | 'gallery'
  | 'story'
  | 'faq'
  | 'contact';

interface NavbarProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenModal: (modal: ModalType, topic?: string) => void;
}

export function Navbar({ activeSection, onNavigateSection, onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'festival' | 'experience' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLinkClick = (sectionId: string) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const festivalItems = [
    { label: '2027 Dates & Countdown', action: () => handleLinkClick('countdown') },
    { label: 'Our Coastal Ethos', action: () => onOpenModal('story', 'roots') },
    { label: 'Full Lineup & Set Times', action: () => onOpenModal('full-lineup') },
    { label: 'Zero-Waste Charter', action: () => onOpenModal('story', 'sustainability') },
  ];

  const experienceItems = [
    { label: 'Coastal Ridge Camping', action: () => onOpenModal('story', 'camping') },
    { label: 'Wellness & Sunrise Surf', action: () => onOpenModal('story', 'wellness') },
    { label: 'Art & Live Murals', action: () => handleLinkClick('gallery') },
    { label: 'Local Kai & Markets', action: () => onOpenModal('story', 'markets') },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#042B37]/95 backdrop-blur-md shadow-md border-b border-white/10'
          : 'bg-gradient-to-b from-[#03232E]/85 via-[#03232E]/45 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-6">
        {/* Zone 1: Brand Logo */}
        <button
          type="button"
          onClick={() => handleLinkClick('top')}
          className="whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5BA2E] rounded-md p-1"
          aria-label="Tora Bombora Home"
        >
          <ToraLogo compact />
        </button>

        {/* Zone 2: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-white/90">
          <button
            type="button"
            onClick={() => handleLinkClick('top')}
            className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
              activeSection === 'top'
                ? 'border-[#33C4D3] text-white font-semibold'
                : 'border-transparent hover:text-white hover:border-white/40'
            }`}
          >
            Home
          </button>

          {/* Festival Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'festival' ? null : 'festival')}
              aria-expanded={openDropdown === 'festival'}
              className="whitespace-nowrap shrink-0 py-1.5 inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Festival</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openDropdown === 'festival' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openDropdown === 'festival' && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-[#042E3B] border border-white/15 shadow-xl py-2 z-50">
                {festivalItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      item.action();
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:bg-[#0D4D60] hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleLinkClick('lineup')}
            className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
              activeSection === 'lineup'
                ? 'border-[#33C4D3] text-white font-semibold'
                : 'border-transparent hover:text-white hover:border-white/40'
            }`}
          >
            Lineup
          </button>

          {/* Experience Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'experience' ? null : 'experience')}
              aria-expanded={openDropdown === 'experience'}
              className="whitespace-nowrap shrink-0 py-1.5 inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Experience</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openDropdown === 'experience' ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openDropdown === 'experience' && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl bg-[#042E3B] border border-white/15 shadow-xl py-2 z-50">
                {experienceItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      item.action();
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:bg-[#0D4D60] hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleLinkClick('gallery')}
            className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
              activeSection === 'gallery'
                ? 'border-[#33C4D3] text-white font-semibold'
                : 'border-transparent hover:text-white hover:border-white/40'
            }`}
          >
            Gallery
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('about')}
            className={`whitespace-nowrap shrink-0 py-1.5 border-b-2 transition-colors ${
              activeSection === 'about'
                ? 'border-[#33C4D3] text-white font-semibold'
                : 'border-transparent hover:text-white hover:border-white/40'
            }`}
          >
            About
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenDropdown(null);
              onOpenModal('faq');
            }}
            className="whitespace-nowrap shrink-0 py-1.5 border-b-2 border-transparent hover:text-white hover:border-white/40 transition-colors"
          >
            FAQ
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenDropdown(null);
              onOpenModal('contact');
            }}
            className="whitespace-nowrap shrink-0 py-1.5 border-b-2 border-transparent hover:text-white hover:border-white/40 transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenModal('tickets')}
            className="whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 bg-[#F5BA2E] hover:bg-[#FFCA45] text-[#052935] font-bold text-sm px-4 py-2 rounded-full shadow-md transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Get Tickets</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#042B37] border-t border-white/10 px-4 py-4 space-y-2 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleLinkClick('top')}
              className="text-left px-3 py-2.5 rounded-lg text-white hover:bg-white/10 text-sm font-medium"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('about')}
              className="text-left px-3 py-2.5 rounded-lg text-white hover:bg-white/10 text-sm font-medium"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('lineup')}
              className="text-left px-3 py-2.5 rounded-lg text-white hover:bg-white/10 text-sm font-medium"
            >
              Lineup
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('gallery')}
              className="text-left px-3 py-2.5 rounded-lg text-white hover:bg-white/10 text-sm font-medium"
            >
              Gallery
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('story', 'camping');
              }}
              className="text-left px-3 py-2.5 rounded-lg text-white hover:bg-white/10 text-sm font-medium"
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('faq');
              }}
              className="text-left px-3 py-2.5 rounded-lg text-white hover:bg-white/10 text-sm font-medium"
            >
              FAQ
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('contact');
              }}
              className="text-left px-3 py-2.5 rounded-lg text-white hover:bg-white/10 text-sm font-medium"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('full-lineup');
              }}
              className="text-left px-3 py-2.5 rounded-lg text-[#3EC5D3] hover:bg-white/10 text-sm font-semibold"
            >
              Set Times
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
