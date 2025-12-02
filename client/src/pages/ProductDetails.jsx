import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Box,
    Chip,
    Divider,
    Fade,
    Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        try {
            await addToCart(product._id, 1);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <CircularProgress size={60} sx={{ color: '#6366f1' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert
                    severity="error"
                    sx={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: 2,
                        mb: 3,
                    }}
                >
                    {error}
                </Alert>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    variant="outlined"
                    sx={{
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        color: 'white',
                        '&:hover': {
                            borderColor: '#6366f1',
                            background: 'rgba(99, 102, 241, 0.1)',
                        },
                    }}
                >
                    Back to Products
                </Button>
            </Container>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                py: 6,
            }}
        >
            <Container maxWidth="lg">
                <Fade in timeout={600}>
                    <Box>
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
                            Back to Products
                        </Button>

                        <Card
                            sx={{
                                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                overflow: 'hidden',
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Grid container spacing={4}>
                                    {/* Product Image */}
                                    {product.imageUrl && (
                                        <Grid item xs={12} md={6}>
                                            <Box
                                                component="img"
                                                src={product.imageUrl}
                                                alt={product.name}
                                                sx={{
                                                    width: '100%',
                                                    height: { xs: 300, md: 400 },
                                                    objectFit: 'cover',
                                                    borderRadius: 2,
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                }}
                                            />
                                        </Grid>
                                    )}

                                    {/* Product Details */}
                                    <Grid item xs={12} md={product.imageUrl ? 6 : 12}>
                                        <Box>
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
                                                }}
                                            >
                                                {product.name}
                                            </Typography>

                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    mb: 3,
                                                    fontWeight: 700,
                                                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text',
                                                }}
                                            >
                                                Rs. {product.price}
                                            </Typography>

                                            <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                                            <Box sx={{ mb: 3 }}>
                                                <Typography variant="h6" gutterBottom fontWeight={600}>
                                                    Description
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary" paragraph>
                                                    {product.description}
                                                </Typography>
                                            </Box>

                                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                                <Grid item xs={6}>
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                                            Category
                                                        </Typography>
                                                        <Chip
                                                            icon={<LocalOfferIcon />}
                                                            label={product.category}
                                                            sx={{
                                                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                                                color: 'white',
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                                            Stock
                                                        </Typography>
                                                        <Chip
                                                            icon={<InventoryIcon />}
                                                            label={`${product.stock} available`}
                                                            sx={{
                                                                background:
                                                                    product.stock > 0
                                                                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                                                        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                                color: 'white',
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Button
                                                variant="contained"
                                                size="large"
                                                fullWidth
                                                startIcon={<ShoppingCartIcon />}
                                                onClick={handleAddToCart}
                                                disabled={product.stock === 0}
                                                sx={{
                                                    mt: 2,
                                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                                    },
                                                }}
                                            >
                                                Add to Cart
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default ProductDetails;
