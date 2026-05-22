import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '../constants/colors';
import {
  AuthStackParamList,
  ROUTES,
} from '../constants/routes';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const { hasCompletedOnboarding } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={
        hasCompletedOnboarding ? ROUTES.LOGIN : ROUTES.ONBOARDING
      }
      screenOptions={{
        animation: 'fade_from_bottom',
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen component={OnboardingScreen} name={ROUTES.ONBOARDING} />
      <Stack.Screen component={LoginScreen} name={ROUTES.LOGIN} />
    </Stack.Navigator>
  );
}
