const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const sampleProducts = [
    {
        name: 'Wireless Headphones',
        price: 79.99,
        description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        category: 'Electronics',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    },
    {
        name: 'Smart Watch',
        price: 199.99,
        description: 'Feature-packed smartwatch with fitness tracking, heart rate monitor, and smartphone notifications.',
        category: 'Electronics',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    },
    {
        name: 'Laptop Backpack',
        price: 49.99,
        description: 'Durable and stylish laptop backpack with multiple compartments and water-resistant material.',
        category: 'Accessories',
        stock: 100,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    },
    {
        name: 'Mechanical Keyboard',
        price: 129.99,
        description: 'RGB mechanical keyboard with customizable keys and tactile switches for the ultimate typing experience.',
        category: 'Electronics',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    },
    {
        name: 'Wireless Mouse',
        price: 39.99,
        description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
        category: 'Electronics',
        stock: 75,
        imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    },
    {
        name: 'USB-C Hub',
        price: 59.99,
        description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader for enhanced connectivity.',
        category: 'Accessories',
        stock: 60,
        imageUrl: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500',
    },
    {
        name: 'Portable Charger',
        price: 34.99,
        description: '20000mAh portable charger with fast charging support for all your devices.',
        category: 'Accessories',
        stock: 120,
        imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    },
    {
        name: 'Bluetooth Speaker',
        price: 89.99,
        description: 'Waterproof Bluetooth speaker with 360-degree sound and 12-hour playtime.',
        category: 'Electronics',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    },
    {
        name: 'Phone Stand',
        price: 19.99,
        description: 'Adjustable phone stand with sturdy aluminum construction for desk or bedside use.',
        category: 'Accessories',
        stock: 150,
        imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
    },
    {
        name: 'Webcam HD',
        price: 69.99,
        description: '1080p HD webcam with auto-focus and built-in microphone for video calls and streaming.',
        category: 'Electronics',
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500',
    },
    {
        name: 'Desk Lamp',
        price: 44.99,
        description: 'LED desk lamp with adjustable brightness and color temperature for optimal lighting.',
        category: 'Home',
        stock: 80,
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    },
    {
        name: 'Coffee Mug',
        price: 14.99,
        description: 'Insulated stainless steel coffee mug that keeps drinks hot for 6 hours.',
        category: 'Home',
        stock: 200,
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
    },
];

const sampleAdmin = {
    name: 'Admin User',
    email: 'admin@ecommerce.com',
    password: 'admin123',
    role: 'admin',
};

const importData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();

        // Create admin user
        const admin = await User.create(sampleAdmin);
        console.log('✅ Admin user created');
        console.log('   Email: admin@ecommerce.com');
        console.log('   Password: admin123');

        // Create sample products
        await Product.insertMany(sampleProducts);
        console.log(`✅ ${sampleProducts.length} sample products imported`);

        console.log('\n🎉 Data import successful!');
        process.exit();
    } catch (error) {
        console.error('❌ Error importing data:', error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        console.log('✅ Data destroyed');
        process.exit();
    } catch (error) {
        console.error('❌ Error destroying data:', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
