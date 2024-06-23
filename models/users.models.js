const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
});

const collection = new mongoose.model('Users',userSchema);

module.exports = collection;