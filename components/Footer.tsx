import React from 'react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary-light border-t border-border-color">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                       <Logo />
                        <p className="text-text-secondary max-w-xs">{t('footer.tagline')}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-4">Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#courses" className="text-text-secondary hover:text-primary">{t('footer.courses')}</a></li>
                            <li><a href="#about" className="text-text-secondary hover:text-primary">{t('footer.about')}</a></li>
                            <li><a href="#contact" className="text-text-secondary hover:text-primary">{t('footer.contact')}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-primary mb-4">Connect</h4>
                        {/* Add social media links here if available */}
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Facebook" className="text-text-secondary hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="text-text-secondary hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                             <a href="#" aria-label="Twitter" className="text-text-secondary hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border-color text-center text-sm text-text-secondary">
                    <p>{t('footer.copyright', { year: currentYear.toString() })}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;