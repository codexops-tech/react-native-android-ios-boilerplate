import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  StyledImage,
  StyledText,
  StyledView,
} from '@src/components/styled/StyledComponents';
import { useColor } from '@src/context/ThemeContext';

import { RootStackParamList } from '../types/navigation';

type StationDetailsRouteProp = RouteProp<RootStackParamList, 'StationDetails'>;

const FALLBACK_IMAGE =
  'https://via.placeholder.com/200x200.png?text=Radio+Station';

const StationDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<StationDetailsRouteProp>();
  const { color } = useColor();
  const station = route.params;

  const handleWebsitePress = () => {
    if (station.website) {
      Linking.openURL(station.website);
    }
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share station:', station.title);
  };

  return (
    <StyledView
      style={[styles.container, { backgroundColor: color.colors.background }]}>
      <ScrollView>
        {/* Header with Logo */}
        <View style={styles.header}>
          <StyledImage
            source={{ uri: station.logo || FALLBACK_IMAGE }}
            style={styles.logo}
            resizeMode="contain"
          />
          {station.isLive && (
            <View
              style={[
                styles.liveBadge,
                { backgroundColor: color.colors.primary },
              ]}>
              <StyledText style={styles.liveText}>LIVE</StyledText>
            </View>
          )}
        </View>

        {/* Station Info */}
        <View style={styles.infoContainer}>
          <StyledText style={[styles.title, { color: color.colors.text }]}>
            {station.title}
          </StyledText>
          {station.subtitle && (
            <StyledText
              style={[styles.subtitle, { color: color.colors.textSecondary }]}>
              {station.subtitle}
            </StyledText>
          )}

          {/* Current Track (if available) */}
          {station.currentTrack && (
            <View style={styles.currentTrack}>
              <StyledText
                style={[
                  styles.trackLabel,
                  { color: color.colors.textSecondary },
                ]}>
                Now Playing:
              </StyledText>
              <StyledText
                style={[styles.trackTitle, { color: color.colors.text }]}>
                {station.currentTrack}
              </StyledText>
            </View>
          )}

          {/* Description */}
          {station.description && (
            <View style={styles.section}>
              <StyledText
                style={[styles.sectionTitle, { color: color.colors.text }]}>
                About
              </StyledText>
              <StyledText
                style={[
                  styles.description,
                  { color: color.colors.textSecondary },
                ]}>
                {station.description}
              </StyledText>
            </View>
          )}

          {/* Station Details */}
          <View style={styles.section}>
            <StyledText
              style={[styles.sectionTitle, { color: color.colors.text }]}>
              Station Details
            </StyledText>
            <View style={styles.detailsGrid}>
              {station.genre && (
                <View style={styles.detailItem}>
                  <Ionicons
                    name="musical-notes"
                    size={20}
                    color={color.colors.primary}
                  />
                  <StyledText
                    style={[styles.detailText, { color: color.colors.text }]}>
                    {station.genre}
                  </StyledText>
                </View>
              )}
              {station.location && (
                <View style={styles.detailItem}>
                  <Ionicons
                    name="location"
                    size={20}
                    color={color.colors.primary}
                  />
                  <StyledText
                    style={[styles.detailText, { color: color.colors.text }]}>
                    {station.location}
                  </StyledText>
                </View>
              )}
              {station.language && (
                <View style={styles.detailItem}>
                  <Ionicons
                    name="language"
                    size={20}
                    color={color.colors.primary}
                  />
                  <StyledText
                    style={[styles.detailText, { color: color.colors.text }]}>
                    {station.language}
                  </StyledText>
                </View>
              )}
              {station.bitrate && (
                <View style={styles.detailItem}>
                  <Ionicons
                    name="radio"
                    size={20}
                    color={color.colors.primary}
                  />
                  <StyledText
                    style={[styles.detailText, { color: color.colors.text }]}>
                    {station.bitrate}
                  </StyledText>
                </View>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            {station.website && (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: color.colors.card },
                ]}
                onPress={handleWebsitePress}>
                <Ionicons name="globe" size={24} color={color.colors.primary} />
                <StyledText
                  style={[styles.actionText, { color: color.colors.text }]}>
                  Visit Website
                </StyledText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: color.colors.card },
              ]}
              onPress={handleShare}>
              <Ionicons
                name="share-social"
                size={24}
                color={color.colors.primary}
              />
              <StyledText
                style={[styles.actionText, { color: color.colors.text }]}>
                Share Station
              </StyledText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  container: {
    flex: 1,
  },
  currentTrack: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    marginBottom: 24,
    padding: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  detailItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    minWidth: '45%',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailText: {
    fontSize: 14,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  infoContainer: {
    padding: 20,
  },
  liveBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logo: {
    borderRadius: 12,
    height: 200,
    width: 200,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  trackLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default StationDetailsScreen;
