import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation';
import { ThemeProvider } from './context/themeContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}