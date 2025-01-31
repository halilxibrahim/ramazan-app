import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PrayerCard() {
  const nextPrayer = {
    name: 'Öğle',
    time: '13:12',
    remainingTime: '2 saat 30 dakika',
  };

  return (
    <View style={styles.nextPrayerCard}>
      <Text style={styles.nextPrayerTitle}>Sonraki Namaz</Text>
      <Text style={styles.nextPrayerName}>{nextPrayer.name}</Text>
      <Text style={styles.nextPrayerTime}>{nextPrayer.time}</Text>
      <Text style={styles.remainingTime}>Kalan Süre: {nextPrayer.remainingTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nextPrayerCard: {
    backgroundColor: '#2e7d32',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextPrayerTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  nextPrayerName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  nextPrayerTime: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  remainingTime: {
    color: '#fff',
    fontSize: 16,
  },
});
