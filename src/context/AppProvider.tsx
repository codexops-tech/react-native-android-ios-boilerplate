import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { LocalizationProvider } from './LocalizationContext';
import { ThemeProvider } from './ThemeContext';
import store from '../store';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <LocalizationProvider>{children}</LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
