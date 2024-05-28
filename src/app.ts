import express from "express";
import mongoose from "mongoose";
import { setupSwagger } from "./swagger";
import columnRoutes from "./routes/columnRoutes";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", columnRoutes);
app.use("/api", taskRoutes);
app.use(errorHandler);

setupSwagger(app);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error);
  });
