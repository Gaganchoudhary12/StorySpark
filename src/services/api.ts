import { API_BASE_URL } from '@env';
import axios, { AxiosError } from 'axios';

const baseURL = API_BASE_URL || 'http://10.0.2.2:5000';
console.log('[API] Initializing with baseURL:', baseURL);

const api = axios.create({
  baseURL,
  timeout: 30000
});

export interface StoryOptionsResponse {
  moods: string[];
  relationships: string[];
  themes: string[];
}

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('[API] Request:', config.method?.toUpperCase(), config.url, 'Data:', config.data);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('[API] Response:', response.status, response.statusText, 'Data:', response.data);
    return response;
  },
  (error) => {
    console.error('[API] Response error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export const storyService = {
  getStoryOptions: async (): Promise<StoryOptionsResponse> => {
    try {
      const response = await api.get('/api/story-options');
      return response.data;
    } catch (error) {
      console.error('[StoryService] Error loading story options:', error);

      if (error instanceof AxiosError) {
        const apiMessage = typeof error.response?.data?.error === 'string' ? error.response.data.error : '';

        if (apiMessage) {
          throw new Error(apiMessage);
        }

        if (!error.response) {
          throw new Error('Cannot load story options. Check that the backend is running and the app base URL is correct.');
        }
      }

      throw new Error('Something went wrong while loading story options.');
    }
  },
  generateStory: async (payload: { mood: string; relationship: string; theme: string }) => {
    try {
      console.log('[StoryService] Generating story with payload:', payload);
      const response = await api.post('/api/story', payload);
      console.log('[StoryService] Story generated successfully');
      return response.data;
    } catch (error) {
      console.error('[StoryService] Error generating story:', error);

      if (error instanceof AxiosError) {
        const apiMessage = typeof error.response?.data?.error === 'string' ? error.response.data.error : '';

        if (apiMessage) {
          throw new Error(apiMessage);
        }

        if (error.code === 'ECONNABORTED') {
          throw new Error('The request took too long. Please try again.');
        }

        if (!error.response) {
          throw new Error('Cannot reach the Story API. Check that the backend is running and the app base URL is correct.');
        }
      }

      throw new Error('Something went wrong while generating the story.');
    }
  }
};
