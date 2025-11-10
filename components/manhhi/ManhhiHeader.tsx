import React from 'react';
import { ManhhiLogo } from './ManhhiLogo';

const ManhhiHeader: React.FC = () => {
    const navLinks = [
        { href: '#', label: 'Donations' },
        { href: '#', label: 'Events' },
        { href: '#', label: 'About' },
        { href: '#', label: 'Pages' },
        { href: '#', label: 'Blog' },
        { href: '#', label: 'Shop' },
        { href: '#', label: 'Contact' },
    ];
    return (
        <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-24">
                    <a href="#" aria-label="Manhhi homepage">
                       <ManhhiLogo />
                    </a>

                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            className="text-text-primary font-medium hover:text-accent transition-colors duration-300"
                          >
                            {link.label}
                          </a>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default ManhhiHeader;
