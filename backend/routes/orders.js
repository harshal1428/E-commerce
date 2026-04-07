const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Get user's orders
router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product');
  res.json(orders);
});

// Place an order (from cart)
router.post('/place', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if (!cart || cart.items.length === 0) return res.status(400).json({ msg: 'Cart is empty' });
  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const order = new Order({
    user: req.user.id,
    items: cart.items.map(i => ({ product: i.product._id, quantity: i.quantity })),
    total
  });
  await order.save();
  cart.items = [];
  await cart.save();
  res.json(order);
});

module.exports = router;
