import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PrayerCard({ nextPrayer }) {
  const getPrayerIcon = (prayerName) => {
    switch (prayerName) {
      case 'Imsak': // formerly İmsak
        return { name: 'weather-night', color: '#c7c7c7' };
      case 'Gunes': // formerly Güneş
        return { name: 'weather-sunset-up', color: '#ff9800' };
      case 'Ogle': // formerly Öğle
        return { name: 'white-balance-sunny', color: '#ffd700' };
      case 'Ikindi': // formerly İkindi
        return { name: 'weather-partly-cloudy', color: '#fb8c00' };
      case 'Aksam': // formerly Akşam
        return { name: 'weather-sunset-down', color: '#f57c00' };
      case 'Yatsi': // formerly Yatsı
        return { name: 'weather-night', color: '#455a64' };
      default:
        return { name: 'clock-outline', color: '#ffffff' };
    }
  };

  if (!nextPrayer) return null;
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
    backgroundColor: '#328037',
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
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
