

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const OasisOfferings: React.FC = () => {
    const { t } = useLanguage();
    const handlePageLinkClick = () => window.scrollTo(0, 0);

    return (
        <section className="py-24 bg-primary-light">
             <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-accent font-semibold tracking-wider">{t('oasis.offerings.shop')}</p>
                        <h2 className="font-display text-4xl font-bold text-primary mt-2 mb-6">{t('oasis.offerings.title')}</h2>
                        <p className="text-text-secondary mb-8">{t('oasis.offerings.text')}</p>
                        <a href="#/shop" onClick={handlePageLinkClick} className="px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                            {t('oasis.offerings.viewProducts')}
                        </a>
                    </div>
                     <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[28rem] md:h-[32rem]">
                        <div className="col-span-1 row-span-2">
                             <img src={'https://picsum.photos/seed/singingbowl/600/800'} alt={'Singing bowl'} className="w-full h-full object-cover rounded-sm" loading="lazy" />
                        </div>
                        <div className="col-span-1 row-span-1">
                            <img src={'https://picsum.photos/seed/saltlamp/800/600'} alt={'Himalayan salt lamp'} className="w-full h-full object-cover rounded-sm" loading="lazy" />
                        </div>
                        <div className="col-span-1 row-span-1">
                            <img src={'https://picsum.photos/seed/chakraset/800/600'} alt={'Chakra stones'} className="w-full h-full object-cover rounded-sm" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OasisOfferings;