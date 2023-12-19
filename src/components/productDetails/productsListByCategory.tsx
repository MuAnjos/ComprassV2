import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { fetchProductsForCategory } from '../../services/fakeStoreAPI';
import { ProductsForDetails } from './productsForDetails';
import { ProductType } from '../../interfaces/productType';

interface ProductListProps {
  categoryId: number;
  currentProductId: number;
}

export const ProductListByCategory: React.FC<ProductListProps> = React.memo(
  ({ categoryId, currentProductId }: ProductListProps) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Adicione a variável hasMore

    useEffect(() => {
      const limit = 10;

      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const productsData = await fetchProductsForCategory(
            categoryId,
            (page - 1) * limit,
            limit,
          );
          const filteredProducts = productsData.filter(
            (product: any) => product.id !== currentProductId,
          );
          setProducts((prevProducts) => [...prevProducts, ...filteredProducts]);
          if (filteredProducts.length === 0) {
            setHasMore(false); // Defina hasMore como false quando não há mais produtos a serem carregados
          }
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProducts();
    }, [categoryId, currentProductId, page]);

    const handleLoadMore = () => {
      if (hasMore) {
        // Verifique se há mais produtos a serem carregados
        setPage(page + 1);
      }
    };

    return (
      <View style={styles.productList}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF0024" />
              </View>
            ) : null
          }
          renderItem={({ item }) => <ProductsForDetails product={item} />}
        />
      </View>
    );
  },
);

ProductListByCategory.displayName = 'ProductsListByCategory';

const styles = StyleSheet.create({
  productItem: {
    marginRight: 16,
  },
  productTitle: {
    fontSize: 16,
    color: 'gray',
  },
  productList: {
    marginRight: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    marginTop: 50,
  },
});
