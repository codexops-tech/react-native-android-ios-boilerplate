import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Images } from '@src/assets';
import { useColor } from '@src/context/ThemeContext';

import { DrawerParamList, RootStackParamList } from '../types/navigation';
import { StyledImage, StyledText, StyledView } from './styled/StyledComponents';

type HeaderNavigationProp = DrawerNavigationProp<DrawerParamList> &
  StackNavigationProp<RootStackParamList>;

interface HeaderProps {
  showBackButton?: boolean;
}

const Header = ({ showBackButton }: HeaderProps) => {
  const navigation = useNavigation<HeaderNavigationProp>();
  const { color } = useColor();

  return (
    <StyledView style={[styles.header, { backgroundColor: color.colors.card }]}>
      <View style={styles.leftContainer}>
        {showBackButton ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={color.colors.text} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color={color.colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.logoContainer}>
        <StyledImage
          source={Images.APP_LOGO_SPLASH_SCREEN_DARK}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.rightContainer} />
    </StyledView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftContainer: {
    width: 40,
  },
  logo: {
    height: 40,
    width: 150,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    padding: 8,
  },
  rightContainer: {
    width: 40,
  },
});

export default Header;
