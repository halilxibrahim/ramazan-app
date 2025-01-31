import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PrayerCard() {
  const nextPrayer = {
    name: 'Öğle',
    time: '13:12',
    remainingTime: '2 saat 30 dakika',
  };

  const getPrayerIcon = (prayerName) => {
    switch (prayerName) {
      case 'İmsak':
        return { name: 'weather-night', color: '#c7c7c7' };
      case 'Güneş':
        return { name: 'weather-sunset-up', color: '#ff9800' };
      case 'Öğle':
        return { name: 'white-balance-sunny', color: '#ffd700' };
      case 'İkindi':
        return { name: 'weather-partly-cloudy', color: '#fb8c00' };
      case 'Akşam':
        return { name: 'weather-sunset-down', color: '#f57c00' };
      case 'Yatsı':
        return { name: 'weather-night', color: '#455a64' };
      default:
        return { name: 'clock-outline', color: '#ffffff' };
    }
  };

  const icon = getPrayerIcon(nextPrayer.name);

  return (
    <View style={styles.nextPrayerCard}>
      <Icon name={icon.name} size={48} color={icon.color} style={styles.icon} />
      <Text style={styles.nextPrayerTitle}>Sonraki Namaz</Text>
      <Text style={styles.nextPrayerName}>{nextPrayer.name}</Text>
      <Text style={styles.nextPrayerTime}>{nextPrayer.time}</Text>
      <Text style={styles.remainingTime}>Kalan Süre: {nextPrayer.remainingTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nextPrayerCard: {
    backgroundColor: '#1a237e',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    marginBottom: 10,
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
