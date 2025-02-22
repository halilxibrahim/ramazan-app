import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, TextInput, Animated, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// Türkçe sure isimleri mapping'i: İngilizce isim üzerinden Türkçe karşılıkları belirleniyor.
const turkishSurahNames = {
  "Al-Faatiha": "Fatiha", // added variant mapping
  "Al-Baqara": "Bakara",
  "Al-Baqarah": "Bakara",
  "Aal-i-Imraan": "Al-i İmran",
  "An-Nisaa": "Nisa",
  "Al-Maaida": "Maide",
  "Al-An'aam": "En'am",
  "Al-A'raaf": "A'raf",
  "Al-Anfaal": "Enfal",
  "At-Tawba": "Tevbe",
  "Yunus": "Yunus",
  "Hud": "Hud",
  "Yusuf": "Yusuf",
  "Ar-Ra'd": "Rad",
  "Ibrahim": "İbrahim",
  "Al-Hijr": "Hicr",
  "An-Nahl": "Nahl",
  "Al-Israa": "İsra",
  "Al-Kahf": "Kehf",
  "Maryam": "Meryem",
  "Taa-Haa": "Taha",
  "Al-Anbiyaa": "Enbiya",
  "Al-Hajj": "Hac",
  "Al-Muminoon": "Müminun",
  "An-Noor": "Nur",
  "Al-Furqaan": "Furkan",
  "Ash-Shu'araa": "Şuara",
  "An-Naml": "Neml",
  "Al-Qasas": "Kasas",
  "Al-Ankaboot": "Ankebut",
  "Ar-Room": "Rum",
  "Luqman": "Lokman",
  "As-Sajda": "Secde",
  "Al-Ahzaab": "Ahzab",
  "Saba": "Sebe",
  "Faatir": "Fatır",
  "Yaseen": "Yasin",
  "As-Saaffaat": "Saffat",
  "Saad": "Sad",
  "Az-Zumar": "Zümer",
  "Ghafir": "Gafir",
  "Fussilat": "Fussilet",
  "Ash-Shura": "Şura",
  "Az-Zukhruf": "Zuhruf",
  "Ad-Dukhaan": "Duhan",
  "Al-Jaathiya": "Casiye",
  "Al-Ahqaf": "Ahkaf",
  "Muhammad": "Muhammed",
  "Al-Fath": "Fetih",
  "Al-Hujuraat": "Hucurat",
  "Qaaf": "Kaf",
  "Adh-Dhaariyat": "Zariyat",
  "At-Tur": "Tur",
  "An-Najm": "Necm",
  "Al-Qamar": "Kamer",
  "Ar-Rahmaan": "Rahman",
  "Al-Waaqia": "Vakia",
  "Al-Hadid": "Hadid",
  "Al-Mujaadila": "Mücadele",
  "Al-Hashr": "Haşr",
  "Al-Mumtahana": "Mümtehine",
  "As-Saff": "Saff",
  "Al-Jumu'a": "Cuma",
  "Al-Munaafiqoon": "Münafikun",
  "At-Taghaabun": "Tegabun",
  "At-Talaaq": "Talak",
  "At-Tahrim": "Tahrim",
  "Al-Mulk": "Mülk",
  "Al-Qalam": "Kalem",
  "Al-Haaqqa": "Hakka",
  "Al-Ma'aarij": "Maarij",
  "Nooh": "Nuh",
  "Al-Jinn": "Cin",
  "Al-Muzzammil": "Müzzemmil",
  "Al-Muddathir": "Müddessir",
  "Al-Qiyaama": "Kıyamet",
  "Al-Insaan": "İnsan",
  "Al-Mursalaat": "Mürselat",
  "An-Naba": "Nebe",
  "An-Naazi'aat": "Naziat",
  "Abasa": "Abese",
  "At-Takwir": "Tekvir",
  "Al-Infitar": "İnfitar",
  "Al-Mutaffifin": "Mutaffifin",
  "Al-Inshiqaaq": "İnşikak",
  "Al-Burooj": "Buruc",
  "At-Taariq": "Tarik",
  "Al-A'laa": "A'la",
  "Al-Ghaashiya": "Gasiye",
  "Al-Fajr": "Fecr",
  "Al-Balad": "Beled",
  "Ash-Shams": "Şems",
  "Al-Lail": "Leyle",
  "Ad-Duhaa": "Duha",
  "Ash-Sharh": "İnşirah",
  "At-Tin": "Tin",
  "Al-Alaq": "Alak",
  "Al-Qadr": "Kadr",
  "Al-Bayyina": "Beyyine",
  "Az-Zalzala": "Zilzal",
  "Al-Aadiyaat": "Adiyat",
  "Al-Qaari'a": "Karia",
  "At-Takaathur": "Takasur",
  "Al-Asr": "Asr",
  "Al-Humaza": "Humaze",
  "Al-Fil": "Fil",
  "Quraish": "Kureyş",
  "Al-Maa'un": "Maun",
  "Al-Kawthar": "Kevser",
  "Al-Kaafiroon": "Kafirun",
  "An-Nasr": "Nasr",
  "Al-Masad": "Mesed",
  "Al-Ikhlaas": "İhlas",
  "Al-Falaq": "Felak",
  "An-Naas": "Nas",
};

