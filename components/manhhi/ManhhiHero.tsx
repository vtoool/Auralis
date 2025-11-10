import React from 'react';
import { ConnectIcon, CommunionIcon, ContactIcon } from './ManhhiIcons';

const InfoCard: React.FC<{icon: React.ReactNode, title: string, children: React.ReactNode, colorClass: string}> = ({icon, title, children, colorClass}) => (
    <div className={`p-8 flex-1 ${colorClass}`}>
        <div className="flex items-center space-x-4 mb-4">
            {icon}
            <h3 className="font-display text-2xl text-primary font-semibold">{title}</h3>
        </div>
        <div className="text-text-secondary space-y-3">
             {children}
        </div>
    </div>
);


const ManhhiHero: React.FC = () => {
    return (
        <section id="hero-manhhi">
             <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542438459-54817346b362?q=80&w=2940&auto=format&fit=crop')"}}>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative text-center text-white">
                    <p className="font-sans text-lg tracking-widest">BUDDHIST MONASTERY & TEMPLE</p>
                    <h1 className="font-display text-6xl md:text-8xl font-bold">Temple</h1>
                </div>
            </div>

            <div className="container mx-auto -mt-20 relative z-10 px-6">
                 <div className="flex flex-col md:flex-row shadow-elegant-lg">
                    <InfoCard icon={<ConnectIcon />} title="Connect With Us" colorClass="bg-primary-light">
                        <p>Reach out and connect with our church community. We’re here to listen, support, and guide you on your journey of faith.</p>
                        <p className="font-bold text-primary text-lg">+1 564 586 968</p>
                    </InfoCard>
                    <InfoCard icon={<CommunionIcon />} title="Communion Info" colorClass="bg-card-background">
                         <p>Reach out and connect with our church community. We’re here to listen, support, and guide you on your journey of faith.</p>
                         <button className="px-6 py-2 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                            Contact Now
                         </button>
                    </InfoCard>
                    <InfoCard icon={<ContactIcon />} title="Contact Information" colorClass="bg-accent text-accent-foreground">
                        <div className="text-white/80 space-y-2">
                             <p className="flex justify-between"><span>Prayer Time:</span> <span>Monday, 11:00</span></p>
                             <p className="flex justify-between"><span>Weekly Prayer:</span> <span>Saturday, 11:00</span></p>
                        </div>
                    </InfoCard>
                 </div>
            </div>
        </section>
    );
};

export default ManhhiHero;
