const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Wishlist = require('../models/Wishlist');

// Get user's wishlist
router.get('/', auth, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
  res.json(wishlist || { products: [] });
});

// Add product to wishlist
router.post('/add', auth, async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user.id });
  if (!wishlist) wishlist = new Wishlist({ user: req.user.id, products: [] });
  if (!wishlist.products.includes(productId)) {
    wishlist.products.push(productId);
  }
  await wishlist.save();
  res.json(wishlist);
});

// Remove product from wishlist
router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user.id });
  if (!wishlist) return res.json({ products: [] });
  wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
  await wishlist.save();
  res.json(wishlist);
});

module.exports = router;
