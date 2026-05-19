import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { DarkThemeColors, LightThemeColors } from '../constants/colors';

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
  colors: typeof LightThemeColors;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const colors = darkMode ? DarkThemeColors : LightThemeColors;

  const value = useMemo(
    () => ({
      darkMode,
      toggleTheme,
      colors,
    }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}