import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import ScreenContainer from '../components/ScreenContainer';
import OptionCard from '../components/OptionCard';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import { moodOptions, relationshipOptions, themeOptions } from '../constants/options';
import { theme } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Question'>;

const QuestionScreen = ({ route, navigation }: Props) => {
  const { step } = route.params;
  const [selection, setSelection] = useState('');
  const [mood, setMood] = useState('Romantic');
  const [relationship, setRelationship] = useState('Dating');
  const [theme, setTheme] = useState('Royal Kingdom');

  const title = useMemo(() => {
    if (step === 'relationship') return "Relationship";
    if (step === 'theme') return 'Choose a Theme';
    return "What's your mood?";
  }, [step]);

  const options = useMemo(() => {
    if (step === 'relationship') return relationshipOptions;
    if (step === 'theme') return themeOptions;
    return moodOptions;
  }, [step]);

  const handleContinue = () => {
    if (step === 'mood') {
      navigation.navigate('Question', { step: 'relationship' });
      return;
    }
    if (step === 'relationship') {
      navigation.navigate('Question', { step: 'theme' });
      return;
    }
    navigation.navigate('Generating', { mood, relationship, theme });
  };

  const handleSelect = (item: string) => {
    setSelection(item);
    if (step === 'mood') setMood(item);
    if (step === 'relationship') setRelationship(item);
    if (step === 'theme') setTheme(item);
  };

  return (
    <ScreenContainer>
      <SectionTitle title={title} />
      <View style={styles.optionList}>
        {options.map((item) => (
          <OptionCard key={item} label={item} selected={selection === item || (step === 'mood' && mood === item) || (step === 'relationship' && relationship === item) || (step === 'theme' && theme === item)} onPress={() => handleSelect(item)} />
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
  helper: {
    color: theme.colors.muted,
    marginBottom: 16
  }
});

export default QuestionScreen;
