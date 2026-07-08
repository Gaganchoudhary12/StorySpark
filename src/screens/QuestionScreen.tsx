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
  const {
    step,
    mood = 'Romantic',
    relationship = 'Dating',
    theme: selectedTheme = 'Royal Kingdom',
    language = 'English'
  } = route.params;
  const [selection, setSelection] = useState('');
  const optionsQuery = useQuery({
    queryKey: ['story-options'],
    queryFn: storyService.getStoryOptions
  });

  const title = useMemo(() => {
    if (step === 'relationship') return "Relationship";
    if (step === 'theme') return 'Choose a Theme';
    if (step === 'language') return 'Choose a Language';
    return "What's your mood?";
  }, [step]);

  const options = useMemo(() => {
    const data = optionsQuery.data;
    if (!data) return [];
    if (step === 'relationship') return data.relationships;
    if (step === 'theme') return data.themes;
    if (step === 'language') return data.languages ?? ['English', 'Hindi'];
    return data.moods;
  }, [optionsQuery.data, step]);

  const currentValue = useMemo(() => {
    if (step === 'relationship') return relationship;
    if (step === 'theme') return selectedTheme;
    if (step === 'language') return language;
    return mood;
  }, [language, mood, relationship, selectedTheme, step]);

  const handleContinue = () => {
    if (step === 'mood') {
      navigation.navigate('Question', { step: 'relationship', mood, relationship, theme: selectedTheme, language });
      return;
    }
    if (step === 'relationship') {
      navigation.navigate('Question', { step: 'theme', mood, relationship, theme: selectedTheme, language });
      return;
    }
    if (step === 'theme') {
      navigation.navigate('Question', { step: 'language', mood, relationship, theme: selectedTheme, language });
      return;
    }

    navigation.navigate('Generating', { mood, relationship, theme: selectedTheme, language });
  };

  const handleSelect = (item: string) => {
    setSelection(item);
    if (step === 'mood') {
      navigation.setParams({ mood: item });
    }
    if (step === 'relationship') {
      navigation.setParams({ relationship: item });
    }
    if (step === 'theme') {
      navigation.setParams({ theme: item });
    }
    if (step === 'language') {
      navigation.setParams({ language: item });
    }
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
        {options?.map((item) => (
          <OptionCard
            key={item}
            label={item}
            selected={
              selection === item ||
              currentValue === item
            }
            onPress={() => handleSelect(item)}
          />
        ))}
      </View>
      <Button title="Continue" onPress={handleContinue} disabled={!selection && !currentValue} />
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
