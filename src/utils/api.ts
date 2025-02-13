import axios from 'axios';
import { AIProvider } from '../types';

const API_KEYS = {
  deepseek: import.meta.env.VITE_DEEPSEEK_API_KEY,
  gemini: import.meta.env.VITE_GEMINI_API_KEY,
  mistral: import.meta.env.VITE_MISTRAL_API_KEY,
};

const API_ENDPOINTS = {
  deepseek: 'https://api.deepseek.com/v1/chat/completions',
  gemini: 'https://api.gemini.com/v1/chat/completions',
  mistral: 'https://api.mistral.ai/v1/chat/completions',
};

export const solveProblem = async (problem: string, provider: AIProvider) => {
  try {
    const response = await axios.post(
      API_ENDPOINTS[provider],
      {
        model: provider === 'deepseek' ? 'deepseek-math' : 'default',
        messages: [
          {
            role: 'system',
            content:
              'You are an expert mathematics tutor specializing in algebra. Provide step-by-step solutions with clear explanations.',
          },
          {
            role: 'user',
            content: `Solve this problem step by step: ${problem}`,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEYS[provider]}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(`Error calling ${provider} API:`, error);
    throw new Error('Failed to solve the problem. Please try again.');
  }
};