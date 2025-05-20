import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  text: string;
  textStyle: object;
  containerStyle?: object;
  speed?: number;
};

const MarqueeText = ({
  containerStyle,
  speed = 50,
  text,
  textStyle,
}: Props) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (textWidth > containerWidth) {
      const distance = textWidth - containerWidth;

      Animated.loop(
        Animated.sequence([
          Animated.timing(translateX, {
            duration: distance * speed,
            toValue: -distance,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            delay: 1000,
            duration: 300,
            toValue: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [textWidth, containerWidth]);

  const onTextLayout = (e: LayoutChangeEvent) =>
    setTextWidth(e.nativeEvent.layout.width);

  const onContainerLayout = (e: LayoutChangeEvent) =>
    setContainerWidth(e.nativeEvent.layout.width);

  return (
    <View
      style={[styles.container, containerStyle]}
      onLayout={onContainerLayout}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Text style={textStyle} onLayout={onTextLayout}>
          {text}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
  },
});

export default MarqueeText;
