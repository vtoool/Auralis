import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeVariant = 'light' | 'dark';
type ThemeName = 'serene' | 'vibrant' | 'ember' | 'oasis';

interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  themeVariant: ThemeVariant;
  toggleThemeVariant: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('oasis');
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>('light');

  useEffect(() => {
    const storedThemeName = localStorage.getItem('themeName');
    if (storedThemeName === 'serene' || storedThemeName === 'vibrant' || storedThemeName === 'ember' || storedThemeName === 'oasis') {
      setThemeName(storedThemeName);
    }

    const storedThemeVariant = localStorage.getItem('themeVariant') as ThemeVariant | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedThemeVariant) {
      setThemeVariant(storedThemeVariant);
    } else if (prefersDark) {
      setThemeVariant('dark');
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    // Remove old theme names to avoid conflicts
    html.classList.remove('theme-serene', 'theme-vibrant', 'theme-ember', 'theme-oasis');
    // Add current theme name
    html.classList.add(`theme-${themeName}`);

    if (themeVariant === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    localStorage.setItem('themeName', themeName);
    localStorage.setItem('themeVariant', themeVariant);
  }, [themeName, themeVariant]);

  const toggleThemeVariant = () => {
    setThemeVariant(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, themeVariant, toggleThemeVariant }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};