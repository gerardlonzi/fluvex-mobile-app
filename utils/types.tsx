export type Theme = 'light' | 'dark';

export interface InputProps {
    label: string;
    placeholder: string;
    icon: string;
    type?: 'text' | 'password' | 'email';
    value: string;
    onChangeText: (text: string) => void;
    error?: string;  // Pour validation requise
    showPassword?: boolean;  // Pour toggle visibility
    onTogglePassword?: () => void;
  }
  