import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, Menu, MenuItem, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StoreIcon from '@mui/icons-material/Store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Navbar = () => {
    const navigate = useNavigate();
    const { setIsAdmin } = useProducts();
    const { user, logout, isAuthenticated } = useAuth();
    const { itemCount } = useCart();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        navigate('/');
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ py: 1 }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            cursor: 'pointer',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                        onClick={() => navigate('/')}
                    >
                        <Box
                            sx={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                borderRadius: '12px',
                                p: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                            }}
                        >
                            <StoreIcon sx={{ fontSize: 28, color: 'white' }} />
                        </Box>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            E-Commerce Store
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/')}
                            sx={{
                                fontWeight: 600,
                                fontSize: '1rem',
                                '&:hover': {
                                    background: 'rgba(99, 102, 241, 0.1)',
                                },
                            }}
                        >
                            Products
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => navigate('/categories')}
                            sx={{
                                fontWeight: 600,
                                fontSize: '1rem',
                                '&:hover': {
                                    background: 'rgba(99, 102, 241, 0.1)',
                                },
                            }}
                        >
                            Categories
                        </Button>
                    </Box>

                    <Box display="flex" alignItems="center" gap={2}>
                        {isAuthenticated ? (
                            <>
                                {/* Only show cart icon for non-admin users */}
                                {user?.role !== 'admin' && (
                                    <IconButton
                                        color="inherit"
                                        onClick={() => navigate('/cart')}
                                        sx={{
                                            '&:hover': {
                                                background: 'rgba(99, 102, 241, 0.1)',
                                            },
                                        }}
                                    >
                                        <Badge badgeContent={itemCount} color="secondary">
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>
                                )}

                                <IconButton
                                    color="inherit"
                                    onClick={handleMenu}
                                    sx={{
                                        '&:hover': {
                                            background: 'rgba(99, 102, 241, 0.1)',
                                        },
                                    }}
                                >
                                    <AccountCircleIcon />
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    PaperProps={{
                                        sx: {
                                            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    <MenuItem disabled>
                                        <Typography variant="body2" color="text.secondary">
                                            {user?.name}
                                        </Typography>
                                    </MenuItem>

                                    {user?.role === 'admin' ? (
                                        <>
                                            <MenuItem onClick={() => { handleClose(); navigate('/admin'); }}>
                                                <AdminPanelSettingsIcon sx={{ mr: 1 }} fontSize="small" />
                                                Admin Dashboard
                                            </MenuItem>
                                            <MenuItem onClick={() => { handleClose(); navigate('/admin/users'); }}>
                                                <AccountCircleIcon sx={{ mr: 1 }} fontSize="small" />
                                                Manage Users
                                            </MenuItem>
                                            <MenuItem onClick={() => { handleClose(); navigate('/admin/all-orders'); }}>
                                                <ReceiptIcon sx={{ mr: 1 }} fontSize="small" />
                                                All Orders
                                            </MenuItem>
                                        </>
                                    ) : (
                                        <MenuItem onClick={() => { handleClose(); navigate('/orders'); }}>
                                            <ReceiptIcon sx={{ mr: 1 }} fontSize="small" />
                                            My Orders
                                        </MenuItem>
                                    )}

                                    <MenuItem onClick={handleLogout}>
                                        <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        borderColor: 'rgba(99, 102, 241, 0.5)',
                                        color: 'white',
                                        fontWeight: 600,
                                        '&:hover': {
                                            borderColor: '#6366f1',
                                            background: 'rgba(99, 102, 241, 0.1)',
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/register')}
                                    sx={{
                                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                        fontWeight: 600,
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                                        },
                                    }}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
