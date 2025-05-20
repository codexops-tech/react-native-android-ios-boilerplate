// components/Card/TopChartCard.tsx
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { useColor } from '@src/context';
import { Palette } from '@src/utils';

const TopChartCard = ({ data }: { data: any[] }) => {
  const { color } = useColor();
  const styles = topChartStyles(color);
  return (
    <FlatList
      data={data}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const topChartStyles = ({ borderRadius, colors, spacing }: Palette) =>
  StyleSheet.create({
    artist: {
      color: colors.subtext,
      fontSize: 14,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: borderRadius.sm,
      marginBottom: spacing.sm,
      padding: spacing.md,
    },
    image: {
      borderRadius: borderRadius.sm,
      height: 50,
      marginRight: spacing.md,
      width: 50,
    },
    info: {
      flex: 1,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default React.memo(TopChartCard);
