// app/(app)/notifications.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { useTheme,themes } from '../_layout';
import Header from '../../src/components/ui/Header';
import NotificationItem from '../../src/components/ui/NotificationItem';
import BottomNav from '../../src/components/ui/BottomNav';
import Container from '../src/components/ui/container'


export default function Notifications() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = themes[theme];

  // Exemple de données (à remplacer par API + état)
  const notifications = [
    { id: 1, type: 'alert', title: 'Alerte système : Maintenance véhicule', message: 'Contrôle technique dans 2 jours. Planifiez via l’onglet maintenance.', time: 'il y a 10 min', isNew: true },
    { id: 2, type: 'assignment', title: 'Nouvelle mission reçue', message: 'Trajet Centre → Nord assigné. Démarrez quand prêt.', time: 'il y a 1 h' },
    { id: 3, type: 'safety', title: 'Rappel sécurité', message: 'Maintenez une distance sûre et respectez les limites sous la pluie.', time: 'il y a 3 h' },
    { id: 4, type: 'update', title: 'Mise à jour app v2.4.0', message: 'Amélioration précision tracking + cartes offline.', time: 'hier' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Header
        title="Notifications"
        showBack
        onBack={() => router.back()}
        notificationCount={notifications.filter(n => n.isNew).length}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.length === 0 ? (
          <Text style={[styles.empty, { color: colors.textMuted }]}>Aucune notification pour le moment</Text>
        ) : (
          notifications.map(notif => (
            <NotificationItem
              key={notif.id}
              type={notif.type as any}
              title={notif.title}
              message={notif.message}
              time={notif.time}
              isNew={notif.isNew}
            />
          ))
        )}
      </ScrollView>

      <BottomNav />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
});