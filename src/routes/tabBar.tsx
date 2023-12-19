import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from '../screens/profileScreen';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
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
          elevation: 5,
          height: 83,
          paddingVertical: 14,
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
          tabBarIcon: () => <Entypo name="home" size={30} color="red" />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: () => (
            <AntDesign name="shoppingcart" size={30} color="red" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={user ? ProfileScreen : NotLogged}  
        options={{
          tabBarIcon: () => <AntDesign name="user" size={30} color="red" />,
        }}
      />
    </Tab.Navigator>
  );
}
