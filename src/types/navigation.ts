import { NavigatorScreenParams } from '@react-navigation/native';

export type StationDetailsParams = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  logo?: string;
  website?: string;
  genre?: string;
  location?: string;
  language?: string;
  bitrate?: string;
  isLive?: boolean;
  currentTrack?: string;
};

export type RootStackParamList = {
  Splash: undefined;
  MainApp: NavigatorScreenParams<DrawerParamList>;
  StationDetails: StationDetailsParams;
};

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  NowPlaying: undefined;
  Favorites: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
