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
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-24 items-start">
                    {/* New Framed Image Collage */}
                    <div className="lg:col-span-2">
                        <div className="relative p-8">
                            {/* Main Framed Image */}
                            <div className="relative w-full rounded-sm shadow-elegant-lg border-8 border-primary-light aspect-[3/4]">
                                <img
                                    src="https://images.unsplash.com/photo-1536007164800-b7f11331f35c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="A woman in a red dress walking through a misty, green forest."
                                    className="w-full h-full object-cover rounded-sm"
                                    loading="lazy"
                                />
                            </div>
                            {/* Overlapping Image Top Right */}
                            <div className="absolute top-0 right-0 w-1/2 transform translate-x-1/4 -translate-y-1/4 rounded-sm shadow-elegant-lg border-4 border-card-background aspect-square">
                                <img
                                    src="https://images.unsplash.com/photo-1488875482628-eee706cbfad5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Sunlight shining through silhouetted tree branches."
                                    className="w-full h-full object-cover rounded-sm"
                                    loading="lazy"
                                />
                            </div>
                            {/* Overlapping Image Bottom Left */}
                            <div className="absolute bottom-0 left-0 w-1/2 transform -translate-x-1/4 translate-y-1/4 rounded-sm shadow-elegant-lg border-4 border-card-background aspect-square">
                                <img
                                    src="https://images.unsplash.com/photo-1762068320601-a5aeb23050d9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Dew drops on wildflowers in the morning sun."
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