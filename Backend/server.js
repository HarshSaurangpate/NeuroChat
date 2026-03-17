import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/test", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{
           role: "user",
           content: req.body.message
        }]
    })
  };

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", options);
    const data = await response.json();
    //console.log(data.choices[0].message.content);
    
    res.json(data);

  } catch(err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});