export default function QuranSurahListScreen() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [lastReadSurah, setLastReadSurah] = useState(null);
  const bookmarkAnimation = new Animated.Value(1);
  const navigation = useNavigation();
  const [readSurahs, setReadSurahs] = useState(new Set());
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Gelen İngilizce isim üzerinden Türkçe karşılığını döndürür.
  const getTurkishSurahName = (englishName) => {
    return turkishSurahNames[englishName] || englishName;
  };

  // Sayfa yüklendiğinde sure listesini ve son okunan sureyi çekiyoruz
  useEffect(() => {
    fetchSurahs();
    loadLastReadSurah();
    loadReadSurahs();
  }, []);

  // Arama sorgusuna göre sure listesini filtreliyoruz.
  useEffect(() => {
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase().trim();
      const filtered = surahs.filter(surah => {
        // API'den gelen sura nesnesi; örneğin: { number, englishName, name, ... }
        const englishName = surah.englishName.toLowerCase();
        const arabicName = surah.name.toLowerCase(); // Arapça sure adı
        const turkishName = getTurkishSurahName(surah.englishName).toLowerCase();

        return englishName.includes(searchTerm) ||
               arabicName.includes(searchTerm) ||
               turkishName.includes(searchTerm);
      });
      setFilteredSurahs(filtered);
    } else {
      setFilteredSurahs([]);
    }
  }, [searchQuery, surahs]);

  // Sure listesini API'den çekiyoruz.
  const fetchSurahs = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.alquran.cloud/v1/surah");
      const data = await response.json();
      setSurahs(data.data);
      setError(null);
    } catch (err) {
      setError("Sureler yüklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // Son okunan sureyi yükleme
  const loadLastReadSurah = async () => {
    try {
      const savedSurah = await AsyncStorage.getItem('lastReadSurah');
      if (savedSurah) {
        setLastReadSurah(JSON.parse(savedSurah));
      }
    } catch (error) {
      console.error('Error loading last read surah:', error);
    }
  };

  // Son okunan sureyi kaydetme
  const saveLastReadSurah = async (surah) => {
    try {
      await AsyncStorage.setItem('lastReadSurah', JSON.stringify(surah));
      setLastReadSurah(surah);
      
      // Bookmark animasyonu
      Animated.sequence([
        Animated.timing(bookmarkAnimation, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(bookmarkAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (error) {
      console.error('Error saving last read surah:', error);
    }
  };

  const loadReadSurahs = async () => {
    try {
      const savedReadSurahs = await AsyncStorage.getItem('readSurahs');
      if (savedReadSurahs) {
        const readSurahsArray = JSON.parse(savedReadSurahs);
        setReadSurahs(new Set(readSurahsArray));
        updateCompletionPercentage(new Set(readSurahsArray));
      }
    } catch (error) {
      console.error('Error loading read surahs:', error);
    }
  };

  const updateCompletionPercentage = (readSurahsSet) => {
    const percentage = (readSurahsSet.size / 114) * 100;
    setCompletionPercentage(Math.round(percentage));
  };

  const toggleReadStatus = async (surahNumber) => {
    try {
      const newReadSurahs = new Set(readSurahs);
      if (newReadSurahs.has(surahNumber)) {
        newReadSurahs.delete(surahNumber);
      } else {
        newReadSurahs.add(surahNumber);
      }
      
      await AsyncStorage.setItem('readSurahs', JSON.stringify([...newReadSurahs]));
      setReadSurahs(newReadSurahs);
      updateCompletionPercentage(newReadSurahs);
    } catch (error) {
      console.error('Error updating read surah status:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#2e7d32" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Başlık ve arama kısmı */}
        <View style={styles.header}>
          {searchMode ? (
            <View style={styles.searchContainer}>
              <Icon name="search" size={24} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Sure ara..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Icon name="close" size={24} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Sureler</Text>
              <TouchableOpacity onPress={() => setSearchMode(!searchMode)}>
                <Icon name="search" size={24} color="#2e7d32" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Okunan Sureler: %{completionPercentage}
          </Text>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${completionPercentage}%` }
              ]} 
            />
          </View>
        </View>

        {/* Sure listesini gösteriyoruz */}
        <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {(searchQuery.trim() !== '' ? filteredSurahs : surahs).map(surah => (
            <TouchableOpacity 
              key={surah.number} 
              style={[
                styles.surahContainer,
                readSurahs.has(surah.number) && styles.readSurah,
                lastReadSurah?.number === surah.number && styles.lastReadSurah
              ]}
              onPress={() => {
                saveLastReadSurah(surah);
                navigation.navigate('SurahDetail', {
                  surahNumber: surah.number,
                  englishName: surah.englishName,
                  turkishName: getTurkishSurahName(surah.englishName)
                });
              }}
            >
              <View style={styles.surahHeader}>
                <View style={styles.surahInfo}>
                  <Text style={styles.surahTitle}>
                    {getTurkishSurahName(surah.englishName)} ({surah.englishName})
                  </Text>
                  <Text style={styles.surahNumber}>Sure No: {surah.number}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => toggleReadStatus(surah.number)}
                  style={styles.checkboxContainer}
                >
                  <Icon 
                    name={readSurahs.has(surah.number) ? "check-circle" : "radio-button-unchecked"} 
                    size={24} 
                    color="#2e7d32" 
                  />
                </TouchableOpacity>
                {lastReadSurah?.number === surah.number && (
                  <Animated.View style={{ transform: [{ scale: bookmarkAnimation }] }}>
                    <Icon name="bookmark" size={24} color="#2e7d32" />
                  </Animated.View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  surahContainer: {
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
  surahHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  surahTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  surahNumber: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  lastReadSurah: {
    borderWidth: 2,
    borderColor: '#2e7d32',
  },
  surahInfo: {
    flex: 1,
  },
  progressContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  progressText: {
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2e7d32',
  },
  readSurah: {
    backgroundColor: '#e8f5e9',
  },
  checkboxContainer: {
    padding: 4,
  },
});