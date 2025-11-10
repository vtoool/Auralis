import React from 'react';
import Logo from '../Logo';

const OasisFooter: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const handleGoTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-6 py-16">
                 <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
                     <a href="#" aria-label="Auralis homepage" onClick={handleGoTop}>
                        <Logo />
                    </a>
                    <p className="text-white/70">&copy; {currentYear} Auralis. All Rights Reserved.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white/70 hover:text-white">Facebook</a>
                        <a href="#" className="text-white/70 hover:text-white">Instagram</a>
                        <a href="#" className="text-white/70 hover:text-white">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default OasisFooter;