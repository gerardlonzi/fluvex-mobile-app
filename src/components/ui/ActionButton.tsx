// src/components/ui/ActionButton.tsx
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, themes  } from '../../../app/_layout';

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  isActive?: boolean; // true = online (vert), false = offline (rouge)
}

export default function ActionButton({ label, onPress, isActive = true }: ActionButtonProps) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themes.dark : themes.light;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.surface,
          borderColor: isActive ? colors.primary : '#ef4444',
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: isActive ? colors.textMain : '#ef4444' }]}>
        {label}
      </Text>
      <View style={[styles.iconContainer, { backgroundColor: isActive ? colors.primary : '#ef4444' }]}>
        <MaterialIcons name="power-settings-new" size={28} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});