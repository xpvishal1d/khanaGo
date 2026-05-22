import type { LinkingOptions } from '@react-navigation/native';
import * as ExpoLinking from 'expo-linking';

import { ROUTES } from '../constants/routes';

export const linking: LinkingOptions<any> = {
  prefixes: [ExpoLinking.createURL('/'), 'foodapp://'],
  config: {
    screens: {
      [ROUTES.ONBOARDING]: 'welcome',
      [ROUTES.LOGIN]: 'login',
      [ROUTES.HOME_TAB]: {
        screens: {
          [ROUTES.HOME]: '',
          [ROUTES.RESTAURANT_DETAIL]: 'restaurant/:restaurantId',
          [ROUTES.CART]: 'cart',
        },
      },
      [ROUTES.SEARCH_TAB]: 'search',
      [ROUTES.ORDERS_TAB]: 'orders',
      [ROUTES.PROFILE_TAB]: {
        screens: {
          [ROUTES.PROFILE_HOME]: 'profile',
          [ROUTES.MY_ORDERS]: 'profile/my-orders',
          [ROUTES.SETTINGS]: 'profile/settings',
          [ROUTES.HELP]: 'profile/help',
        },
      },
    },
  },
};

export function getRestaurantIdFromUrl(url: string | null | undefined) {
  if (!url) {
    return null;
  }

  const parsed = ExpoLinking.parse(url);
  const path = parsed.path ?? '';
  const segments = path.split('/');

  if (segments[0] === 'restaurant' && segments[1]) {
    return segments[1];
  }

  return null;
}
