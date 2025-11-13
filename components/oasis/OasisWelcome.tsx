import React from 'react';
import { WorshipIcon, WellnessWorkshopIcon } from './OasisIcons';
import { useLanguage } from '../../context/LanguageContext';

const OasisWelcome: React.FC = () => {
    const { t } = useLanguage();
    const handlePageLinkClick = () => window.scrollTo(0, 0);

    // Split the text block from translations into paragraphs
    const welcomeTextParagraphs = t('oasis.welcome.text').split('\n');

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-24 items-center">
                    {/* New Framed Image Collage */}
                    <div className="lg:col-span-2">
                        <div className="relative p-8">
                            {/* Main Framed Image */}
                            <div className="relative w-full rounded-sm shadow-elegant-lg border-8 border-primary-light aspect-[3/4]">
                                <img
                                    src="https://picsum.photos/seed/dune-woman/600/800"
                                    alt="A woman in a blue sweater sits peacefully on a vast sand dune, seen from behind."
                                    className="w-full h-full object-cover rounded-sm"
                                    loading="lazy"
                                />
                            </div>
                            {/* Overlapping Image Top Right */}
                            <div className="absolute top-0 right-0 w-1/2 transform translate-x-1/4 -translate-y-1/4 rounded-sm shadow-elegant-lg border-4 border-card-background aspect-square">
                                <img
                                    src="https://picsum.photos/seed/lotus-pond/600/600"
                                    alt="A single, vibrant purple lotus flower floating on dark, calm water."
                                    className="w-full h-full object-cover rounded-sm"
                                    loading="lazy"
                                />
                            </div>
                            {/* Overlapping Image Bottom Left */}
                            <div className="absolute bottom-0 left-0 w-1/2 transform -translate-x-1/4 translate-y-1/4 rounded-sm shadow-elegant-lg border-4 border-card-background aspect-square">
                                <img
                                    src="https://picsum.photos/seed/stone-cairn/600/600"
                                    alt="A stack of balanced, weathered stones on a beach with the ocean in the background."
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
