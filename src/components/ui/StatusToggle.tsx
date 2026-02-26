// src/components/ui/StatusToggle.tsx
import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme, themes  } from '../../../app/_layout';

interface StatusToggleProps {
  isOnline: boolean;
  onToggle: () => void;
}

export default function StatusToggle({ isOnline, onToggle }: StatusToggleProps) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themes.dark : themes.light;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.textMain }]}>
        {isOnline ? 'EN LIGNE' : 'HORS LIGNE'}
      </Text>
      <Switch
        value={isOnline}
        onValueChange={onToggle}
        trackColor={{ false: '#767577', true: colors.primary }}
        thumbColor={isOnline ? '#fff' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  label: { fontSize: 16, fontWeight: '600' },
});