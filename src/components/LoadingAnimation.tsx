import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { theme } from '../theme';

interface LoadingAnimationProps {
  messages: string[];
}

const LoadingAnimation = ({ messages }: LoadingAnimationProps) => {
  const [index, setIndex] = useState(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % messages.length), 1000);
    return () => clearInterval(timer);
  }, [messages.length]);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1400, easing: Easing.linear }), -1, false);
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }]
  }));

  const currentMessage = useMemo(() => messages[index] || messages[0], [index, messages]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, animatedStyle]} />
      <Text style={styles.message}>{currentMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24
  },
  spinner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 6,
    borderColor: theme.colors.accent,
    borderTopColor: 'transparent',
    marginBottom: 20
  },
  message: {
    color: theme.colors.muted,
    fontSize: 16,
    textAlign: 'center'
  }
});

export default LoadingAnimation;
