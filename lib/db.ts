import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) {
      console.log("Using existing database connection");
      return;
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("Successfully connected to MongoDB");
  } catch (error: any) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;
