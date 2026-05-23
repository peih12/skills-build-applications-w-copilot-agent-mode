import { Schema, model, Document, Types } from "mongoose";

export interface ActivityDocument extends Document {
  name: string;
  type: string;
  durationMinutes: number;
  caloriesBurned?: number;
  date: Date;
  notes?: string;
  user?: Types.ObjectId;
  team?: Types.ObjectId;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, min: 0, default: 0 },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    team: { type: Schema.Types.ObjectId, ref: "Team" }
  },
  { timestamps: true }
);

const Activity = model<ActivityDocument>("Activity", activitySchema);
export default Activity;
