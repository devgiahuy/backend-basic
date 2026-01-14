import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING!);
    console.log("Connect successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // exit process with failure 1 fail - 0 success
  }
};
