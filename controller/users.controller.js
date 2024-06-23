const User = require('../models/users.models.js');
const bcrypt = require('bcrypt');

const getLogin = (req, res) => {
    res.render('login', { message: "" });
};

const getSignUp = (req, res) => {
    res.render('signup', { message: "" });
};

const userReg = async (req, res) => {
    try {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone
        };

        const userExist = await User.findOne({ username: data.username });

        if (userExist) {
            // User already exists, redirect to signup page with a message
            return res.status(409).render('signup', { message: "User already exists, try another username" });
        }

        // Hash the password using bcrypt
        const saltrounds = 10;
        const bcryptPassword = await bcrypt.hash(data.password, saltrounds);

        // Create the user
        const userData = await User.create({
            username: data.username,
            email: data.email,
            password: bcryptPassword,
            address: data.address,
            phone: data.phone
        });

        console.log(userData);
        res.redirect('/login'); // Redirect to login page on successful signup
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const check = await User.findOne({ username: req.body.username });

        if (!check) {
            // User not found, redirect to login page with a message
            return res.status(404).render('login', { message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

        if (isPasswordMatch) {
            // Set user information in session
            req.session.user = {
                _id: check._id,
                username: check.username,
                email: check.email,
                address: check.address,
                phone: check.phone
            };
            res.redirect('/home');
        } else {
            // Incorrect password, redirect to login page with a message
            res.status(401).render('login', { message: "Incorrect password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHome = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('home', { userId: req.session.user._id, name: req.session.user.username });
};

const getbuyNow = (req,res) =>{
    res.render('buy-now' , {userId : req.session.user._id , username : req.session.user.username , email : req.session.user.email, address : req.session.user.address , phone : req.session.user.phone });
}

module.exports = { getLogin, getSignUp, userReg, userLogin, getHome ,getbuyNow };
