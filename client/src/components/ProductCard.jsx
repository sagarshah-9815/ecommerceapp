import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Chip,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();

    const handleAddToCart = async (e) => {
        e.stopPropagation();
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

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                    border: '1px solid rgba(99, 102, 241, 0.5)',
                    '& .card-overlay': {
                        opacity: 1,
                    },
                },
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                },
                '&:hover::before': {
                    opacity: 1,
                },
            }}
        >
            {/* Gradient Overlay */}
            <Box
                className="card-overlay"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                }}
            />

            {/* Product Image */}
            {product.imageUrl && (
                <Box
                    component="img"
                    src={product.imageUrl}
                    alt={product.name}
                    onClick={() => navigate(`/product/${product._id}`)}
                    sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        position: 'relative',
                        zIndex: 1,
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                />
            )}

            <CardContent sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {product.name}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Chip
                        icon={<LocalOfferIcon />}
                        label={product.category}
                        size="small"
                        onClick={() => navigate(`/categories/${product.category.toLowerCase()}`)}
                        sx={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                transform: 'scale(1.05)',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    />
                </Box>
                <Typography
                    variant="h4"
                    sx={{
                        mb: 2,
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    Rs. {product.price}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.6,
                    }}
                >
                    {product.description}
                </Typography>

                <Box display="flex" alignItems="center" gap={1}>
                    <InventoryIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    <Chip
                        label={`${product.stock} in stock`}
                        size="small"
                        sx={{
                            background: product.stock > 0
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            fontWeight: 600,
                        }}
                    />
                </Box>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0, position: 'relative', zIndex: 1, gap: 1 }}>
                <Button
                    size="large"
                    variant="outlined"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    sx={{
                        flex: 1,
                        borderColor: 'rgba(99, 102, 241, 0.5)',
                        color: 'white',
                        '&:hover': {
                            borderColor: '#6366f1',
                            background: 'rgba(99, 102, 241, 0.1)',
                        },
                    }}
                >
                    Add to Cart
                </Button>
                <Button
                    size="large"
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/product/${product._id}`)}
                    sx={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            transform: 'scale(1.02)',
                        },
                    }}
                >
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
