import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  const navigation = useNavigation();

  // Gelen İngilizce isim üzerinden Türkçe karşılığını döndürür.
  const getTurkishSurahName = (englishName) => {
    return turkishSurahNames[englishName] || englishName;
  };

  // Sayfa yüklendiğinde sure listesini çekiyoruz.
  useEffect(() => {
    fetchSurahs();
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

      {/* Sure listesini gösteriyoruz */}
      <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {(searchQuery.trim() !== '' ? filteredSurahs : surahs).map(surah => (
          <TouchableOpacity 
            key={surah.number} 
            style={styles.surahContainer}
            onPress={() => navigation.navigate('SurahDetail', {
              surahNumber: surah.number,
              englishName: surah.englishName,
              turkishName: getTurkishSurahName(surah.englishName)
            })}
          >
            <View style={styles.surahHeader}>
              <Text style={styles.surahTitle}>
                {getTurkishSurahName(surah.englishName)} ({surah.englishName})
              </Text>
              <Text style={styles.surahNumber}>Sure No: {surah.number}</Text>
            </View>
          </TouchableOpacity>
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
});