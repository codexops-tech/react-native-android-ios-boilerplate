import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColor } from '@src/context/ThemeContext';
import CustomDrawer from '../components/CustomDrawer';
import Header, { HeaderNavigationProp } from '../components/Header';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import SplashScreen from '../screens/SplashScreen';
import StationDetailsScreen from '../screens/StationDetailsScreen';
import {
  DrawerParamList,
  MainTabParamList,
  RootStackParamList,
} from '../types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const MainTabs = () => {
  const { color } = useColor();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerBackButtonDisplayMode: 'generic',
        headerShown: true,
        header: () => <Header />,
        tabBarActiveTintColor: color.colors.primary,
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'NowPlaying') {
            iconName = focused ? 'play' : 'play-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else {
            iconName = 'home';
          }

          return (
            <Ionicons
              name={iconName}
              size={focused ? 26 : 24}
              color={color.colors.subtext}
              style={{
                fontWeight: focused ? 'bold' : 'normal',
              }}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: color.colors.background,
          borderTopWidth: 0,
          bottom: 0,
          left: 0,
          position: 'absolute',
          right: 0,
          height: Platform.OS === 'ios' ? 49 + (insets.bottom || 0) : 56,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
        },
        tabBarTintColor: color.colors.text,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="NowPlaying" component={NowPlayingScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

const MainDrawer = () => {
  const { color } = useColor();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: color.colors.background,
          width: '80%',
        },
        headerShown: false,
        drawerType: 'front',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <Drawer.Screen name="MainTabs" component={MainTabs} />
    </Drawer.Navigator>
  );
};

const AppNavigator = () => {
  const { color } = useColor();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: color.colors.background },
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainApp" component={MainDrawer} />
      <Stack.Screen
        name="StationDetails"
        component={StationDetailsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          header: () => (
            <Header
              showBackButton
              navigation={navigation as HeaderNavigationProp}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
