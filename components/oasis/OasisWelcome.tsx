import React from 'react';
import { WorshipIcon, WellnessWorkshopIcon } from './OasisIcons';
import { useLanguage } from '../../context/LanguageContext';

const OasisWelcome: React.FC = () => {
    const { t } = useLanguage();
    const handlePageLinkClick = () => window.scrollTo(0, 0);

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                             <div className="relative w-full h-52 rounded-t-full overflow-hidden">
                                <img src="https://picsum.photos/seed/sky-arch/600/800" alt="View of a clear blue sky" className="absolute inset-0 w-full h-full object-cover" />
                             </div>
                             <div className="mt-4">
                                <img src="https://picsum.photos/seed/vintage-car/800/600" alt="Sunlit interior of a vintage vehicle" className="w-full h-40 object-cover" />
                             </div>
                        </div>
                        <div className="relative">
                            <img src="https://picsum.photos/seed/coyote-forest/600/900" alt="Coyote in a sun-dappled forest" className="w-full h-96 object-cover" />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-display text-4xl font-bold text-primary mb-6">{t('oasis.welcome.title')}</h2>
                        <p className="text-text-secondary mb-8">{t('oasis.welcome.text')}</p>
                        <div className="space-y-6">
                             <div className="flex items-start space-x-4">
                                <WorshipIcon className="text-accent" />
                                <div>
                                    <h4 className="font-bold text-primary text-lg">{t('oasis.welcome.guidedMeditations')}</h4>
                                    <p className="text-text-secondary">{t('oasis.welcome.guidedMeditationsText')}</p>
                                </div>
                             </div>
                             <div className="flex items-start space-x-4">
                                <WellnessWorkshopIcon className="text-accent" />
                                <div>
                                    <h4 className="font-bold text-primary text-lg">{t('oasis.welcome.wellnessWorkshops')}</h4>
                                    <p className="text-text-secondary">{t('oasis.welcome.wellnessWorkshopsText')}</p>
                                </div>
                             </div>
                        </div>
                        <a 
                            href="#/courses" 
                            onClick={handlePageLinkClick}
                            className="mt-8 inline-block px-8 py-3 font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                        >
                            {t('oasis.welcome.viewCourses')}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OasisWelcome;