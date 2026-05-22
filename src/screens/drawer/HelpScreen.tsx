import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Deep link test</Text>
        <Text style={styles.text}>foodapp://restaurant/123</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Navigation tips</Text>
        <Text style={styles.text}>
          Home uses a nested stack, Profile uses a nested drawer, and auth state
          decides which navigator tree mounts first.
        </Text>
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
  label: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
  },
  text: {
    marginTop: 8,
    color: COLORS.inkSoft,
    lineHeight: 22,
  },
});
