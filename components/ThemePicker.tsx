import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Dropdown from './Dropdown';

const PaletteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.293 3.293a1 1 0 011.414 0l.001.001a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.243-1.243l1-3a1 1 0 01.242-.39l9-9zM19 10a1 1 0 00-1-1h-4a1 1 0 100 2h4a1 1 0 001-1z" />
    </svg>
);

const ThemePicker: React.FC = () => {
  const { themeName, setThemeName } = useTheme();
  const { t } = useLanguage();

  const trigger = (
    <button className="p-2 rounded-full text-primary hover:bg-primary/10 dark:text-accent dark:hover:bg-accent/10 transition-colors duration-300" aria-label={t('theme.select')}>
      <PaletteIcon />
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
    </Dropdown>
  );
};

export default ThemePicker;