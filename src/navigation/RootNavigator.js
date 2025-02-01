import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import PrayerTimesScreen from '../screens/PrayerTimesScreen';
import QiblaCompassScreen from '../screens/QiblaCompassScreen';
import QuranReadingScreen from '../screens/QuranReadingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HijriConverterScreen from '../screens/HijriConverterScreen';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Ana Sayfa':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Hicri Takvim':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Kıble':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case 'Kuran':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Ayarlar':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
      <Tab.Screen name="Hicri Takvim" component={HijriConverterScreen} />
      <Tab.Screen name="Kıble" component={QiblaCompassScreen} />
      <Tab.Screen name="Kuran" component={QuranReadingScreen} />
      <Tab.Screen name="Ayarlar" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
