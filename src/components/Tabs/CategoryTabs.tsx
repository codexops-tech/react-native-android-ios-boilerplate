import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useColor } from '@src/context';
import { Palette } from '@src/utils';

const tabs = ['All', 'Music', 'Radio Mirchi', 'Podcasts'];

const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState('All');
  const { color } = useColor();
  const styles = tabStyles(color);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {tabs.map(tab => {
        const isActive = tab === activeTab;
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              isActive ? styles.activeTab : styles.inactiveTab,
            ]}>
            <Text
              style={[
                styles.tabText,
                isActive ? styles.activeText : styles.inactiveText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const tabStyles = ({ colors, spacing }: Palette) =>
  StyleSheet.create({
    activeTab: {
      backgroundColor: '#fff',
      borderColor: '#fff',
    },
    activeText: {
      color: '#000',
    },
    container: {
      flexDirection: 'row',
      gap: spacing.sm,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
    },
    inactiveTab: {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    inactiveText: {
      color: colors.text,
    },
    tab: {
      borderRadius: 999,
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 8,
    },
    tabText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  });

export default CategoryTabs;
