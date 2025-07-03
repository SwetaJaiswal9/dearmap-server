import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

app.use(cors());

app.get("/api/places/search", async (req, res) => {
  try {
    const response = await axios.get(
      "https://places-api.foursquare.com/places/search",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.FSQ_API_KEY}`,
          "X-Places-Api-Version": "2025-06-17",
        },
        params: req.query,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Proxy failed" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
