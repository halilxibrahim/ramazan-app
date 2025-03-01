// SettingsScreen.js
import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function SettingsScreen({ navigation }) {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.headerText, { color: theme.textColor }]}>Ayarlar</Text>
      
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.textColor }]}>Karanlık Mod</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          style={styles.switch}
        />
      </View>

      <TouchableOpacity 
        style={styles.settingItem}
        onPress={() => navigation.navigate('PrivacyPolicy')}
      >
        <Text style={[styles.settingText, { color: theme.textColor }]}>Gizlilik Politikası</Text>
        <View style={styles.arrowContainer}>
          <Text style={[styles.arrowIcon, { color: theme.textColor }]}>›</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    paddingVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    marginBottom: 16,
  },
  settingText: {
    fontSize: 18,
    fontWeight: '500',
  },
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }]
  },
  arrowContainer: {
    padding: 4,
  },
  arrowIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  }
});
