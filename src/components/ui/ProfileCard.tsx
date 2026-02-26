// src/components/ui/ProfileCard.tsx
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme, themes  } from '../../../app/_layout';

interface ProfileCardProps {
  name: string;
  rating: number;
  vehicle: string;
  plate: string;
  photoUrl?: string;
}

export default function ProfileCard({
  name,
  rating,
  vehicle,
  plate,
  photoUrl,
}: ProfileCardProps) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themes.dark : themes.light;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.photoContainer}>
        <Image
          source={{ uri: photoUrl || 'https://via.placeholder.com/64' }}
          style={styles.photo}
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          <MaterialIcons name="star" size={10} color="black" />
        </View>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.textMain }]}>{name}</Text>
        <View style={styles.vehicleRow}>
          <Text style={[styles.vehicle, { color: colors.textMuted }]}>{vehicle}</Text>
          <View style={styles.dot} />
          <View style={[styles.plate, { backgroundColor: colors.primary }]}>
            <Text style={styles.plateText}>{plate}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 24,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  photoContainer: { position: 'relative' },
  photo: { width: 64, height: 64, borderRadius: 32, borderWidth: 2 },
  ratingBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: 'gold',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  ratingText: { fontSize: 10, fontWeight: 'bold', color: 'black' },
  info: { flex: 1, marginLeft: 16 },
  name: { fontSize: 18, fontWeight: 'bold' },
  vehicleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 8 },
  vehicle: { fontSize: 14 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#94a3b8' },
  plate: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  plateText: { fontSize: 12, fontWeight: '600', color: 'white' },
});