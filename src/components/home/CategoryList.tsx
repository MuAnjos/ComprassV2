import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { fetchCategories } from '../../services/fakeStoreAPI';
import { ProductList } from './ProductList';

export interface Category {
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
      const fetchedCategories: Category[] = await fetchCategories();
      if (fetchedCategories.length === 0) {
        setHasMore(false);
      } else {
        if (fetchedCategories.length > 0) {
          const newCategories = fetchedCategories.filter((category: any) => {
            return !categories.some(
              (existingCategory) => existingCategory.id === category.id,
            );
          });

          setCategories((prevCategories) => [
            ...prevCategories,
            ...newCategories,
          ]);
        }
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
          <ProductList item={item} categoryId={item.id} />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};
