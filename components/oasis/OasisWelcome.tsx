import React from 'react';
import { WorshipIcon, OutreachIcon } from './OasisIcons';

const OasisWelcome: React.FC = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative pt-12">
                             <div className="relative w-full h-64 rounded-t-full overflow-hidden">
                                <img src="https://picsum.photos/seed/temple-window/600/800" alt="Arched window of a temple" className="absolute inset-0 w-full h-full object-cover" />
                             </div>
                             <div className="mt-4">
                                <img src="https://picsum.photos/seed/monk-walking/600/400" alt="Monk walking" className="w-full h-48 object-cover" />
                             </div>
                        </div>
                        <div className="relative">
                            <img src="https://picsum.photos/seed/temple-roof/600/800" alt="Golden temple roof" className="w-full h-96 object-cover" />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-display text-4xl font-bold text-primary mb-6">Invest in Your Well-Being and Spiritual Growth</h2>
                        <p className="text-text-secondary mb-8">My own journey into spiritual wellness began from a place of seeking calm in a chaotic world. I discovered that true harmony isn't about escaping life's challenges, but about cultivating a deep, unshakable peace within. This realization transformed my life, and I felt a profound calling to share these practices with others.</p>
                        <div className="space-y-6">
                             <div className="flex items-start space-x-4">
                                <WorshipIcon className="text-accent" />
                                <div>
                                    <h4 className="font-bold text-primary text-lg">Guided Meditations</h4>
                                    <p className="text-text-secondary">Experience our heartwarming guided sessions every week.</p>
                                </div>
                             </div>
                             <div className="flex items-start space-x-4">
                                <OutreachIcon className="text-accent" />
                                <div>
                                    <h4 className="font-bold text-primary text-lg">Wellness Workshops</h4>
                                    <p className="text-text-secondary">Join our community to make a difference in your life and others'.</p>
                                </div>
                             </div>
                        </div>
                        <button className="mt-8 px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                            View Courses
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OasisWelcome;