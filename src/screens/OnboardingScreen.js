import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function OnboardingScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hoşgeldiniz!</Text>
      <Text style={styles.subtitle}>Ramazan ayı boyunca oruç tutma, iftar ve sahur vakitlerini takip edin.</Text>
      <Image source={require("../../assets/ilu.png")} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Başla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 30,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a7b37f',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#2e7808',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#90b37f',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;