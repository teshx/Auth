import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongodb is connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error :", error);
  }
};
