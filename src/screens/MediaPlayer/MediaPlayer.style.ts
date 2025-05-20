import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
import { Palette } from '@src/utils';

export const mediaPlayerStyles = ({ borderRadius, colors, spacing }: Palette) =>
  StyleSheet.create({
    closeButton: {
      left: 20,
      position: 'absolute',
      top: 40,
      zIndex: 10,
    },
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
      paddingTop: 40,
    },
    controls: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '60%',
    },
    image: {
      borderRadius: borderRadius.md,
      height: width * 0.75,
      marginBottom: 30,
      width: width * 0.75,
    },
    playButton: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 30,
      height: 60,
      justifyContent: 'center',
      marginHorizontal: 20,
      width: 60,
    },
    section: {
      marginBottom: 32,
    },
    subtitle: {
      color: colors.subtext,
      fontSize: 16,
    },
    title: {
      color: colors.text,
      fontSize: 22,
      fontWeight: 'bold',
    },
    trackInfo: {
      alignItems: 'center',
      marginBottom: 40,
    },
  });
