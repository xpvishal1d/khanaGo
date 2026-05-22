import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import {
  HomeStackParamList,
  ROUTES,
} from '../../constants/routes';
import { useCart } from '../../context/CartContext';

type Props = NativeStackScreenProps<HomeStackParamList, typeof ROUTES.CART>;

export default function CartScreen({ navigation }: Props) {
  const { checkout, items, removeFromCart, total } = useCart();

  const handleCheckout = () => {
    const parentNavigation = navigation.getParent();
    const order = checkout();

    if (!order) {
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.HOME }],
    });
    parentNavigation?.navigate(ROUTES.ORDERS_TAB);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Cart Summary</Text>
      <Text style={styles.subtitle}>
        Review your current selections before placing the order.
      </Text>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>
            Add an item from a restaurant detail screen to trigger the Orders tab
            badge.
          </Text>

          <Pressable onPress={() => navigation.goBack()} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Go Back</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.list}>
            {items.map(item => (
              <View key={item.restaurantId} style={styles.row}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMeta}>
                    {item.quantity} x Rs. {item.averagePrice}
                  </Text>
                </View>

                <Pressable
                  onPress={() => removeFromCart(item.restaurantId)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </Pressable>
              </View>
            ))}
          </View>

          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Estimated total</Text>
            <Text style={styles.totalValue}>Rs. {total}</Text>
          </View>

          <Pressable onPress={handleCheckout} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Place Order</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Keep Browsing</Text>
          </Pressable>
        </>
      )}
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
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
  },
  subtitle: {
    color: COLORS.inkSoft,
    lineHeight: 22,
  },
  emptyState: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.ink,
  },
  emptyText: {
    color: COLORS.inkSoft,
    lineHeight: 22,
  },
  list: {
    gap: 14,
  },
  row: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
  },
  itemMeta: {
    color: COLORS.inkSoft,
    marginTop: 4,
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
  },
  removeButtonText: {
    color: COLORS.danger,
    fontWeight: '700',
  },
  totalCard: {
    backgroundColor: COLORS.ink,
    borderRadius: 24,
    padding: 20,
  },
  totalLabel: {
    color: '#D1D5DB',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: COLORS.brand,
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
    color: COLORS.ink,
    fontWeight: '800',
    fontSize: 16,
  },
});
