// src/components/Input.tsx
import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Pour icônes
import { useTheme } from '../../app/_layout';  // Chemin relatif
import {InputProps} from '../utils/types'


const Input = ({ label, placeholder, icon, type = 'text', value, onChangeText, error, showPassword, onTogglePassword }: InputProps) => {
  const { theme } = useTheme();
  const colors = themes[theme];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textMain }]}>{label}</Text>
      <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.surface }]}>
        <Icon name={icon} size={24} color={colors.textMuted} style={styles.icon} />
        <TextInput
          style={[styles.input, { color: colors.textMain }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={type === 'password' && !showPassword}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          autoCapitalize="none"
        />
        {type === 'password' && (
          <TouchableOpacity onPress={onTogglePassword} style={styles.toggle}>
            <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 8, fontFamily: 'Inter-Medium' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, height: 56 },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, fontFamily: 'Inter-Regular' },
  toggle: { paddingLeft: 12 },
  error: { fontSize: 12, marginTop: 4 },
});

export default Input;