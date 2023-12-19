import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { Delete } from '../../../assets/images/svg/DeleteProduct';
import { Colors } from '../../../assets/styles/Colors';
import { ProductType } from '../../interfaces/productType';
import { useProductStore } from '../../hooks/productStore';
import { Indicator } from './Indicator';

interface ProductProps {
  product: ProductType;
}

export const CartProductCard: React.FC<ProductProps> = ({ product }) => {
  const { products, setProductState } = useProductStore();

  const productState = products[product.id];

  const totalPrice = useMemo(() => {
    return productState.quantity * product.price;
  }, [productState.quantity, product.price]);

  const handleDelete = async () => {
    setProductState(product.id, {
      ...productState,
      quantity: 0,
    });
  };

  if (productState.quantity === 0) {
    return null;
  }
  if (productState.quantity === null) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={{ uri: product.images[0] }} />
      </View>

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.text}>{product.title}</Text>
          <View style={styles.deleteIcon}>
            <Delete onPress={handleDelete} />
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Indicator productId={product.id} />

          <Text style={styles.price}>{totalPrice}.00 R$</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '92%',
    height: 104,
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 1,
  },
  imageContainer: {
    flex: 0,
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'space-between',
    marginLeft: 18,
  },
  deleteIcon: {
    position: 'absolute',
    right: 0,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 5,
  },
  count: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 0,
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    margin: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  img: {
    display: 'flex',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: 104,
    height: 104,
  },
  increaseButton: {
    width: 15,
    height: 15,
    backgroundColor: Colors.red_500,
  },
  decreaseButton: {
    backgroundColor: Colors.red_500,
  },
});
