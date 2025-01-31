import * as Notifications from 'expo-notifications';

// Ezan vaktine kısa süre kala bir planlanmış bildirim kurulumu
Notifications.scheduleNotificationAsync({
  content: {
    title: 'Ezan Vakti',
    body: 'Öğle namazı vakti yaklaşıyor!',
  },
  trigger: {
    seconds: 60 * 30, // 30 dakika öncesi
  },
});
