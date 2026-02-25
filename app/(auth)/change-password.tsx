// app/(auth)/change-password.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme, themes } from '../_layout';
import Input from '../../src/components/Input';

export default function ChangePassword() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = themes[theme];

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });

  const [requirements, setRequirements] = useState({ length: false, uppercase: false, numberOrSpecial: false });

  useEffect(() => {
    const hasLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasNumberOrSpecial = /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);

    setRequirements({ length: hasLength, uppercase: hasUppercase, numberOrSpecial: hasNumberOrSpecial });
  }, [newPassword]);

  const validate = () => {
    const newErrors = { newPassword: '', confirmPassword: '' };
    let valid = true;

    if (!newPassword.trim()) { newErrors.newPassword = 'Nouveau mot de passe requis'; valid = false; }
    if (!confirmPassword.trim()) { newErrors.confirmPassword = 'Confirmation requise'; valid = false; }
    if (confirmPassword !== newPassword) { newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'; valid = false; }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = () => {
    if (!validate()) return;
    console.log('Mot de passe changé :', { newPassword });
    router.replace('/');
  };

  const handleCancel = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/login');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={[styles.ambient1, { backgroundColor: colors.primary }]} />
        <View style={[styles.ambient2, { backgroundColor: colors.primary }]} />

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
            <MaterialIcons name="arrow-back-ios-new" size={24} color={colors.textMuted} />
          </TouchableOpacity>

          <View style={styles.hero}>
            <View style={[styles.heroIconContainer, { backgroundColor: `${colors.primary}20`, borderColor: `${colors.primary}30` }]}>
              <MaterialIcons name="security" size={40} color={colors.primary} />
            </View>
            <Text style={[styles.heroTitle, { color: colors.textMain }]}>Sécurisez votre compte</Text>
            <Text style={[styles.heroSubtitle, { color: colors.textMuted }]}>
              Pour des raisons de sécurité, vous devez changer votre mot de passe temporaire avant de continuer.
            </Text>
          </View>

          <View style={styles.form}>
            <Input label="Nouveau mot de passe" placeholder="Entrez le nouveau mot de passe" icon="lock" type="password" value={newPassword} onChangeText={setNewPassword} showPassword={showNewPassword} onTogglePassword={() => setShowNewPassword(!showNewPassword)} error={errors.newPassword} />

            <Input label="Confirmer le mot de passe" placeholder="Ressaisissez le mot de passe" icon="lock" type="password" value={confirmPassword} onChangeText={setConfirmPassword} showPassword={showConfirmPassword} onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)} error={errors.confirmPassword} />

            <View style={[styles.requirementsCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.requirementsTitle, { color: colors.textMain }]}>Exigences du mot de passe</Text>
              <View style={styles.requirementItem}>
                <MaterialIcons name={requirements.length ? 'check-circle' : 'radio-button-unchecked'} size={16} color={requirements.length ? colors.primary : colors.textMuted} />
                <Text style={[styles.requirementText, { color: colors.textMain }]}>Au moins 8 caractères</Text>
              </View>
              <View style={styles.requirementItem}>
                <MaterialIcons name={requirements.uppercase ? 'check-circle' : 'radio-button-unchecked'} size={16} color={requirements.uppercase ? colors.primary : colors.textMuted} />
                <Text style={[styles.requirementText, { color: colors.textMain }]}>Une lettre majuscule</Text>
              </View>
              <View style={styles.requirementItem}>
                <MaterialIcons name={requirements.numberOrSpecial ? 'check-circle' : 'radio-button-unchecked'} size={16} color={requirements.numberOrSpecial ? colors.primary : colors.textMuted} />
                <Text style={[styles.requirementText, { color: colors.textMain }]}>Un chiffre ou un caractère spécial</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, minHeight: 40 }} />

          <View style={styles.actions}>
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
              <MaterialIcons name="save" size={20} color="white" />
              <Text style={styles.saveButtonText}>Enregistrer le nouveau mot de passe</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel}>
              <Text style={[styles.cancelText, { color: colors.textMuted }]}>Annuler et se déconnecter</Text>
            </TouchableOpacity>
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
  backButton: { padding: 8, marginLeft: -8, marginTop: 8 },
  hero: { alignItems: 'center', marginBottom: 40 },
  heroIconContainer: { width: 80, height: 80, borderRadius: 9999, alignItems: 'center', justifyContent: 'center', marginBottom: 24, borderWidth: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 15, elevation: 5 },
  heroTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 12 },
  heroSubtitle: { fontSize: 14, textAlign: 'center', maxWidth: 280, lineHeight: 20 },
  form: { gap: 24 },
  requirementsCard: { borderRadius: 12, padding: 16, borderWidth: 1, marginTop: 8 },
  requirementsTitle: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 12 },
  requirementItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  requirementText: { fontSize: 14 },
  actions: { gap: 16, marginTop: 32 },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 56, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 6, gap: 8 },
  saveButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  cancelText: { fontSize: 14, fontWeight: '500', textAlign: 'center' },
});