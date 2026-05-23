import { Schema, model, Document } from "mongoose";

export interface ActivityDocument extends Document {
  name: string;
  type: string;
  durationMinutes: number;
  caloriesBurned?: number;
  date: Date;
  notes?: string;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, min: 0, default: 0 },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

const Activity = model<ActivityDocument>("Activity", activitySchema);
export default Activity;
