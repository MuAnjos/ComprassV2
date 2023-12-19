import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { fetchCategories } from '../../services/fakeStoreAPI';
import { ProductList } from './ProductList';

interface Category {
  id: number;
  name: string;
}

export const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchCategoriesData = async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    try {
      const categoriesData = await fetchCategories();
      if (categoriesData.length === 0) {
        setHasMore(false);
      } else {
        const newCategories = categoriesData.filter((category: any) => {
          return !categories.some(
            (existingCategory) => existingCategory.id === category.id,
          );
        });

        setCategories((prevCategories) => [
          ...prevCategories,
          ...newCategories,
        ]);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    if (!loading) {
      fetchCategoriesData();
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(category) => category.id.toString()}
        renderItem={({ item }) => (
          <View>
            <View style={styles.container}>
              <Text style={styles.categoryTitle}>{item.name}</Text>
              <Text>View all</Text>
            </View>
            <ProductList categoryId={item.id} />
          </View>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: screenWidth * 0.075,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: screenWidth * 0.04,
    marginRight: screenWidth * 0.04,
    marginTop: screenWidth * 0.04,
  },
});
