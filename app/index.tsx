import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { Logo } from '../components/Logo';

export default function HomeScreen() {
  const { theme } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.background,
      borderWidth: 2,
      borderColor: `${theme.accent}26`,
      borderRadius: 0,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    subtitle: {
      fontSize: 18,
      color: theme.subtext,
      marginTop: 16,
      marginBottom: 60,
      textAlign: 'center',
    },
    playButton: {
      backgroundColor: theme.purple,
      paddingHorizontal: 60,
      paddingVertical: 20,
      borderRadius: 12,
      minWidth: 280,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: theme.purple,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 12,
        },
        android: { elevation: 12 },
      }),
    },
    playButtonText: {
      fontSize: 24,
      fontWeight: '900',
      color: theme.text,
      textAlign: 'center',
    },
    multiplayerButton: {
      marginTop: 20,
      backgroundColor: `${theme.accent}1A`,
      paddingHorizontal: 40,
      paddingVertical: 16,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.accent,
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: 280,
      justifyContent: 'center',
    },
    multiplayerButtonText: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.accent,
      marginRight: 12,
    },
    comingSoonBadge: {
      fontSize: 10,
      fontWeight: '900',
      color: theme.background,
      backgroundColor: theme.accent,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
  }), [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundPattern} />
      <View style={styles.content}>
        <Logo width={400} height={160} />
        <Text style={styles.subtitle}>
          Buy right. Sell smart. Beat the chart.
        </Text>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => router.push('/game')}
          activeOpacity={0.8}
        >
          <Text style={styles.playButtonText}>▶ PLAY SOLO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.multiplayerButton}
          onPress={() => {
            Alert.alert(
              '🎮 Multiplayer Mode',
              'Race against friends in real-time!\n\nComing soon...',
              [{ text: 'Got it!', style: 'default' }]
            );
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.multiplayerButtonText}>👥 MULTIPLAYER</Text>
          <Text style={styles.comingSoonBadge}>SOON</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
