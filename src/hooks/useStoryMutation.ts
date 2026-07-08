import { useMutation } from '@tanstack/react-query';
import { storyService } from '../services/api';

export const useStoryMutation = () => {
  return useMutation({
    mutationFn: storyService.generateStory
  });
};
