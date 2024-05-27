import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import columnRoutes from "./routes/columnRoutes";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", columnRoutes);
app.use("/api", taskRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
