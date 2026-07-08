import { API_BASE_URL } from '@env';
import axios from 'axios';

const api = axios.create({
  baseURL: API_BASE_URL || 'http://10.0.2.2:5000',
  timeout: 30000
});

export const storyService = {
  generateStory: async (payload: { mood: string; relationship: string; theme: string }) => {
    const response = await api.post('/api/story', payload);
    return response.data;
  }
};
