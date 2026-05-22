import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
  getFocusedRouteNameFromRoute,
  RouteProp,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { COLORS } from '../constants/colors';
import {
  AppTabParamList,
  ROUTES,
} from '../constants/routes';
import { useCart } from '../context/CartContext';
import HomeStack from './HomeStack';
import ProfileDrawer from './ProfileDrawer';
import OrdersScreen from '../screens/tabs/OrdersScreen';
import SearchScreen from '../screens/tabs/SearchScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

function resolveHomeTabBarStyle(
  route: RouteProp<AppTabParamList, typeof ROUTES.HOME_TAB>
) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? ROUTES.HOME;

  if (
    routeName === ROUTES.RESTAURANT_DETAIL ||
    routeName === ROUTES.CART
  ) {
    return { display: 'none' as const };
  }

  return {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    elevation: 10,
    height: 72,
    paddingTop: 8,
    paddingBottom: 8,
  };
}

export default function AppNavigator() {
  const { itemCount } = useCart();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.brand,
        tabBarInactiveTintColor: COLORS.tabInactive,
        tabBarLabelStyle: {
          fontWeight: '700',
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        component={HomeStack}
        name={ROUTES.HOME_TAB}
        options={({ route }) => ({
          title: 'Home',
          tabBarStyle: resolveHomeTabBarStyle(route),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons color={color} name="home-variant" size={size} />
          ),
        })}
      />
      <Tab.Screen
        component={SearchScreen}
        name={ROUTES.SEARCH_TAB}
        options={{
          title: 'Search',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            elevation: 10,
            height: 72,
            paddingTop: 8,
            paddingBottom: 8,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons color={color} name="search" size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={OrdersScreen}
        name={ROUTES.ORDERS_TAB}
        options={{
          title: 'Orders',
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            elevation: 10,
            height: 72,
            paddingTop: 8,
            paddingBottom: 8,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons color={color} name="receipt-text" size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={ProfileDrawer}
        name={ROUTES.PROFILE_TAB}
        options={{
          title: 'Profile',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            elevation: 10,
            height: 72,
            paddingTop: 8,
            paddingBottom: 8,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons color={color} name="account-circle" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
