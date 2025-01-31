// SettingsScreen.js
import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View>
      <Text>Tema Ayarları</Text>
      <Switch value={isDarkMode} onValueChange={toggleTheme} />
    </View>
  );
}
