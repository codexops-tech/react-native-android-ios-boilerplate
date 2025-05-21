import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColor } from '@src/context/ThemeContext';

import { StyledText, StyledView } from './styled/StyledComponents';
import { MainTabParamList } from '../types/navigation';

const BottomNavigation = ({ navigation, state }: BottomTabBarProps) => {
  const { color } = useColor();
  const currentRoute = state.routes[state.index];

  const isActive = (routeName: keyof MainTabParamList) => {
    return currentRoute?.name === routeName;
  };

  const navigate = (routeName: keyof MainTabParamList) => {
    navigation.navigate(routeName);
  };

  return (
    <StyledView
      style={[styles.container, { backgroundColor: color.colors.card }]}>
      <TouchableOpacity style={styles.tab} onPress={() => navigate('Home')}>
        <Ionicons
          name={isActive('Home') ? 'home' : 'home-outline'}
          size={24}
          color={isActive('Home') ? color.colors.primary : color.colors.text}
        />
        <StyledText
          style={[
            styles.label,
            {
              color: isActive('Home')
                ? color.colors.primary
                : color.colors.text,
            },
          ]}>
          Home
        </StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigate('Now Playing')}>
        <Ionicons
          name={isActive('Now Playing') ? 'play-circle' : 'play-circle-outline'}
          size={24}
          color={
            isActive('Now Playing') ? color.colors.primary : color.colors.text
          }
        />
        <StyledText
          style={[
            styles.label,
            {
              color: isActive('Now Playing')
                ? color.colors.primary
                : color.colors.text,
            },
          ]}>
          Now Playing
        </StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigate('Favorites')}>
        <Ionicons
          name={isActive('Favorites') ? 'heart' : 'heart-outline'}
          size={24}
          color={
            isActive('Favorites') ? color.colors.primary : color.colors.text
          }
        />
        <StyledText
          style={[
            styles.label,
            {
              color: isActive('Favorites')
                ? color.colors.primary
                : color.colors.text,
            },
          ]}>
          Favorites
        </StyledText>
      </TouchableOpacity>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 60,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default BottomNavigation;
