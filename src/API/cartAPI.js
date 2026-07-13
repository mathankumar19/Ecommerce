import axios from 'axios';

const API_URL = 'https://dummyjson.com/carts';

export const fetchCart = async (userId = 1) => {
  try {
    // In a real app, you would use the actual user ID
    // For now, we'll use a default user ID of 1
    const response = await axios.get(`${API_URL}/user/${userId}`);
    console.log('Cart API response:', response);
    return response.data;
  } catch (error) {
    console.error('Cart API error:', error);
    throw error;
  }
};

export const addProductToCart = async (cartId = 1, productId, quantity = 1) => {
  try {
    // In a real app, you would use the actual cart ID
    // For now, we'll use a default cart ID of 1
    const response = await axios.post(`${API_URL}/add`, {
      userId: 1, // Default user ID
      products: [
        {
          id: productId,
          quantity: quantity
        }
      ]
    });
    console.log('Add to cart API response:', response);
    return response.data;
  } catch (error) {
    console.error('Add to cart API error:', error);
    throw error;
  }
};

export const updateCartItem = async (cartId = 1, productId, quantity) => {
  try {
    // In a real app, you would use the actual cart ID
    // For now, we'll use a default cart ID of 1
    // Note: DummyJSON doesn't have a direct endpoint for updating cart items
    // This is a placeholder for a real API call
    const response = await axios.put(`${API_URL}/${cartId}`, {
      products: [
        {
          id: productId,
          quantity: quantity
        }
      ]
    });
    console.log('Update cart item API response:', response);
    return response.data;
  } catch (error) {
    console.error('Update cart item API error:', error);
    throw error;
  }
};

export const removeCartItem = async (cartId = 1, productId) => {
  try {
    // In a real app, you would use the actual cart ID
    // For now, we'll use a default cart ID of 1
    // Note: DummyJSON doesn't have a direct endpoint for removing cart items
    // This is a placeholder for a real API call
    const response = await axios.delete(`${API_URL}/${cartId}/product/${productId}`);
    console.log('Remove cart item API response:', response);
    return response.data;
  } catch (error) {
    console.error('Remove cart item API error:', error);
    throw error;
  }
};