import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { createProduct } from '../services/productService';
import {
    Container,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';

const AddProduct = () => {
    const navigate = useNavigate();
    const { fetchProducts } = useProducts();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        stock: '',
        imageUrl: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Product name is required';
        }

        if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
            newErrors.price = 'Valid price is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.category.trim()) {
            newErrors.category = 'Category is required';
        }

        if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0) {
            newErrors.stock = 'Valid stock quantity is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const productData = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
            };

            await createProduct(productData);
            setSuccess(true);
            await fetchProducts();

            setTimeout(() => {
                navigate('/admin');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/admin')}
                sx={{ mb: 3 }}
            >
                Back to Admin
            </Button>

            <Card>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Add New Product
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Product created successfully!
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            error={!!errors.price}
                            helperText={errors.price}
                            margin="normal"
                            required
                            inputProps={{ step: '0.01', min: '0' }}
                        />

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            margin="normal"
                            required
                            multiline
                            rows={4}
                        />

                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            error={!!errors.category}
                            helperText={errors.category}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Stock Quantity"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            error={!!errors.stock}
                            helperText={errors.stock}
                            margin="normal"
                            required
                            inputProps={{ min: '0' }}
                        />

                        <TextField
                            fullWidth
                            label="Image URL"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            margin="normal"
                            helperText="Enter a valid image URL (e.g., from Unsplash, Imgur, etc.)"
                            placeholder="https://example.com/image.jpg"
                        />

                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                                disabled={loading}
                                fullWidth
                            >
                                {loading ? 'Creating...' : 'Create Product'}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/admin')}
                                disabled={loading}
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AddProduct;
