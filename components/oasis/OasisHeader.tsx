
import React, { useState, useRef, useEffect } from 'react';
import Logo from '../Logo';
import ThemeToggle from '../ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemePicker from '../ThemePicker';
import { useCart } from '../../context/CartContext';
import OasisCart from './OasisCart';
import { useLanguage } from '../../context/LanguageContext';

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);

const OasisHeader: React.FC = () => {
    const { cartCount, toggleCart } = useCart();
    const { t } = useLanguage();
    const [animateCart, setAnimateCart] = useState(false);
    const prevCartCountRef = useRef(cartCount);
    
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const headerHeight = 96; // h-24 from TailwindCSS.

            const scrollingDown = currentScrollY > lastScrollY.current;

            // Hide if scrolling down and past the header. Show if scrolling up or near the top.
            if (scrollingDown && currentScrollY > headerHeight) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            lastScrollY.current = currentScrollY <= 0 ? 0 : currentScrollY;
            setIsScrolled(currentScrollY > 10);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        // Animate only when items are added, not on initial load or removal
        if (cartCount > prevCartCountRef.current) {
            setAnimateCart(true);
            const timer = setTimeout(() => {
                setAnimateCart(false);
            }, 400); // Animation duration
            return () => clearTimeout(timer);
        }
        prevCartCountRef.current = cartCount;
    }, [cartCount]);
    
    const navLinks = [
        { href: '#about-oasis', label: t('oasis.header.about'), page: false },
        { href: '#/courses', label: t('oasis.header.courses'), page: true },
        { href: '#/shop', label: t('oasis.header.shop'), page: true },
        { href: '#/blog', label: t('oasis.header.blog'), page: true },
        { href: '#/booking', label: t('oasis.header.appointments'), page: true },
        { href: '#contact-oasis', label: t('oasis.header.contact'), page: false },
    ];

    const handlePageLinkClick = () => {
        window.scrollTo(0, 0);
    };
    
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (!href || href.startsWith('#/')) {
            // Let default hash change behavior handle it for new pages
            return;
        }

        e.preventDefault();
        const targetId = href.substring(1);
        if (targetId) {
            // Check if we are on the main page, if not, navigate there first
            if (window.location.hash && window.location.hash !== '#/') {
                window.location.hash = '/';
                // The scrolling needs to happen after the redirect and rerender
                setTimeout(() => {
                    scrollToElement(targetId);
                }, 100);
            } else {
                 scrollToElement(targetId);
            }
        }
    };

    const scrollToElement = (targetId: string) => {
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


    return (
        <>
        <a href="#main-content" className="sr-only focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:absolute focus:top-4 focus:left-4 z-[999] rounded-md">
            {t('oasis.navigation.skip')}
        </a>
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
            !isVisible ? '-translate-y-full' : 'translate-y-0'
        } ${
            isScrolled
                ? 'bg-background/95 shadow-md border-border-color'
                : 'bg-background/80 backdrop-blur-sm border-border-color/50'
        }`}>
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-24">
                    <a href="/#" aria-label="Auralis homepage">
                       <Logo />
                    </a>

                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            onClick={link.page ? handlePageLinkClick : handleNavClick}
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
                        <button 
                            onClick={toggleCart} 
                            className={`p-2 relative rounded-full text-primary hover:bg-primary/10 transition-colors ${animateCart ? 'animate-cart-pop' : ''}`}
                        >
                            <CartIcon />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center transform translate-x-1/3 -translate-y-1/3">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
        <OasisCart />
        </>
    );
};

export default OasisHeader;
