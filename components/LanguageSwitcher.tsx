import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Dropdown from './Dropdown';

const GlobeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);


const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ro', name: 'Română' },
    { code: 'ru', name: 'Русский' },
  ];

  const trigger = (
    <button className="flex items-center space-x-1 p-2 rounded-full text-primary hover:bg-primary/10 dark:text-accent dark:hover:bg-accent/10 transition-colors duration-300" aria-label="Select language">
      <GlobeIcon />
      <span className="font-semibold text-sm">{language.toUpperCase()}</span>
    </button>
  );

  return (
    <Dropdown trigger={trigger}>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as 'en' | 'ro' | 'ru')}
          className={`w-full text-left block px-4 py-2 text-sm transition-colors duration-200 ${language === lang.code ? 'bg-primary-light font-semibold text-primary' : 'text-text-primary'} hover:bg-border-color`}
          role="menuitem"
        >
          {lang.name}
        </button>
      ))}
    </Dropdown>
  );
};

export default LanguageSwitcher;
