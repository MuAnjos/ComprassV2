import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductType } from '../../interfaces/productType';
import { useNavigation } from '@react-navigation/native';

interface ProductProps {
  product: ProductType;
}

type ProductDetailsParams = {
  productId: number;
};

export const ProductsForDetails: React.FC<ProductProps> = React.memo(
  ({ product }: ProductProps) => {
    const navigation = useNavigation();

    const handleProductPress = () => {
      if (product) {
        const params: ProductDetailsParams = { productId: product.id };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        navigation.navigate('ProductDetailsScreen', params);
      }
    };

    return (
      <View style={styles.container}>
        {product ? (
          <TouchableOpacity onPress={handleProductPress}>
            <Image source={{ uri: product.images[0] }} style={styles.image} />
            <Text style={styles.category}>{product.category.name}</Text>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.notAvailableText}>Product Not Available</Text>
        )}
      </View>
    );
  },
);

ProductsForDetails.displayName = 'ProductsForDetails';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: 150,
    marginLeft: 16,
    marginTop: 16,
  },
  image: {
    width: 148,
    height: 184,
  },
  category: {
    fontSize: 12,
    color: 'gray',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  notAvailableText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
