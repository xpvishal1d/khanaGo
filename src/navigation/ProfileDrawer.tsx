import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerContent from '../components/CustomDrawerContent';
import { COLORS } from '../constants/colors';
import {
  ProfileDrawerParamList,
  ROUTES,
} from '../constants/routes';
import HelpScreen from '../screens/drawer/HelpScreen';
import MyOrdersScreen from '../screens/drawer/MyOrdersScreen';
import SettingsScreen from '../screens/drawer/SettingsScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

export default function ProfileDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.brand,
        },
        headerTintColor: '#FFFFFF',
        drawerActiveTintColor: COLORS.brand,
        drawerInactiveTintColor: COLORS.inkSoft,
        drawerLabelStyle: {
          fontWeight: '700',
        },
        sceneStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Drawer.Screen
        component={ProfileScreen}
        name={ROUTES.PROFILE_HOME}
        options={{
          title: 'Profile',
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        component={MyOrdersScreen}
        name={ROUTES.MY_ORDERS}
        options={{ title: 'My Orders' }}
      />
      <Drawer.Screen
        component={SettingsScreen}
        name={ROUTES.SETTINGS}
        options={{ title: 'Settings' }}
      />
      <Drawer.Screen
        component={HelpScreen}
        name={ROUTES.HELP}
        options={{ title: 'Help' }}
      />
    </Drawer.Navigator>
  );
}
