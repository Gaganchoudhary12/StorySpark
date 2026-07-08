import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16
  }
});

export default SectionTitle;
