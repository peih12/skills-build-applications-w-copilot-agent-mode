import express from "express";
import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/octofit";
const PORT = 8000;

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "OctoFit Tracker backend is running." });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB at", MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
