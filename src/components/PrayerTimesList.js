import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import PrayerCard from './PrayerCard'; // new import

export default function PrayerTimesList() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null); // new state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Uygulama açılır açılmaz çalışır.
    getLocationAndFetchTimes();
  }, []);

  // Helper to calculate remaining time
  const calculateTimeDifference = (prayerDate, now) => {
    const diff = prayerDate - now;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours ? hours + ' saat ' : ''}${remainingMinutes} dakika`;
  };

  // Helper to compute next prayer based on today's timings order
  const getNextPrayer = (times) => {
    if (!times) return null;
    const now = new Date();
    const order = ['Imsak', 'Gunes', 'Ogle', 'Ikindi', 'Aksam', 'Yatsi'];
    for (let key of order) {
      const [h, m] = times[key].split(':');
      const prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
      if (prayerDate > now) {
        return { name: key, time: times[key], remainingTime: calculateTimeDifference(prayerDate, now) };
      }
    }
    // If no prayer left today, return the first prayer of next day.
    const [h, m] = times[order[0]].split(':');
    const prayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, h, m);
    return { name: order[0], time: times[order[0]], remainingTime: calculateTimeDifference(prayerDate, now) };
  };

  // 1) Konum iste ve sonra API'den namaz saatlerini çek
  const getLocationAndFetchTimes = async () => {
    try {
      setLoading(true);

      // Konum izin isteği
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'İzin Gerekli',
          'Konum izinleri verilmedi! Ayarlar > İzinler kısmından konum izni vermelisiniz.'
        );
        setLoading(false);
        return;
      }

      // Konum al (cihaz GPS kapalıysa hata alabilirsin)
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Şimdi API'den namaz vakitlerini çek
      await fetchPrayerTimes(latitude, longitude);
    } catch (error) {
      console.log('Konum veya API hatası:', error);
      setLoading(false);
    }
  };

  // 2) AlAdhan API'ye istek atıp veriyi çekiyoruz
  const fetchPrayerTimes = async (lat, lon) => {
    try {
      const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=13`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.code === 200) {
        // Alınan veriyi Türkçe isimlerle saklayalım
        const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = json.data.timings;
        const mappedTimes = {
          Imsak: Fajr,
          Gunes: Sunrise,
          Ogle: Dhuhr,
          Ikindi: Asr,
          Aksam: Maghrib,
          Yatsi: Isha,
        };
        setPrayerTimes(mappedTimes);
        const upcoming = getNextPrayer(mappedTimes);
        setNextPrayer(upcoming);
      } else {
        Alert.alert('Hata', 'Namaz vakitleri alınamadı!');
      }
    } catch (error) {
      console.log('fetchPrayerTimes hatası:', error);
      Alert.alert('Hata', 'Namaz vakitleri alınamadı!');
    } finally {
      setLoading(false);
    }
  };

  // 3) Yükleniyor ekranı
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e7d32" />
        <Text style={{ marginTop: 10 }}>Namaz vakitleri yükleniyor...</Text>
      </View>
    );
  }

  // 4) Vakitleri listele
  return (
    <View>
      {/* Next prayer card */}
      {nextPrayer && <PrayerCard nextPrayer={nextPrayer} />}
      {/* List of all prayer times */}
      <View style={styles.prayerTimesContainer}>
        {prayerTimes && Object.entries(prayerTimes).map(([name, time], index) => (
          <View key={index} style={styles.prayerTimeItem}>
            <Text style={styles.prayerName}>{name}</Text>
            <Text style={styles.prayerTime}>{time}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  prayerTimesContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  prayerTimeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
