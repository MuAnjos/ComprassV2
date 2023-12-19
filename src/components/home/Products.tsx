import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ProductType } from '../../interfaces/productType';
import { useNavigation } from '@react-navigation/native';

interface ProductProps {
  product: ProductType;
}

type ProductDetailsParams = {
  productId: number;
};

export const Products: React.FC<ProductProps> = React.memo(
  ({ product }: ProductProps) => {
    const navigation = useNavigation();

    const handleProductPress = () => {
      const params: ProductDetailsParams = { productId: product.id };
      navigation.navigate('ProductDetailsScreen', params);
    };

    const description =
      product.description.length > 50
        ? `${product.description.substring(0, 50)}...`
        : product.description;

    const formattedPrice = product.price.toFixed(2);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleProductPress}>
          <View style={styles.info}>
            <Image source={{ uri: product.images[0] }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${formattedPrice}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

Products.displayName = 'Products';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    borderRadius: screenWidth * 0.01,
    width: screenWidth * 0.4,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 5,
  },
  title: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    color: 'gray',
  },
  priceContainer: {
    flex: 1,
    marginTop: screenWidth * 0.02,
  },
  price: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    color: 'red',
  },
  description: {
    fontSize: screenWidth * 0.02,
  },
  info: {
    flex: 0,
  },
});
