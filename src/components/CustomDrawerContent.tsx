import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import { View, Text, Image, Switch } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';

export default function CustomDrawerContent(props: any) {
  const { darkMode, toggleTheme, colors } = useTheme();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <Image
          source={{
            uri: 'https://i.pravatar.cc/150?img=12',
          }}
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            marginBottom: 10,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.text,
          }}
        >
          Vishal
        </Text>

        <Text style={{ color: 'gray' }}>Food Explorer</Text>
      </View>

      <DrawerItem
        label="My Orders"
        labelStyle={{ color: colors.text }}
        icon={({ size }) => (
          <MaterialIcons
}