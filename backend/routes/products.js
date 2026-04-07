const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const Product = require('../models/Product');

// @route   GET api/products
// @desc    Get all products with filtering, sorting, and pagination
// @access  Public
router.get('/', async (req, res) => {
    try {
        // Extract query parameters
        const {
            page = 1,
            limit = 12,
            category,
            minPrice,
            maxPrice,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            isActive = true,
            isFeatured
        } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (minPrice) filter.price = { ...filter.price, $gte: minPrice };
        if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };
        if (isActive) filter.isActive = isActive;
        if (isFeatured) filter.isFeatured = isFeatured;
                

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Create query
        let query = Product.find(filter).populate('createdBy', 'name email');

        // Add text search if provided
        if (search) {
            query = Product.find({
                ...filter,
                $text: { $search: search }
            }).populate('createdBy', 'name email');
        }

                // Apply sorting and pagination
        const products = await query
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        


        // Get total count for pagination
        const total = await Product.countDocuments(search ? {
            ...filter,
            $text: { $search: search }
        } : filter);



        res.json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        });
    } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server Error');
    }
});

;

// @route   GET api/products/categories
// @desc    Get all product categories
// @access  Public
router.get('/categories/list', async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/products/featured
// @desc    Get featured products
// @access  Public
router.get('/featured/list', async (req, res) => {
    try {
        const { limit = 8 } = req.query;
        const products = await Product.find({ isFeatured: true, isActive: true })
            .populate('createdBy', 'name email')
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('createdBy', 'name email');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/products
// @desc    Create a product
// @access  Private (User can create products)
router.post('/', auth, async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        images,
        category,
        subcategory,
        brand,
        stock,
        sku,
        weight,
        dimensions,
        tags,
        features,
        discount
    } = req.body;

    try {
        const newProduct = new Product({
            name,
            price,
            description,
            image,
            images,
            category,
            subcategory,
            brand,
            stock: stock || 0,
            sku,
            weight,
            dimensions,
            tags,
            features,
            discount,
            createdBy: req.user.id
        });

        const product = await newProduct.save();
        await product.populate('createdBy', 'name email');
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'SKU already exists' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private (Owner or Admin)
router.put('/:id', auth, async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        images,
        category,
        subcategory,
        brand,
        stock,
        sku,
        weight,
        dimensions,
        tags,
        features,
        isActive,
        isFeatured,
        discount
    } = req.body;

    try {
        let product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Check if user owns the product or is admin
        if (product.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Build product object
        const productFields = {};
        if (name !== undefined) productFields.name = name;
        if (price !== undefined) productFields.price = price;
        if (description !== undefined) productFields.description = description;
        if (image !== undefined) productFields.image = image;
        if (images !== undefined) productFields.images = images;
        if (category !== undefined) productFields.category = category;
        if (subcategory !== undefined) productFields.subcategory = subcategory;
        if (brand !== undefined) productFields.brand = brand;
        if (stock !== undefined) productFields.stock = stock;
        if (sku !== undefined) productFields.sku = sku;
        if (weight !== undefined) productFields.weight = weight;
        if (dimensions !== undefined) productFields.dimensions = dimensions;
        if (tags !== undefined) productFields.tags = tags;
        if (features !== undefined) productFields.features = features;
        if (isActive !== undefined) productFields.isActive = isActive;
        if (isFeatured !== undefined) productFields.isFeatured = isFeatured;
        if (discount !== undefined) productFields.discount = discount;

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: productFields },
            { new: true }
        ).populate('createdBy', 'name email');

        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'SKU already exists' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private (Owner or Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Check if user owns the product or is admin
        if (product.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Product.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/products/:id/rating
// @desc    Add/Update product rating
// @access  Private
router.post('/:id/rating', auth, async (req, res) => {
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }

    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // For simplicity, just update the average and count
        // In a real app, you'd store individual ratings
        const newCount = product.rating.count + 1;
        const newAverage = ((product.rating.average * product.rating.count) + rating) / newCount;

        product.rating.average = Math.round(newAverage * 10) / 10; // Round to 1 decimal
        product.rating.count = newCount;

        await product.save();

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Like a product
router.post('/:id/like', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    // For demo: just increment a like count (add a field if needed)
    product.likes = (product.likes || 0) + 1;
    await product.save();
    res.json({ likes: product.likes });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Rate a product
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { rating } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    // Simple average rating logic
    product.rating.average = ((product.rating.average * product.rating.count) + rating) / (product.rating.count + 1);
    product.rating.count += 1;
    await product.save();
    res.json({ rating: product.rating });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;