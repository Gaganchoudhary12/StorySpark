import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

interface CharacterCardProps {
  name: string;
  description: string;
}

const CharacterCard = ({ name, description }: CharacterCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: 16,
    marginBottom: 12
  },
  name: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6
  },
  description: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20
  }
});

export default CharacterCard;
