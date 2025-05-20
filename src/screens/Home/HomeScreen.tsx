// screens/HomeScreen.tsx
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import PlaylistCard from '@src/components/Card/PlaylistCard';
import TopChartCard from '@src/components/Card/TopChartCard';
import MiniPlayer from '@src/components/MiniPlayer/MiniPlayer';
import CategoryTabs from '@src/components/Tabs/CategoryTabs';
import { useColor } from '@src/context';

const playlists = [
  { image: 'https://via.placeholder.com/150', title: 'Chill Vibes' },
  { image: 'https://via.placeholder.com/150', title: 'Top Hits' },
];

const charts = [
  {
    artist: 'Artist A',
    image: 'https://via.placeholder.com/50',
    title: 'Song One',
  },
  {
    artist: 'Artist B',
    image: 'https://via.placeholder.com/50',
    title: 'Song Two',
  },
];

const HomeScreen = () => {
  const { color } = useColor();

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

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* <Text style={[styles.header, { color: color.colors.text }]}>
          Welcome back 👋
        </Text> */}

        <View style={styles.section}>
          <CategoryTabs />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: color.colors.text }]}>
            Playlists
          </Text>
          <View style={styles.playlistRow}>
            {playlists.map((item, index) => (
              <PlaylistCard key={index} title={item.title} image={item.image} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: color.colors.text }]}>
            Top Charts
          </Text>
          <TopChartCard data={charts} />
        </View>
      </ScrollView>

      <View style={[styles.section, styles.miniPlayer]}>
        <MiniPlayer
          title="Vishesh"
          subtitle="Aaj Tak News"
          image="https://example.com/logo.png"
          isPlaying={true}
          onTogglePlay={() => console.log('Toggle Play')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  miniPlayer: {
    bottom: 50,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  playlistRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  scroll: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
});

export default React.memo(HomeScreen);
