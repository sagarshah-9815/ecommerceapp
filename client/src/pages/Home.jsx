import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import {
    Container,
    Grid,
    Typography,
    CircularProgress,
    Alert,
    Box,
    ToggleButtonGroup,
    ToggleButton,
    Button,
    Fade,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Home = () => {
    const { products, loading, error, isAdmin } = useProducts();
    const [view, setView] = useState('grid');
    const navigate = useNavigate();

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setView(newView);
        }
    };

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
                <Box
                    sx={{
                        position: 'relative',
                        display: 'inline-flex',
                    }}
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
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <RocketLaunchIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />
                    </Box>
                </Box>
                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    Loading amazing products...
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
                        <Box
                            display="flex"
                            flexDirection={{ xs: 'column', md: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ xs: 'start', md: 'center' }}
                            mb={6}
                            gap={3}
                        >
                            <Box>
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    gutterBottom
                                    sx={{
                                        fontWeight: 800,
                                        background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        letterSpacing: '-0.02em',
                                        mb: 1,
                                    }}
                                >
                                    Discover Products
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: 400,
                                    }}
                                >
                                    Explore our curated collection of premium items
                                </Typography>
                            </Box>

                            <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
                                <ToggleButtonGroup
                                    value={view}
                                    exclusive
                                    onChange={handleViewChange}
                                    aria-label="view mode"
                                    sx={{
                                        background: 'rgba(30, 41, 59, 0.6)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: 2,
                                        '& .MuiToggleButton-root': {
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            border: 'none',
                                            '&.Mui-selected': {
                                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                                color: 'white',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <ToggleButton value="grid" aria-label="grid view">
                                        <ViewModuleIcon />
                                    </ToggleButton>
                                    <ToggleButton value="list" aria-label="list view">
                                        <ViewListIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>

                                {isAdmin && (
                                    <Button
                                        variant="contained"
                                        startIcon={<AdminPanelSettingsIcon />}
                                        onClick={() => navigate('/admin')}
                                        sx={{
                                            background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                                            fontWeight: 600,
                                            px: 3,
                                            py: 1.5,
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
                                                boxShadow: '0 8px 20px rgba(236, 72, 153, 0.4)',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        Admin Panel
                                    </Button>
                                )}
                            </Box>
                        </Box>

                        {/* Products Grid */}
                        {products.length === 0 ? (
                            <Alert
                                severity="info"
                                sx={{
                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                                    border: '1px solid rgba(99, 102, 241, 0.3)',
                                    borderRadius: 2,
                                }}
                            >
                                No products available. {isAdmin && 'Add your first product to get started!'}
                            </Alert>
                        ) : (
                            <Grid container spacing={3}>
                                {products.map((product, index) => (
                                    <Grid
                                        key={product._id}
                                        size={{
                                            xs: 12,
                                            sm: view === 'grid' ? 6 : 12,
                                            md: view === 'grid' ? 4 : 12,
                                            lg: view === 'grid' ? 3 : 12
                                        }}
                                    >
                                        <Fade in timeout={300 + index * 100}>
                                            <div style={{ height: '100%' }}>
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

export default Home;
