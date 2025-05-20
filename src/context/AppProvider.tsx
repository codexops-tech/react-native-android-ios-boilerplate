import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LocalizationProvider } from './LocalizationContext';
import { ThemeProvider } from './ThemeContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LocalizationProvider>{children}</LocalizationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
