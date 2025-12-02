import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import {
    Container,
    Grid,
    Typography,
    CircularProgress,
    Alert,
    Box,
    Button,
    Fade,
    Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryIcon from '@mui/icons-material/Category';

const Category = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { products, loading, error } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            // Get all unique categories
            const categories = [...new Set(products.map(p => p.category))];
            setAllCategories(categories);

            // Filter products by category
            if (category) {
                const filtered = products.filter(
                    p => p.category.toLowerCase() === category.toLowerCase()
                );
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts(products);
            }
        }
    }, [products, category]);

    if (loading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
                gap={3}
            >
                <CircularProgress
                    size={80}
                    thickness={4}
                    sx={{
                        color: '#6366f1',
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                        },
                    }}
                />
                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    Loading products...
                </Typography>
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
                    }}
                >
                    {error}
                </Alert>
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
            <Container maxWidth="xl">
                <Fade in timeout={800}>
                    <Box>
                        {/* Header Section */}
                        <Box mb={4}>
                            <Button
                                startIcon={<ArrowBackIcon />}
                                onClick={() => navigate('/')}
                                variant="outlined"
                                sx={{
                                    mb: 3,
                                    borderColor: 'rgba(99, 102, 241, 0.5)',
                                    color: 'white',
                                    fontWeight: 600,
                                }}
                            >
                                Back to All Products
                            </Button>

                            <Box display="flex" alignItems="center" gap={2} mb={3}>
                                <CategoryIcon sx={{ fontSize: 40, color: '#6366f1' }} />
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    sx={{
                                        fontWeight: 800,
                                        background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        letterSpacing: '-0.02em',
                                    }}
                                >
                                    {category ? category : 'All Categories'}
                                </Typography>
                            </Box>

                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 400,
                                    mb: 4,
                                }}
                            >
                                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                            </Typography>

                            {/* Category Filter Chips */}
                            <Box display="flex" gap={2} flexWrap="wrap" mb={4}>
                                <Chip
                                    label="All"
                                    onClick={() => navigate('/categories')}
                                    sx={{
                                        background: !category
                                            ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                                            : 'rgba(99, 102, 241, 0.1)',
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        py: 2.5,
                                        px: 2,
                                        cursor: 'pointer',
                                        border: !category ? 'none' : '1px solid rgba(99, 102, 241, 0.3)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                        },
                                    }}
                                />
                                {allCategories.map((cat) => (
                                    <Chip
                                        key={cat}
                                        label={cat}
                                        onClick={() => navigate(`/categories/${cat.toLowerCase()}`)}
                                        sx={{
                                            background: category?.toLowerCase() === cat.toLowerCase()
                                                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                                                : 'rgba(99, 102, 241, 0.1)',
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '1rem',
                                            py: 2.5,
                                            px: 2,
                                            cursor: 'pointer',
                                            border: category?.toLowerCase() === cat.toLowerCase()
                                                ? 'none'
                                                : '1px solid rgba(99, 102, 241, 0.3)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* Products Grid */}
                        {filteredProducts.length === 0 ? (
                            <Alert
                                severity="info"
                                sx={{
                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                                    border: '1px solid rgba(99, 102, 241, 0.3)',
                                    borderRadius: 2,
                                }}
                            >
                                No products found in this category.
                            </Alert>
                        ) : (
                            <Grid container spacing={3}>
                                {filteredProducts.map((product, index) => (
                                    <Grid
                                        item
                                        key={product._id}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                    >
                                        <Fade in timeout={300 + index * 100}>
                                            <div>
                                                <ProductCard product={product} />
                                            </div>
                                        </Fade>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Category;
