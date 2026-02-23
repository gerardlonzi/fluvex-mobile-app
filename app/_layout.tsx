// app/_layout.tsx (mises à jour)
import { Stack } from 'expo-router';
import { useEffect, useState, createContext, useContext } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, ActivityIndicator, Text, StyleSheet, Image, Appearance } from 'react-native';
import { useFonts } from 'expo-font';  
import { SafeAreaProvider } from 'react-native-safe-area-context';  
import {Theme} from '../utils/types'


SplashScreen.preventAutoHideAsync();

// Theme Context
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void; }>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// Couleurs basées sur ton CSS (optimisé : objets pour light/dark)
const themes = {
  light: {
    background: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    textMain: '#0f172a',
    textMuted: '#2b2b2b',
    primary: '#00cd44',
    primaryHover: '#10b981',
    accent: '#6366f1',
    danger: '#ef4444',
  },
  dark: {
    background: '#020617',
    surface: '#0f172a',
    border: '#1e293b',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    primary: '#00cd44',
    primaryHover: '#10b981',
    accent: '#6366f1',
    danger: '#ef4444',
  },
};

export default function RootLayout() {
  const systemTheme = Appearance.getColorScheme() as Theme;  // Détecte auto
  const [theme, setTheme] = useState<Theme>(systemTheme || 'dark');  // Défaut dark comme ton HTML
  const [appReady, setAppReady] = useState(false);

  // Charge fonts (professionnel : attends le chargement avant appReady)
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),  // Télécharge et mets les fonts dans assets/fonts/
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Attends fonts + autres (ex: check auth backend plus tard)
        if (!fontsLoaded) return;  // Bloque si fonts pas chargées
        await new Promise(resolve => setTimeout(resolve, 1000));  // Simule autres chargements
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
        setAppReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  if (!appReady || !fontsLoaded) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/mini-logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Ecosyn Driver</Text>
        <ActivityIndicator size="large" color="#00cd44" style={styles.spinner} />
        <Text style={styles.text}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({ /* mêmes styles que avant, mais avec primary #00cd44 pour spinner */ });