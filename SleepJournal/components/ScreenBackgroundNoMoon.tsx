import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';

const { width, height } = Dimensions.get('window');

interface BackgroundProps {
  children: React.ReactNode;
  style?: any;
}

const ScreenBackgroundNoMoon: React.FC<BackgroundProps> = ({ children, style }) => {
  const { gradients } = useTheme();
  const starAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateStars = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(starAnimation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(starAnimation, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    animateStars();
  }, []);

  const stars = () => {
    const s = [];
    for (let i = 0; i < 20; i++) {
      const sOpa = starAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1],
      });
      const scale = starAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1.2],
      });
      s.push(
        <Animated.View
          key = {i}
          style = {[
            styles.star,
            {
              left: Math.random() * width,
              top: Math.random() * (height * 0.7),
              opacity: sOpa,
              transform: [{ scale: scale }],
            },
          ]}
        />
      );
    }
    return s;
  };

  return (
    <View style = {[styles.container, style]}>
      <LinearGradient
        colors = {[gradients.primary.start, gradients.primary.end, gradients.accent.start]}
        style = {styles.gradient}
        start = {{ x: 0, y: 0 }}
        end = {{ x: 1, y: 1 }}
        locations = {[0, 0.7, 1]}
      />
      {stars()}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  content: {
    flex: 1,
    zIndex: 1,
  },

  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#E8F4FD',
    borderRadius: 1,
    shadowColor: '#E8F4FD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default ScreenBackgroundNoMoon; 