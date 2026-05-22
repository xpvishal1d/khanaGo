import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import RestaurantCard from '../../components/RestaurantCard';
import { COLORS } from '../../constants/colors';
import {
  HomeStackParamList,
  ROUTES,
} from '../../constants/routes';
import { useCart } from '../../context/CartContext';
import { restaurants } from '../../data/restaurants';

type Props = NativeStackScreenProps<HomeStackParamList, typeof ROUTES.HOME>;

export default function HomeScreen({ navigation }: Props) {
  const { itemCount } = useCart();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Tonight&apos;s lineup</Text>
        <Text style={styles.title}>Pick a restaurant and dive into the stack flow.</Text>
        <Text style={styles.subtitle}>
          Each card sends restaurant name and price through params into the
          detail screen.
        </Text>

        <Pressable
          onPress={() => navigation.navigate(ROUTES.CART)}
          style={styles.heroButton}
        >
          <Text style={styles.heroButtonText}>
            Open cart {itemCount > 0 ? `(${itemCount})` : ''}
          </Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {restaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            onPress={() =>
              navigation.navigate(ROUTES.RESTAURANT_DETAIL, {
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
                averagePrice: restaurant.averagePrice,
              })
            }
            restaurant={restaurant}
          />
        ))}
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
    gap: 22,
  },
  hero: {
    backgroundColor: COLORS.ink,
    borderRadius: 28,
    padding: 22,
  },
  eyebrow: {
    color: '#FDBA74',
    textTransform: 'uppercase',
    letterSpacing: 1.3,
    fontWeight: '700',
    fontSize: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    marginTop: 8,
  },
  subtitle: {
    color: '#E5E7EB',
    lineHeight: 22,
    marginTop: 12,
  },
  heroButton: {
    marginTop: 18,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.brand,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  heroButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  list: {
    gap: 18,
    paddingBottom: 24,
  },
});
