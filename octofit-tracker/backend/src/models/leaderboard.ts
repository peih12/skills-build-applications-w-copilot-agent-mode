import { Schema, model, Document, Types } from "mongoose";

export interface LeaderboardEntryDocument extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId | null;
  score: number;
  rank: number;
  period: string;
}

const leaderboardSchema = new Schema<LeaderboardEntryDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", default: null },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const LeaderboardEntry = model<LeaderboardEntryDocument>("LeaderboardEntry", leaderboardSchema);
export default LeaderboardEntry;
