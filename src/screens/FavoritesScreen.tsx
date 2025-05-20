import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColor } from '@src/context/ThemeContext';

import {
  StyledButton,
  StyledCard,
  StyledImage,
  StyledText,
  StyledView,
} from '../components/styled/StyledComponents';
import { FALLBACK_IMAGES, STATION_IMAGES } from '../constants/images';
import { RootStackParamList } from '../types/navigation';
import { stationImages } from '../utils/stationImages';

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface FavoriteStation {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  isLive: boolean;
  lastPlayed?: string;
  description?: string;
  website?: string;
  genre?: string;
  location?: string;
  language?: string;
  bitrate?: string;
  currentTrack?: string;
}

const FavoritesScreen = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const { color } = useColor();

  const handleStationPress = (station: FavoriteStation) => {
    navigation.navigate('StationDetails', {
      bitrate: station.bitrate,
      currentTrack: station.currentTrack,
      description: station.description,
      genre: station.genre,
      id: station.id,
      isLive: station.isLive,
      language: station.language,
      location: station.location,
      logo: station.image,
      subtitle: station.subtitle,
      title: station.title,
      website: station.website,
    });
  };

  const favoriteStations: FavoriteStation[] = [
    {
      bitrate: '128kbps',
      currentTrack: 'Sweet Home Alabama - Lynyrd Skynyrd',
      description: 'The best classic rock hits from the 60s, 70s, and 80s.',
      genre: 'Classic Rock',
      id: '1',
      image: stationImages.classicRock,
      isLive: true,
      language: 'English',
      lastPlayed: '2 hours ago',
      location: 'New York, USA',
      subtitle: 'The best classic rock hits',
      title: 'Classic Rock Radio',
      website: 'https://classicrockradio.com',
    },
    {
      bitrate: '192kbps',
      currentTrack: 'Take Five - Dave Brubeck',
      description: 'Relaxing smooth jazz and blues music.',
      genre: 'Jazz',
      id: '2',
      image: stationImages.jazz,
      isLive: true,
      language: 'English',
      lastPlayed: 'Yesterday',
      location: 'Chicago, USA',
      subtitle: 'Smooth jazz and blues',
      title: 'Jazz Cafe',
      website: 'https://jazzcafe.com',
    },
    // Add more stations
  ];

  const renderStation = ({ item }: { item: FavoriteStation }) => (
    <TouchableOpacity
      style={[styles.favoriteCard, { backgroundColor: color.colors.card }]}
      onPress={() => handleStationPress(item)}>
      <StyledImage source={{ uri: item.image }} style={styles.stationImage} />
      <StyledView style={styles.stationInfo}>
        <StyledText style={[styles.stationTitle, { color: color.colors.text }]}>
          {item.title}
        </StyledText>
        <StyledText
          style={[
            styles.stationSubtitle,
            { color: color.colors.textSecondary },
          ]}>
          {item.subtitle}
        </StyledText>
        {item.isLive && (
          <StyledView
            style={[
              styles.liveBadge,
              { backgroundColor: color.colors.primary },
            ]}>
            <StyledText style={styles.liveText}>LIVE</StyledText>
          </StyledView>
        )}
      </StyledView>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => {
          // Remove from favorites
        }}>
        <Ionicons name="heart" size={24} color={color.colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <StyledView
      style={[styles.container, { backgroundColor: color.colors.background }]}>
      {favoriteStations.length > 0 ? (
        <FlatList
          data={favoriteStations}
          renderItem={renderStation}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons
            name="heart-outline"
            size={64}
            color={color.colors.textSecondary}
          />
          <StyledText
            variant="h2"
            style={[
              styles.emptyStateTitle,
              { color: color.colors.textSecondary },
            ]}>
            No Favorites Yet
          </StyledText>
          <StyledText
            variant="body"
            style={[
              styles.emptyStateText,
              { color: color.colors.textSecondary },
            ]}>
            Add your favorite stations to listen to them later
          </StyledText>
          <StyledButton
            variant="primary"
            size="large"
            style={styles.browseButton}
            onPress={() => {
              // Navigate to Home screen
            }}>
            Browse Stations
          </StyledButton>
        </View>
      )}
    </StyledView>
  );
};

const styles = StyleSheet.create({
  browseButton: {
    minWidth: 200,
  },
  container: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateText: {
    marginBottom: 24,
    opacity: 0.7,
    textAlign: 'center',
  },
  emptyStateTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  favoriteCard: {
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listContent: {
    padding: 16,
  },
  liveBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: 'absolute',
    right: 12,
    top: 12,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  removeButton: {
    justifyContent: 'center',
    padding: 16,
  },
  stationImage: {
    height: 100,
    width: 100,
  },
  stationInfo: {
    flex: 1,
    justifyContent: 'center',
    padding: 12,
  },
  stationSubtitle: {
    fontSize: 14,
  },
  stationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default FavoritesScreen;
