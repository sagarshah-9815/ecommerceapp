import { createContext, useState, useContext, useEffect } from 'react';
import { getCart as getCartService, addToCart as addToCartService, updateCartItem, removeFromCart, clearCart as clearCartService } from '../services/cartService';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    const fetchCart = async () => {
        if (!isAuthenticated) return;

        try {
            setLoading(true);
            const data = await getCartService();
            setCart(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setCart(null);
        }
    }, [isAuthenticated]);

    const addToCart = async (productId, quantity = 1) => {
        try {
            const data = await addToCartService(productId, quantity);
            setCart(data);
            toast.success('Added to cart!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to cart');
            throw error;
        }
    };

    const updateQuantity = async (productId, quantity) => {
        try {
            const data = await updateCartItem(productId, quantity);
            setCart(data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update cart');
            throw error;
        }
    };

    const removeItem = async (productId) => {
        try {
            const data = await removeFromCart(productId);
            setCart(data);
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove item');
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            const data = await clearCartService();
            setCart(data);
            toast.success('Cart cleared');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to clear cart');
            throw error;
        }
    };

    const value = {
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        fetchCart,
        itemCount: cart?.items?.length || 0,
        totalPrice: cart?.totalPrice || 0,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
