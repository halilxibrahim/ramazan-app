// src/navigation/QuranStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuranReadingScreen from '../screens/QuranReadingScreen';
import QuranSurahDetailScreen from '../screens/QuranSurahDetailScreen';

const Stack = createStackNavigator();

export default function QuranStack() {
  return (
    <Stack.Navigator>
      {/* Sure listesi ekranı */}
      <Stack.Screen 
        name="SurahList" 
        component={QuranReadingScreen} 
        options={{ headerShown: false }} 
      />
      {/* Sure detay ekranı */}
      <Stack.Screen 
        name="SurahDetail" 
        component={QuranSurahDetailScreen} 
        options={{ title: 'Sure Detay' }} 
      />
    </Stack.Navigator>
  );
}
