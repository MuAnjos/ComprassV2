import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Text,
} from 'react-native';
import { fetchProductsForCategory } from '../../services/fakeStoreAPI';
import { ProductType } from '../../interfaces/productType';
import { LoadingProducts } from './loadingProduct';
import { ProductContainer } from './productContainer';
import { Category } from './CategoryList';

interface ProductListProps {
  categoryId: number;
  item: Category;
}

export const ProductList: React.FC<ProductListProps> = ({
  categoryId,
  item,
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

  const ListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.categoryTitle}>{item.name}</Text>
      <Text>View all</Text>
    </View>
  );

  const ListFooter = () =>
    loading && page > 1 && hasMore ? (
      <View style={styles.loadingProducts}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;

  return (
    <View style={styles.container}>
      {loading && page === 1 ? <LoadingProducts /> : null}
      <ListHeader />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ProductContainer product={item} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={() => <View style={{ marginRight: 12 }} />}
        ListFooterComponent={<ListFooter />}
        style={{}}
      />
    </View>
  );
};
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginLeft: 16,
    gap: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginBottom: 12
  },
  loadingProducts: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  categoryTitle: {
    fontSize: screenWidth * 0.075,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize',
  },
});
