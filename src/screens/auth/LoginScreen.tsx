import { MaterialIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import {
  AuthStackParamList,
  ROUTES,
} from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.LOGIN>;

export default function LoginScreen({}: Props) {
  const { pendingRestaurantId, signIn } = useAuth();

  const handleLogin = async () => {
    await signIn();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <MaterialIcons color="#FFFFFF" name="delivery-dining" size={32} />
        </View>

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue into the full tab, stack and drawer experience.
        </Text>

        {pendingRestaurantId ? (
          <View style={styles.deepLinkCallout}>
            <Text style={styles.deepLinkTitle}>Deep link queued</Text>
            <Text style={styles.deepLinkText}>
              After login we will open restaurant {pendingRestaurantId} directly.
            </Text>
          </View>
        ) : null}

        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Continue as Vishal</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
  },
  subtitle: {
    marginTop: 10,
    color: COLORS.inkSoft,
    lineHeight: 22,
  },
  deepLinkCallout: {
    marginTop: 22,
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: 18,
    padding: 16,
  },
  deepLinkTitle: {
    color: COLORS.brandDark,
    fontWeight: '800',
  },
  deepLinkText: {
    marginTop: 6,
    color: COLORS.ink,
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
    backgroundColor: COLORS.ink,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
