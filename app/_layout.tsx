// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect, useState, createContext, useContext } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  Appearance,
} from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

type Theme = 'light' | 'dark';

SplashScreen.preventAutoHideAsync();

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const themes = {
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
  const systemTheme = Appearance.getColorScheme() as Theme;
  const [theme, setTheme] = useState<Theme>(systemTheme || 'dark');

  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Attente des fonts (pas de boucle infinie ici)
        if (!fontsLoaded && !fontError) {
          return; // on attend le prochain cycle
        }

        if (fontError) {
          console.warn('Erreur chargement fonts :', fontError);
        }

        // Pause visuelle courte (optionnelle)
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Préparation terminée : fonts OK, app prête');
      } catch (e) {
        console.error('Erreur prepare :', e);
      } finally {
        await SplashScreen.hideAsync().catch(() => {});
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded, fontError]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/mini-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#00cd44" style={styles.spinner} />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
          initialRouteName="(auth)/login"  // Force démarrage sur login (pas de boucle)
        />
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 40,
  },
  spinner: {
    marginBottom: 30,
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 16,
  },
});