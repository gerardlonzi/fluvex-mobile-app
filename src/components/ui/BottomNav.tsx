// src/components/ui/BottomNav.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, themes  } from '../../../app/_layout';
import { useRouter } from 'expo-router';

export default function BottomNav() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themes.dark : themes.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
      <TouchableOpacity style={styles.item} onPress={() => router.push('/')}>
        <MaterialIcons name="home" size={24} color={colors.primary} />
        <Text style={[styles.label, { color: colors.primary }]}>Accueil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <MaterialIcons name="payments" size={24} color={colors.textMuted} />
        <Text style={[styles.label, { color: colors.textMuted }]}>Gains</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <MaterialIcons name="star" size={24} color={colors.textMuted} />
        <Text style={[styles.label, { color: colors.textMuted }]}>Évaluations</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <MaterialIcons name="person" size={24} color={colors.textMuted} />
        <Text style={[styles.label, { color: colors.textMuted }]}>Compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingBottom: 8,
  },
  item: {
    alignItems: 'center',
    gap: 4,
  },
  label: { fontSize: 10, fontWeight: '500' },
});