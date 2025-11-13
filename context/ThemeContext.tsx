import React, { createContext, useContext, useEffect, ReactNode } from 'react';

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
  // Set theme class on mount and never change it
  useEffect(() => {
    document.documentElement.className = 'theme-oasis';
  }, []);

  const value = {
    themeName: 'oasis' as ThemeName,
    setThemeName: () => {}, // No-op
    themeVariant: 'light' as ThemeVariant,
    toggleThemeVariant: () => {}, // No-op
  };

  return (
    <ThemeContext.Provider value={value}>
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
