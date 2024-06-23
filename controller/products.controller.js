const Product = require('../models/products.models.js');

const getProduct = async (req, res) => {
    try {
        const key = req.query.query; // Correctly get the query parameter named "query"

        // Perform a case-insensitive search using regex
        let results = await Product.find(
            {
                "$or": [
                    { name: { $regex: key, $options: 'i' } },
                    { category: { $regex: key, $options: 'i' } },
                    { description: { $regex: key, $options: 'i' } }
                ]
            }
        );

        res.render('search_results', { results: results });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getSelling = async(req,res) =>
{
    res.render('sell');
};

const postSelling = async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const data = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            description: req.body.description
        };

        const ProductData = await Product.create(data);
        console.log('Product created:', ProductData);
        res.redirect('/home');
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getProductById = async(req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);

        if(!product) return res.status(404).json({message : "no product exists with this id"});

        res.render('poduct_view',{product});
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}


module.exports = {getProduct,getSelling,postSelling,getProductById};