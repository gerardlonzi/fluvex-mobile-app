// src/components/ui/MapWidget.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme, themes  } from '../../../app/_layout';

interface MapWidgetProps {
  latitude?: number;
  longitude?: number;
  locationName?: string;
}

export default function MapWidget({
  latitude = 48.8566, // Paris par défaut
  longitude = 2.3522,
  locationName = '42 Wallaby Way, Sydney',
}: MapWidgetProps) {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? themes.dark : themes.light;

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title="Position actuelle"
          description={locationName}
          pinColor={colors.primary}
        />
      </MapView>

      {/* Overlay infos */}
      <View style={styles.overlay}>
        <View>
          <Text style={[styles.label, { color: colors.textMuted }]}>
            Position actuelle
          </Text>
          <Text style={[styles.location, { color: colors.textMain }]}>
            {locationName}
          </Text>
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.surface }]}>
          <MaterialIcons name="my-location" size={20} color={colors.textMain} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 32,
    height: 200,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  map: { ...StyleSheet.absoluteFillObject },
  overlay: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 2,
  },
  location: { fontSize: 14, fontWeight: '500', maxWidth: 200 },
  button: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});