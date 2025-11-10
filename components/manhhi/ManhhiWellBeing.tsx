import React from 'react';
import { WorshipIcon, OutreachIcon } from './ManhhiIcons';

const ManhhiWellBeing: React.FC = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative pt-12">
                             <div className="relative w-full h-64 rounded-t-full overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1620027735163-549704e9f76a?q=80&w=2694&auto=format&fit=crop" alt="Arched window of a temple" className="absolute inset-0 w-full h-full object-cover" />
                             </div>
                             <div className="mt-4">
                                <img src="https://images.unsplash.com/photo-1596205254124-4a53e68e1e3b?q=80&w=2835&auto=format&fit=crop" alt="Monk walking" className="w-full h-48 object-cover" />
                             </div>
                        </div>
                        <div className="relative">
                            <img src="https://images.unsplash.com/photo-1544991807-062b9a11713e?q=80&w=2835&auto=format&fit=crop" alt="Golden temple roof" className="w-full h-96 object-cover" />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-display text-4xl font-bold text-primary mb-6">Invest in Your Well-Being and Spiritual Growth</h2>
                        <p className="text-text-secondary mb-8">Embark on our enriching trips, where you'll find the guidance to support your journey and a diverse range of pricing options to suit every budget and need. We also offer a range of pricing options to suit every budget and need. We have crafted an environment where you can explore a life of self-discovery, spiritual enrichment, and energetic management.</p>
                        <div className="space-y-6">
                             <div className="flex items-start space-x-4">
                                <WorshipIcon className="text-accent" />
                                <div>
                                    <h4 className="font-bold text-primary text-lg">Worship Service</h4>
                                    <p className="text-text-secondary">Experience our heartwarming worship services every week.</p>
                                </div>
                             </div>
                             <div className="flex items-start space-x-4">
                                <OutreachIcon className="text-accent" />
                                <div>
                                    <h4 className="font-bold text-primary text-lg">Community Outreach</h4>
                                    <p className="text-text-secondary">Join our community to make a difference in others' lives.</p>
                                </div>
                             </div>
                        </div>
                        <button className="mt-8 px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                            View More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManhhiWellBeing;
