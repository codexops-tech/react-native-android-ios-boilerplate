import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Images } from '@src/assets';
import { useColor } from '@src/context';
import { Palette } from '@src/utils';

import { AppImage } from '../AppImage/AppImage';
import MarqueeText from '../MarqueeText/MarqueeText';

type Props = {
  title: string;
  subtitle: string;
  image: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onFavorite: () => void;
  onShare: () => void;
  onVolumeChange: (value: number) => void;
  volume: number;
};

const { width } = Dimensions.get('window');

const FullPlayer = ({
  isPlaying,
  onFavorite,
  onShare,
  onTogglePlay,
  onVolumeChange,
  subtitle,
  title,
  volume,
}: Props) => {
  const { color } = useColor();
  const styles = fullPlayerStyles(color);

  return (
    <View style={styles.container}>
      {/* Album Art */}
      <AppImage
        source={Images.APP_LOGO_SPLASH_SCREEN_DARK}
        style={styles.image}
      />
      <View style={styles.trackInfo}>
        <MarqueeText
          text={title}
          textStyle={styles.title}
          containerStyle={{ width: width * 0.8 }}
        />
        <MarqueeText
          text={subtitle}
          textStyle={styles.subtitle}
          containerStyle={{ marginTop: 4, width: width * 0.8 }}
        />
      </View>
      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={onFavorite}>
          <Ionicons name="home-outline" size={24} color={color.colors.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onTogglePlay} style={styles.playButton}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={32}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onShare}>
          <Ionicons name="share-outline" size={24} color={color.colors.text} />
        </TouchableOpacity>
      </View>
      {/* 
            Volume Slider
            <View style={styles.volume}>
                <Ionicons name="volume-2" size={18} color={color.colors.text} />
                <Slider
                    style={{ flex: 1, marginHorizontal: 10 }}
                    minimumValue={0}
                    maximumValue={1}
                    value={volume}
                    onValueChange={onVolumeChange}
                    minimumTrackTintColor={color.colors.primary}
                    maximumTrackTintColor={color.colors.border}
                    thumbTintColor={color.colors.primary}
                />
            </View> */}
    </View>
  );
};

export default FullPlayer;

const fullPlayerStyles = ({ borderRadius, colors, spacing }: Palette) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: 'space-evenly',
      padding: spacing.lg,
    },
    controls: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginVertical: spacing.lg,
      width: '80%',
    },
    image: {
      borderRadius: borderRadius.md,
      height: width * 0.8,
      marginVertical: spacing.lg,
      width: width * 0.8,
    },
    playButton: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 35,
      elevation: 8,
      height: 70,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { height: 4, width: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      width: 70,
    },
    subtitle: {
      color: colors.subtext,
      fontSize: 14,
    },
    title: {
      color: colors.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    trackInfo: {
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    volume: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: spacing.lg,
      width: '90%',
    },
  });
