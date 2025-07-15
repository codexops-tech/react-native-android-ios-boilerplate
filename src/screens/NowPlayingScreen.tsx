import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import type { FlexAlignType, FlexStyle, ViewStyle } from 'react-native';

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
import { Palette } from '@src/utils/color';

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

const getDynamicStyles = (color: any) => ({
  messageCard: {
    backgroundColor: color.colors.card,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 24,
    alignItems: 'center' as FlexAlignType,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  } as ViewStyle,
  playButton: {
    alignItems: 'center' as FlexAlignType,
    justifyContent: 'center' as FlexAlignType,
    borderRadius: 40,
    height: 80,
    width: 80,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: color.colors.accent,
    marginHorizontal: 24,
  } as ViewStyle,
  iconButton: {
    alignItems: 'center' as FlexAlignType,
    justifyContent: 'center' as FlexAlignType,
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
  } as ViewStyle,
  controlsRow: {
    flexDirection: 'row' as FlexStyle['flexDirection'],
    alignItems: 'center' as FlexAlignType,
    justifyContent: 'center' as FlexAlignType,
    marginBottom: 32,
  } as ViewStyle,
  actionsRow: {
    flexDirection: 'row' as FlexStyle['flexDirection'],
    justifyContent: 'center' as FlexAlignType,
    marginBottom: 16,
  } as ViewStyle,
});

const NowPlayingScreen = () => {
  const navigation = useNavigation<NowPlayingScreenNavigationProp>();
  const { color } = useColor();
  const dynamicStyles = getDynamicStyles(color);
  const styles = nowPlayingStyles(color);
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
            <StyledText style={[styles.favoriteCount, { color: color.colors.textSecondary }]}>
              66.7K favorites
            </StyledText>
            <StyledText
              style={[styles.artist, { color: color.colors.textSecondary }]}>
              {streamData.artist}
            </StyledText>
          </StyledView>
        </TouchableOpacity>

        {/* Message Card */}
        <StyledView style={dynamicStyles.messageCard}>
          <StyledText style={[styles.messageText, { color: color.colors.textSecondary }]}>
            This program will be available tomorrow at 5PM.
          </StyledText>
        </StyledView>

        {/* Playback Controls Row: Favorite | Play | More */}
        <StyledView style={dynamicStyles.controlsRow}>
          {/* Favorite */}
          <TouchableOpacity
            style={[dynamicStyles.iconButton, { marginRight: 12 }]}
            onPress={toggleFavorite}>
            <Ionicons
              name={streamData.isFavorite ? 'heart' : 'heart-outline'}
              size={28}
              color={streamData.isFavorite ? color.colors.accent : color.colors.textSecondary}
            />
          </TouchableOpacity>
          {/* Play */}
          <TouchableOpacity
            style={dynamicStyles.playButton}
            onPress={togglePlay}>
            <Ionicons
              name={streamData.isPlaying ? 'pause' : 'play'}
              size={40}
              color={'#fff'}
            />
          </TouchableOpacity>
          {/* More */}
          <TouchableOpacity
            style={[dynamicStyles.iconButton, { marginLeft: 12 }]}
            onPress={() => { }}>
            <Ionicons name="ellipsis-horizontal" size={28} color={color.colors.textSecondary} />
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

        {/* Actions (Star, Share) */}
        <StyledView style={dynamicStyles.actionsRow}>
          <TouchableOpacity
            style={[dynamicStyles.iconButton, { marginRight: 12 }]}
            onPress={() => handleRating(5)}>
            <Ionicons name="star" size={24} color={color.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[dynamicStyles.iconButton, { marginLeft: 12 }]}
            onPress={() => { /* Share station */ }}>
            <Ionicons name="share-outline" size={24} color={color.colors.primary} />
          </TouchableOpacity>
        </StyledView>

        {/* Ad Banner Placeholder */}
        <StyledView style={styles.adBanner}>
          <StyledText style={[styles.adText, { color: color.colors.textSecondary }]}>
            [Ad Banner Placeholder]
          </StyledText>
        </StyledView>

        {/* Mini Player (visible on all pages) */}
        {streamData.isPlaying && (
          <StyledView style={styles.miniPlayer}>
            <StyledImage source={{ uri: streamData.logo }} style={styles.miniLogo} />
            <StyledView style={styles.miniInfo}>
              <StyledText style={[styles.miniTitle, { color: color.colors.text }]}>
                {streamData.title}
              </StyledText>
              <StyledText style={[styles.miniArtist, { color: color.colors.textSecondary }]}>
                {streamData.artist}
              </StyledText>
            </StyledView>
            <TouchableOpacity onPress={togglePlay} style={styles.miniPlayButton}>
              <Ionicons name="pause" size={20} color={color.colors.accent} />
            </TouchableOpacity>
          </StyledView>
        )}

      </StyledView>
    </ScrollView>
  );
};

const nowPlayingStyles = (color: any) => StyleSheet.create({
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
    fontWeight: '600',
    marginBottom: 8,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  controlButton: {
    alignItems: 'center',
    borderRadius: 40,
    height: 80,
    justifyContent: 'center',
    width: 80,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
  favoriteCount: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: '500',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    alignSelf: 'center',
    borderRadius: 8,
    height: 200,
    marginBottom: 24,
    width: 200,
  },
  messageText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metadataText: {
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  adBanner: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    marginTop: 24,
    width: '100%',
  },
  adText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  miniPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: color.colors.card,
  },
  miniLogo: { height: 40, width: 40, borderRadius: 4 },
  miniInfo: { flex: 1, marginLeft: 12, marginRight: 8 },
  miniTitle: { fontSize: 14, fontWeight: 'bold' },
  miniArtist: { fontSize: 12, color: color.colors.textSecondary },
  miniPlayButton: { padding: 8 },
})

export default NowPlayingScreen;
