import express from "express";
import mongoose from "mongoose";
import activityRouter from "./routes/activity";

const PORT = 8000;
const MONGO_DB = process.env.MONGO_DB || "octofit_db";
const MONGO_URI = `mongodb://127.0.0.1:27017/${MONGO_DB}`;

const app = express();
app.use(express.json());
app.use("/api/activities", activityRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "OctoFit Tracker backend is running." });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : `http://localhost:${PORT}`;

    console.log("Connected to MongoDB at", MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Backend running at ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });
