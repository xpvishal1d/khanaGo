import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { Restaurant } from '../data/restaurants';

const CART_STORAGE_KEY = 'khanago.cart';
const ORDERS_STORAGE_KEY = 'khanago.orders';

export type CartItem = {
  restaurantId: string;
  name: string;
  averagePrice: number;
  quantity: number;
};

export type PlacedOrder = {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: string;
};

type CartContextValue = {
  items: CartItem[];
  orders: PlacedOrder[];
  itemCount: number;
  total: number;
  addToCart: (restaurant: Restaurant) => void;
  removeFromCart: (restaurantId: string) => void;
  clearCart: () => void;
  checkout: () => PlacedOrder | null;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<PlacedOrder[]>([]);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      const [storedItems, storedOrders] = await Promise.all([
        AsyncStorage.getItem(CART_STORAGE_KEY),
        AsyncStorage.getItem(ORDERS_STORAGE_KEY),
      ]);

      if (!isMounted) {
        return;
      }

      if (storedItems) {
        setItems(JSON.parse(storedItems) as CartItem[]);
      }

      if (storedOrders) {
        setOrders(JSON.parse(storedOrders) as PlacedOrder[]);
      }
    };

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    void AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    void AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addToCart = (restaurant: Restaurant) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.restaurantId === restaurant.id
      );

      if (!existingItem) {
        return [
          ...currentItems,
          {
            restaurantId: restaurant.id,
            name: restaurant.name,
            averagePrice: restaurant.averagePrice,
            quantity: 1,
          },
        ];
      }

      return currentItems.map(item =>
        item.restaurantId === restaurant.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  };

  const removeFromCart = (restaurantId: string) => {
    setItems(currentItems =>
      currentItems
        .map(item =>
          item.restaurantId === restaurantId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const checkout = () => {
    if (items.length === 0) {
      return null;
    }

    const order: PlacedOrder = {
      id: `ORD-${Date.now()}`,
      items,
      total: items.reduce(
        (runningTotal, item) => runningTotal + item.averagePrice * item.quantity,
        0
      ),
      placedAt: new Date().toLocaleString(),
    };

    setOrders(currentOrders => [order, ...currentOrders]);
    setItems([]);

    return order;
  };

  const itemCount = items.reduce(
    (runningTotal, item) => runningTotal + item.quantity,
    0
  );

  const total = items.reduce(
    (runningTotal, item) => runningTotal + item.averagePrice * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      items,
      orders,
      itemCount,
      total,
      addToCart,
      removeFromCart,
      clearCart,
      checkout,
    }),
    [itemCount, items, orders, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
