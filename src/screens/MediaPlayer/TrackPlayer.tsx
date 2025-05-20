import React from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import Slider from '@react-native-community/slider';
import { Pressable } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

import { AppImage } from '@src/components';

import useMediaPlayer from './useMediaPlayer';

const MAX_PROGRESS = 30;

const TrackPlayer = () => {
  const { color, styles } = useMediaPlayer();

  return (
    <SafeAreaView style={{ backgroundColor: color.backgroundColor, flex: 1 }}>
      <ImageBackground
        style={{ height: 500, width: '100%' }}
        resizeMode={'cover'}
        source={{ uri: '' }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: Platform.OS === 'android' ? 20 : undefined,
          }}>
          <LinearGradient
            style={styles.upperLinearGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={['rgba(7, 7, 7, 0.00)', 'rgba(7, 7, 7, 0.55)', '#000']}
          />
          <Pressable style={styles.downArrowContainer}>
            <AppImage style={{ height: 22, tintColor: '#fff', width: 22 }} />
          </Pressable>
          <View style={styles.headerInfoContainer}>
            <Text style={{ color: '#fff', marginTop: 10 }}>Now Playing</Text>
            <Text style={{ color: '#fff' }}>In song</Text>
          </View>
        </View>
        <LinearGradient
          style={styles.lowerLinearGradient}
          colors={[
            'rgba(7, 7, 7, 0.00)',
            'rgba(7, 7, 7, 0.34)',
            'rgba(7, 7, 7, 0.55)',
            '#fff',
          ]}
        />
      </ImageBackground>
      {/* foreground */}
      <View style={{ paddingHorizontal: 30 }}>
        {/* track info */}
        <View style={styles.trackInfoContainer}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Title</Text>
          <Text
            style={{
              color: 'grey',
              textAlign: 'center',
            }}>
            Artist
          </Text>
        </View>
        {/* progress bar  */}
        <View style={styles.progressBarContainer}>
          <Slider
            style={{ height: 20, marginHorizontal: 10, width: '100%' }}
            minimumValue={0}
            maximumValue={MAX_PROGRESS}
            tapToSeek={true}
            minimumTrackTintColor={'#fff'}
            maximumTrackTintColor={'grey'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(TrackPlayer);
