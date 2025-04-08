// filepath: /src/components/SplashScreen.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Images } from '@src/assets';
import { useColor } from '@src/context';
import { Palette } from '@src/utils';

import { AppImage } from '../AppImage/AppImage';

const SplashScreen: React.FC = () => {
  const { color } = useColor();

  const styles = splashScreenStyles(color);

  return (
    <View style={styles.container}>
      <AppImage source={Images.APP_LOGO_SPLASH_SCREEN_LIGHT} style={styles.logo} />
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const splashScreenStyles = ({ backgroundColor }: Palette) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: backgroundColor,
      flex: 1,
      justifyContent: 'center',
    },
    logo: {
      height: 150,
      marginBottom: 20,
      width: 150,
    },
  });

export default SplashScreen;
