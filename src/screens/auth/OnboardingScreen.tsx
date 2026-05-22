import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import {
  AuthStackParamList,
  ROUTES,
} from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.ONBOARDING>;

export default function OnboardingScreen({ navigation }: Props) {
  const { completeOnboarding } = useAuth();

  const handleGetStarted = async () => {
    await completeOnboarding();
    navigation.replace(ROUTES.LOGIN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.heroEmoji}>🛵</Text>
        <Text style={styles.eyebrow}>Food Delivery App</Text>
        <Text style={styles.title}>Fast food discovery with real navigation flow.</Text>
        <Text style={styles.subtitle}>
          Explore nested stacks, tabs, drawers, deep links and auth state in one
          smooth Expo app.
        </Text>
      </View>

      <View style={styles.points}>
        <Text style={styles.point}>• Browse featured restaurants</Text>
        <Text style={styles.point}>• Jump into details with params</Text>
        <Text style={styles.point}>• Manage cart and orders with persistent state</Text>
      </View>

      <Pressable onPress={handleGetStarted} style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 84,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
  },
  heroCard: {
    backgroundColor: COLORS.brand,
    borderRadius: 30,
    padding: 28,
  },
  heroEmoji: {
    fontSize: 56,
    marginBottom: 18,
  },
  eyebrow: {
    color: '#FED7AA',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40,
    marginTop: 10,
  },
  subtitle: {
    color: '#FFEDD5',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 14,
  },
  points: {
    gap: 14,
    paddingHorizontal: 6,
  },
  point: {
    fontSize: 16,
    color: COLORS.ink,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.ink,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
