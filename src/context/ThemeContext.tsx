import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { StorageKeys } from '@src/constants';
import { getColor, setColor } from '@src/utils/color';

import { storage } from './storage';

interface ThemeContextType {
  color: {
    colors: {
      background: string;
      card: string;
      text: string;
      textSecondary: string;
      border: string;
      primary: string;
      secondary: string;
      subtext: string;
    };
    borderRadius: {
      lg: number;
      md: number;
      sm: number;
      xs: number;
    };
    spacing: {
      lg: number;
      md: number;
      sm: number;
      xs: number;
    };
  };
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useColor = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useColor must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('dark');

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      const savedTheme = storage.getData(StorageKeys.APP_THEME);
      if (savedTheme) {
        setThemeState(savedTheme as 'light' | 'dark' | 'system');
      }
    };
    loadTheme();
  }, []);

  const setTheme = async (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    storage.setData(StorageKeys.APP_THEME, newTheme);
  };

  const effectiveTheme =
    theme === 'system' ? systemColorScheme || 'dark' : theme;
  const color = getColor(effectiveTheme);

  // Add textSecondary color
  const themeColors = {
    ...color.colors,
    textSecondary: color.colors.subtext,
  };

  const contextValue: ThemeContextType = {
    color: {
      borderRadius: color.borderRadius,
      colors: themeColors,
      spacing: color.spacing,
    },
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
