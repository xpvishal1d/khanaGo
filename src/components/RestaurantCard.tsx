import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';
import type { Restaurant } from '../data/restaurants';

type RestaurantCardProps = {
  restaurant: Restaurant;
  onPress: () => void;
};

export default function RestaurantCard({
  restaurant,
  onPress,
}: RestaurantCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { borderColor: restaurant.accent }]}
    >
      <View style={styles.row}>
        <View style={[styles.hero, { backgroundColor: restaurant.accent }]}>
          <Text style={styles.heroEmoji}>{restaurant.heroEmoji}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>⭐ {restaurant.rating}</Text>
            <Text style={styles.metaText}>{restaurant.eta}</Text>
            <Text style={styles.metaText}>Rs. {restaurant.averagePrice}</Text>
          </View>

          <Text numberOfLines={2} style={styles.description}>
            {restaurant.description}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.cta}>View restaurant</Text>
        <MaterialCommunityIcons
          color={COLORS.brand}
          name="arrow-right"
          size={20}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  hero: {
    width: 74,
    height: 74,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 30,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.ink,
  },
  cuisine: {
    fontSize: 13,
    color: COLORS.brandDark,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.inkSoft,
    fontWeight: '600',
  },
  description: {
    marginTop: 4,
    color: COLORS.inkSoft,
    lineHeight: 20,
  },
  footer: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cta: {
    color: COLORS.brand,
    fontWeight: '800',
  },
});
