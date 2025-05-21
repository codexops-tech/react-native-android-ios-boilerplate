import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { NewsResult } from '@src/services';

export enum Screen {
  FORCE_UPDATE_SCREEN = 'FORCE_UPDATE_SCREEN',
  HOME = 'HOME',
  NOWPLAYING = 'NOW PLAYING',
  PLAYER = 'PLAYER',
  PLAYLIST = 'PLAYLIST',
  FAVORITES = 'FAVORITES',
  STATION_DETAILS = 'STATION_DETAILS',
  STATION_LIST = 'STATION_LIST',
  STATION_LIST_DETAIL = 'STATION_LIST_DETAIL',
  NETWORK_CHECK = 'NETWORK CHECK',
  NEWS_DETAIL = 'NEWS_DETAIL',
  NEWS_LIST = 'NEWS_LIST',
  SETTING = 'SETTING',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

export type NavStackParams = {
  [Screen.HOME]: undefined;
  [Screen.PLAYLIST]: undefined;
  [Screen.FORCE_UPDATE_SCREEN]: undefined;
  [Screen.NETWORK_CHECK]: undefined;
  [Screen.NEWS_DETAIL]: NewsDetailParams;
  [Screen.NEWS_LIST]: undefined;
  [Screen.SETTING]: undefined;
  [Screen.LOGIN]: undefined;
  [Screen.SIGNUP]: undefined;
};

export type NewsDetailParams = {
  item: NewsResult;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;

export type NewsDetailRoute = RouteProp<NavStackParams, Screen.NEWS_DETAIL>;
