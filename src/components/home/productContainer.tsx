import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuantityIndicator } from './quantityIndicator';
import { Products } from './Products';
import { ProductType } from '../../interfaces/productType';

interface ProductContainerProps {
  product: ProductType;
}

export const ProductContainer: React.FC<ProductContainerProps> = React.memo(
  ({ product }: ProductContainerProps) => {
    return (
      <View style={styles.container}>
        <View>
          <QuantityIndicator
            key={product.id}
            productId={product.id}
            increasestyle={styles.increasebutton}
            decreasestyle={styles.decreasebutton}
          />
        </View>
        <View style={styles.productsContainer}>
          <Products product={product} />
        </View>
      </View>
    );
  },
);

ProductContainer.displayName = 'ProductContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginTop: 8,
  },
  increasebutton: {
    borderTopRightRadius: 16,
  },
  decreasebutton: {
    borderTopLeftRadius: 16,
  },
  productsContainer: {
    flex: 1,
  },
});
