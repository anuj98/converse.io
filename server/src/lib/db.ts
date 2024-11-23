import mongoose from "mongoose";

/**
 * This the the library method to create a connection to MongoDB
 */
export const connectDB = async () => {
  try {
    const mongoConnectionString: string = process.env.MONGODB_URI ?? "";
    const mongooseObject = await mongoose.connect(mongoConnectionString);
    console.log("Connected to MongoDB host: ", mongooseObject.connection.host);
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};
