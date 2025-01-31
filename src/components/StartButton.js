// src/components/StartButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function StartButton({
  title = 'Başla',
  variant = 'primary', // "primary" | "secondary" gibi
  onPress,
}) {
  const { theme } = useTheme();
  const styles = getStyles(theme, variant);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      {/* Eğer secondary ise ikona da yer verebilirsiniz */}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const getStyles = (theme, variant) =>
  StyleSheet.create({
    button: {
      width: 250,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: variant === 'primary' ? theme.background : 'transparent',
      borderWidth: variant === 'secondary' ? 1 : 0,
      borderColor: variant === 'secondary' ? theme.text : 'transparent',
    },
    text: {
      color: variant === 'primary' ? theme.text : theme.text,
      fontWeight: 'bold',
    },
  });
