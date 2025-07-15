import React, { useEffect } from 'react';
import { View } from 'react-native';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNSplashScreen from 'react-native-splash-screen';

import { AppProvider, useColor } from '@src/context';
import AppNavigator from '@src/navigation/AppNavigator';

const AppContent = () => {
  const { color } = useColor();

  const theme = {
    colors: {
      background: color.colors.background,
      border: color.colors.border,
      card: color.colors.card,
      notification: color.colors.primary,
      primary: color.colors.primary,
      text: color.colors.text,
    },
    dark: color.colors.background === '#212121',
    fonts: DefaultTheme.fonts,
  };

  return (
    <NavigationContainer theme={theme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  useEffect(() => {
    // Hide splash screen once the app is ready
    setTimeout(() => {
      RNSplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </View>
    </SafeAreaProvider>
  );
}
