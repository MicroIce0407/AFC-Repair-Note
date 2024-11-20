import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routeRoutes from "./src/routes/routeRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error(
    "MongoDB URI is not defined. Please check your environment variables."
  );
  process.exit(1); // 結束程序，因為沒有連接資料庫的 URI
}

mongoose
  .connect(mongoURI)
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
