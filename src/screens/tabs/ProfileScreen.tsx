import type { DrawerScreenProps } from '@react-navigation/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import {
  ProfileDrawerParamList,
  ROUTES,
} from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';

type Props = DrawerScreenProps<
  ProfileDrawerParamList,
  typeof ROUTES.PROFILE_HOME
>;

export default function ProfileScreen({ navigation }: Props) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.avatar}>{user.name.charAt(0)}</Text>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.handle}>{user.handle}</Text>
      </View>

      <Pressable onPress={() => navigation.openDrawer()} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Open Drawer Menu</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate(ROUTES.MY_ORDERS)}
        style={styles.secondaryButton}
      >
        <Text style={styles.secondaryButtonText}>Go to My Orders</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 18,
    backgroundColor: COLORS.background,
  },
  hero: {
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 24,
    textAlign: 'center',
    lineHeight: 78,
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    backgroundColor: COLORS.brand,
    overflow: 'hidden',
  },
  name: {
    marginTop: 16,
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.ink,
  },
  handle: {
    marginTop: 6,
    color: COLORS.inkSoft,
  },
  primaryButton: {
    backgroundColor: COLORS.ink,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    color: COLORS.brand,
    fontWeight: '800',
  },
});
