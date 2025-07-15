import { useColorScheme } from 'react-native';
import { Colors, Gradients, GlassEffects } from '../constants/Colors';

export const useTheme = () => {
  const colorScheme = 'dark'; 
  const theme = Colors[colorScheme];
  
  return {
    colors: theme,
    gradients: Gradients,
    glass: GlassEffects,
    isDark: true, 
    colorScheme,
    
    glassCard: {
      backgroundColor: GlassEffects.background,
      borderColor: GlassEffects.border,
      borderWidth: 1,
      borderRadius: 16,
      shadowColor: GlassEffects.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    
    glassNavBar: {
      backgroundColor: GlassEffects.background,
      borderColor: GlassEffects.border,
      borderTopWidth: 1,
      borderTopColor: GlassEffects.border,
      shadowColor: GlassEffects.shadow,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 12,
    },
    
    textStyles: {
      title: {
        color: theme.text,
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: 0.5,
      },
      subtitle: {
        color: theme.text,
        fontSize: 20,
        fontWeight: '600',
        opacity: 0.9,
      },
      body: {
        color: theme.text,
        fontSize: 16,
        fontWeight: '400',
        opacity: 0.8,
      },
      caption: {
        color: theme.icon,
        fontSize: 14,
        fontWeight: '400',
        opacity: 0.7,
      },
    },
  };
}; 