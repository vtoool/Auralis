import React from 'react';

const OasisOfferings: React.FC = () => {

    const offerings = [
        {
            src: 'https://picsum.photos/seed/incense/800/600',
            alt: 'Incense sticks burning'
        },
        {
            src: 'https://picsum.photos/seed/buddha/600/800',
            alt: 'Buddha head statue'
        },
        {
            src: 'https://picsum.photos/seed/statues/800/600',
            alt: 'Buddha statues in a row'
        },
        {
            src: 'https://picsum.photos/seed/praying/600/800',
            alt: 'Woman praying'
        }
    ];

    return (
        <section className="py-24 bg-primary-light">
             <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-accent font-semibold tracking-wider">OUR TRANSFORMATIONAL OFFERINGS</p>
                        <h2 className="font-display text-4xl font-bold text-primary mt-2 mb-6">A Path to Inner Harmony</h2>
                        <p className="text-text-secondary mb-8">Embrace our series of curated courses and workshops to find the right path for your personal growth. Discover new skills to master and new ways of thinking to explore as you cultivate a deep, unshakable peace within.</p>
                        <button className="px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                            Explore All Courses
                        </button>
                    </div>
                     <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[28rem] md:h-[32rem]">
                        <div className="col-span-1 row-span-2">
                             <img src={offerings[1].src} alt={offerings[1].alt} className="w-full h-full object-cover rounded-sm" />
                        </div>
                        <div className="col-span-1 row-span-1">
                            <img src={offerings[0].src} alt={offerings[0].alt} className="w-full h-full object-cover rounded-sm" />
                        </div>
                        <div className="col-span-1 row-span-1">
                            <img src={offerings[2].src} alt={offerings[2].alt} className="w-full h-full object-cover rounded-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OasisOfferings;