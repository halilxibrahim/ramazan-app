// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import PrayerTimesList from '../components/PrayerTimesList';
import PrayerCard from '../components/PrayerCard';

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{currentDate}</Text>
        <View>
          <PrayerCard />
        </View>
      </View>
      <PrayerTimesList/>

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
