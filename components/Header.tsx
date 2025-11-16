import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import ThemePicker from './ThemePicker';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

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
  const lastScrollY = useRef(0);
  const { t } = useLanguage();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { session, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    window.location.hash = '/';
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = 80; // from h-20 class
      
      // Controls the background/shadow effect
      setIsScrolled(currentScrollY > 10);

      const scrollingDown = currentScrollY > lastScrollY.current;

      if (isDesktop) {
        // Desktop logic: hide when scrolling down past the hero
        if (currentScrollY > window.innerHeight) {
            setIsVisible(!scrollingDown);
        } else {
          // Always visible within the hero section
          setIsVisible(true);
        }
      } else {
        // Mobile logic: hide when scrolling down, show when scrolling up
        if (isMenuOpen) {
          setIsVisible(true);
        } else if (scrollingDown && currentScrollY > headerHeight) {
          // Scrolling down and past the header
          setIsVisible(false);
        } else {
          // Scrolling up or at the top
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
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
  }, [isDesktop, isMenuOpen]);

  const navLinks = [
    { href: '#courses', label: t('header.courses') },
    { href: '#about', label: t('header.about') },
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
        !isVisible ? '-translate-y-full' : 'translate-y-0'
      } ${
        isScrolled || isMenuOpen
          ? 'bg-background/100 shadow-md'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <a href="#" aria-label="Spiritul Nostru homepage">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center space-x-6">
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
            <div className="hidden lg:block">
               {session ? (
                  <div className="flex items-center space-x-4">
                    <a href="#/admin" className="px-5 py-2 text-sm font-semibold rounded-full bg-accent text-accent-foreground hover:bg-accent/90 whitespace-nowrap">
                      Dashboard
                    </a>
                    <button onClick={handleLogout} className="text-sm font-medium text-text-secondary hover:text-primary">
                      Logout
                    </button>
                  </div>
                ) : (
                  <a
                    href="#booking"
                    onClick={handleNavClick}
                    className="px-5 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 shadow-sm whitespace-nowrap"
                  >
                    {t('header.getStarted')}
                  </a>
               )}
            </div>
            <ThemePicker />
            <ThemeToggle />
            <LanguageSwitcher />

            <div className="lg:hidden">
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
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
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
            {session ? (
                <div className="flex flex-col items-center space-y-4 pt-4">
                    <a href="#/admin" className="px-6 py-3 text-md font-semibold rounded-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsMenuOpen(false)}>
                        Dashboard
                    </a>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-text-secondary hover:text-primary">
                        Logout
                    </button>
                </div>
            ) : (
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
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;