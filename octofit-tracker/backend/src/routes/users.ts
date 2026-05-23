import { Router } from "express";
import User from "../models/user";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ users });
});

router.post("/", async (req, res) => {
  const { name, email, passwordHash, age, weightKg, goals, team } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Missing required fields: name and email." });
  }

  const user = await User.create({ name, email, passwordHash, age, weightKg, goals, team });
  res.status(201).json({ user });
});

export default router;
