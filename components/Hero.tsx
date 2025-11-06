
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.substring(1);
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 80; // Corresponds to h-20 in Tailwind
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center" 
        style={{ backgroundImage: "url('https://picsum.photos/seed/auralis-harmony/1920/1080')" }}
        aria-hidden="true"
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-black/40" aria-hidden="true"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-md">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#courses"
            onClick={handleNavClick}
            className="px-8 py-4 text-lg font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 shadow-lg transform hover:scale-105"
          >
            {t('hero.exploreCourses')}
          </a>
          <a
            href="#booking"
            onClick={handleNavClick}
            className="px-8 py-4 text-lg font-semibold rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-300 shadow-lg transform hover:scale-105"
          >
            {t('hero.bookSession')}
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
         <a href="#courses" aria-label="Scroll down to courses" onClick={handleNavClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white opacity-70"><path d="M12 5v14m-7-7l7 7 7-7" /></svg>
         </a>
      </div>
    </section>
  );
};

export default Hero;