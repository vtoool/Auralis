import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import LazyBackgroundImage from './LazyBackgroundImage';

const themeBackgrounds: { [key: string]: string } = {
  serene: 'https://images.unsplash.com/photo-1623172959921-630212f71058?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1920',
  vibrant: 'https://plus.unsplash.com/premium_photo-1676815865390-8e3a9336f64b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1920',
  ember: 'https://images.unsplash.com/photo-1613068431228-8cb6a1e92573?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
};

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { themeName } = useTheme();

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
      {/* Background Images with transitions */}
      {Object.entries(themeBackgrounds).map(([theme, src]) => (
        <LazyBackgroundImage key={theme} src={src} active={themeName === theme} />
      ))}

      {/* Conditional overlay for vibrant theme to improve contrast */}
      {themeName === 'vibrant' && (
        <div className="absolute inset-0 bg-[rgb(15,76,76)]/30" aria-hidden="true"></div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/30" aria-hidden="true"></div>

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
            className="px-8 py-4 text-lg font-semibold rounded-full bg-accent text-accent-foreground border border-accent-foreground/20 shadow-[0_2px_4px_rgba(0,0,0,0.1),_inset_0_1px_1px_rgba(255,255,255,0.5)] transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_10px_rgba(0,0,0,0.2),_inset_0_1px_1px_rgba(255,255,255,0.5)] hover:brightness-105 active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] active:brightness-95 focus:outline-none focus:ring-4 focus:ring-accent/50"
          >
            {t('hero.exploreCourses')}
          </a>
          <a
            href="#booking"
            onClick={handleNavClick}
            className="px-8 py-4 text-lg font-semibold rounded-full bg-primary-light text-primary border border-primary/20 shadow-[0_2px_4px_rgba(0,0,0,0.08),_inset_0_1px_1px_rgba(255,255,255,0.9)] transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_10px_rgba(0,0,0,0.15),_inset_0_1px_1px_rgba(255,255,255,0.9)] hover:brightness-105 active:translate-y-px active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] active:brightness-95 focus:outline-none focus:ring-4 focus:ring-primary/50"
          >
            {t('hero.bookSession')}
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
         <a href="#courses" aria-label="Scroll down to courses" onClick={handleNavClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white opacity-70"><path d="M12 5v14m-7-7l7 7 7-7" /></svg>
         </a>
      </div>
    </section>
  );
};

export default Hero;