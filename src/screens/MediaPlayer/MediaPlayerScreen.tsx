import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';

import FullPlayer from '@src/components/FullPlayer/FullPlayer';
import CategoryTabs from '@src/components/Tabs/CategoryTabs';
import { useColor } from '@src/context';
import { Palette } from '@src/utils';

import useMediaPlayer from './useMediaPlayer';

type Props = {
  title: string;
  subtitle: string;
  image: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
};

const MediaPlayerScreen = ({
  image,
  isPlaying,
  onClose,
  onTogglePlay,
  subtitle,
  title,
}: Props) => {
  const { color, styles } = useMediaPlayer();

  return (
    <View
      style={[styles.container, { backgroundColor: color.colors.background }]}>
      <StatusBar
        barStyle={
          color.colors.background === '#f8f9fa'
            ? 'dark-content'
            : 'light-content'
        }
      />
      <View style={styles.section}>
        <FullPlayer
          image={image}
          title="Song Title"
          subtitle="Another meta data info that can be displayed here"
          isPlaying={true}
          onTogglePlay={onTogglePlay}
          onFavorite={function (): void {
            console.log('Favorite');
          }}
          onShare={function (): void {
            console.log('Share');
          }}
          onVolumeChange={function (value: number): void {
            console.log('Volume changed to', value);
          }}
          volume={0}
        />
      </View>
    </View>
  );
};

export default React.memo(MediaPlayerScreen);
