import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import { theme } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <ScreenContainer fullHeight>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>StorySpark</Text>
          <Text style={styles.title}>Create a roleplay story in seconds.</Text>
          <Text style={styles.subtitle}>
            Choose mood, relationship, theme, and language. We will generate a clean conversation-style story for you.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Start"
            onPress={() =>
              navigation.navigate('Question', {
                step: 'mood',
                mood: 'Romantic',
                relationship: 'Dating',
                theme: 'Royal Kingdom',
                language: 'English'
              })
            }
          />
          {/* <Text style={styles.note}>English and Hindi supported.</Text> */}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  hero: {
    flex: 1,
    justifyContent: 'center'
  },
  eyebrow: {
    color: theme.colors.accentSoft,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase'
  },
  title: {
    color: theme.colors.text,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
    marginBottom: theme.spacing.md
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 320
  },
  footer: {
    paddingBottom: theme.spacing.sm
  },
  note: {
    color: theme.colors.accentSoft,
    textAlign: 'center',
    fontSize: 13,
    marginTop: theme.spacing.sm
  }
});

export default HomeScreen;
