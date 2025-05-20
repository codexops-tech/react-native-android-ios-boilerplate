import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Images } from '@src/assets';
import { useColor } from '@src/context';
import { Palette } from '@src/utils';

import { AppImage } from '../AppImage/AppImage';

const SplashScreenSolidBg = ({ onFinish }: { onFinish: () => void }) => {
  const { color } = useColor();
  const styles = splashScreenStyles(color);

  const scaleAnim = useRef(new Animated.Value(1.5)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  const [showTextLogo, setShowTextLogo] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        // adjust based on logo position
        duration: 1000,
        toValue: -30,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(fadeOutAnim, {
        delay: 300,
        duration: 500,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setShowTextLogo(true);
        Animated.timing(fadeInAnim, {
          delay: 300,
          duration: 1000,
          toValue: 1,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            setShowTextLogo(false);
            onFinish();
          }, 1000);
        });
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedLogoContainer,
          {
            opacity: fadeOutAnim,
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          },
        ]}>
        <AppImage
          source={Images.PLAY_BUTTON_FULL_COLOR}
          style={styles.logoImage}
        />
      </Animated.View>

      {showTextLogo && (
        <View style={styles.textLogoContainer}>
          <Animated.View
            style={{
              opacity: fadeInAnim,
            }}>
            <AppImage
              source={Images.APP_LOGO_SPLASH_SCREEN_DARK}
              style={styles.textLogo}
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const splashScreenStyles = ({ colors }: Palette) =>
  StyleSheet.create({
    animatedLogoContainer: {
      position: 'absolute',
      zIndex: 2,
    },
    container: {
      alignItems: 'center',
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: 'center',
    },
    logoImage: {
      height: 150,
      resizeMode: 'contain',
      width: 150,
    },
    textLogo: {
      height: 60,
      resizeMode: 'contain',
      width: 200,
    },
    textLogoContainer: {
      zIndex: 1,
    },
  });

export default SplashScreenSolidBg;
