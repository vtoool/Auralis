import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Dropdown from './Dropdown';

const SwatchesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 2H19a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2z"/>
        <path d="M4.5 2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8.5"/>
    </svg>
);


const ThemePicker: React.FC = () => {
  const { themeName, setThemeName } = useTheme();
  const { t } = useLanguage();

  const trigger = (
    <button className="p-2 rounded-full text-primary hover:bg-primary/10 dark:text-accent dark:hover:bg-accent/10 transition-colors duration-300" aria-label={t('theme.select')}>
      <SwatchesIcon />
    </button>
  );

  return (
    <Dropdown trigger={trigger}>
      <button
        onClick={() => setThemeName('serene')}
        className={`w-full text-left block px-4 py-2 text-sm transition-colors duration-200 ${themeName === 'serene' ? 'bg-primary-light font-semibold text-primary' : 'text-text-primary'} hover:bg-border-color`}
        role="menuitem"
      >
        {t('theme.serene')}
      </button>
      <button
        onClick={() => setThemeName('vibrant')}
        className={`w-full text-left block px-4 py-2 text-sm transition-colors duration-200 ${themeName === 'vibrant' ? 'bg-primary-light font-semibold text-primary' : 'text-text-primary'} hover:bg-border-color`}
        role="menuitem"
      >
        {t('theme.vibrant')}
      </button>
      <button
        onClick={() => setThemeName('ember')}
        className={`w-full text-left block px-4 py-2 text-sm transition-colors duration-200 ${themeName === 'ember' ? 'bg-primary-light font-semibold text-primary' : 'text-text-primary'} hover:bg-border-color`}
        role="menuitem"
      >
        {t('theme.ember')}
      </button>
      <button
        onClick={() => setThemeName('oasis')}
        className={`w-full text-left block px-4 py-2 text-sm transition-colors duration-200 ${themeName === 'oasis' ? 'bg-primary-light font-semibold text-primary' : 'text-text-primary'} hover:bg-border-color`}
        role="menuitem"
      >
        Oasis
      </button>
    </Dropdown>
  );
};

export default ThemePicker;