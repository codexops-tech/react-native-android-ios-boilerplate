import React, { useState } from 'react';

import { NavigationContainerRef } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import AnimatedSplashScreen from '@src/components/SplashScreen/AnimatedSplashScreen';
import {
  LoginScreen,
  NetworkLoggerScreen,
  NewsDetailScreen,
  NewsListScreen,
  SettingScreen,
} from '@src/screens';
import { isForceUpdate } from '@src/store';

import { NavStackParams, Screen } from './appNavigation.type';
import { ForUpdateStack } from './ForceupdateStack';

export const navigationRef =
  React.createRef<NavigationContainerRef<NavStackParams>>();

const Stack = createNativeStackNavigator<NavStackParams>();

const screenOptions: NativeStackNavigationOptions = {
  animation: 'slide_from_right',
  headerShown: false,
};

export const AppNavigation = () => {
  const isForceUpdateApp = useSelector(isForceUpdate);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate a loading process (e.g., fetching data)
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000); // 3 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return <AnimatedSplashScreen />;
  // }

  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <AnimatedSplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return (
    <>
      {isForceUpdateApp ? (
        <ForUpdateStack />
      ) : (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name={Screen.NEWS_LIST} component={NewsListScreen} />
          <Stack.Screen
            name={Screen.NEWS_DETAIL}
            component={NewsDetailScreen}
          />
          <Stack.Screen name={Screen.SETTING} component={SettingScreen} />
          <Stack.Screen name={Screen.LOGIN} component={LoginScreen} />
          {__DEV__ && (
            <Stack.Screen
              name={Screen.NETWORK_CHECK}
              component={NetworkLoggerScreen}
            />
          )}
        </Stack.Navigator>
      )}
    </>
  );
};
