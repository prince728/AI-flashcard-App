const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(process.env.MongoURI);
        console.log("Database is connected successfully");

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB


