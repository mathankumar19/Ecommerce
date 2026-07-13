import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Full API response:', response);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    console.log('Full product detail response:', response);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const fetchProductsBySearch = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
