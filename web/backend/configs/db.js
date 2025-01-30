import dotenv from "dotenv";
dotenv.config({});

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://0.0.0.0:27017/test-shopify-app"
    );

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("Mongo DB not connected: ", error);
    process.exit();
  }
};

export default connectDB;
