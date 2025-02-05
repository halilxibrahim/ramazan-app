import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setQuranProgress } from '../store/slice/userSlice';

export default function QuranReadingScreen() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages] = useState(604); // Kuran'ın toplam sayfa sayısı

  useEffect(() => {
    fetchPageVerses(currentPage);
  }, [currentPage]);

  const fetchPageVerses = async (page) => {
    try {
      setLoading(true);
      // Her sayfada ortalama 15 ayet olduğunu varsayalım
      const startVerse = (page - 1) * 15 + 1;
      const response = await fetch(`https://api.alquran.cloud/v1/page/${page}/quran-uthmani`);
      const data = await response.json();
      setVerses(data.data.ayahs);
      setError(null);
    } catch (err) {
      setError('Sayfa yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    const page = Math.min(Math.max(1, parseInt(pageNumber)), totalPages);
    setCurrentPage(page);
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
      <View style={styles.pageNavigator}>
        <TouchableOpacity 
          style={[styles.navButton, currentPage === 1 && styles.disabledButton]} 
          onPress={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.buttonText}>Önceki Sayfa</Text>
        </TouchableOpacity>
        
        <View style={styles.pageInputContainer}>
          <TextInput
            style={styles.pageInput}
            keyboardType="numeric"
            value={String(currentPage)}
            onChangeText={(text) => goToPage(text)}
            maxLength={3}
          />
          <Text style={styles.pageText}>/ {totalPages}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.navButton, currentPage === totalPages && styles.disabledButton]}
          onPress={goToNextPage}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.buttonText}>Sonraki Sayfa</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {verses.map((verse, index) => (
          <View key={verse.number} style={styles.verseContainer}>
            <Text style={styles.arabicText}>{verse.text}</Text>
            <Text style={styles.translationText}>
              {verse.surah.name} - Ayet {verse.numberInSurah}
            </Text>
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
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  pageNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  navButton: {
    backgroundColor: '#2e7d32',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    width: 50,
    textAlign: 'center',
    marginRight: 5,
  },
  pageText: {
    fontSize: 16,
    color: '#666',
  },
  verseContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  arabicText: {
    fontSize: 24,
    textAlign: 'right',
    color: '#333',
    marginBottom: 16,
    fontFamily: 'System',
  },
  translationText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
  }
});
