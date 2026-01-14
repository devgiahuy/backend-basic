import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./route/userRoutes";
import User from "./models/User";

dotenv.config();

const app = express();
const PORT = 5001;

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING!);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

async function bootstrap() {
  await connectDB();

  app.use("/api", userRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

bootstrap();
