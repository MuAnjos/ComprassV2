import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useProductStore } from '../../hooks/productStore';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../../assets/styles/Colors';

interface IndicatorProps {
  productId: number;
  increasestyle?: any;
  decreasestyle?: any;
}

export const Indicator: React.FC<IndicatorProps> = React.memo(
  ({ productId }) => {
    const { products, setProductState } = useProductStore();
    const productState = products[productId] || { quantity: 0 };

    const [isUpdating, setIsUpdating] = useState(false);

    const updateQuantityWithDelay = (newQuantity: any) => {
      if (!isUpdating) {
        setIsUpdating(true);

        setProductState(productId, {
          quantity: newQuantity,
        });

        setTimeout(() => {
          setIsUpdating(false);
        }, 1000);
      }
    };

    const increaseQuantity = useCallback(() => {
      updateQuantityWithDelay(productState.quantity + 1);
    }, [productId, productState.quantity, setProductState, isUpdating]);

    const decreaseQuantity = useCallback(() => {
      if (productState.quantity > 0) {
        updateQuantityWithDelay(productState.quantity - 1);
      }
    }, [productId, productState.quantity, setProductState, isUpdating]);

    return (
      <View style={styles.container}>
        <AntDesign
          name="minuscircle"
          size={36}
          color={Colors.red_500}
          onPress={decreaseQuantity}
          style={styles.icon}
        />
        <Text style={styles.text}>{productState.quantity}</Text>
        <AntDesign
          name="pluscircle"
          size={36}
          color={Colors.red_500}
          onPress={increaseQuantity}
          style={styles.icon}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  numberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 8,
  },
});
