import React from 'react';

const ManhhiSpiritualGrowth: React.FC = () => {
    return (
        <section className="py-24 bg-primary-light">
             <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-accent font-semibold tracking-wider">OUR SERVICES</p>
                        <h2 className="font-display text-4xl font-bold text-primary mt-2 mb-6">Spiritual Growth</h2>
                        <p className="text-text-secondary mb-8">Embrace our series of spiritual workshops and find the right path to your own personal growth, find new skills to master and new ways of thinking to explore.</p>
                        <button className="px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                            Find Out More
                        </button>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                             <img src="https://images.unsplash.com/photo-1596193433357-49a38c8c7c34?q=80&w=2835&auto=format&fit=crop" alt="Incense sticks burning" className="w-full h-48 object-cover" />
                             <img src="https://images.unsplash.com/photo-1565463764490-4e3a36275811?q=80&w=2864&auto=format&fit=crop" alt="Buddha statues in a row" className="w-full h-64 object-cover" />
                        </div>
                        <div className="space-y-4">
                            <div className="relative w-full h-40 rounded-b-full overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1597509492328-97fb62b4a530?q=80&w=2835&auto=format&fit=crop" alt="Buddha head statue" className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                            <img src="https://images.unsplash.com/photo-1528183410362-9e9d69115793?q=80&w=2864&auto=format&fit=crop" alt="Woman praying" className="w-full h-72 object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManhhiSpiritualGrowth;
