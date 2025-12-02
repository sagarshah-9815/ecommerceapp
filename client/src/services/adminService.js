import axios from 'axios';
import { BASE_URL } from '../config/api';

const API_URL = `${BASE_URL}/admin`;

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

// Get all users
export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`, getAuthHeader());
    return response.data;
};

// Get user by ID with orders
export const getUserById = async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`, getAuthHeader());
    return response.data;
};

// Get all orders (admin)
export const getAllOrders = async () => {
    const response = await axios.get(`${API_URL}/orders`, getAuthHeader());
    return response.data;
};
