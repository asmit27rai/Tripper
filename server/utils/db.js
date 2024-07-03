const mongoose = require("mongoose");

const URI = process.env.MONGO_URL
const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connected To DB...")
    } catch (error) {
        console.error("Database Connection Failed");
        process.exit(0);
    }
};

module.exports = connectDB;