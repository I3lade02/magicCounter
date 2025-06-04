import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeColors {
  background: string;
  text: string;
  card: string;
  button: string;
}

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  toggleTheme: () => {},
  colors: {
    background: '#121212',
    text: '#fff',
    card: '#1e1e1e',
    button: '#ff5555',
  },
});

export const useTheme = () => useContext(ThemeContext);

const themeColors: Record<Theme, ThemeColors> = {
  light: {
    background: '#fff',
    text: '#000',
    card: '#e0e0e0',
    button: '#007aff',
  },
  dark: {
    background: '#121212',
    text: '#fff',
    card: '#1e1e1e',
    button: '#ff5555',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem('appTheme');
      if (stored === 'light' || stored === 'dark') {
        setTheme(stored);
      } else {
        const system = Appearance.getColorScheme();
        setTheme(system === 'light' ? 'light' : 'dark');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    await AsyncStorage.setItem('appTheme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};
