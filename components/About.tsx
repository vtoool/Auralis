import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-5 gap-12 items-center">
                    <div className="relative md:col-span-2">
                         <div className="absolute -top-4 -left-4 w-full h-full bg-primary-light rounded-xl transform -rotate-2" aria-hidden="true"></div>
                         <img 
                            src="https://images.unsplash.com/photo-1684397377783-9924e83271b4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627" 
                            alt="Alice, guide at Auralis"
                            className="relative w-full h-96 object-cover rounded-xl shadow-elegant-lg"
                            loading="lazy"
                        />
                    </div>
                    <div className="text-left md:col-span-3">
                        <h2 className="text-4xl font-serif font-bold text-primary mb-4">{t('about.title')}</h2>
                        <p className="text-xl font-medium text-text-secondary mb-6">{t('about.subtitle')}</p>
                        <div className="space-y-4 text-text-secondary leading-relaxed">
                            <p>{t('about.paragraph1')}</p>
                            <p>{t('about.paragraph2')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;