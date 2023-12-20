import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from '../screens/profileScreen';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/Home/homeScreen';
import { CartScreen } from '../screens/CartScreen';
import { useAuth } from '../contexts/AuthContext';
import { NotLogged } from '../components/profileComponents/NotLogged';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const { user } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopColor: 'transparent',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          justifyContent: 'center',
        },
        tabBarActiveTintColor: '#DC143C',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={28}
              color="red"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              size={28}
              color="red"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={user ? ProfileScreen : NotLogged}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={28}
              color="red"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
