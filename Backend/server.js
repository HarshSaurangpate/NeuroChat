import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

app.post("/api/chat", verifyToken, (req, res) => {
  // Only logged-in users can chat
});

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

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
//     },
//     body: JSON.stringify({
//         model: "llama-3.1-8b-instant",
//         messages: [{
//            role: "user",
//            content: req.body.message
//         }]
//     })
//   };

//   try {
//     const response = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
//     const data = await response.json();
//     //console.log(data.choices[0].message.content);
    
//     res.json(data);

//   } catch(err) {
//     console.log(err);
//   }
// });

