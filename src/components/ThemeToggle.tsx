import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const themes: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Sun className="w-5 h-5" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="w-5 h-5" /> },
  { value: 'purple', label: 'Purple', icon: <Palette className="w-5 h-5" /> },
  { value: 'green', label: 'Green', icon: <Palette className="w-5 h-5" /> },
  { value: 'blue', label: 'Blue', icon: <Palette className="w-5 h-5" /> },
];

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  return (
    <div className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 p-2 rounded-xl backdrop-blur-sm">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`p-2 rounded-lg transition-all duration-200 ${
            theme === t.value
              ? 'bg-primary text-white shadow-lg scale-110'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}
          title={t.label}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
};