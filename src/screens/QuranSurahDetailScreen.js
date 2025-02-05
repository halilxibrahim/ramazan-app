import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

export default function QuranSurahDetailScreen({ route }) {
  const { surahNumber, englishName, turkishName } = route.params;
  const [surahDetail, setSurahDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSurahDetail();
  }, []);

  const fetchSurahDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`);
      const data = await response.json();
      setSurahDetail(data.data);
      setError(null);
    } catch (err) {
      setError("Sure detayları yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2e7d32" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        {turkishName} ({englishName})
      </Text>
      <ScrollView style={styles.scrollContainer}>
        {surahDetail.ayahs.map(ayah => (
          <View key={ayah.number} style={styles.verseContainer}>
            <Text style={styles.verseText}>{ayah.text}</Text>
            <Text style={styles.verseNumber}>Ayet: {ayah.numberInSurah}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    padding: 16 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 16,
  },
  scrollContainer: { 
    flex: 1,
  },
  verseContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  verseText: {
    fontSize: 24,
    textAlign: 'right',
    color: '#333',
    marginBottom: 8,
  },
  verseNumber: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
