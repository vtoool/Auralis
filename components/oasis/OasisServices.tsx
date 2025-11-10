
import React from 'react';
import { HamsaIcon, YogaIcon, MeditationIcon, EventsIcon } from './OasisIcons';

const ServiceCard: React.FC<{icon: React.ReactNode, title: string, description: string, image: string, isLink?: boolean, href?: string}> = ({icon, title, description, image, isLink, href}) => {
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
                        Book Now &rarr;
                    </span>
                 )}
            </div>
        </div>
    );
    
    return isLink ? <a href={href}>{content}</a> : <div>{content}</div>;
};

const OasisServices: React.FC = () => {
    const cards = [
        {
            icon: <HamsaIcon className="text-accent mx-auto" />,
            title: 'Mindfulness Workshops',
            description: 'Embrace the art of mindfulness to nurture a deeper and more meaningful connection with the present moment.',
            image: 'https://picsum.photos/seed/mindfulness-workshop/600/400'
        },
        {
            icon: <YogaIcon className="text-accent mx-auto" />,
            title: 'Yoga for Inner Peace',
            description: 'True harmony of mind and body is the essence of this practice, where your physical and mental conditions align.',
            image: 'https://picsum.photos/seed/yoga-peace/600/400'
        },
        {
            icon: <MeditationIcon className="text-accent mx-auto" />,
            title: 'Meditation Sessions',
            description: 'The ancient art of meditation is a powerful tool you can learn in our sessions to bring tranquility to your daily life.',
            image: 'https://picsum.photos/seed/meditation-session/600/400'
        },
        {
            icon: <EventsIcon className="text-accent mx-auto" />,
            title: 'Book a Session',
            description: 'Schedule a one-on-one session for personalized guidance and a deeper connection to your practice.',
            image: 'https://picsum.photos/seed/booking-service/600/400',
            isLink: true,
            href: '#/booking'
        }
    ];

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <p className="text-accent font-semibold tracking-wider">OUR SERVICES</p>
                    <h2 className="font-display text-4xl font-bold text-primary mt-2 mb-4">Mindfulness and Compassion</h2>
                    <p className="text-text-secondary">Explore the ancient art of mindfulness and compassion to find the true balance of mind, body, and spirit. We provide a series of workshops designed to enhance self-awareness and inner peace, alongside our meditation sessions.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map(card => <ServiceCard key={card.title} {...card} />)}
                </div>
            </div>
        </section>
    );
};

export default OasisServices;
