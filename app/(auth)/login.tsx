// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme, themes } from '../_layout';
import Input from '../../src/components/Input';

export default function Login() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = themes[theme];

  const [chauffeurId, setChauffeurId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ chauffeurId: '', email: '', password: '' });

  const validate = () => {
    const newErrors = { chauffeurId: '', email: '', password: '' };
    let valid = true;

    if (!chauffeurId.trim()) { newErrors.chauffeurId = 'ID du chauffeur requis'; valid = false; }
    if (!email.trim()) { newErrors.email = 'Email requis'; valid = false; }
    if (!password.trim()) { newErrors.password = 'Mot de passe requis'; valid = false; }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (!validate()) return;
    // TODO: appel API + stockage token
    router.replace('/change-password'); // ou '/' après backend
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={[styles.ambient1, { backgroundColor: colors.primary }]} />
        <View style={[styles.ambient2, { backgroundColor: colors.primary }]} />

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View style={styles.topSection}>
              <Image source={require('../../assets/images/mini-logo.png')} style={styles.logo} resizeMode="contain" />
              <Text style={[styles.title, { color: colors.textMain }]}>Fluvex Driver</Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>Veuillez vous connecter pour continuer</Text>
            </View>

            <View style={styles.form}>
              <Input label="ID du chauffeur" placeholder="Entrez votre ID chauffeur" icon="badge" type="text" value={chauffeurId} onChangeText={setChauffeurId} error={errors.chauffeurId} />
              <Input label="Email" placeholder="driver@fluvex.com" icon="mail" type="email" value={email} onChangeText={setEmail} error={errors.email} />
              <Input label="Mot de passe" placeholder="Entrez votre mot de passe" icon="lock" type="password" value={password} onChangeText={setPassword} showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)} error={errors.password} />

              <TouchableOpacity style={[styles.signInButton, { backgroundColor: colors.primary }]} onPress={handleLogin} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Se connecter</Text>
                <MaterialIcons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomSection}>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <Text style={[styles.version, { color: colors.textMuted }]}>Fluvex v1.0.0</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  ambient1: { position: 'absolute', top: '-10%', left: '-10%', width: '50%', height: '50%', borderRadius: 9999, opacity: 0.1 },
  ambient2: { position: 'absolute', top: '40%', right: '10%', width: '30%', height: '30%', borderRadius: 9999, opacity: 0.08 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 10, paddingBottom: 40 },
  content: { flexGrow: 1, justifyContent: 'space-between' },
  topSection: { alignItems: 'center', marginTop: 60 },
  logo: { width: 100, height: 100, marginBottom: 9 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 15, opacity: 0.8 },
  form: { marginTop: 30 },
  signInButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 56, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 6 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 12 },
  bottomSection: { alignItems: 'center' },
  divider: { height: 1, width: 120, marginBottom: 16 },
  version: { fontSize: 12, opacity: 0.6 },
});