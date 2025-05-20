import React from 'react';
import { Image, Text, View } from 'react-native';

export default function Header() {
  return (
    <View className="flex-row items-center justify-between p-4">
      <View className="flex-row items-center space-x-3">
        <Image
          source={{ uri: 'https://placehold.co/50x50' }}
          className="w-10 h-10 rounded-full"
        />
        <View>
          <Text className="text-white text-sm">Good Evening</Text>
          <Text className="text-white font-bold">Ravi Tripathi</Text>
        </View>
      </View>
    </View>
  );
}
