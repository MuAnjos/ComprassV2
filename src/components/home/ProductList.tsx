import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchProductsForCategory } from '../../services/fakeStoreAPI';
import { ProductType } from '../../interfaces/productType';
import { LoadingProducts } from './loadingProduct';
import { ProductContainer } from './productContainer';

interface ProductListProps {
  categoryId: number;
}

export const ProductList: React.FC<ProductListProps> = ({
  categoryId,
}: ProductListProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreProducts = async () => {
    try {
      setLoading(true);
      const newProducts = await fetchProductsForCategory(
        categoryId,
        (page - 1) * 10,
        10,
      );
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreProducts();
  }, [categoryId]);

  const handleEndReached = () => {
    if (!loading) {
      fetchMoreProducts();
    }
  };

  return (
    <View style={styles.productList}>
      {loading && page === 1 ? <LoadingProducts /> : null}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ProductContainer product={item} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          loading && page > 1 && hasMore ? (
            <View style={styles.loadingProducts}>
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingProducts: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  productItem: {
    marginRight: 16,
  },
  productTitle: {
    fontSize: 16,
    color: 'gray',
  },
  productList: {
    marginLeft: 16,
  },
});
