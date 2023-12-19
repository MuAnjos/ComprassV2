import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { ProductDetailsScreen } from '../screens/productDetailsScreen';
import CheckoutScreen from '../screens/checkoutScreen';
import CheckoutNotLoggedin from '../screens/checkoutNotLoggedIn';
import { TabNavigator } from './tabBar';
import { LoginScreen } from '../screens/Login';
import { SignUpScreen } from '../screens/SingUp';
import { ForgotPasswordScreen } from '../screens/ForgotPassword';
import { AdressScreen } from '../screens/AdressScreen';
import SuccessScreen from '../screens/successScreen';
import SuccessScreen2 from '../screens/successScreen2';
import SuccessDownloadBill from '../screens/successDownloadBill';
import SuccessQRcodeScreen from '../screens/successQRcodeScreen';
import { SplashScreen } from '../screens/Splash';

const Stack = createStackNavigator();

export const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Stack.Navigator>
      {isLoading ? (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="TabNavigatorHome"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{
          title: 'Details',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
          headerShown: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CheckoutNotLoggedin"
        component={CheckoutNotLoggedin}
        options={{
          title: 'Checkout',
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdressScreen"
        component={AdressScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SuccessScreen2"
        component={SuccessScreen2}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SuccessDownloadBill"
        component={SuccessDownloadBill}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SuccessQRcodeScreen"
        component={SuccessQRcodeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
