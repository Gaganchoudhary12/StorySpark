export type RootStackParamList = {
  Home: undefined;
  Question: {
    step: 'mood' | 'relationship' | 'theme' | 'language';
    mood?: string;
    relationship?: string;
    theme?: string;
    language?: string;
  };
  Generating: { mood: string; relationship: string; theme: string; language: string };
  Story: { story: StoryResponse };
};

export interface StoryResponse {
  title: string;
  characters: {
    name: string;
    description: string;
  }[];
  setting: string;
  conversation: {
    speaker: string;
    text: string;
  }[];
}
