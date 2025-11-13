
import React, { useState } from 'react';
import { ConnectIcon, PhilosophyIcon, EventsIcon } from './OasisIcons';
import LazyBackgroundImage from '../LazyBackgroundImage';
import { useLanguage } from '../../context/LanguageContext';

const InfoCard: React.FC<{icon: React.ReactNode, title: string, children: React.ReactNode, colorClass: string, buttonText?: string}> = ({icon, title, children, colorClass, buttonText}) => (
    <div className={`p-8 flex-1 ${colorClass}`}>
        <div className="flex items-center space-x-4 mb-4">
            {icon}
            <h3 className="font-display text-2xl text-primary font-semibold">{title}</h3>
        </div>
        <div className="text-text-secondary space-y-3">
             {children}
        </div>
        {buttonText && (
             <button className="mt-4 px-6 py-2 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                {buttonText}
             </button>
        )}
    </div>
);


const OasisHero: React.FC = () => {
    const { t } = useLanguage();
    const [imageLoaded, setImageLoaded] = useState(false);
    
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
    
    const heroImageSrc = 'https://picsum.photos/seed/oasis-hero/1920/1080';

    return (
        <section id="hero-oasis">
             <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#c5d5cb] to-background">
                {/* Abstract background shapes */}
                <div aria-hidden="true" className="absolute -top-40 -left-40 w-96 h-96 bg-accent rounded-full filter blur-3xl opacity-20"></div>
                <div aria-hidden="true" className="absolute -bottom-40 -right-20 w-80 h-80 bg-[#a7c4b5] rounded-full filter blur-3xl opacity-30"></div>
                
                <LazyBackgroundImage src={heroImageSrc} active={true} onLoad={() => setImageLoaded(true)} />
                <div className={`absolute inset-0 bg-black/30 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className="relative text-center text-white z-10 px-4">
                    <p className="font-sans text-base sm:text-lg tracking-widest uppercase">{t('oasis.hero.sanctuary')}</p>
                    <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold tracking-wider">AURALIS</h1>
                </div>
            </div>

            <div className="container mx-auto -mt-20 relative z-10 px-6">
                 <div className="flex flex-col md:flex-row shadow-elegant-lg rounded-sm overflow-hidden">
                    <InfoCard icon={<ConnectIcon />} title={t('oasis.hero.connectTitle')} colorClass="bg-primary-light">
                        <p>{t('oasis.hero.connectText')}</p>
                        <p className="font-bold text-primary text-lg">+1 564 586 968</p>
                    </InfoCard>

                    <div className="p-8 flex-1 bg-card-background">
                        <div className="flex items-center space-x-4 mb-4">
                            <PhilosophyIcon />
                            <h3 className="font-display text-2xl text-primary font-semibold">{t('oasis.hero.philosophyTitle')}</h3>
                        </div>
                        <div className="text-text-secondary space-y-3">
                            <p>{t('oasis.hero.philosophyText')}</p>
                        </div>
                        <a href="#about-oasis" onClick={handleNavClick} className="mt-4 inline-block px-6 py-2 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                           {t('oasis.hero.learnMore')}
                        </a>
                    </div>
                    
                    <InfoCard icon={<EventsIcon />} title={t('oasis.hero.eventsTitle')} colorClass="bg-accent text-accent-foreground">
                        <div className="text-white/90 space-y-2">
                             <p className="flex justify-between"><span>{t('oasis.hero.workshop')}:</span> <span>Mon, 11:00</span></p>
                             <p className="flex justify-between"><span>{t('oasis.hero.meditation')}:</span> <span>Sat, 11:00</span></p>
                        </div>
                    </InfoCard>
                 </div>
            </div>
        </section>
    );
};

export default OasisHero;
