const mongoose = require('mongoose');
const url = 'mongodb+srv://predcodes695:Malazaid12@pred.di4bipz.mongodb.net/ecomm';
// const url = 'mongodb://localhost:27017/Auth';
const express = require('express');
const app = express();
const connect = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("DB Connection unsuccessful:", err);
    }
};
connect();