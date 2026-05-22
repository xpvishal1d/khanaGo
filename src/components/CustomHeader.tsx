import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS } from '../constants/colors';
import CartBadge from './CartBadge';

type CustomHeaderProps = {
  title: string;
  canGoBack: boolean;
  backLabel?: string;
  onBack?: () => void;
  backgroundColor?: string;
  rightLabel?: string;
  onRightPress?: () => void;
  rightBadge?: number;
};

export default function CustomHeader({
  title,
  canGoBack,
  backLabel = 'Back',
  onBack,
  backgroundColor = COLORS.brand,
  rightLabel,
  onRightPress,
  rightBadge = 0,
}: CustomHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top, backgroundColor }]}>
      <View style={styles.row}>
        <View style={styles.leftSlot}>
          {canGoBack ? (
            <Pressable onPress={onBack} style={styles.navButton}>
              <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
              <Text style={styles.backLabel}>{backLabel}</Text>
            </Pressable>
          ) : (
            <Text style={styles.brandWordmark}>khanaGo</Text>
          )}
        </View>

        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <View style={styles.rightSlot}>
          {rightLabel && onRightPress ? (
            <Pressable onPress={onRightPress} style={styles.navButton}>
              <Text style={styles.rightLabel}>{rightLabel}</Text>
              <CartBadge count={rightBadge} />
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 14,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  row: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSlot: {
    minWidth: 88,
  },
  rightSlot: {
    minWidth: 88,
    alignItems: 'flex-end',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  rightLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  brandWordmark: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
});
