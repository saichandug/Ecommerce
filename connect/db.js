const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB;