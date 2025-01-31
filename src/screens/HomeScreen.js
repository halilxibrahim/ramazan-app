// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

// (Önemli) Android’de bildirim kanalı tanımlama (sadece 1 kez yapılır)
Notifications.setNotificationChannelAsync('ezan-channel', {
  name: 'Ezan Kanalı',
  importance: Notifications.AndroidImportance.HIGH,
});

export default function HomeScreen() {
  const currentDate = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const nextPrayer = {
    name: 'Öğle',
    time: '13:12',
    remainingTime: '2 saat 30 dakika',
  };

  const prayerTimes = [
    { name: 'İmsak', time: '05:30' },
    { name: 'Güneş', time: '07:02' },
    { name: 'Öğle', time: '13:12' },
    { name: 'İkindi', time: '16:32' },
    { name: 'Akşam', time: '19:21' },
    { name: 'Yatsı', time: '20:51' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{currentDate}</Text>
        <View style={styles.nextPrayerCard}>
          <Text style={styles.nextPrayerTitle}>Sonraki Namaz</Text>
          <Text style={styles.nextPrayerName}>{nextPrayer.name}</Text>
          <Text style={styles.nextPrayerTime}>{nextPrayer.time}</Text>
          <Text style={styles.remainingTime}>Kalan Süre: {nextPrayer.remainingTime}</Text>
        </View>
      </View>

      <View style={styles.prayerTimesContainer}>
        {prayerTimes.map((prayer, index) => (
          <View key={index} style={styles.prayerTimeItem}>
            <Text style={styles.prayerName}>{prayer.name}</Text>
            <Text style={styles.prayerTime}>{prayer.time}</Text>
          </View>
        ))}
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="compass" size={24} color="#2e7d32" />
          <Text style={styles.actionText}>Kıble Pusulası</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="book" size={24} color="#2e7d32" />
          <Text style={styles.actionText}>Kuran-ı Kerim</Text>
        </TouchableOpacity>
      </View>
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
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
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
  prayerTimesContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 15,
  },
  prayerTimeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  prayerName: {
    fontSize: 16,
    color: '#333',
  },
  prayerTime: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  actionText: {
    marginTop: 5,
    color: '#2e7d32',
    fontSize: 14,
  },
});
