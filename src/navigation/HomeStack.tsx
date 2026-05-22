import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';

import CustomHeader from '../components/CustomHeader';
import { COLORS } from '../constants/colors';
import {
  HomeStackParamList,
  ROUTES,
} from '../constants/routes';
import { useCart } from '../context/CartContext';
import CartScreen from '../screens/home/CartScreen';
import HomeScreen from '../screens/home/HomeScreen';
import RestaurantDetailScreen from '../screens/home/RestaurantDetailScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HeaderRenderer(props: NativeStackHeaderProps) {
  const { itemCount } = useCart();
  const title =
    typeof props.options.title === 'string' ? props.options.title : 'khanaGo';

  return (
    <CustomHeader
      backgroundColor={COLORS.brand}
      backLabel={props.back?.title ?? 'Back'}
      canGoBack={Boolean(props.back)}
      onBack={props.navigation.goBack}
      onRightPress={
        props.route.name === ROUTES.CART
          ? undefined
          : () => props.navigation.navigate(ROUTES.CART)
      }
      rightBadge={itemCount}
      rightLabel={props.route.name === ROUTES.CART ? undefined : 'Cart'}
      title={title}
    />
  );
}

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: COLORS.background },
        header: props => <HeaderRenderer {...props} />,
      }}
    >
      <Stack.Screen
        component={HomeScreen}
        name={ROUTES.HOME}
        options={{ title: 'Discover' }}
      />
      <Stack.Screen
        component={RestaurantDetailScreen}
        name={ROUTES.RESTAURANT_DETAIL}
        options={({ route }) => ({
          title: route.params.restaurantName ?? 'Restaurant Detail',
        })}
      />
      <Stack.Screen
        component={CartScreen}
        name={ROUTES.CART}
        options={{ title: 'Cart' }}
      />
    </Stack.Navigator>
  );
}
