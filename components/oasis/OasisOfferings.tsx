
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
                        <p className="text-accent font-semibold tracking-wider">OUR CURATED SHOP</p>
                        <h2 className="font-display text-4xl font-bold text-primary mt-2 mb-6">Tools for Your Journey</h2>
                        <p className="text-text-secondary mb-8">Complement your spiritual practice with our thoughtfully selected collection of wellness products. From handcrafted meditation cushions to purifying sage, each item is chosen to enhance your journey and bring a sense of peace and harmony to your sacred space.</p>
                        <a href="#/shop" className="px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                            View Products
                        </a>
                    </div>
                     <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[28rem] md:h-[32rem]">
                        <div className="col-span-1 row-span-2">
                             <img src={'https://picsum.photos/seed/singingbowl/600/800'} alt={'Singing bowl'} className="w-full h-full object-cover rounded-sm" />
                        </div>
                        <div className="col-span-1 row-span-1">
                            <img src={'https://picsum.photos/seed/saltlamp/800/600'} alt={'Himalayan salt lamp'} className="w-full h-full object-cover rounded-sm" />
                        </div>
                        <div className="col-span-1 row-span-1">
                            <img src={'https://picsum.photos/seed/chakraset/800/600'} alt={'Chakra stones'} className="w-full h-full object-cover rounded-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OasisOfferings;
