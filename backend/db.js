import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin-huyhoang:123@cluster0.e0cvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectToDatabase;
