import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useColor } from '@src/context/ThemeContext';

import {
  StyledImage,
  StyledText,
  StyledView,
} from '../components/styled/StyledComponents';
import { RootStackParamList } from '../types/navigation';
import { stationImages } from '../utils/stationImages';

type NowPlayingScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface StreamMetadata {
  id: string;
  title: string;
  artist: string;
  logo: string;
  isPlaying: boolean;
  isFavorite: boolean;
  description: string;
  genre: string;
  listeners: number;
  website?: string;
  location?: string;
  language?: string;
  bitrate?: string;
  currentTrack?: string;
}

const NowPlayingScreen = () => {
  const navigation = useNavigation<NowPlayingScreenNavigationProp>();
  const { color } = useColor();
  const [streamData, setStreamData] = useState<StreamMetadata>({
    artist: 'Various Artists',
    bitrate: '128kbps',
    currentTrack: 'Sweet Home Alabama - Lynyrd Skynyrd',
    description:
      'The best classic rock hits from the 60s, 70s, and 80s. Tune in for non-stop rock and roll!',
    genre: 'Classic Rock',
    id: '1',
    isFavorite: true,
    isPlaying: true,
    language: 'English',
    listeners: 1234,
    location: 'New York, USA',
    logo: stationImages.classicRock,
    title: 'Classic Rock Radio',
    website: 'https://classicrockradio.com',
  });

  const handleStationPress = () => {
    navigation.navigate('StationDetails', {
      bitrate: streamData.bitrate,
      currentTrack: streamData.currentTrack,
      description: streamData.description,
      genre: streamData.genre,
      id: streamData.id,
      isLive: true,
      language: streamData.language,
      location: streamData.location,
      logo: streamData.logo,
      subtitle: streamData.artist,
      title: streamData.title,
      website: streamData.website,
    });
  };

  const togglePlay = () => {
    setStreamData(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const toggleFavorite = () => {
    setStreamData(prev => ({
      ...prev,
      isFavorite: !prev.isFavorite,
    }));
  };

  const handleRating = (rating: number) => {
    // Handle rating logic
    console.log('Rating:', rating);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: color.colors.background }]}>
      <StyledView style={styles.content}>
        {/* Station Logo */}
        <TouchableOpacity onPress={handleStationPress}>
          <StyledImage source={{ uri: streamData.logo }} style={styles.logo} />
        </TouchableOpacity>

        {/* Now Playing Info */}
        <TouchableOpacity onPress={handleStationPress}>
          <StyledView style={styles.infoContainer}>
            <StyledText style={[styles.title, { color: color.colors.text }]}>
              {streamData.title}
            </StyledText>
            <StyledText
              style={[styles.artist, { color: color.colors.textSecondary }]}>
              {streamData.artist}
            </StyledText>
          </StyledView>
        </TouchableOpacity>

        {/* Playback Controls */}
        <StyledView style={styles.controls}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              { backgroundColor: color.colors.card },
            ]}
            onPress={togglePlay}>
            <Ionicons
              name={streamData.isPlaying ? 'pause' : 'play'}
              size={32}
              color={color.colors.primary}
            />
          </TouchableOpacity>
        </StyledView>

        {/* Additional Info */}
        <StyledView style={styles.detailsContainer}>
          <StyledText
            style={[styles.description, { color: color.colors.text }]}>
            {streamData.description}
          </StyledText>
          <StyledView style={styles.metadata}>
            <StyledText
              style={[
                styles.metadataText,
                { color: color.colors.textSecondary },
              ]}>
              Genre: {streamData.genre}
            </StyledText>
            <StyledText
              style={[
                styles.metadataText,
                { color: color.colors.textSecondary },
              ]}>
              Listeners: {streamData.listeners.toLocaleString()}
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Actions */}
        <StyledView style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: color.colors.card },
            ]}
            onPress={toggleFavorite}>
            <Ionicons
              name={streamData.isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={color.colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: color.colors.card },
            ]}
            onPress={() => handleRating(5)}>
            <Ionicons name="star" size={24} color={color.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: color.colors.card },
            ]}
            onPress={() => {
              /* Share station */
            }}>
            <Ionicons
              name="share-outline"
              size={24}
              color={color.colors.primary}
            />
          </TouchableOpacity>
        </StyledView>
      </StyledView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  artist: {
    fontSize: 18,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  controlButton: {
    alignItems: 'center',
    borderRadius: 32,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 32,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    alignSelf: 'center',
    borderRadius: 8,
    height: 200,
    marginBottom: 24,
    width: 200,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metadataText: {
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default NowPlayingScreen;
