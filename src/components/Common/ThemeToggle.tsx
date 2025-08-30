import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle bg-secondary hover:bg-accent smooth-transition focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Toggle theme"
    >
      <span
        className={`theme-toggle-thumb bg-primary flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-0' : 'translate-x-5'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="h-3 w-3 text-primary-foreground" />
        ) : (
          <Sun className="h-3 w-3 text-primary-foreground" />
        )}
      </span>
    </button>
  );
};