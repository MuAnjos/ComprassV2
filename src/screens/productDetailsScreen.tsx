import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  fetchProductById,
  fetchProductCountForCategory,
} from '../services/fakeStoreAPI';
import { ProductType } from '../interfaces/productType';
import { QuantityIndicator } from '../components/home/quantityIndicator';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { ProductListByCategory } from '../components/productDetails/productsListByCategory';

interface RouteParams {
  productId: number;
}

const UnavailableProductScreen = () => {
  return (
    <View style={styles.unavailableContainer}>
      <Text style={styles.unavailableText}>This product is indisponible</Text>
    </View>
  );
};

export const ProductDetailsScreen = () => {
  const route = useRoute();
  const { productId } = route.params as RouteParams;

  const [product, setProduct] = useState<ProductType | null>(null);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [showSupportInfo, setShowSupportInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProductsCount, setRelatedProductsCount] = useState<
    number | null
  >(null);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);

      try {
        const productData = await fetchProductById(productId);
        setProduct(productData);

        if (productData) {
          const totalProducts = await fetchProductCountForCategory(
            productData.category.id,
          );
          setRelatedProductsCount(totalProducts);
        }
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF0024" />
      </View>
    );
  }

  if (!product) {
    return <UnavailableProductScreen />;
  }

  const data = [
    {
      key: 'image',
      component: product?.images[0] ? (
        <Image source={{ uri: product?.images[0] }} style={styles.image} />
      ) : null,
    },
    {
      key: 'info',
      component: (
        <View style={styles.containerinfo}>
          <View>
            <Text style={styles.name}>{product?.title}</Text>
            <Text style={styles.category}>{product?.category?.name}</Text>
          </View>
          <Text style={styles.price}>${product?.price?.toFixed(2)}</Text>
        </View>
      ),
    },
    {
      key: 'description',
      component: (
        <Text style={styles.containerdesc}>{product?.description}</Text>
      ),
    },
    {
      key: 'quantity',
      component: product ? (
        <View style={styles.viewquanty}>
          <View style={styles.containerquanty}>
            <QuantityIndicator
              productId={product.id}
              increasestyle={styles.increasebutton}
              decreasestyle={styles.decreasebutton}
            />
          </View>
        </View>
      ) : null,
    },
    {
      key: 'shipping',
      component: product ? (
        <TouchableOpacity
          style={[
            styles.containerButton,
            showShippingInfo && styles.expandedButton,
          ]}
          onPress={() => setShowShippingInfo(!showShippingInfo)}
        >
          <View style={styles.label}>
            <Text style={styles.textButton}>Shipping Info</Text>
            <AntDesign
              name={showShippingInfo ? 'down' : 'right'}
              size={12}
              color="black"
            />
          </View>
          {showShippingInfo && (
            <Text style={styles.infoText}>
              Shipping Info: Your shipping information here.
            </Text>
          )}
        </TouchableOpacity>
      ) : null,
    },
    {
      key: 'support',
      component: product ? (
        <TouchableOpacity
          style={[
            styles.containerButton,
            showSupportInfo && styles.expandedButton,
          ]}
          onPress={() => setShowSupportInfo(!showSupportInfo)}
        >
          <View style={styles.label}>
            <Text style={styles.textButton}>Support</Text>
            <AntDesign
              name={showSupportInfo ? 'down' : 'right'}
              size={12}
              color="black"
            />
          </View>
          {showSupportInfo && (
            <Text style={styles.infoText}>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using Content here, content
              here, making it look like readable English.
            </Text>
          )}
        </TouchableOpacity>
      ) : null,
    },
    {
      key: 'textAboveProductList',
      component: (
        <View style={styles.categoryContainer}>
          <Text style={styles.textAboveProductList}>
            You can also like this
          </Text>
          <Text style={styles.itemsNumber}>
            {relatedProductsCount ?? 0} items
          </Text>
        </View>
      ),
    },
    {
      key: 'relatedProducts',
      component: product ? (
        <ProductListByCategory
          categoryId={product.category.id}
          currentProductId={product.id}
        />
      ) : null,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF0024" />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => item.component}
          keyExtractor={(item) => item.key}
        />
      )}
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  containerinfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
  },
  containerdesc: {
    marginTop: 20,
    fontSize: 14,
    marginHorizontal: 16,
  },
  viewquanty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    elevation: 8,
    paddingVertical: 20,
  },
  containerquanty: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: '80%',
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  category: {
    fontSize: 11,
    color: 'gray',
  },
  price: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
  },
  increasebutton: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    height: 43,
  },
  decreasebutton: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    height: 43,
  },
  containerButton: {
    height: 56,
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  expandedButton: {
    height: 150,
  },
  textButton: {
    marginLeft: 16,
    fontSize: 16,
  },
  infoText: {
    marginLeft: 16,
    fontSize: 14,
    flex: 1,
  },
  label: {
    flex: 0,
    height: 54,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  textAboveProductList: {
    fontSize: 22,
  },
  itemsNumber: {
    color: 'gray',
  },
  unavailableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});
