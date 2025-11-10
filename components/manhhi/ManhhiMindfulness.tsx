import React from 'react';
import { HamsaIcon, YogaIcon, MeditationIcon } from './ManhhiIcons';

const MindfulnessCard: React.FC<{icon: React.ReactNode, title: string, description: string, image: string}> = ({icon, title, description, image}) => (
    <div className="text-center group">
        <div className="bg-card-background p-8 border border-border-color shadow-sm transition-all duration-300 group-hover:shadow-elegant-lg">
            <div className="w-20 h-20 mx-auto mb-4">
                <img src={image} alt={title} className="w-full h-full object-cover rounded-full" />
            </div>
            {icon}
            <h3 className="font-display text-2xl text-primary mt-4 mb-2">{title}</h3>
            <p className="text-text-secondary">{description}</p>
        </div>
    </div>
);

const ManhhiMindfulness: React.FC = () => {
    const cards = [
        {
            icon: <HamsaIcon className="text-accent mx-auto" />,
            title: 'Mindfulness Workshops',
            description: 'Embrace the art of mindfulness to nurture a deeper and more meaningful...',
            image: 'https://images.unsplash.com/photo-1506126613408-4e05960270e5?q=80&w=2940&auto=format&fit=crop'
        },
        {
            icon: <YogaIcon className="text-accent mx-auto" />,
            title: 'Yoga for Inner Peace',
            description: 'True harmony of mind and body is the essence of this practice where you will...',
            image: 'https://images.unsplash.com/photo-1588282322673-c31965a75c3e?q=80&w=2940&auto=format&fit=crop'
        },
        {
            icon: <MeditationIcon className="text-accent mx-auto" />,
            title: 'Meditation Sessions',
            description: 'The ancient art of meditation is a powerful tool you can learn in our sessions...',
            image: 'https://images.unsplash.com/photo-1597516104132-3408c6913dd4?q=80&w=2960&auto=format&fit=crop'
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex items-center justify-center p-8">
                        <img src="https://images.unsplash.com/photo-1542438459-54817346b362?q=80&w=2940&auto=format&fit=crop" alt="Golden Buddha statue face" className="w-full h-auto" />
                    </div>
                     <div className="flex items-center justify-center p-8">
                        <img src="https://images.unsplash.com/photo-1621532242371-55895e347ed1?q=80&w=2787&auto=format&fit=crop" alt="Monks with an elephant" className="w-full h-auto" />
                    </div>
                    <div className="flex items-center justify-center p-8">
                       <img src="https://images.unsplash.com/photo-1519412142065-35c2b0d7a6a4?q=80&w=2849&auto=format&fit=crop" alt="Incense burning in a bowl" className="w-full h-auto" />
                    </div>
                    {cards.map(card => <MindfulnessCard key={card.title} {...card} />)}
                </div>
            </div>
        </section>
    );
};

export default ManhhiMindfulness;
