// AnimatedSplashScreen.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Images } from '@src/assets';
import { useColor } from '@src/context';
import { Palette } from '@src/utils';

const { width } = Dimensions.get('window');

const AnimatedSplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const bgFade = useRef(new Animated.Value(0)).current;
  const { color } = useColor();
  const styles = animatedSplashScreenStyles(color);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoScale, {
        duration: 1200,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(bgFade, {
        duration: 2500,
        toValue: 1,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Fade out the whole splash screen
      Animated.timing(fadeAnim, {
        delay: 300,
        duration: 600,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    });
  }, [bgFade, fadeAnim, logoScale, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Animated Gradient Layer */}
      <Animated.View
        style={[StyleSheet.absoluteFillObject, { opacity: bgFade }]}>
        <LinearGradient
          colors={['#1B2B34', '#AEE2FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>

      {/* Logo Animation */}
      <Animated.Image
        source={Images.APP_LOGO_SPLASH_SCREEN_LIGHT} // replace with your logo
        style={[
          styles.logo,
          {
            transform: [{ scale: logoScale }],
          },
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const animatedSplashScreenStyles = ({ backgroundColor }: Palette) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      backgroundColor: backgroundColor,
      justifyContent: 'center', // fallback background
      zIndex: 999,
    },
    gradient: {
      flex: 1,
    },
    logo: {
      height: width * 0.5,
      width: width * 0.5,
    },
  });

export default AnimatedSplashScreen;
