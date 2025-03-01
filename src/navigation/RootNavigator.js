// src/navigation/RootNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import PrayerTimesScreen from '../screens/PrayerTimesScreen';
import QiblaCompassScreen from '../screens/QiblaCompassScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HijriConverterScreen from '../screens/HijriConverterScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
// Eski QuranReadingScreen yerine oluşturduğumuz stack navigatörü ekleyin
import QuranStack from '../navigation/QuranStack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabNavigator() {
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
      <Tab.Screen name="Ana Sayfa" component={HomeScreen} options={{ headerShown: false }}  />
      <Tab.Screen name="Hicri Takvim" component={HijriConverterScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Kıble" component={QiblaCompassScreen} options={{ headerShown: false }} />
      {/* "Kuran" sekmesinde artık QuranStack kullanılıyor */}
      <Tab.Screen name="Kuran" component={QuranStack} options={{ headerShown: false }}/>
      <Tab.Screen name="Ayarlar" component={SettingsScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PrivacyPolicy" 
        component={PrivacyPolicyScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}
