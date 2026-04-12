// src/components/ui/LiveMap.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme,themes } from '../../../app/_layout';

interface LiveMapProps {
  driverLocation?: { latitude: number; longitude: number };
  speed?: number;
  distance?: string;
  duration?: string;
  onStopTracking?: () => void;
}

export default function LiveMap({
  driverLocation = { latitude: 48.8566, longitude: 2.3522 },
  speed = 72,
  distance = '12.4 km',
  duration = '00:45:12',
  onStopTracking,
}: LiveMapProps) {
  const { theme } = useTheme();
  const colors = themes[theme];

  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.8, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        <Marker coordinate={driverLocation}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <View style={[styles.marker, { backgroundColor: colors.primary }]}>
              <MaterialIcons name="directions-car" size={24} color="white" />
            </View>
          </Animated.View>
        </Marker>
      </MapView>

      {/* Contrôles flottants droite */}
      <View style={styles.controls}>
        <TouchableOpacity style={[styles.controlBtn, { backgroundColor: colors.surface }]}>
          <MaterialIcons name="layers" size={24} color={colors.textMain} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlBtn, { backgroundColor: colors.surface }]}>
          <MaterialIcons name="my-location" size={24} color={colors.textMain} />
        </TouchableOpacity>
        <View style={[styles.zoomContainer, { backgroundColor: colors.surface }]}>
          <TouchableOpacity style={styles.zoomBtn}>
            <MaterialIcons name="add" size={24} color={colors.textMain} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomBtn}>
            <MaterialIcons name="remove" size={24} color={colors.textMain} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Sheet Metrics */}
      <View style={[styles.bottomSheet, { backgroundColor: colors.surface }]}>
        <View style={styles.metricsRow}>
          <View>
            <Text style={[styles.metricLabel, { color: colors.textMuted }]}>Vitesse actuelle</Text>
            <View style={styles.speedRow}>
              <Text style={[styles.speed, { color: colors.textMain }]}>{speed}</Text>
              <Text style={[styles.unit, { color: colors.primary }]}>km/h</Text>
            </View>
          </View>
          <View style={styles.secondaryMetrics}>
            <View style={styles.metricSmall}>
              <MaterialIcons name="distance" size={18} color={colors.textMuted} />
              <Text style={[styles.smallValue, { color: colors.textMain }]}>{distance}</Text>
            </View>
            <View style={styles.metricSmall}>
              <MaterialIcons name="schedule" size={18} color={colors.textMuted} />
              <Text style={[styles.smallValue, { color: colors.textMain }]}>{duration}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.stopButton, { backgroundColor: '#ef4444' }]}
          onPress={onStopTracking}
        >
          <MaterialIcons name="stop-circle" size={24} color="white" />
          <Text style={styles.stopText}>Arrêter le suivi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  controls: {
    position: 'absolute',
    right: 16,
    top: 100,
    gap: 12,
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  zoomContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  zoomBtn: {
    width: 48,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  metricLabel: { fontSize: 12, fontWeight: '500' },
  speedRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  speed: { fontSize: 40, fontWeight: 'bold' },
  unit: { fontSize: 18, fontWeight: '600' },
  secondaryMetrics: { flexDirection: 'row', gap: 16 },
  metricSmall: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  smallValue: { fontSize: 16, fontWeight: '600' },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 12,
    gap: 8,
  },
  stopText: { color: 'white', fontSize: 16, fontWeight: '600' },
  marker: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
});