import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { useColor } from '@src/context/ThemeContext';

import BottomNavigation from '../components/BottomNavigation';
import Header from '../components/Header';
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

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const MainTabs = () => {
  const { color } = useColor();

  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigation {...props} />}
      screenOptions={{
        header: () => <Header />,
        tabBarStyle: {
          backgroundColor: color.colors.card,
          borderTopColor: color.colors.border,
        },
      }}>
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
      screenOptions={{
        drawerLabelStyle: {
          color: color.colors.text,
        },
        drawerStyle: {
          backgroundColor: color.colors.background,
        },
        header: () => <Header />,
      }}>
      <Drawer.Screen name="MainTabs" component={MainTabs} />
      {/* Add more drawer screens here */}
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
        options={{
          header: () => <Header showBackButton />,
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
