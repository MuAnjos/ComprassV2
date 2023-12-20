import { View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { CartProductCard } from '../components/Cart/CartProductCard';
import { EmptyCard } from '../components/Cart/EmptyCart';
import { Colors } from '../../assets/styles/Colors';
import { Button } from '../components/Buttons/Button';
import { TotalAmount } from '../components/Cart/TotalAmount';
import { Text } from '../components/Text';
import { useProductStore } from '../hooks/productStore';
import { ProductType } from '../interfaces/productType';
import { fetchProductById } from '../services/fakeStoreAPI';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';

export const CartScreen = () => {
  const [isFontsLoaded] = useFonts({
    'OpenSans-400': require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-600': require('../assets/fonts/OpenSans-SemiBold.ttf'),
    'OpenSans-700': require('../assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-800': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
  });

  const { products } = useProductStore();
  const [cart, setCart] = useState<ProductType[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigation = useNavigation();
  const { user } = useAuth();

  function FocusAwareStatusBar() {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar style="dark" backgroundColor="#fff" /> : null;
  }

  useEffect(() => {
    async function fetchCardProducts() {
      const cartData = await Promise.all(
        Object.entries(products).map(async ([productId, productState]) => {
          const productData = await fetchProductById(productId);
          if (productData) {
            return {
              ...productData,
              quantity: productState,
            };
          }
          return null;
        }),
      );
      const filteredCart = cartData.filter((item) => item !== null);
      setCart(filteredCart);
      const newAmount = calculateAmount(filteredCart);
      setTotalAmount(newAmount);
    }

    fetchCardProducts();
  }, [products]);

  const calculateAmount = (items: ProductType[]) => {
    if (items.length === 0) {
      return 0;
    }
    const totalAmount = items.reduce((total, item) => {
      const quantityObject = products[item.id];
      if (typeof quantityObject === 'object' && 'quantity' in quantityObject) {
        const quantity = quantityObject.quantity;
        if (typeof quantity === 'number') {
          return total + item.price * quantity;
        }
      }
      return total;
    }, 0);

    return totalAmount;
  };

  const handleAmount = async () => {
    try {
      await AsyncStorage.setItem('totalAmount', totalAmount.toString());
      {
        user
          ? navigation.navigate('AdressScreen')
          : navigation.navigate('CheckoutNotLoggedin');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <>
      <FocusAwareStatusBar />
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>

        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartProductCard product={item} />}
          ListEmptyComponent={<EmptyCard />}
        />
        <View style={styles.details}>
          <TotalAmount>{totalAmount}</TotalAmount>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonContainer}>
              <Button onPress={handleAmount}>BUY</Button>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  details: {
    backgroundColor: Colors.white,
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 104,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    width: '100%',
  },
});
