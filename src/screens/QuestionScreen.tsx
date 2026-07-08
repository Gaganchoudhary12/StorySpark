import React, { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';
import ScreenContainer from '../components/ScreenContainer';
import OptionCard from '../components/OptionCard';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import { storyService } from '../services/api';
import { theme } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Question'>;

const QuestionScreen = ({ route, navigation }: Props) => {
  const { step } = route.params;
  const [selection, setSelection] = useState('');
  const [mood, setMood] = useState('Romantic');
  const [relationship, setRelationship] = useState('Dating');
  const [selectedTheme, setSelectedTheme] = useState('Royal Kingdom');
  const optionsQuery = useQuery({
    queryKey: ['story-options'],
    queryFn: storyService.getStoryOptions
  });

  const title = useMemo(() => {
    if (step === 'relationship') return "Relationship";
    if (step === 'theme') return 'Choose a Theme';
    return "What's your mood?";
  }, [step]);

  const options = useMemo(() => {
    const data = optionsQuery.data;
    if (!data) return [];
    if (step === 'relationship') return data.relationships;
    if (step === 'theme') return data.themes;
    return data.moods;
  }, [optionsQuery.data, step]);

  const handleContinue = () => {
    if (step === 'mood') {
      navigation.navigate('Question', { step: 'relationship' });
      return;
    }
    if (step === 'relationship') {
      navigation.navigate('Question', { step: 'theme' });
      return;
    }
    navigation.navigate('Generating', { mood, relationship, theme: selectedTheme });
  };

  const handleSelect = (item: string) => {
    setSelection(item);
    if (step === 'mood') setMood(item);
    if (step === 'relationship') setRelationship(item);
    if (step === 'theme') setSelectedTheme(item);
  };

  if (optionsQuery.isLoading) {
    return (
      <ScreenContainer>
        <SectionTitle title={title} />
        <View style={styles.stateBox}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
          <Text style={styles.helper}>Loading story options...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (optionsQuery.isError) {
    return (
      <ScreenContainer>
        <SectionTitle title={title} />
        <View style={styles.stateBox}>
          <Text style={styles.errorText}>{optionsQuery.error.message}</Text>
          <Button title="Try Again" onPress={() => optionsQuery.refetch()} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <SectionTitle title={title} />
      <View style={styles.optionList}>
        {options.map((item) => (
          <OptionCard key={item} label={item} selected={selection === item || (step === 'mood' && mood === item) || (step === 'relationship' && relationship === item) || (step === 'theme' && selectedTheme === item)} onPress={() => handleSelect(item)} />
        ))}
      </View>
      <Button title="Continue" onPress={handleContinue} disabled={!selection && step === 'mood' ? false : !selection} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  optionList: {
    marginBottom: 24
  },
  stateBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16
  },
  helper: {
    color: theme.colors.muted,
    marginBottom: 16
  },
  errorText: {
    color: theme.colors.danger,
    textAlign: 'center',
    marginBottom: 16
  }
});

export default QuestionScreen;
