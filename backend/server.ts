import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routeRoutes from "./src/routes/routeRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(cors());
app.use(express.json());

app.use("/api/routes", routeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.BACKEND_URL}`);
});
