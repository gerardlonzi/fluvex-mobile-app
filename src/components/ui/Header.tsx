// src/components/ui/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme,themes } from '../../../app/_layout';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onNotificationPress?: () => void;
  notificationCount?: number;
}

export default function Header({
  title,
  showBack = false,
  onBack,
  onNotificationPress,
  notificationCount = 0,
}: HeaderProps) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themes.dark : themes.light;

  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={onBack} style={styles.iconButton}>
          <MaterialIcons name="arrow-back-ios-new" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} /> // spacer
      )}
      <Image source={require('../../../assets/images/mini-logo.png')} style={styles.image} resizeMode="contain"/>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
          <MaterialIcons name="notifications" size={24} color={colors.textMuted} />
          {notificationCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="settings" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 16,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  actions: { flexDirection: 'row', gap: 16 },
  iconButton: { padding: 8, position: 'relative' },
  image :{
    Width : 30,
    height :30, 
    position: 'absolute', 
    left:'-70%',
    bottom: 20
  },

  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
});