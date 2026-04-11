// src/components/ui/NotificationItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, themes} from '../../../app/_layout';

interface NotificationProps {
  type: 'alert' | 'assignment' | 'safety' | 'update' | 'payment';
  title: string;
  message: string;
  time: string;
  isNew?: boolean;
}

export default function NotificationItem({
  type,
  title,
  message,
  time,
  isNew = false,
}: NotificationProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  const getIcon = () => {
    switch (type) {
      case 'alert': return 'warning';
      case 'assignment': return 'assignment';
      case 'safety': return 'security';
      case 'update': return 'update';
      case 'payment': return 'account_balance_wallet';
      default: return 'info';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'alert': return '#ef4444';
      case 'assignment': return colors.primary;
      case 'safety': return '#3b82f6';
      case 'update': return '#8b5cf6';
      case 'payment': return '#10b981';
      default: return colors.textMuted;
    }
  };

  return (
    <View style={[styles.item, { backgroundColor: colors.surface }]}>
      <View style={[styles.iconContainer, { backgroundColor: `${getColor()}20` }]}>
        <MaterialIcons name={getIcon()} size={24} color={getColor()} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textMain }]}>{title}</Text>
          {isNew && <View style={[styles.newBadge, { backgroundColor: colors.primary }]} />}
        </View>
        <Text style={[styles.time, { color: colors.textMuted }]}>{time}</Text>
        <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '600' },
  newBadge: { width: 10, height: 10, borderRadius: 5 },
  time: { fontSize: 12, marginTop: 2, marginBottom: 4 },
  message: { fontSize: 14, lineHeight: 20 },
});