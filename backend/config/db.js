
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('✅MongoDB Connected...');
    console.log('📍Database:', conn.connection.db.databaseName);
    console.log('📍Host:', conn.connection.host);
    console.log('📍Port:', conn.connection.port);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
