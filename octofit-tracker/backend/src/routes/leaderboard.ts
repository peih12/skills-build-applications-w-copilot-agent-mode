import { Router } from "express";
import LeaderboardEntry from "../models/leaderboard";

const router = Router();

router.get("/", async (req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate("user team").sort({ score: -1, rank: 1 });
  res.json({ leaderboard });
});

router.post("/", async (req, res) => {
  const { user, team, score, rank, period } = req.body;
  if (!user || score == null || rank == null || !period) {
    return res.status(400).json({ error: "Missing required fields: user, score, rank, and period." });
  }

  const entry = await LeaderboardEntry.create({ user, team, score, rank, period });
  res.status(201).json({ entry });
});

export default router;
