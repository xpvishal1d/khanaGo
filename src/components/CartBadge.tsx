import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';

type CartBadgeProps = {
  count: number;
};

export default function CartBadge({ count }: CartBadgeProps) {
  if (count <= 0) {
    return null;
  }

  return (
    <View style={styles.badge}>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 18,
    paddingHorizontal: 5,
    height: 18,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.badge,
  },
  count: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
