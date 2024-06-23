
const { renderBuyNow } = require('../controller/orders.controller');
const Product = require('../models/products.models.js');
const Order = require('../models/orders.models.js');
const express = require('express');
const routes = express.Router();

// POST route for confirming an order
routes.get('/buy-now',renderBuyNow);

routes.get('/order-success' , (req,res) => {
    res.render('order-success');
})

routes.get('/orders', async (req, res) => {
    try {
        const userId = req.session.user._id;

        // Fetch orders for the current user
        const orders = await Order.find({ userId: userId });

        res.render('view-orders', { orders: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = routes;
