// src/components/ui/StatusIndicator.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated , { useAnimatedStyle }  from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, themes  } from '../../../app/_layout';

interface StatusIndicatorProps {
  isOnline: boolean;
  pulseAnim: SharedValue<number>;
}

export default function StatusIndicator({ isOnline, pulseAnim }: StatusIndicatorProps) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themes.dark : themes.light;

  const animatedPulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseAnim.value }], // ✅ .value fonctionnera maintenant
    };
  });
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.pulse,
          animatedPulseStyle, // ✅ on injecte ici
          {
            opacity: isOnline ? 0.6 : 0.2,
            backgroundColor: isOnline
              ? `${colors.primary}30`
              : '#ef444430',
          },
        ]}
      />
      <View
        style={[
          styles.circle,
          {
            borderColor: isOnline ? colors.primary : '#ef4444',
            backgroundColor: isOnline ? colors.surface : '#ef444410',
          },
        ]}
      >
        <MaterialIcons
          name={isOnline ? 'wifi-tethering' : 'wifi-off'}
          size={48}
          color={isOnline ? colors.primary : '#ef4444'}
          style={styles.icon}
        />
        <Text style={[styles.text, { color: colors.textMain }]}>
          {isOnline ? 'EN LIGNE' : 'HORS LIGNE'}
        </Text>
        <Text style={[styles.subText, { color: isOnline ? colors.primary : '#ef4444' }]}>
          {isOnline ? 'En attente de demandes...' : 'Mode hors ligne activé'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  pulse: {
    position: 'absolute',
    width: 192,
    height: 192,
    borderRadius: 9999,
  },
  circle: {
    width: 192,
    height: 192,
    borderRadius: 9999,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  icon: { marginBottom: 8 },
  text: { fontSize: 36, fontWeight: 'bold' },
  subText: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    marginTop: 4,
  },
});