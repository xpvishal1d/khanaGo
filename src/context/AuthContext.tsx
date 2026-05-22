import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AUTH_STORAGE_KEY = 'khanago.auth';
const ONBOARDING_STORAGE_KEY = 'khanago.onboarding';

type User = {
  name: string;
  handle: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  isBootstrapping: boolean;
  pendingRestaurantId: string | null;
  user: User;
  completeOnboarding: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  setPendingRestaurantId: (restaurantId: string | null) => void;
  clearPendingRestaurantId: () => void;
};

const defaultUser: User = {
  name: 'Vishal',
  handle: '@foodie.navigator',
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [pendingRestaurantId, setPendingRestaurantId] = useState<string | null>(
    null
  );

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const [storedAuthState, storedOnboardingState] = await Promise.all([
          AsyncStorage.getItem(AUTH_STORAGE_KEY),
          AsyncStorage.getItem(ONBOARDING_STORAGE_KEY),
        ]);

        if (!isMounted) {
          return;
        }

        setIsAuthenticated(storedAuthState === 'true');
        setHasCompletedOnboarding(storedOnboardingState === 'true');
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  const completeOnboarding = async () => {
    setHasCompletedOnboarding(true);
    await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
  };

  const signIn = async () => {
    setIsAuthenticated(true);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, 'true');
  };

  const signOut = async () => {
    setIsAuthenticated(false);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, 'false');
  };

  const clearPendingRestaurantId = () => {
    setPendingRestaurantId(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      hasCompletedOnboarding,
      isBootstrapping,
      pendingRestaurantId,
      user: defaultUser,
      completeOnboarding,
      signIn,
      signOut,
      setPendingRestaurantId,
      clearPendingRestaurantId,
    }),
    [hasCompletedOnboarding, isAuthenticated, isBootstrapping, pendingRestaurantId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
