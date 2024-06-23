const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const userRoutes = require('../routes/users.routes.js');
const productRoutes = require('../routes/products.routes.js');
const OrderRoutes = require('../routes/orders.routes.js');
const StripeRoutes = require('../routes/stripe.routes.js');
require('dotenv').config();

const app = express();

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up session middleware
app.use(session({
    secret: 'your_secret_key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('start');
});

app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', OrderRoutes);
app.use('/',StripeRoutes);

const connection_string = process.env.CONNECTION_STRING;

mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
        console.log('SERVER CONNECTED TO PORT 3000');
    });
})
.catch((error) => {
    console.log('MongoDB connection error:', error);
});
