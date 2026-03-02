import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

export default function NotFoundScreen() {
  const { theme } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: '900',
      color: theme.text,
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 16,
      color: theme.subtext,
      marginBottom: 32,
      textAlign: 'center',
    },
    button: {
      backgroundColor: theme.purple,
      paddingHorizontal: 32,
      paddingVertical: 14,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
    },
  }), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen Not Found</Text>
      <Text style={styles.subtitle}>This screen does not exist.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}
