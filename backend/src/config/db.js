const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB not connected (running without DB): ${error.message}`);
    // Don't exit — server still works for email sending
  }
};

module.exports = connectDB;
