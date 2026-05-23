"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, min: 0, default: 0 },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true }
}, { timestamps: true });
const Activity = (0, mongoose_1.model)("Activity", activitySchema);
exports.default = Activity;
