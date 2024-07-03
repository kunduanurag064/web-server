// db.js

const mongoose = require('mongoose');
require('dotenv').config()


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://anuragkundu064:23001602016@articles.rxwsdp2.mongodb.net/?retryWrites=true&w=majority&appName=articles");
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB();

