import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.card}>
        <Text style={styles.itemTitle}>Mock notifications</Text>
        <Text style={styles.itemText}>Enabled for order updates and delivery alerts.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.itemTitle}>Saved address</Text>
        <Text style={styles.itemText}>221B Navigation Street, Expo City</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
  },
  itemText: {
    marginTop: 6,
    color: COLORS.inkSoft,
    lineHeight: 22,
  },
});
