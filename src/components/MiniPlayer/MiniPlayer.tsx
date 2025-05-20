import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColor } from '@src/context';
import { Palette } from '@src/utils';

type Props = {
  title: string;
  subtitle: string;
  image: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
};

const MiniPlayer = ({
  image,
  isPlaying,
  onTogglePlay,
  subtitle,
  title,
}: Props) => {
  const { color } = useColor();
  const styles = playerStyles(color);

  return (
    <View style={styles.container}>
      {/* Left: Station Info */}
      <View style={styles.stationInfo}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      {/* Center: Play Button */}
      <TouchableOpacity onPress={onTogglePlay} style={styles.playButton}>
        <Ionicons name={isPlaying ? 'pause' : 'play'} size={20} color="#fff" />
      </TouchableOpacity>

      {/* Right: Volume, Share, Favorite */}
      <View style={styles.controls}>
        <Ionicons
          name="volume-2"
          size={18}
          color={color.colors.text}
          style={styles.icon}
        />
        <Ionicons
          name="share"
          size={18}
          color={color.colors.text}
          style={styles.icon}
        />
        <Ionicons name="heart" size={18} color={color.colors.text} />
      </View>
    </View>
  );
};

export default MiniPlayer;

const playerStyles = ({ borderRadius, colors, spacing }: Palette) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    controls: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: {
      marginHorizontal: 5,
    },
    image: {
      borderRadius: borderRadius.sm,
      height: 40,
      width: 40,
    },
    playButton: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 20,
      height: 40,
      justifyContent: 'center',
      marginHorizontal: spacing.md,
      width: 40,
    },
    stationInfo: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
    },
    subtitle: {
      color: colors.subtext,
      fontSize: 12,
    },
    title: {
      color: colors.text,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
