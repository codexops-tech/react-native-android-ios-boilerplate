import React, { useEffect } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Images } from '@src/assets';
import { useColor } from '@src/context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const LOGO_SIZE = SCREEN_WIDTH * 0.4; // 40% of screen width

const SplashScreen = () => {
  const navigation = useNavigation();
  const { color } = useColor();

  // Animation values
  const playButtonOpacity = new Animated.Value(1);
  const playButtonScale = new Animated.Value(1);
  const fullLogoOpacity = new Animated.Value(0);
  const fullLogoScale = new Animated.Value(0.8);

  useEffect(() => {
    // First animation: Play button fade in and scale up
    Animated.sequence([
      // Initial state: Play button visible
      Animated.parallel([
        Animated.timing(playButtonOpacity, {
          duration: 500,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(playButtonScale, {
          friction: 4,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      // Wait for 1 second
      Animated.delay(1000),
      // Transition: Play button fades out while scaling down
      Animated.parallel([
        Animated.timing(playButtonOpacity, {
          duration: 500,
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(playButtonScale, {
          duration: 500,
          toValue: 0.8,
          useNativeDriver: true,
        }),
      ]),
      // Full logo fades in and scales up
      Animated.parallel([
        Animated.timing(fullLogoOpacity, {
          duration: 500,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(fullLogoScale, {
          friction: 4,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      // Wait for 1 second
      Animated.delay(1000),
      // Final fade out
      Animated.timing(fullLogoOpacity, {
        duration: 500,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to main app after animation
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    });
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: color.colors.background }]}>
      {/* Play Button */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: playButtonOpacity,
            transform: [{ scale: playButtonScale }],
          },
        ]}>
        <Image
          source={Images.PLAY_BUTTON_WHITE}
          style={[styles.logo, styles.playButton]}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Full Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          styles.fullLogoContainer,
          {
            opacity: fullLogoOpacity,
            transform: [{ scale: fullLogoScale }],
          },
        ]}>
        <Image
          source={Images.APP_LOGO_SPLASH_SCREEN_DARK}
          style={[styles.logo, styles.fullLogo]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  fullLogo: {
    height: LOGO_SIZE,
    width: LOGO_SIZE,
  },
  fullLogoContainer: {
    height: LOGO_SIZE,
    width: LOGO_SIZE,
  },
  logo: {
    height: LOGO_SIZE,
    width: LOGO_SIZE,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  playButton: {
    // Slightly smaller than the full logo
    height: LOGO_SIZE * 0.6,
    width: LOGO_SIZE * 0.6,
  },
});

export default SplashScreen;
