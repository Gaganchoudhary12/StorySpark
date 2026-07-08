import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button = ({ title, onPress, disabled = false, variant = 'primary' }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'secondary' ? styles.secondary : styles.primary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed
      ]}>
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primary: {
    backgroundColor: theme.colors.accent
  },
  secondary: {
    backgroundColor: theme.colors.surfaceSecondary
  },
  disabled: {
    opacity: 0.5
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  },
  label: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700'
  }
});

export default Button;
