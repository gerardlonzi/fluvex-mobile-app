// src/components/ui/StatusRow.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, themes  } from '../../../app/_layout';

export default function StatusRow() {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themes.dark : themes.light;

  return (
    <View style={styles.row}>
      {/* GPS Signal */}
      <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.iconContainer, { backgroundColor: '#3b82f620' }]}>
          <MaterialIcons name="near-me" size={24} color="#3b82f6" />
        </View>
        <View>
          <Text style={styles.label}>Signal GPS</Text>
          <Text style={[styles.value, { color: colors.textMain }]}>Haute précision</Text>
        </View>
      </View>

      {/* Batterie */}
      <View style={[styles.item, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.iconContainer, { backgroundColor: '#10b77f20' }]}>
          <MaterialIcons name="battery-charging-full" size={24} color="#10b77f" />
        </View>
        <View>
          <Text style={styles.label}>Batterie</Text>
          <Text style={[styles.value, { color: colors.textMain }]}>85% Chargée</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#94a3b8',
  },
  value: { fontSize: 12, fontWeight: 'bold' },
});