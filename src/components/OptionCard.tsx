import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

interface OptionCardProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const OptionCard = ({ label, selected, onPress }: OptionCardProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selected]}>
      <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: theme.colors.surface
  },
  selected: {
    backgroundColor: theme.colors.surfaceSecondary,
    borderColor: theme.colors.accent
  },
  label: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '600'
  },
  selectedLabel: {
    color: theme.colors.accentSoft
  }
});

export default OptionCard;
