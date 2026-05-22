import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { COLORS } from '../../constants/colors';
import {
  HomeStackParamList,
  ROUTES,
} from '../../constants/routes';
import { useCart } from '../../context/CartContext';
import { findRestaurantById } from '../../data/restaurants';

type Props = NativeStackScreenProps<
  HomeStackParamList,
  typeof ROUTES.RESTAURANT_DETAIL
>;

export default function RestaurantDetailScreen({ navigation, route }: Props) {
  const { addToCart } = useCart();
  const restaurant = findRestaurantById(route.params.restaurantId);

  if (!restaurant) {
    return (
      <View style={styles.missingContainer}>
        <Text style={styles.missingTitle}>Restaurant not found</Text>
        <Text style={styles.missingText}>
          No data matched restaurant id {route.params.restaurantId}.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.heroCard, { backgroundColor: restaurant.accent }]}>
        <Text style={styles.heroEmoji}>{restaurant.heroEmoji}</Text>
        <Text style={styles.heroTitle}>
          {route.params.restaurantName ?? restaurant.name}
        </Text>
        <Text style={styles.heroMeta}>
          {restaurant.cuisine} • {restaurant.rating} stars • {restaurant.eta}
        </Text>
        <Text style={styles.heroText}>{restaurant.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Average order price</Text>
        <Text style={styles.price}>Rs. {route.params.averagePrice ?? restaurant.averagePrice}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why people order here</Text>
        <View style={styles.tagWrap}>
          {restaurant.tags.map(tag => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          onPress={() => {
            addToCart(restaurant);
          }}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Add to Cart</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate(ROUTES.CART)}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Go to Cart</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    gap: 18,
  },
  heroCard: {
    borderRadius: 30,
    padding: 24,
  },
  heroEmoji: {
    fontSize: 54,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 10,
  },
  heroMeta: {
    color: '#FFEDD5',
    fontWeight: '700',
    marginTop: 10,
  },
  heroText: {
    color: '#FFFFFF',
    lineHeight: 22,
    marginTop: 12,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
  },
  sectionTitle: {
    color: COLORS.inkSoft,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  },
  price: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.ink,
    marginTop: 8,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 14,
  },
  tag: {
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tagText: {
    color: COLORS.brandDark,
    fontWeight: '700',
  },
  buttonRow: {
    gap: 12,
    paddingBottom: 20,
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
    fontSize: 16,
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
    fontSize: 16,
  },
  missingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: COLORS.background,
  },
  missingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.ink,
  },
  missingText: {
    marginTop: 10,
    color: COLORS.inkSoft,
    textAlign: 'center',
  },
});
