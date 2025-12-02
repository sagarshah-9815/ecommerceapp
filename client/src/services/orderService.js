import axios from 'axios';
import { BASE_URL } from '../config/api';

const API_URL = `${BASE_URL}/orders`;

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

// Create order
export const createOrder = async (shippingAddress) => {
    const response = await axios.post(
        API_URL,
        { shippingAddress },
        getAuthHeader()
    );
    return response.data;
};

// Get my orders
export const getMyOrders = async () => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
};

// Get order by ID
export const getOrderById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
};
