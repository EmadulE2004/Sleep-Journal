import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');

interface NavItem {
  id: string;
  icon: any;
  onPress: () => void;
  isActive?: boolean;
}

interface NavBarProps {
  items: NavItem[];
  style?: any;
}

const NavBar: React.FC<NavBarProps> = ({ items, style }) => {
  const { colors, glass, gradients } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={20} tint = "dark" style = {styles.blurContainer}>
        <LinearGradient
          colors = {[gradients.glass.start, gradients.glass.end]}
          style = {styles.gradientOverlay}
          start = {{ x: 0, y: 0 }}
          end = {{ x: 1, y: 1 }}
        />
        
        <View style = {styles.navItemsContainer}>
          {items.map((item, index) => (
            <TouchableOpacity
              key = {item.id}
              style = {[
                styles.navItem,
                item.isActive && styles.activeNavItem
              ]}
              onPress = {item.onPress}
              activeOpacity = {0.7}
            >
              {item.isActive && (
                <LinearGradient
                  colors = {[gradients.accent.start, gradients.accent.end]}
                  style = {styles.activeIndicator}
                  start = {{ x: 0, y: 0 }}
                  end = {{ x: 1, y: 1 }}
                />
              )}

              <Image 
                source = {item.icon} 
                style = {[
                  styles.navIcon,
                  { tintColor: (function() {
                      if (item.isActive) {
                        return colors.tint;
                      }
                      return colors.icon;
                    })()
                  }
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 80,
    borderRadius: 25,
    overflow: 'hidden',
  },
  
  blurContainer: {
    flex: 1,
    borderRadius: 25,
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
  
  navItemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'relative',
  },
  
  activeNavItem: {
    backgroundColor: 'rgba(74, 144, 226, 0.15)',
  },
  
  activeIndicator: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 32,
    opacity: 0.3,
  },
  
  navIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});

export default NavBar; 