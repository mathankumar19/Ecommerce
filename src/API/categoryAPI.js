import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

export const fetchCategoriesData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const fetchCategoryProductsData = async (category) => {
    try {
        const response = await axios.get(`${BASE_URL}/category/${category}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
        throw error;
    }
};
