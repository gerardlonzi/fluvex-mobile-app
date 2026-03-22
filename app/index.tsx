// app/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSharedValue, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { useTheme, themes } from './_layout';
import Header from '../src/components/ui/Header';
import ProfileCard from '../src/components/ui/ProfileCard';
import StatusRow from '../src/components/ui/StatusRow';
import StatusToggle from '../src/components/ui/StatusToggle';
import StatusIndicator from '../src/components/ui/StatusIndicator';
import ActionButton from '../src/components/ui/ActionButton';
import BottomNav from '../src/components/ui/BottomNav';
import MapWidget from '../src/components/ui/MapWidget';
import Container from '../src/components/ui/container'

export default function DriverDashboard() {
  const { theme } = useTheme();
  const colors = themes[theme];

  const [isOnline, setIsOnline] = useState(true);
  const pulseAnim = useSharedValue(1);

  useEffect(() => {
    // ✅ Animation version Reanimated
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1, // boucle infinie
      false
    );
  }, []);
  
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <Header title="Fluvex Driver" />
      <Container>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ProfileCard
            name="John Doe"
            rating={4.9}
            vehicle="Toyota Prius"
            plate="ABC-1234"
            photoUrl="../assets/images/pic.jpeg" // ton URL
          />

          <StatusRow />

          <StatusToggle isOnline={isOnline} onToggle={() => setIsOnline(!isOnline)} />

          <StatusIndicator isOnline={isOnline} pulseAnim={pulseAnim} />

          <ActionButton
            label={isOnline ? 'PASSER HORS LIGNE' : 'PASSER EN LIGNE'}
            onPress={() => setIsOnline(!isOnline)}
            isActive={isOnline}
          />

          {/* MapWidget reste inchangé ou tu peux le refactorer plus tard */}
          <View style={[styles.mapWidget, { borderColor: colors.border }]}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 48.8566,
                longitude: 2.3522,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
              showsCompass={true}
            >
              <Marker
                coordinate={{ latitude: 48.8566, longitude: 2.3522 }}
                title="Position actuelle"
                description="42 Wallaby Way, Sydney"
                pinColor={colors.primary}
              />
            </MapView>
            {/* overlay infos */}
          </View>
        </ScrollView>
      </Container>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { paddingBottom: 200 },
  mapWidget: {
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
});