import { Schema, model, Document, Types } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  age?: number;
  weightKg?: number;
  goals?: string;
  team?: Types.ObjectId | null;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    passwordHash: { type: String, trim: true, default: "" },
    age: { type: Number, min: 0 },
    weightKg: { type: Number, min: 0 },
    goals: { type: String, trim: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", default: null }
  },
  { timestamps: true }
);

const User = model<UserDocument>("User", userSchema);
export default User;
