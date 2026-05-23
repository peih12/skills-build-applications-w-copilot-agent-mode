import { Router } from "express";
import Team from "../models/team";

const router = Router();

router.get("/", async (req, res) => {
  const teams = await Team.find().populate("members");
  res.json({ teams });
});

router.post("/", async (req, res) => {
  const { name, description, members } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Missing required field: name." });
  }

  const team = await Team.create({ name, description, members: members ?? [] });
  res.status(201).json({ team });
});

export default router;
