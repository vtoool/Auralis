
import React from 'react';
import { HamsaIcon, YogaIcon, MeditationIcon, EventsIcon } from './OasisIcons';
import { useLanguage } from '../../context/LanguageContext';

const ServiceCard: React.FC<{icon: React.ReactNode, title: string, description: string, image: string, isLink?: boolean, href?: string, bookNowText: string}> = ({icon, title, description, image, isLink, href, bookNowText}) => {
    const content = (
        <div className="bg-card-background border border-border-color shadow-sm transition-all duration-300 hover:shadow-elegant-lg group overflow-hidden rounded-sm h-full flex flex-col">
            <div className="h-48 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="p-6 text-center flex-grow flex flex-col">
                {icon}
                <h3 className="font-display text-2xl text-primary mt-4 mb-2">{title}</h3>
                <p className="text-text-secondary flex-grow">{description}</p>
                 {isLink && (
                    <span className="mt-4 font-semibold text-primary group-hover:text-accent transition-colors">
                        {bookNowText}
                    </span>
                 )}
            </div>
        </div>
    );
    
    return isLink ? <a href={href}>{content}</a> : <div>{content}</div>;
};

const OasisServices: React.FC = () => {
    const { t } = useLanguage();
    
    const cards = [
        {
            icon: <HamsaIcon className="text-accent mx-auto" />,
            title: t('oasis.services.mindfulnessTitle'),
            description: t('oasis.services.mindfulnessText'),
            image: 'https://picsum.photos/seed/mindfulness-workshop/600/400'
        },
        {
            icon: <YogaIcon className="text-accent mx-auto" />,
            title: t('oasis.services.yogaTitle'),
            description: t('oasis.services.yogaText'),
            image: 'https://picsum.photos/seed/yoga-peace/600/400'
        },
        {
            icon: <MeditationIcon className="text-accent mx-auto" />,
            title: t('oasis.services.meditationTitle'),
            description: t('oasis.services.meditationText'),
            image: 'https://picsum.photos/seed/meditation-session/600/400'
        },
        {
            icon: <EventsIcon className="text-accent mx-auto" />,
            title: t('oasis.services.bookingTitle'),
            description: t('oasis.services.bookingText'),
            image: 'https://picsum.photos/seed/booking-service/600/400',
            isLink: true,
            href: '#/booking'
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <p className="text-accent font-semibold tracking-wider">{t('oasis.services.services')}</p>
                    <h2 className="font-display text-4xl font-bold text-primary mt-2 mb-4">{t('oasis.services.title')}</h2>
                    <p className="text-text-secondary">{t('oasis.services.text')}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map(card => <ServiceCard key={card.title} {...card} bookNowText={t('oasis.services.bookNow')} />)}
                </div>
            </div>
        </section>
    );
};

export default OasisServices;
