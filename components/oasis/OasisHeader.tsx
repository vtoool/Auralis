import React from 'react';
import Logo from '../Logo';
import ThemeToggle from '../ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemePicker from '../ThemePicker';

const OasisHeader: React.FC = () => {
    const navLinks = [
        { href: '#about-oasis', label: 'About' },
        { href: '#courses-oasis', label: 'Courses' },
        { href: '#services-oasis', label: 'Services' },
        { href: '#insights-oasis', label: 'Insights' },
        { href: '#contact-oasis', label: 'Contact' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href')?.substring(1);
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerOffset = 96; // Corresponds to h-24 in Tailwind
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
        <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border-color/50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-24">
                    <a href="#" aria-label="Auralis homepage" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
                       <Logo />
                    </a>

                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            onClick={handleNavClick}
                            className="text-text-primary font-medium hover:text-accent transition-colors duration-300 text-lg"
                          >
                            {link.label}
                          </a>
                        ))}
                    </nav>
                     <div className="flex items-center space-x-1">
                        <ThemePicker />
                        <ThemeToggle />
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default OasisHeader;