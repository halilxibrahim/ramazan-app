import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import Svg, { Line, Circle, Text as SvgText, G, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function QiblaCompassScreen() {
  const [subscription, setSubscription] = useState(null);
  const [degree, setDegree] = useState(0);
  
  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
        angle = (angle < 0) ? angle + 360 : angle;
        setDegree(angle);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  // İstanbul için yaklaşık Kıble açısı (güneye göre)
  const qiblaAngle = 203;
  const screenWidth = Dimensions.get('window').width;
  const compassSize = screenWidth - 40;
  const center = compassSize / 2;

  const renderCompassMarkers = () => {
    const markers = [];
    for (let i = 0; i < 360; i += 30) {
      const angle = (i - 90) * Math.PI / 180;
      const length = i % 90 === 0 ? 20 : 10;
      markers.push(
        <G key={i}>
          <Line
            x1={center + (center - 30) * Math.cos(angle)}
            y1={center + (center - 30) * Math.sin(angle)}
            x2={center + (center - 30 - length) * Math.cos(angle)}
            y2={center + (center - 30 - length) * Math.sin(angle)}
            stroke="#333"
            strokeWidth={i % 90 === 0 ? "2" : "1"}
          />
          {i % 90 === 0 && (
            <SvgText
              x={center + (center - 60) * Math.cos(angle)}
              y={center + (center - 60) * Math.sin(angle)}
              fontSize="16"
              fill="#333"
              textAnchor="middle"
              alignmentBaseline="central"
            >
              {i === 0 ? 'N' : i === 90 ? 'E' : i === 180 ? 'S' : 'W'}
            </SvgText>
          )}
        </G>
      );
    }
    return markers;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Kıble Pusulası</Text>
          <Text style={styles.subtitle}>
            Telefonu düz tutarak yavaşça döndürün
          </Text>
        </View>

        <View style={styles.compassContainer}>
          <Svg width={compassSize} height={compassSize} style={{ transform: [{ rotate: `${-degree}deg` }] }}>
            <Defs>
              <LinearGradient id="compassGradient" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />
                <Stop offset="1" stopColor="#f0f0f0" stopOpacity="1" />
              </LinearGradient>
            </Defs>

            {/* Ana pusula çemberi */}
            <Circle cx={center} cy={center} r={center - 10} fill="url(#compassGradient)" 
              stroke="#ccc" strokeWidth="2" />
            <Circle cx={center} cy={center} r={center - 40} fill="transparent" 
              stroke="#eee" strokeWidth="1" />

            {/* Derece işaretleri */}
            {renderCompassMarkers()}

            {/* Kıble yönü */}
            <Line
              x1={center}
              y1={center}
              x2={center + (center - 30) * Math.cos((qiblaAngle - 90) * Math.PI / 180)}
              y2={center + (center - 30) * Math.sin((qiblaAngle - 90) * Math.PI / 180)}
              stroke="red"
              strokeWidth="3"
            />
            <Circle cx={center} cy={center} r="5" fill="#333" />
          </Svg>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Pusula Açısı: {Math.round(degree)}°</Text>
          <Text style={styles.infoText}>Kıble Açısı: {qiblaAngle}°</Text>
        </View>
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  compassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 18,
    color: '#2e7d32',
    marginVertical: 5,
    fontWeight: '500',
  },
});
