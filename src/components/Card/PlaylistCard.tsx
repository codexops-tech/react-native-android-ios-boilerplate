// components/Card/PlaylistCard.tsx
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useColor } from '@src/context';
import { Palette } from '@src/utils';

const PlaylistCard = ({ image, title }: { title: string; image: string }) => {
  const { color } = useColor();
  const styles = playListStyle(color);

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

const playListStyle = ({ borderRadius, colors, spacing }: Palette) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: borderRadius.md,
      marginBottom: spacing.md,
      overflow: 'hidden',
      width: '48%',
    },
    image: {
      height: 120,
      width: '100%',
    },
    title: {
      color: colors.text,
      fontSize: 14,
      padding: spacing.sm,
    },
  });

export default React.memo(PlaylistCard);
