"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const activities = await activity_1.default.find().sort({ date: -1 });
        res.json(activities);
    }
    catch (error) {
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
        const activity = await activity_1.default.create({
            name,
            type,
            durationMinutes,
            caloriesBurned,
            date,
            notes,
        });
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create activity." });
    }
});
exports.default = router;
