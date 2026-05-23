import express from "express";
import { connectDatabase, MONGO_URI } from "./config/database";
import usersRouter from "./routes/users";
import teamsRouter from "./routes/teams";
import activitiesRouter from "./routes/activity";
import workoutsRouter from "./routes/workouts";
import leaderboardRouter from "./routes/leaderboard";

const PORT = 8000;

const app = express();
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/workouts", workoutsRouter);
app.use("/api/leaderboard", leaderboardRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "OctoFit Tracker backend is running." });
});

connectDatabase()
  .then(() => {
    const CODESPACE_NAME = 'bug-free-goggles-77vv9pjvgj3r676'
    const baseUrl = CODESPACE_NAME
      ? `https://${CODESPACE_NAME}-8000.app.github.dev`
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
