import React, { useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainerRef } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import { Images } from '@src/assets';
import { AppImage } from '@src/components';
import SplashScreenSolidBg from '@src/components/SplashScreen/SplashScreenSolidBg';
import { useColor } from '@src/context';
import { NetworkLoggerScreen, SettingScreen } from '@src/screens';
import HomeScreen from '@src/screens/Home/HomeScreen';
import MediaPlayerScreen from '@src/screens/MediaPlayer/MediaPlayerScreen';
import { isForceUpdate } from '@src/store';

import { NavStackParams, Screen } from './appNavigation.type';
import { ForUpdateStack } from './ForceupdateStack';

export const navigationRef =
  React.createRef<NavigationContainerRef<NavStackParams>>();

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <AppImage
      style={{ height: 75, width: 120 }}
      source={Images.APP_LOGO_SPLASH_SCREEN_LIGHT}
    />
  );
}

export const AppNavigation = () => {
  const { color } = useColor();
  const isForceUpdateApp = useSelector(isForceUpdate);
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashScreenSolidBg onFinish={() => setSplashDone(true)} />;
  }

  return (
    <>
      {isForceUpdateApp ? (
        <ForUpdateStack />
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerBackButtonDisplayMode: 'generic',
            headerShown: true,
            headerStyle: {
              backgroundColor: color.colors.background,
              borderBottomWidth: 0,
              elevation: 0,
              shadowColor: 'transparent',
            },
            headerTitle: () => <LogoTitle />,
            tabBarActiveTintColor: color.colors.primary,
            tabBarIcon: ({ focused }) => {
              console.log('route', route);
              console.log('focused', focused);

              let iconName;

              if (route.name === Screen.HOME) {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === Screen.PLAYER) {
                iconName = focused ? 'play' : 'play-outline';
              } else if (route.name === Screen.PLAYLIST) {
                iconName = focused ? 'library' : 'library-outline';
              } else if (route.name === Screen.NETWORK_CHECK) {
                iconName = focused ? 'wifi' : 'wifi-outline';
              } else if (route.name === Screen.SETTING) {
                iconName = focused ? 'settings' : 'settings-outline';
              } else {
                iconName = 'home'; // optional fallback
              }

              console.log('iconName', iconName);
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
            },
            tabBarTintColor: color.colors.text,
            // tabBarStyle: { backgroundColor: '#111' },
            // tabBarLabelStyle: { color: '#fff' },
          })}>
          <Tab.Screen name={Screen.HOME} component={HomeScreen} />
          <Tab.Screen name={Screen.PLAYER} component={MediaPlayerScreen} />
          <Tab.Screen name={Screen.PLAYLIST} component={SettingScreen} />
          {/* {__DEV__ && (
            <Tab.Screen
              name={Screen.NETWORK_CHECK}
              component={NetworkLoggerScreen}
            />
          )} */}
        </Tab.Navigator>
      )}
    </>
  );
};
