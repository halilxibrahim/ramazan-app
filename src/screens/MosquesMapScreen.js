import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MosquesMapScreen() {
  const mosques = [
    { id: 1, name: 'Merkez Camii', latitude: 41.012, longitude: 28.976 },
    // ...
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 41.015,
          longitude: 28.979,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {mosques.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            title={m.name}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
