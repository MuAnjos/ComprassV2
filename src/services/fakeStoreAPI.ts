import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
});

export const fetchCategories = async () => {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories');
    const categoriesData = await response.json();
    return categoriesData;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};

export const fetchProductsForCategory = async (
  categoryId: any,
  offset: any,
  limit: any
) => {
  const response = await api.get(
    `/products?categoryId=${categoryId}&offset=${offset}&limit=${limit}`
  );

  return response.data;
};

export const fetchProductById = async (productId: any) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

export const fetchProductByName = async (productName: string) => {
  const response = await api.get(`/products/?title=${productName}`);
  return response.data;
};

export async function fetchProductCountForCategory(categoryId: any) {
  try {
    const response = await api.get(`/products?categoryId=${categoryId}`);
    return response.data.length;
  } catch (error) {
    console.error('Erro ao buscar produtos da categoria:', error);
    return 0; // Trate o erro adequadamente de acordo com a sua aplicação.
  }
}
