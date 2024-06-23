const express = require('express');
const router = express.Router();
const Product = require('../models/products.models.js');
const mongoose = require('mongoose');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

router.post('/checkout', async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        console.log('Fetching product data from the database...');
        // Fetch product data from the database
        const product = await Product.findById(productId);

        if (!product) {
            console.error('Product not found');
            return res.status(404).send('Product not found');
        }

        console.log('Product found:', product);

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'inr', // Assuming INR as currency
                    product_data: {
                        name: product.name,
                        description: product.description,
                    },
                    unit_amount: product.price * 100, // Price in cents/paise
                },
                quantity: parseInt(quantity),
            }],
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/home`,
        });

        console.log('Stripe session created:', session.id);

        // Send the session ID to the client
        res.json({ id: session.id });

    } catch (error) {
        console.error('Error creating checkout session:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
