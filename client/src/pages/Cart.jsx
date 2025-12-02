import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, loading, updateQuantity, removeItem, clearCart } = useCart();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress size={60} sx={{ color: '#6366f1' }} />
            </Box>
        );
    }

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                py: 6,
            }}
        >
            <Container maxWidth="lg">
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    variant="outlined"
                    sx={{
                        mb: 4,
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        color: 'white',
                        fontWeight: 600,
                    }}
                >
                    Continue Shopping
                </Button>

                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        mb: 4,
                    }}
                >
                    Shopping Cart
                </Typography>

                {!cart || cart.items.length === 0 ? (
                    <Alert severity="info">
                        Your cart is empty. Start shopping to add items!
                    </Alert>
                ) : (
                    <>
                        <TableContainer
                            component={Paper}
                            sx={{
                                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                mb: 4,
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Product</strong></TableCell>
                                        <TableCell align="right"><strong>Price</strong></TableCell>
                                        <TableCell align="center"><strong>Quantity</strong></TableCell>
                                        <TableCell align="right"><strong>Subtotal</strong></TableCell>
                                        <TableCell align="center"><strong>Actions</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.items.map((item) => (
                                        <TableRow key={item.product._id}>
                                            <TableCell>
                                                <Typography variant="body1" fontWeight={600}>
                                                    {item.product.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {item.product.category}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">Rs. {item.price}</TableCell>
                                            <TableCell align="center">
                                                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                                    <Button
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </Button>
                                                    <TextField
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                                                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                                                        sx={{ width: 60 }}
                                                        size="small"
                                                    />
                                                    <Button
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                                    >
                                                        +
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography fontWeight={600}>
                                                    Rs. {(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    color="error"
                                                    onClick={() => removeItem(item.product._id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Card
                            sx={{
                                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h5" fontWeight={700}>
                                        Total:
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 800,
                                            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}
                                    >
                                        Rs. {cart.totalPrice.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Box display="flex" gap={2}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        startIcon={<ShoppingCartCheckoutIcon />}
                                        onClick={() => navigate('/checkout')}
                                        sx={{
                                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                            },
                                        }}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={clearCart}
                                        sx={{
                                            borderColor: 'rgba(239, 68, 68, 0.5)',
                                            color: '#ef4444',
                                        }}
                                    >
                                        Clear Cart
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Cart;
