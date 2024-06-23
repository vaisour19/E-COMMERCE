const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
