/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// primary colors
const primaryNavy = '#0B1426'; 
const secondaryNavy = '#1A2332'; 
const accentBlue = '#4A90E2'; 
const midnightBlue = '#16213E'; 
const starlightBlue = '#7B9E89'; 
const moonGlow = '#E8F4FD'; 

// gradient colors 
const gradientStart = '#0B1426'; 
const gradientEnd = '#1A2332';
const accentGradientStart = '#4A90E2'; 
const accentGradientEnd = '#7B9E89';

export const Colors = {
  light: {
    text: '#0B1426',
    background: '#F8FAFC',
    tint: accentBlue,
    icon: '#4A5568',
    tabIconDefault: '#4A5568',
    tabIconSelected: accentBlue,
    card: '#FFFFFF',
    cardBorder: '#E2E8F0',
    green: '#4CAF50', // Added green
    red: '#F44336',   // Added red
    yellow: '#FFC107', // Added yellow
    blue: '#2196F3', // Added blue
    orange: '#FF9800', // Added orange
  },
  dark: {
    text: moonGlow, 
    background: primaryNavy, 
    tint: accentBlue, 
    icon: starlightBlue, 
    tabIconDefault: starlightBlue,
    tabIconSelected: accentBlue, 
    card: secondaryNavy, 
    cardBorder: '#2D3748', 
    glassBackground: 'rgba(26, 35, 50, 0.8)', 
    glassBorder: 'rgba(74, 144, 226, 0.2)',
    green: '#4CAF50', // Added green
    red: '#F44336',   // Added red
    yellow: '#FFC107', // Added yellow
    blue: '#2196F3', // Added blue
    orange: '#FF9800', // Added orange
  },
};

export const Gradients = {
  primary: {
    start: gradientStart,
    end: gradientEnd,
  },
  accent: {
    start: accentGradientStart,
    end: accentGradientEnd,
  },
  glass: {
    start: 'rgba(26, 35, 50, 0.9)',
    end: 'rgba(11, 20, 38, 0.7)',
  },
};

export const GlassEffects = {
  background: 'rgba(26, 35, 50, 0.8)',
  border: 'rgba(74, 144, 226, 0.2)',
  shadow: 'rgba(0, 0, 0, 0.3)',
};
