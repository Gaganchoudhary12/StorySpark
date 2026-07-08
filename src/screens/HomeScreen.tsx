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
      <View style={styles.centered}>
        <Text style={styles.logo}>❤️ RolePlay</Text>
        <Text style={styles.subtitle}>Create a personalized roleplay story in under 30 seconds.</Text>
        <Button title="Start" onPress={() => navigation.navigate('Question', { step: 'mood', mood: 'Romantic', relationship: 'Dating', theme: 'Royal Kingdom', language: 'English' })} />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    color: theme.colors.text,
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 12
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 280
  }
});

export default HomeScreen;
