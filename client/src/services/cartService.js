import axios from 'axios';
import { BASE_URL } from '../config/api';

const API_URL = `${BASE_URL}/cart`;

// Get auth header
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.token
        ? {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        }
        : {};
};

// Get cart
export const getCart = async () => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
};

// Add to cart
export const addToCart = async (productId, quantity = 1) => {
    const response = await axios.post(
        `${API_URL}/add`,
        { productId, quantity },
        getAuthHeader()
    );
    return response.data;
};

// Update cart item
export const updateCartItem = async (productId, quantity) => {
    const response = await axios.put(
        `${API_URL}/update/${productId}`,
        { quantity },
        getAuthHeader()
    );
    return response.data;
};

// Remove from cart
export const removeFromCart = async (productId) => {
    const response = await axios.delete(
        `${API_URL}/remove/${productId}`,
        getAuthHeader()
    );
    return response.data;
};

// Clear cart
export const clearCart = async () => {
    const response = await axios.delete(`${API_URL}/clear`, getAuthHeader());
    return response.data;
};
