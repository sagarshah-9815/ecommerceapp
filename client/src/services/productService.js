import axios from 'axios';
import { BASE_URL } from '../config/api';

const API_URL = `${BASE_URL}/products`;

// Get all products
export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get product by ID
export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Create product (Admin)
export const createProduct = async (productData) => {
    const response = await axios.post(API_URL, productData, {
        headers: {
            'Content-Type': 'application/json',
            'x-role': 'admin',
        },
    });
    return response.data;
};

// Update product (Admin)
export const updateProduct = async (id, productData) => {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
        headers: {
            'Content-Type': 'application/json',
            'x-role': 'admin',
        },
    });
    return response.data;
};

// Delete product (Admin)
export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            'x-role': 'admin',
        },
    });
    return response.data;
};
