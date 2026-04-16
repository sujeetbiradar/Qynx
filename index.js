import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://railway.app",
        "X-Title": "Qynx AI"
      },
      body: JSON.stringify({
        model: "xiaomi/mimo-v2-flash:free",
        messages: [
          {
            role: "system",
            content: "You are Qynx A very smart AI developed by Enli Which is owned by Saarth Sujeet Parkers"
          {
          role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (e) {
    res.status(500).json({ error: "Qynx failed to respond" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Qynx AI server running");
});
