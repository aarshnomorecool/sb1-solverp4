import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { User, Bot, Sparkles } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';
  
  return (
    <div
      className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-300 ${
        isAssistant
          ? 'bg-white/50 dark:bg-gray-800/50 shadow-lg'
          : 'bg-primary/5 dark:bg-gray-800/30'
      }`}
    >
      <div className="flex-shrink-0">
        <div className="relative">
          {message.role === 'user' ? (
            <div className="p-2 rounded-full bg-primary/10">
              <User className="w-6 h-6 text-primary" />
            </div>
          ) : (
            <div className="p-2 rounded-full bg-green-500/10">
              <Bot className="w-6 h-6 text-green-500" />
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 prose dark:prose-invert max-w-none">
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
};