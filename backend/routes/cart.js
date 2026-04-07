const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Get user's cart
router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  res.json(cart || { items: [] });
});

// Add product to cart
router.post('/add', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  
  // Validate input
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ msg: 'Invalid product ID' });
  }
  
  const qty = parseInt(quantity) || 1;
  if (qty < 1 || qty > 100) {
    return res.status(400).json({ msg: 'Quantity must be between 1 and 100' });
  }
  
  // Check if product exists and is active
  const product = await Product.findById(productId);
  if (!product || !product.isActive) {
    return res.status(404).json({ msg: 'Product not found or inactive' });
  }
  
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = new Cart({ user: req.user.id, items: [] });
  const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += qty;
  } else {
    cart.items.push({ product: productId, quantity: qty });
  }
  await cart.save();
  res.json(cart);
});

// Remove product from cart
router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.json({ items: [] });
  cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await cart.save();
  res.json(cart);
});

module.exports = router;
