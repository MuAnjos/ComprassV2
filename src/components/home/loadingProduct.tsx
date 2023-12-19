import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const LoadingProducts: React.FC = () => {
  const loadingData = Array.from({ length: 10 }).map((_, index) => ({
    id: `loading-${index}`,
    isLoading: true,
  }));

  return (
    <FlatList
      data={loadingData}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={() => (
        <View style={styles.container}>
          <View style={styles.productInfo}>
            <View style={styles.imagePlaceholder} />
            <Text style={styles.titlePlaceholder} />
            <Text style={styles.descriptionPlaceholder} />
            <Text style={styles.pricePlaceholder} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.4,
    marginLeft: windowWidth * 0.04,
    marginTop: 16,
    borderRadius: 8,
  },
  productInfo: {
    marginVertical: 8,
  },
  imagePlaceholder: {
    width: '100%', // Preencha a largura do contêiner
    aspectRatio: 0.85, // Proporção da imagem
    backgroundColor: 'lightgray',
    height: windowWidth * 0.45,
    marginBottom: 3,
    borderRadius: 8,
  },
  titlePlaceholder: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
    backgroundColor: 'lightgray',
    marginBottom: 3,
    borderRadius: 8,
    width: '60%',
  },
  descriptionPlaceholder: {
    fontSize: 10,
    backgroundColor: 'lightgray',
    marginBottom: 3,
    borderRadius: 8,
  },
  pricePlaceholder: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    backgroundColor: 'lightgray',
    borderRadius: 8,
    width: '40%',
    height: 25,
  },
});
