import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import {
  AppTabParamList,
  ROUTES,
} from '../../constants/routes';
import { restaurants } from '../../data/restaurants';

type Props = BottomTabScreenProps<AppTabParamList, typeof ROUTES.SEARCH_TAB>;

export default function SearchScreen({ navigation }: Props) {
  const quickPicks = restaurants.slice(0, 3);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Search</Text>
      <Text style={styles.subtitle}>
        This tab uses nested navigation to jump into the Home stack from outside
        of it.
      </Text>

      {quickPicks.map(restaurant => (
        <Pressable
          key={restaurant.id}
          onPress={() =>
            navigation.navigate(ROUTES.HOME_TAB, {
              screen: ROUTES.RESTAURANT_DETAIL,
              params: {
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
                averagePrice: restaurant.averagePrice,
              },
            })
          }
          style={styles.card}
        >
          <Text style={styles.cardTitle}>
            {restaurant.heroEmoji} {restaurant.name}
          </Text>
          <Text style={styles.cardText}>
            {restaurant.cuisine} • Rs. {restaurant.averagePrice} • {restaurant.eta}
          </Text>
        </Pressable>
      ))}
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
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
  },
  subtitle: {
    color: COLORS.inkSoft,
    lineHeight: 22,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.ink,
  },
  cardText: {
    marginTop: 8,
    color: COLORS.inkSoft,
  },
});
