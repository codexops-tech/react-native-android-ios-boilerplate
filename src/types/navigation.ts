import { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  NowPlaying: undefined;
  Favorites: undefined;
};

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

export type RootStackParamList = {
  Splash: undefined;
  MainApp: NavigatorScreenParams<DrawerParamList>;
  StationDetails: {
    id: string;
    title: string;
    subtitle: string;
    logo: string;
    isLive: boolean;
    description?: string;
    website?: string;
    genre?: string;
    location?: string;
    language?: string;
    bitrate?: string;
    currentTrack?: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}
