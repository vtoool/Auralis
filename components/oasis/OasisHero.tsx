import React from 'react';
import { ConnectIcon, PhilosophyIcon, EventsIcon } from './OasisIcons';

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
        <section id="hero-oasis">
             <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://picsum.photos/seed/oasis-hero/1920/1080')"}}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative text-center text-white z-10">
                    <p className="font-sans text-lg tracking-widest uppercase">Your Sanctuary for Inner Harmony</p>
                    <h1 className="font-display text-6xl md:text-8xl font-bold tracking-wider">AURALIS</h1>
                </div>
            </div>

            <div className="container mx-auto -mt-20 relative z-10 px-6">
                 <div className="flex flex-col md:flex-row shadow-elegant-lg rounded-sm overflow-hidden">
                    <InfoCard icon={<ConnectIcon />} title="Connect With Alice" colorClass="bg-primary-light">
                        <p>I’m here to listen, support, and guide you on your journey of faith and self-discovery. Let's walk this path together.</p>
                        <p className="font-bold text-primary text-lg">+1 564 586 968</p>
                    </InfoCard>

                    <div className="p-8 flex-1 bg-card-background">
                        <div className="flex items-center space-x-4 mb-4">
                            <PhilosophyIcon />
                            <h3 className="font-display text-2xl text-primary font-semibold">Our Philosophy</h3>
                        </div>
                        <div className="text-text-secondary space-y-3">
                            <p>We blend ancient meditative traditions with modern mindfulness, making spiritual wellness accessible and practical for today's world.</p>
                        </div>
                        <a href="#about-oasis" onClick={handleNavClick} className="mt-4 inline-block px-6 py-2 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                           Learn More
                        </a>
                    </div>
                    
                    <InfoCard icon={<EventsIcon />} title="Upcoming Events" colorClass="bg-accent text-accent-foreground">
                        <div className="text-white/90 space-y-2">
                             <p className="flex justify-between"><span>Mindfulness Workshop:</span> <span>Mon, 11:00</span></p>
                             <p className="flex justify-between"><span>Group Meditation:</span> <span>Sat, 11:00</span></p>
                        </div>
                    </InfoCard>
                 </div>
            </div>
        </section>
    );
};

export default OasisHero;