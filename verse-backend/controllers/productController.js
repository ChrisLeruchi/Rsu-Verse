const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
    try {
        const productData = { ...req.body };
        if (!productData.productId) {
            productData.productId = `rsu-verse-${Math.random().toString(36).substr(2, 9)}`;
        }

        const newProduct = await Product.create(productData);

        res.status(201).json({
            status: 'success',
            message: 'Marketplace item pushed to feed! 🛒🔥',
            data: newProduct
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        let filterCriteria = {};

        if (req.query.category) {
            filterCriteria['marketPlace.category'] = req.query.category;
        }

        if (req.query.faculty) {
            filterCriteria['author.faculty'] = req.query.faculty;
        }

        if (req.query.search) {
            filterCriteria['content.text'] = { $regex: req.query.search, $options: 'i' };
        }

        const products = await Product.find(filterCriteria).sort({ 'meta.createdAt': -1 });
        res.status(200).json(products); 
    } catch (error) {
        next(error);
    }
};