import { Router } from "express";
import Workout from "../models/workout";

const router = Router();

router.get("/", async (req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.json({ workouts });
});

router.post("/", async (req, res) => {
  const { title, description, difficulty, durationMinutes, exercises, scheduledDate } = req.body;
  if (!title || durationMinutes == null) {
    return res.status(400).json({ error: "Missing required fields: title and durationMinutes." });
  }

  const workout = await Workout.create({
    title,
    description,
    difficulty: difficulty ?? "Moderate",
    durationMinutes,
    exercises: exercises ?? [],
    scheduledDate
  });

  res.status(201).json({ workout });
});

export default router;
