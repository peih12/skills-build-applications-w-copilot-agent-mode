import { Schema, model, Document, Types } from "mongoose";

export interface TeamDocument extends Document {
  name: string;
  description?: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

const Team = model<TeamDocument>("Team", teamSchema);
export default Team;
