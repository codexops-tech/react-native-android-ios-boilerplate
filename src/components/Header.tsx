import React, { useEffect, useState } from 'react';
import { Animated, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { DrawerNavigationProp, useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation, CommonActions, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Images } from '@src/assets';
import { useColor } from '@src/context/ThemeContext';
import { DrawerParamList, RootStackParamList } from '../types/navigation';
import { StyledImage, StyledText, StyledView } from './styled/StyledComponents';

export type HeaderNavigationProp = DrawerNavigationProp<DrawerParamList> &
  StackNavigationProp<RootStackParamList>;

interface HeaderProps {
  showBackButton?: boolean;
  navigation?: HeaderNavigationProp;
}

const Header = ({ showBackButton, navigation: propNavigation }: HeaderProps) => {
  const defaultNavigation = useNavigation();
  const navigation = propNavigation || defaultNavigation;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { color } = useColor();
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  // Try to get drawer status, but don't throw if not available
  let drawerStatus: 'open' | 'closed' | undefined;
  try {
    drawerStatus = useDrawerStatus();
  } catch (error) {
    // Drawer not available, use local state
  }

  // Update local state when drawer status changes
  useEffect(() => {
    if (drawerStatus) {
      setIsDrawerOpen(drawerStatus === 'open');
    }
  }, [drawerStatus]);

  // Listen for drawer state changes
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('state', () => {
        // Check if we're in a drawer navigator
        if ('getState' in navigation) {
          const state = (navigation as any).getState();
          if (state?.drawerStatus) {
            setIsDrawerOpen(state.drawerStatus === 'open');
          }
        }
      });

      return unsubscribe;
    }, [navigation])
  );

  useEffect(() => {
    Animated.parallel([
      Animated.spring(rotateAnim, {
        toValue: isDrawerOpen ? 1 : 0,
        useNativeDriver: true,
        tension: 20,
        friction: 7,
      }),
      Animated.spring(scaleAnim, {
        toValue: isDrawerOpen ? 1.1 : 1,
        useNativeDriver: true,
        tension: 20,
        friction: 7,
      }),
    ]).start();
  }, [isDrawerOpen]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleDrawerToggle = () => {
    if (!navigation) return;

    try {
      // Try to use drawer navigation if available
      if ('toggleDrawer' in navigation) {
        (navigation as any).toggleDrawer();
        // Don't update local state here, let the effect handle it
      } else {
        // Fallback to regular navigation if drawer is not available
        navigation.dispatch(CommonActions.navigate('MainApp'));
      }
    } catch (error) {
      // If any error occurs, navigate to main app
      navigation.dispatch(CommonActions.navigate('MainApp'));
    }
  };

  const handleBackPress = () => {
    if (!navigation) return;
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: color.colors.card }}>
      <StyledView style={[styles.header, { backgroundColor: color.colors.card }]}>
        <View style={styles.logoContainer}>
          <StyledImage
            source={Images.APP_LOGO_SPLASH_SCREEN_DARK}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.rightContainer}>
          {showBackButton ? (
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: color.colors.background }]}
              onPress={handleBackPress}>
              <Ionicons name="arrow-back" size={24} color={color.colors.text} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: color.colors.background }]}
              onPress={handleDrawerToggle}>
              <Animated.View
                style={{
                  transform: [
                    { rotate },
                    { scale: scaleAnim }
                  ],
                }}>
                <Ionicons
                  name={isDrawerOpen ? "close" : "menu"}
                  size={24}
                  color={color.colors.text}
                />
              </Animated.View>
            </TouchableOpacity>
          )}
        </View>
      </StyledView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 44 : 56,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logo: {
    height: 40,
    width: 150,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
});

export default Header;
