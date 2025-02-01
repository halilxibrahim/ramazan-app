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
  // Kullanıcıdan alınan miladi değerler
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Dönüşüm sonucu Hicri tarih (ör: "18-06-1444")
  const [hijriDate, setHijriDate] = useState(null);

  // Hicri takvim (seçilen ay/yıl’ın gün/gün listesi)
  const [hijriCalendarData, setHijriCalendarData] = useState([]);
  const [calendarLoading, setCalendarLoading] = useState(false);

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
        // "json.data.hijri.date" -> "18-06-1444" gibi döner
        const hijri = json.data.hijri.date;
        setHijriDate(hijri);
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
    if (hijriDate) {
      fetchHijriCalendar();
    }
  }, [hijriDate]);

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

  // Takvimi liste şeklinde göstermek için bir öğe oluşturuyoruz
  const renderCalendarItem = ({ item }) => {
    const hijri = item.date.hijri; 
    const hijriDay = hijri.day;
    const hijriMonthEn = hijri.month.en; 
    const hijriYear = hijri.year;
    
    return (
      <View style={styles.calendarItem}>
        <Text style={styles.calendarDayText}>{hijriDay}</Text>
        <View style={styles.calendarDetailContainer}>
          <Text style={styles.calendarMonthText}>{hijriMonthEn}</Text>
          <Text style={styles.calendarYearText}>{hijriYear}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Miladi → Hicri Tarih Dönüştürücü</Text>
        
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

        {hijriDate && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Hicri Tarih:</Text>
            <Text style={styles.resultDate}>{hijriDate}</Text>
          </View>
        )}
      </View>

      {hijriDate && (
        <View style={styles.calendarContainer}>
          <Text style={styles.calendarTitle}>Hicri Takvim</Text>
          
          {calendarLoading ? (
            <ActivityIndicator size="large" color="#2e7d32" />
          ) : (
            <FlatList
              data={hijriCalendarData}
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
});
