import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IncreaseButton } from './increaseButton';
import { DecreaseButton } from './decreaseButton';
import { useProductStore } from '../../hooks/productStore';

interface QuantityIndicatorProps {
  productId: number;
  increasestyle?: any;
  decreasestyle?: any;
}

export const QuantityIndicator: React.FC<QuantityIndicatorProps> = React.memo(
  ({ productId, increasestyle, decreasestyle }: QuantityIndicatorProps) => {
    const { products, increaseQuantity, decreaseQuantity } = useProductStore();
    const [localQuantity, setLocalQuantity] = useState(
      products[productId]?.quantity || 0,
    );

    const increaseQuantityHandler = useCallback(() => {
      if (localQuantity === 0) {
        increaseQuantity(productId);
        setLocalQuantity(1);
      } else {
        increaseQuantity(productId);
        setLocalQuantity(localQuantity + 1);
      }
    }, [productId, localQuantity, increaseQuantity]);

    const decreaseQuantityHandler = useCallback(() => {
      if (localQuantity > 0) {
        decreaseQuantity(productId);
        setLocalQuantity(localQuantity - 1);
      }
    }, [productId, localQuantity, decreaseQuantity]);

    useEffect(() => {
      const externalQuantity = products[productId]?.quantity || 0;
      if (localQuantity !== externalQuantity) {
        setLocalQuantity(externalQuantity);
      }
    }, [productId, products]);

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <DecreaseButton
            onPress={decreaseQuantityHandler}
            style={decreasestyle}
          />
        </View>
        <View style={styles.numberContainer}>
          <Text>{localQuantity}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <IncreaseButton
            onPress={increaseQuantityHandler}
            style={increasestyle}
          />
        </View>
      </View>
    );
  },
);

QuantityIndicator.displayName = 'QuantityIndicator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    height: '100%',
  },
  numberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: '100%',
  },
});
