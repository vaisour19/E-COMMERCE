const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : false
    }
});

module.exports = new mongoose.model("products",ProductSchema);