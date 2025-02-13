export type Theme = 'light' | 'dark' | 'pink' | 'green' | 'oled';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type AIProvider = 'deepseek' | 'gemini' | 'mistral';