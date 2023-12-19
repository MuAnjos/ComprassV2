import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
<<<<<<< HEAD
import { ProductType } from '../../contexts/productType';
=======
import { ProductType } from '../../interfaces/productType';
>>>>>>> 41e4ee3f43de29f84097831a2090f44313038d50
import { useNavigation } from '@react-navigation/native';

interface ProductProps {
  product: ProductType;
}

type ProductDetailsParams = {
  productId: number;
};

export const Products: React.FC<ProductProps> = ({ product }) => {
  const navigation = useNavigation();

  const handleProductPress = () => {
    const params: ProductDetailsParams = { productId: product.id };
    // @ts-ignore
    navigation.navigate('ProductDetailsScreen', params);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProductPress}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />
        <Text style={styles.category}>{product.category.name}</Text>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>Price: ${product.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

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
});
