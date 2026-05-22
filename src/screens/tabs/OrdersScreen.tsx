import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import {
  AppTabParamList,
  ROUTES,
} from '../../constants/routes';
import { useCart } from '../../context/CartContext';

type Props = BottomTabScreenProps<AppTabParamList, typeof ROUTES.ORDERS_TAB>;

export default function OrdersScreen({ navigation }: Props) {
  const { items, orders, total } = useCart();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Orders</Text>
      <Text style={styles.subtitle}>
        The tab badge appears whenever the cart has items.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active cart</Text>

        {items.length === 0 ? (
          <Text style={styles.emptyText}>No active items in cart yet.</Text>
        ) : (
          <>
            {items.map(item => (
              <View key={item.restaurantId} style={styles.row}>
                <Text style={styles.rowText}>
                  {item.name} x {item.quantity}
                </Text>
                <Text style={styles.rowValue}>Rs. {item.averagePrice * item.quantity}</Text>
              </View>
            ))}
            <Text style={styles.total}>Total: Rs. {total}</Text>

            <Pressable
              onPress={() =>
                navigation.navigate(ROUTES.HOME_TAB, {
                  screen: ROUTES.CART,
                })
              }
              style={styles.button}
            >
              <Text style={styles.buttonText}>Open Cart</Text>
            </Pressable>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Placed orders</Text>
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>Checkout from Cart to create order history.</Text>
        ) : (
          orders.map(order => (
            <View key={order.id} style={styles.orderCard}>
              <Text style={styles.orderId}>{order.id}</Text>
              <Text style={styles.orderMeta}>{order.placedAt}</Text>
              <Text style={styles.orderMeta}>Rs. {order.total}</Text>
            </View>
          ))
        )}
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
    paddingBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
  },
  subtitle: {
    color: COLORS.inkSoft,
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.ink,
  },
  emptyText: {
    color: COLORS.inkSoft,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowText: {
    color: COLORS.ink,
    fontWeight: '600',
  },
  rowValue: {
    color: COLORS.inkSoft,
  },
  total: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.brandDark,
  },
  button: {
    marginTop: 8,
    backgroundColor: COLORS.ink,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  orderCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 18,
    padding: 16,
  },
  orderId: {
    color: COLORS.ink,
    fontWeight: '800',
  },
  orderMeta: {
    color: COLORS.inkSoft,
    marginTop: 4,
  },
});
