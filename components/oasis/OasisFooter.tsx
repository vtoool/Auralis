import React from 'react';
import Logo from '../Logo';
import { useLanguage } from '../../context/LanguageContext';

const OasisFooter: React.FC = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    const handlePageLinkClick = () => {
        window.scrollTo(0, 0);
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const href = e.currentTarget.getAttribute('href');
        if (!href || href.startsWith('#/')) {
            return;
        }

        e.preventDefault();
        const targetId = href.substring(1);
        if (targetId) {
            if (window.location.hash && window.location.hash !== '#/') {
                window.location.hash = '/';
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
            const headerOffset = 96; // h-24
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    const footerLinks = [
        { href: '#about-oasis', label: t('oasis.header.about'), page: false },
        { href: '#/courses', label: t('oasis.header.courses'), page: true },
        { href: '#/shop', label: t('oasis.header.shop'), page: true },
        { href: '#/blog', label: t('oasis.header.blog'), page: true },
        { href: '#/booking', label: t('oasis.header.appointments'), page: true },
        { href: '#contact-oasis', label: t('oasis.header.contact'), page: false },
    ];

    const socialLinks = [
        { href: '#', label: t('oasis.footer.facebook') },
        { href: '#', label: t('oasis.footer.instagram') },
        { href: '#', label: t('oasis.footer.twitter') },
    ];

    return (
        <footer className="bg-primary text-primary-foreground border-t-4 border-accent">
            <div className="container mx-auto px-6 pt-16 pb-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Logo and Tagline */}
                    <div className="lg:col-span-2 space-y-4">
                        <a href="/#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="inline-block">
                            <Logo variant="on-dark" />
                        </a>
                        <p className="text-primary-foreground/70 max-w-sm">{t('footer.tagline')}</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-semibold text-primary-foreground mb-4 tracking-wider uppercase">Links</h4>
                        <ul className="space-y-2">
                            {footerLinks.map(link => (
                                <li key={link.label}>
                                    <a 
                                        href={link.href} 
                                        onClick={link.page ? handlePageLinkClick : handleNavClick}
                                        className="text-primary-foreground/70 hover:text-primary-foreground hover:underline transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Connect */}
                    <div>
                        <h4 className="font-semibold text-primary-foreground mb-4 tracking-wider uppercase">Connect</h4>
                        <ul className="space-y-2">
                           {socialLinks.map(link => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-primary-foreground/70 hover:text-primary-foreground hover:underline transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                           ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
                    <p>{t('footer.copyright', { year: currentYear.toString() })}</p>
                </div>
            </div>
        </footer>
    );
};

export default OasisFooter;