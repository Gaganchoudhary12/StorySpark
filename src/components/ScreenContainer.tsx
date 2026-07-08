import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  fullHeight?: boolean;
}

const ScreenContainer = ({ children, fullHeight = false }: ScreenContainerProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={[styles.container, fullHeight && styles.fullHeight]}>{children}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background
  },
  fullHeight: {
    flexGrow: 1,
    justifyContent: 'space-between'
  }
});

export default ScreenContainer;
