import type { NavigatorScreenParams } from '@react-navigation/native';

export const ROUTES = {
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  HOME: 'Home',
  RESTAURANT_DETAIL: 'RestaurantDetail',
  CART: 'Cart',
  HOME_TAB: 'HomeTab',
  SEARCH_TAB: 'SearchTab',
  ORDERS_TAB: 'OrdersTab',
  PROFILE_TAB: 'ProfileTab',
  PROFILE_HOME: 'ProfileHome',
  MY_ORDERS: 'MyOrders',
  SETTINGS: 'Settings',
  HELP: 'Help',
} as const;

export type RestaurantRouteParams = {
  restaurantId: string;
  restaurantName?: string;
  averagePrice?: number;
};

export type AuthStackParamList = {
  [ROUTES.ONBOARDING]: undefined;
  [ROUTES.LOGIN]: undefined;
};

export type HomeStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.RESTAURANT_DETAIL]: RestaurantRouteParams;
  [ROUTES.CART]: undefined;
};

export type ProfileDrawerParamList = {
  [ROUTES.PROFILE_HOME]: undefined;
  [ROUTES.MY_ORDERS]: undefined;
  [ROUTES.SETTINGS]: undefined;
  [ROUTES.HELP]: undefined;
};

export type AppTabParamList = {
  [ROUTES.HOME_TAB]: NavigatorScreenParams<HomeStackParamList> | undefined;
  [ROUTES.SEARCH_TAB]: undefined;
  [ROUTES.ORDERS_TAB]: undefined;
  [ROUTES.PROFILE_TAB]:
    | NavigatorScreenParams<ProfileDrawerParamList>
    | undefined;
};
