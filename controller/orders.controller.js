const Order = require('../models/orders.models.js');
const User = require('../models/users.models.js');
const Product = require('../models/products.models.js');

// controllers/orders.controller.js

const renderBuyNow = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userId = req.session.user._id; // Get the userId from session
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const productId = req.query.productId; // Get the productId from query parameters
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.render('buy-now', { user: user, product: product });
    } catch (error) {
        console.error('Error rendering buy-now:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { renderBuyNow };

