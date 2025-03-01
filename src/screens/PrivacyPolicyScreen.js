import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function PrivacyPolicyScreen({ navigation }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: theme.textColor }]}>← Geri</Text>
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: theme.textColor }]}>Gizlilik Politikası</Text>
      </View>
      
      <ScrollView style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.textColor }]}>
          Ramazan Uygulaması Gizlilik Politikası
        </Text>
        
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Kullanıcı Verileri Hakkında
        </Text>
        <Text style={[styles.paragraph, { color: theme.textColor }]}>
          Ramazan Uygulaması, kullanıcı bilgilerini toplamaz, saklamaz veya üçüncü taraflarla paylaşmaz. 
          Uygulamadaki tüm işlemler cihazınızda yerel olarak gerçekleştirilir.
        </Text>
        
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Veri Saklama
        </Text>
        <Text style={[styles.paragraph, { color: theme.textColor }]}>
          Uygulama, yalnızca tercihlerinizi (karanlık mod gibi) cihazınızda yerel olarak saklar.
          Bu veriler hiçbir şekilde sunucularımıza veya üçüncü taraf hizmetlerine iletilmez.
        </Text>
        
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Uygulama İzinleri
        </Text>
        <Text style={[styles.paragraph, { color: theme.textColor }]}>
          Ramazan Uygulaması yalnızca namaz vakitlerini ve takvim bilgilerini görüntülemek için 
          gerekli olan minimum izinleri talep eder. Cihazınızdaki diğer uygulamalara veya kişisel bilgilere erişmez.
        </Text>
        
        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          Çocukların Gizliliği
        </Text>
        <Text style={[styles.paragraph, { color: theme.textColor }]}>
          Uygulamamız tüm yaş gruplarındaki kullanıcılar için uygundur ve kişisel veri toplamadığından,
          çocukların gizliliğine ilişkin özel endişelere neden olmaz.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.textColor }]}>
          İletişim
        </Text>
        <Text style={[styles.paragraph, { color: theme.textColor }]}>
          Gizlilik politikamız hakkında sorularınız varsa, lütfen bizimle iletişime geçin.
        </Text>
        
        <Text style={[styles.updateText, { color: theme.textColor }]}>
          Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:56,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 30,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'justify',
  },
  updateText: {
    marginTop: 24,
    marginBottom: 40,
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  }
});
