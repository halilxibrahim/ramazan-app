// src/screens/HijriConverterScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

export default function HijriConverterScreen() {
  // Miladi için state'ler
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  
  // Hicri için state'ler
  const [hijriDay, setHijriDay] = useState('');
  const [hijriMonth, setHijriMonth] = useState('');
  const [hijriYear, setHijriYear] = useState('');
  
  // UI state'leri
  const [activeTab, setActiveTab] = useState('miladi'); // 'miladi' veya 'hijri'
  const [convertedDate, setConvertedDate] = useState(null);

  // Dönüşüm sonucu Hicri tarih (ör: "18-06-1444")
  const [hijriDate, setHijriDate] = useState(null);

  // Hicri takvim (seçilen ay/yıl’ın gün/gün listesi)
  const [hijriCalendarData, setHijriCalendarData] = useState([]);
  const [calendarLoading, setCalendarLoading] = useState(false);

  // Add new state for Gregorian calendar
  const [gregorianCalendarData, setGregorianCalendarData] = useState([]);
  const [gregorianDate, setGregorianDate] = useState(null);

  const handleConvertToHijri = async () => {
    if (!day || !month || !year) {
      Alert.alert('Uyarı', 'Lütfen geçerli bir gün, ay ve yıl giriniz.');
      return;
    }

    const dateParam = `${day}-${month}-${year}`;
    const url = `https://api.aladhan.com/v1/gToH?date=${dateParam}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.code === 200) {
        const hijri = json.data.hijri.date;
        const gregorian = `${day}-${month}-${year}`;
        setConvertedDate(hijri);
        setHijriDate(hijri); // Takvim için
        setGregorianDate(gregorian);
      } else {
        Alert.alert('Hata', 'Dönüştürme işlemi başarısız oldu!');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Hata', 'API isteği sırasında bir sorun oluştu.');
    }
  };

  const handleConvertToGregorian = async () => {
    if (!hijriDay || !hijriMonth || !hijriYear) {
      Alert.alert('Uyarı', 'Lütfen geçerli bir hicri tarih giriniz.');
      return;
    }

    const dateParam = `${hijriDay}-${hijriMonth}-${hijriYear}`;
    const url = `https://api.aladhan.com/v1/hToG?date=${dateParam}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.code === 200) {
        const gregorian = json.data.gregorian.date;
        const hijriDateStr = `${hijriDay}-${hijriMonth}-${hijriYear}`;
        setConvertedDate(gregorian);
        setGregorianDate(gregorian);
        setHijriDate(hijriDateStr);
      } else {
        Alert.alert('Hata', 'Dönüştürme işlemi başarısız oldu!');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Hata', 'API isteği sırasında bir sorun oluştu.');
    }
  };

  // hijriDate değiştiğinde (örneğin "18-06-1444"),
  // bu değerden "ay" ve "yıl"ı çekip, ilgili tüm ayın takvimini API'den alalım
  useEffect(() => {
    if (activeTab === 'miladi' && hijriDate) {
      fetchHijriCalendar();
    } else if (activeTab === 'hijri' && gregorianDate) {
      fetchGregorianCalendar();
    }
  }, [hijriDate, gregorianDate, activeTab]);

  const fetchHijriCalendar = async () => {
    try {
      setCalendarLoading(true);

      // hijriDate formatı: "DD-MM-YYYY"
      const [hDay, hMonth, hYear] = hijriDate.split('-');

      // AlAdhan "hijriCalendarByCity" endpoint
      // Örnekte city=Istanbul, country=Turkey; method=2 => Diyanet'e yakın
      const url = `https://api.aladhan.com/v1/hijriCalendarByCity?city=Istanbul&country=Turkey&method=2&month=${hMonth}&year=${hYear}`;

      const response = await fetch(url);
      const json = await response.json();

      if (json.code === 200 && Array.isArray(json.data)) {
        // data, ayın her günü için bir obje içerir
        // json.data.length -> o ayın gün sayısı
        setHijriCalendarData(json.data);
      } else {
        console.log('Takvim beklenmedik yanıt:', json);
        Alert.alert('Hata', 'Hicri takvim alınamadı!');
      }
    } catch (error) {
      console.log('Hicri takvim hatası:', error);
      Alert.alert('Hata', 'Hicri takvim alınamadı!');
    } finally {
      setCalendarLoading(false);
    }
  };

  // Add new function for fetching Gregorian calendar
  const fetchGregorianCalendar = async () => {
    try {
      setCalendarLoading(true);
      const [gDay, gMonth, gYear] = gregorianDate.split('-');
      
      // Using the calendar by city endpoint for Gregorian calendar
      const url = `https://api.aladhan.com/v1/calendarByCity/${gYear}/${gMonth}?city=Istanbul&country=Turkey&method=2`;
      
      const response = await fetch(url);
      const json = await response.json();

      if (json.code === 200 && Array.isArray(json.data)) {
        setGregorianCalendarData(json.data);
      } else {
        console.log('API Response:', json);
        Alert.alert('Hata', 'Miladi takvim alınamadı!');
      }
    } catch (error) {
      console.log('Miladi takvim hatası:', error);
      Alert.alert('Hata', 'Miladi takvim alınamadı!');
    } finally {
      setCalendarLoading(false);
    }
  };

  // Takvimi liste şeklinde göstermek için bir öğe oluşturuyoruz
  const renderCalendarItem = ({ item }) => {
    if (activeTab === 'miladi') {
      const hijri = item.date.hijri;
      return (
        <View style={styles.calendarItem}>
          <Text style={styles.calendarDayText}>{hijri.day}</Text>
          <View style={styles.calendarDetailContainer}>
            <Text style={styles.calendarMonthText}>{hijri.month.en}</Text>
            <Text style={styles.calendarYearText}>{hijri.year}</Text>
          </View>
        </View>
      );
    } else {
      const gregorian = item.date.gregorian;
      return (
        <View style={styles.calendarItem}>
          <Text style={styles.calendarDayText}>{gregorian.day}</Text>
          <View style={styles.calendarDetailContainer}>
            <Text style={styles.calendarMonthText}>{gregorian.month.en}</Text>
            <Text style={styles.calendarYearText}>{gregorian.year}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'miladi' && styles.activeTab]}
            onPress={() => setActiveTab('miladi')}
          >
            <Text style={[styles.tabText, activeTab === 'miladi' && styles.activeTabText]}>
              Miladi → Hicri
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'hijri' && styles.activeTab]}
            onPress={() => setActiveTab('hijri')}
          >
            <Text style={[styles.tabText, activeTab === 'hijri' && styles.activeTabText]}>
              Hicri → Miladi
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'miladi' ? (
          <>
            <Text style={styles.title}>Miladi Tarih Girişi</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Gün"
                keyboardType="numeric"
                maxLength={2}
                value={day}
                onChangeText={setDay}
                placeholderTextColor="#666"
              />
              <TextInput
                style={styles.input}
                placeholder="Ay"
                keyboardType="numeric"
                maxLength={2}
                value={month}
                onChangeText={setMonth}
                placeholderTextColor="#666"
              />
              <TextInput
                style={styles.input}
                placeholder="Yıl"
                keyboardType="numeric"
                maxLength={4}
                value={year}
                onChangeText={setYear}
                placeholderTextColor="#666"
              />
            </View>
            <TouchableOpacity 
              style={styles.convertButton} 
              onPress={handleConvertToHijri}
            >
              <Text style={styles.convertButtonText}>Hicri Tarihe Dönüştür</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Hicri Tarih Girişi</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Gün"
                keyboardType="numeric"
                maxLength={2}
                value={hijriDay}
                onChangeText={setHijriDay}
                placeholderTextColor="#666"
              />
              <TextInput
                style={styles.input}
                placeholder="Ay"
                keyboardType="numeric"
                maxLength={2}
                value={hijriMonth}
                onChangeText={setHijriMonth}
                placeholderTextColor="#666"
              />
              <TextInput
                style={styles.input}
                placeholder="Yıl"
                keyboardType="numeric"
                maxLength={4}
                value={hijriYear}
                onChangeText={setHijriYear}
                placeholderTextColor="#666"
              />
            </View>
            <TouchableOpacity 
              style={styles.convertButton} 
              onPress={handleConvertToGregorian}
            >
              <Text style={styles.convertButtonText}>Miladi Tarihe Dönüştür</Text>
            </TouchableOpacity>
          </>
        )}

        {convertedDate && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {activeTab === 'miladi' ? 'Hicri Tarih:' : 'Miladi Tarih:'}
            </Text>
            <Text style={styles.resultDate}>{convertedDate}</Text>
          </View>
        )}
      </View>

      {/* Takvim bölümü sadece Miladi→Hicri dönüşümünde gösterilecek */}
      {convertedDate && (
        <View style={styles.calendarContainer}>
          <Text style={styles.calendarTitle}>
            {activeTab === 'miladi' ? 'Hicri Takvim' : 'Miladi Takvim'}
          </Text>
          
          {calendarLoading ? (
            <ActivityIndicator size="large" color="#2e7d32" />
          ) : (
            <FlatList
              data={activeTab === 'miladi' ? hijriCalendarData : gregorianCalendarData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCalendarItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
    color: '#333',
  },
  convertButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  convertButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#2e7d32',
    marginBottom: 8,
  },
  resultDate: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  calendarContainer: {
    marginTop: 20,
    flex: 1,
  },
  calendarTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
    color: '#2e7d32',
  },
  calendarItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  calendarDayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    width: 40,
  },
  calendarDetailContainer: {
    marginLeft: 15,
    flex: 1,
  },
  calendarMonthText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  calendarYearText: {
    fontSize: 14,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2e7d32',
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
});
