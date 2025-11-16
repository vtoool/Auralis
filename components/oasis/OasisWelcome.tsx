import React from 'react';
import { WorshipIcon, WellnessWorkshopIcon } from './OasisIcons';
import { useLanguage } from '../../context/LanguageContext';

const OasisWelcome: React.FC = () => {
    const { t } = useLanguage();
    const handlePageLinkClick = () => window.scrollTo(0, 0);

    // Split the text block from translations into paragraphs
    const welcomeTextParagraphs = t('oasis.welcome.text').split('\n');

    return (
        <section className="py-16 lg:py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-24 items-center">
                    {/* Image */}
                    <div className="lg:col-span-2">
                        <div className="relative h-96 lg:h-[44rem] max-w-md mx-auto lg:mx-0 lg:max-w-none lg:-translate-y-16">
                            <div className="absolute inset-0 rounded-sm shadow-elegant-lg border-8 border-card-background">
                                <img
                                    src="https://picsum.photos/seed/pisa-tower-main/600/900"
                                    alt="The leaning tower of Pisa against a cloudy sky."
                                    className="w-full h-full object-cover rounded-sm"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Column */}
                    <div className="lg:col-span-3">
                        <h2 className="font-display text-4xl font-bold text-primary mb-6">{t('oasis.welcome.title')}</h2>
                        <div className="text-text-secondary mb-8 space-y-4 leading-relaxed">
                            {welcomeTextParagraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
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