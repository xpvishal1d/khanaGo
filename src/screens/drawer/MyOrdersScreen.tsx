import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { useCart } from '../../context/CartContext';

export default function MyOrdersScreen() {
  const { orders } = useCart();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>My Orders</Text>
      <Text style={styles.subtitle}>Drawer destination for placed order history.</Text>

      {orders.length === 0 ? (
        <View style={styles.card}>
          <Text style={styles.emptyText}>No past orders yet. Complete checkout from Cart first.</Text>
        </View>
      ) : (
        orders.map(order => (
          <View key={order.id} style={styles.card}>
            <Text style={styles.orderId}>{order.id}</Text>
            <Text style={styles.meta}>{order.placedAt}</Text>
            <Text style={styles.meta}>Items: {order.items.length}</Text>
            <Text style={styles.total}>Rs. {order.total}</Text>
          </View>
        ))
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
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.ink,
  },
  subtitle: {
    color: COLORS.inkSoft,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    padding: 18,
    gap: 6,
  },
  emptyText: {
    color: COLORS.inkSoft,
    lineHeight: 22,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.ink,
  },
  meta: {
    color: COLORS.inkSoft,
  },
  total: {
    marginTop: 4,
    color: COLORS.brandDark,
    fontWeight: '800',
  },
});
