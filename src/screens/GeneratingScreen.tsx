import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import ScreenContainer from '../components/ScreenContainer';
import LoadingAnimation from '../components/LoadingAnimation';
import Button from '../components/Button';
import { useStoryMutation } from '../hooks/useStoryMutation';
import { theme } from '../theme';
import { RootStackParamList } from '../types/navigation';

type Props = StackScreenProps<RootStackParamList, 'Generating'>;

const messages = [
  'Creating your characters...',
  'Building your world...',
  'Writing conversations...',
  'Adding plot twists...',
  'Almost done...'
];

const GeneratingScreen = ({ route, navigation }: Props) => {
  const { mood, relationship, theme: selectedTheme, language } = route.params;
  const mutation = useStoryMutation();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    console.log('[GeneratingScreen] Starting story generation with:', {
      mood,
      relationship,
      theme: selectedTheme,
      language
    });

    mutation.mutate(
      { mood, relationship, theme: selectedTheme, language },
      {
        onSuccess: (data) => {
          console.log('[GeneratingScreen] Story generated successfully:', data);
          navigation.replace('Story', { story: data });
        },
        onError: (error: Error) => {
          console.error('[GeneratingScreen] Story generation failed:', error);
        }
      }
    );
  }, [language, mood, mutation, navigation, relationship, selectedTheme]);

  console.log('[GeneratingScreen] Render - mutation state:', {
    status: mutation.status,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess
  });

  return (
    <ScreenContainer>
      <View style={styles.centered}>
        <Text style={styles.title}>Crafting your story</Text>
        <LoadingAnimation messages={messages} />
        {mutation.isError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>We hit a snag while creating your story.</Text>
            <Text style={styles.errorText}>{mutation.error?.message || 'Unknown error'}</Text>
            <Button title="Retry" onPress={() => {
              console.log('[GeneratingScreen] Retrying story generation');
              mutation.mutate(
                { mood, relationship, theme: selectedTheme, language },
                {
                  onSuccess: (data) => {
                    console.log('[GeneratingScreen] Story generated successfully:', data);
                    navigation.replace('Story', { story: data });
                  },
                  onError: (error: Error) => {
                    console.error('[GeneratingScreen] Story generation failed:', error);
                  }
                }
              );
            }} />
          </View>
        ) : null}
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
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16
  },
  errorBox: {
    marginTop: 24,
    alignItems: 'center'
  },
  errorText: {
    color: theme.colors.danger,
    marginBottom: 12
  }
});

export default GeneratingScreen;
