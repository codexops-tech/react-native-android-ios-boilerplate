import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useColor } from '@src/context/ThemeContext';

import {
  StyledCard,
  StyledImage,
  StyledText,
  StyledView,
} from '../components/styled/StyledComponents';
import {
  CATEGORY_IMAGES,
  FALLBACK_IMAGES,
  STATION_IMAGES,
} from '../constants/images';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface Category {
  id: string;
  title: string;
  image: any;
}

interface Station {
  id: string;
  title: string;
  subtitle: string;
  image: any;
  isLive: boolean;
  description?: string;
  website?: string;
  genre?: string;
  location?: string;
  language?: string;
  bitrate?: string;
  currentTrack?: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { color } = useColor();

  const handleStationPress = (station: Station) => {
    navigation.navigate('StationDetails', {
      bitrate: station.bitrate,
      currentTrack: station.currentTrack,
      description: station.description,
      genre: station.genre,
      id: station.id,
      isLive: station.isLive,
      language: station.language,
      location: station.location,
      logo: station.image.uri,
      subtitle: station.subtitle,
      title: station.title,
      website: station.website,
    });
  };

  const categories: Category[] = [
    {
      id: '1',
      image: { uri: CATEGORY_IMAGES.localRadio },
      title: 'Local Radio',
    },
    {
      id: '2',
      image: { uri: CATEGORY_IMAGES.music },
      title: 'Music',
    },
    {
      id: '3',
      image: { uri: CATEGORY_IMAGES.news },
      title: 'News',
    },
    // Add more categories
  ];

  const featuredStations: Station[] = [
    {
      id: '1',
      image: { uri: STATION_IMAGES.thundercast },
      isLive: true,
      subtitle: 'Your favorite hits',
      title: 'ThunderCast Radio',
    },
    // Add more stations
  ];

  const recentlyPlayed: Station[] = [
    {
      id: '1',
      image: { uri: STATION_IMAGES.classicHits },
      isLive: false,
      subtitle: 'The best of the 80s',
      title: 'Classic Hits',
    },
    // Add more stations
  ];

  return (
    <StyledView
      style={[styles.container, { backgroundColor: color.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Section */}
        <View style={styles.section}>
          <StyledText variant="h2" style={styles.sectionTitle}>
            Featured
          </StyledText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}>
            {featuredStations.map(station => (
              <TouchableOpacity
                key={station.id}
                onPress={() => handleStationPress(station)}>
                <StyledCard style={styles.stationCard}>
                  <StyledImage
                    source={station.image}
                    style={styles.stationImage}
                    resizeMode="cover"
                  />
                  <View style={styles.stationInfo}>
                    <StyledText variant="h3" numberOfLines={1}>
                      {station.title}
                    </StyledText>
                    <StyledText variant="caption" style={styles.subtitle}>
                      {station.subtitle}
                    </StyledText>
                    {station.isLive && (
                      <View style={styles.liveBadge}>
                        <StyledText
                          variant="caption"
                          style={[
                            styles.liveText,
                            { color: color.colors.primary },
                          ]}>
                          LIVE
                        </StyledText>
                      </View>
                    )}
                  </View>
                </StyledCard>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <StyledText variant="h2" style={styles.sectionTitle}>
            Categories
          </StyledText>
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <StyledCard key={category.id} style={styles.categoryCard}>
                <StyledImage
                  source={category.image}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
                <StyledText variant="h3" style={styles.categoryTitle}>
                  {category.title}
                </StyledText>
              </StyledCard>
            ))}
          </View>
        </View>

        {/* Recently Played Section */}
        <View style={styles.section}>
          <StyledText variant="h2" style={styles.sectionTitle}>
            Recently Played
          </StyledText>
          {recentlyPlayed.map(station => (
            <TouchableOpacity
              key={station.id}
              onPress={() => handleStationPress(station)}>
              <StyledCard style={styles.recentStationCard}>
                <StyledImage
                  source={station.image}
                  style={styles.recentStationImage}
                  resizeMode="cover"
                />
                <View style={styles.stationInfo}>
                  <StyledText variant="h3" numberOfLines={1}>
                    {station.title}
                  </StyledText>
                  <StyledText variant="caption" style={styles.subtitle}>
                    {station.subtitle}
                  </StyledText>
                </View>
              </StyledCard>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 16,
  },
  categoryCard: {
    aspectRatio: 1,
    overflow: 'hidden',
    width: '47%',
  },
  categoryImage: {
    borderRadius: 8,
    height: '70%',
    width: '100%',
  },
  categoryTitle: {
    marginTop: 8,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  horizontalScroll: {
    paddingHorizontal: 16,
  },
  liveBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  liveText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  recentStationCard: {
    flexDirection: 'row',
    marginBottom: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  recentStationImage: {
    borderRadius: 8,
    height: 80,
    width: 80,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    marginHorizontal: 16,
  },
  stationCard: {
    marginRight: 16,
    overflow: 'hidden',
    width: 200,
  },
  stationImage: {
    borderRadius: 8,
    height: 120,
    width: '100%',
  },
  stationInfo: {
    marginTop: 8,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
});

export default HomeScreen;
