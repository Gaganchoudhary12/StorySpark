import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import ScreenContainer from '../components/ScreenContainer';
import Button from '../components/Button';
import CharacterCard from '../components/CharacterCard';
import ConversationCard from '../components/ConversationCard';
import SectionTitle from '../components/SectionTitle';
import { theme } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Story'>;

const StoryScreen = ({ route, navigation }: Props) => {
  const { story } = route.params;

  return (
    <ScreenContainer>
      <SectionTitle title={story.title} />
      <Text style={styles.settingLabel}>Setting</Text>
      <Text style={styles.setting}>{story.setting}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Characters</Text>
        {story.characters.map((character) => (
          <CharacterCard key={character.name} name={character.name} description={character.description} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conversation</Text>
        {story.conversation.map((item, index) => (
          <ConversationCard key={`${item.speaker}-${index}`} speaker={item.speaker} text={item.text} isLeft={index % 2 === 0} />
        ))}
      </View>

      <Button title="Generate Another Story" onPress={() => navigation.navigate('Question', { step: 'mood' })} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12
  },
  settingLabel: {
    color: theme.colors.accentSoft,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4
  },
  setting: {
    color: theme.colors.text,
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22
  }
});

export default StoryScreen;
