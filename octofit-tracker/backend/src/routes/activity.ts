import { Router } from "express";
import Activity from "../models/activity";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activities." });
  }
});

router.post("/", async (req, res) => {
  const { name, type, durationMinutes, caloriesBurned, date, notes } = req.body;

  if (!name || !type || durationMinutes == null) {
    return res.status(400).json({
      error: "Missing required fields: name, type, and durationMinutes are required.",
    });
  }

  try {
    const activity = await Activity.create({
      name,
      type,
      durationMinutes,
      caloriesBurned,
      date,
      notes,
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to create activity." });
  }
});

export default router;
