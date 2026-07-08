import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';

interface ConversationCardProps {
  speaker: string;
  text: string;
  isLeft?: boolean;
}

const ConversationCard = ({ speaker, text, isLeft = false }: ConversationCardProps) => {
  return (
    <View style={[styles.row, isLeft ? styles.left : styles.right]}>
      <View style={[styles.card, isLeft ? styles.leftCard : styles.rightCard]}>
        <Text style={styles.speaker}>{speaker}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
    flexDirection: 'row'
  },
  left: {
    justifyContent: 'flex-start'
  },
  right: {
    justifyContent: 'flex-end'
  },
  card: {
    maxWidth: '85%',
    borderRadius: theme.radius.md,
    padding: 12
  },
  leftCard: {
    backgroundColor: theme.colors.surface
  },
  rightCard: {
    backgroundColor: theme.colors.surfaceSecondary
  },
  speaker: {
    color: theme.colors.accentSoft,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4
  },
  text: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 20
  }
});

export default ConversationCard;
