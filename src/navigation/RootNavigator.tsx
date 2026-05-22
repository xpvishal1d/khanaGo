import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import * as ExpoLinking from 'expo-linking';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../context/AuthContext';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import { getRestaurantIdFromUrl, linking } from './linking';

export default function RootNavigator() {
  const navigationRef = useNavigationContainerRef<any>();
  const [navigationReady, setNavigationReady] = useState(false);
  const hasCheckedInitialUrl = useRef(false);
  const {
    clearPendingRestaurantId,
    isAuthenticated,
    isBootstrapping,
    pendingRestaurantId,
    setPendingRestaurantId,
  } = useAuth();

  useEffect(() => {
    if (isBootstrapping || hasCheckedInitialUrl.current) {
      return;
    }

    hasCheckedInitialUrl.current = true;
    let isMounted = true;

    const captureInitialDeepLink = async () => {
      const initialUrl = await ExpoLinking.getInitialURL();
      const restaurantId = getRestaurantIdFromUrl(initialUrl);

      if (isMounted && restaurantId && !isAuthenticated) {
        setPendingRestaurantId(restaurantId);
      }
    };

    void captureInitialDeepLink();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, isBootstrapping, setPendingRestaurantId]);

  useEffect(() => {
    const subscription = ExpoLinking.addEventListener('url', (event: { url: string }) => {
      const restaurantId = getRestaurantIdFromUrl(event.url);

      if (restaurantId && !isAuthenticated) {
        setPendingRestaurantId(restaurantId);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, setPendingRestaurantId]);

  useEffect(() => {
    if (
      !navigationReady ||
      !isAuthenticated ||
      !pendingRestaurantId ||
      !navigationRef.isReady()
    ) {
      return;
    }

    navigationRef.navigate(ROUTES.HOME_TAB, {
      screen: ROUTES.RESTAURANT_DETAIL,
      params: { restaurantId: pendingRestaurantId },
    });
    clearPendingRestaurantId();
  }, [
    clearPendingRestaurantId,
    isAuthenticated,
    navigationReady,
    navigationRef,
    pendingRestaurantId,
  ]);

  if (isBootstrapping) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={COLORS.brand} size="large" />
        <Text style={styles.loadingText}>Restoring saved navigation state...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer
      linking={linking}
      onReady={() => setNavigationReady(true)}
      ref={navigationRef}
    >
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: COLORS.background,
  },
  loadingText: {
    color: COLORS.inkSoft,
    fontWeight: '600',
  },
});
