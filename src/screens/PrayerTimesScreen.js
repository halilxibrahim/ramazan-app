import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PrayerTimesList from '../components/PrayerTimesList'; // Import the updated component

export default function PrayerTimesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Günlük Namaz Vakitleri</Text>
      </View>

      <PrayerTimesList /> {/* Use the updated component */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
});
