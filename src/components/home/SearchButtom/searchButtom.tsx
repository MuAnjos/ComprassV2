import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  UIManager,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../../../assets/styles/Colors';
import { fetchProductByName } from '../../../services/fakeStoreAPI';
import { ProductType } from '../../../interfaces/productType';
import { ProductSearched } from './productsSearched';

export const SearchButton = () => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);

  const handleTextChange = (text: string) => {
    setSearchWord(text);
  };

  const handleButtonClick = () => {
    setShowSearchBox(!showSearchBox);
    setSearchWord('');
  };

  const handleCloseSearchBox = () => {
    setShowSearchBox(false);
  };

  const handleContainerClick = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const searchProducts = async () => {
      if (searchWord.trim() !== '') {
        const products = await fetchProductByName(searchWord);
        setProducts(products);
      } else {
        setProducts([]);
      }
    };

    searchProducts();
  }, [searchWord]);

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const screenWidth = Dimensions.get('window').width;

  return (
    <TouchableWithoutFeedback onPress={handleCloseSearchBox}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleButtonClick}>
          <View style={styles.searchButton}>
            <AntDesign name="search1" size={24} color="white" />
          </View>
        </TouchableOpacity>
        {showSearchBox && (
          <View style={styles.containerOcult}>
            <TouchableWithoutFeedback onPress={handleContainerClick}>
              <View style={styles.searchBox}>
                <TextInput
                  style={styles.text}
                  placeholder="Enter the product name"
                  onChangeText={handleTextChange}
                  value={searchWord}
                  autoFocus={true}
                />
              </View>
            </TouchableWithoutFeedback>
            {searchWord.trim() !== '' && (
              <View style={styles.containerProducts}>
                <FlatList
                  style={styles.containerFlatlist}
                  data={products}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <ProductSearched product={item} />}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    marginTop: screenWidth * 0.2,
    zIndex: 1,
    marginVertical: screenWidth * 0.04,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  containerOcult: {
    width: '100%',
    height: 2000,
  },
  containerFlatlist: {
    maxHeight: screenWidth * 1.6,
  },
  containerProducts: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    marginHorizontal: screenWidth * 0.08,
    marginTop: screenWidth * 0.02,
    borderRadius: 15,
    maxHeight: screenWidth * 0.37,
  },
  searchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    marginRight: screenWidth * 0.04,
    backgroundColor: Colors.red_500,
    borderRadius: screenWidth * 0.05,
    padding: screenWidth * 0.02,
  },
  searchBox: {
    backgroundColor: 'white',
    borderRadius: screenWidth * 0.15,
    padding: screenWidth * 0.02,
    width: '92%',
    borderColor: Colors.red_500,
    borderWidth: screenWidth * 0.01,
    marginHorizontal: screenWidth * 0.04,
    marginTop: screenWidth * 0.016,
  },
  text: {
    paddingLeft: screenWidth * 0.02,
  },
});
