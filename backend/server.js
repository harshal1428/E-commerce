const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); // Import the path module
const connectDB = require('./config/db');
const cors = require('cors');
const passport = require('./passport');
const session = require('express-session');

// Load env vars with an explicit path to be certain
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Express session
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));



// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

