import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        console.log("Raw MONGO_DB_URI:", process.env.MONGO_DB_URI);  // Debugging step
        if (!process.env.MONGO_DB_URI) {
            throw new Error("MONGO_DB_URI is undefined! Check .env file.");
        }

        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error Connecting to MongoDB:", error.message);
    }
};

export default connectToMongoDB;
