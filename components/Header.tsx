import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import ThemePicker from './ThemePicker';
import { useLanguage } from '../context/LanguageContext';

// Helper hook to check for screen size changes
const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    React.useEffect(() => {
        const media = window.matchMedia(query);
        const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
        
        if (media.matches !== matches) {
          setMatches(media.matches);
        }

        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query, matches]);

    return matches;
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { t } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Controls the background/shadow effect
      setIsScrolled(currentScrollY > 10);

      if (isDesktop) {
        // Scrolled past the hero section (which is 100vh)
        if (currentScrollY > window.innerHeight) {
          // Scrolling down
          if (currentScrollY > lastScrollY) {
            setIsVisible(false);
          } else { // Scrolling up
            setIsVisible(true);
          }
        } else {
          // Always visible within the hero section
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY <= 0 ? 0 : currentScrollY);
      } else {
        // On mobile, the header is always visible (standard sticky behavior)
        setIsVisible(true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // On desktop, show the header if the mouse is near the top of the viewport
      if (isDesktop && e.clientY < 80) { // 80px is approx header height
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY, isDesktop]);

  const navLinks = [
    { href: '#courses', label: t('header.courses') },
    { href: '#testimonials', label: t('header.stories') },
    { href: '#booking', label: t('header.appointments') },
    { href: '#contact', label: t('header.contact') },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = targetId === 'hero' ? 0 : 80; // 80px for h-20 header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDesktop && !isVisible ? '-translate-y-full' : 'translate-y-0'
      } ${
        isScrolled || isMenuOpen
          ? 'bg-background/100 shadow-md'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <a href="#hero" aria-label="Auralis homepage" onClick={handleNavClick}>
            <Logo />
          </a>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-text-primary font-medium hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
               <a
                href="#booking"
                onClick={handleNavClick}
                className="px-5 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 shadow-sm"
              >
                {t('header.getStarted')}
              </a>
            </div>
            <ThemePicker />
            <ThemeToggle />
            <LanguageSwitcher />

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-primary"
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <nav className="flex flex-col items-center space-y-4 py-4 border-t border-border-color">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-primary font-medium hover:text-primary transition-colors duration-300"
                onClick={(e) => {
                  handleNavClick(e);
                  setIsMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
             <a
                href="#booking"
                onClick={(e) => {
                  handleNavClick(e);
                  setIsMenuOpen(false);
                }}
                className="px-6 py-3 text-md font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 shadow-md"
              >
                {t('header.getStarted')}
              </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;