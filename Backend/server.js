import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);


// ✅ Root route (FIX)
app.get("/", (req, res) => {
  res.send("NeuroChat Backend is Running 🚀");
});

// ✅ API routes
app.use("/api", chatRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
});

// ✅ DB connection
const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
  } catch (err) {
    console.log("Failed to connect with Db", err);
  }
}

