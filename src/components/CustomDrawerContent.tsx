import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  const { signOut, user } = useAuth();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.handle}>{user.handle}</Text>
      </View>

      <View style={styles.list}>
        <DrawerItemList {...props} />
      </View>

      <DrawerItem
        label="Logout"
        labelStyle={styles.logoutLabel}
        icon={({ color, size }) => (
          <MaterialIcons color={color} name="logout" size={size} />
        )}
        onPress={() => {
          void signOut();
        }}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    backgroundColor: COLORS.brand,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  handle: {
    color: '#FFEDD5',
    marginTop: 2,
  },
  list: {
    paddingTop: 10,
    flex: 1,
  },
  logoutLabel: {
    color: COLORS.danger,
    fontWeight: '700',
  },
});
