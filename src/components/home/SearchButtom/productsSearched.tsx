import React from 'react';
import { ProductType } from '../../../interfaces/productType';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'; // Adicionei Dimensions
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../../assets/styles/Colors';

interface ProductSearchedProps {
  product: ProductType;
}

type ProductDetailsParams = {
  productId: number;
};

export const ProductSearched = ({ product }: ProductSearchedProps) => {
  const navigation = useNavigation();

  const handleProductPress = () => {
    const params: ProductDetailsParams = { productId: product.id };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    navigation.navigate('ProductDetailsScreen', params);
  };

  const description =
    product.description.length > 50
      ? `${product.description.substring(0, 50)}...`
      : product.description;

  const formattedPrice = product.price.toFixed(2);

  return (
    <TouchableOpacity onPress={handleProductPress}>
      <View style={styles.container}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>
        <Text style={styles.price}>${formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.gray_200,
    borderBottomWidth: 1,
    paddingHorizontal: screenWidth * 0.05,
  },
  image: {
    height: 66,
    aspectRatio: 1,
    marginHorizontal: screenWidth * 0.01,
    marginVertical: screenWidth * 0.015,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  desc: {
    fontSize: 10,
  },
  price: {
    textAlign: 'right',
    fontSize: 16,
    color: Colors.red_500,
    fontWeight: 'bold',
    marginRight: screenWidth * 0.02,
  },
});
