import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary' | 'accent';
  padding?: number;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  variant = 'primary',
  padding = 20 
}) => {
  const { colors, gradients } = useTheme();

  const getGradientColors = (): [string, string] => {
    switch (variant) {
      case 'accent':
        return [gradients.accent.start, gradients.accent.end];
      case 'secondary':
        return [gradients.glass.start, gradients.glass.end];
      default:
        return [gradients.glass.start, gradients.glass.end];
    }
  };

  return (
    <View style = {[styles.container, style]}>
      <BlurView intensity = {15} tint = "dark" style = {styles.blurContainer}>
        <LinearGradient
          colors = {getGradientColors()}
          style = {styles.gradientOverlay}
          start = {{ x: 0, y: 0 }}
          end = {{ x: 1, y: 1 }}
          locations = {[0, 1]}
        />
        
        <View style = {[styles.content, { padding }]}>
          {children}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    width: '100%',
  },
  
  blurContainer: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8,
  },
  
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

export default Card; 