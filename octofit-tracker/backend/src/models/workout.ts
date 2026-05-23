import { Schema, model, Document } from "mongoose";

export interface WorkoutExercise {
  name: string;
  sets?: number;
  reps?: number;
  durationMinutes?: number;
}

export interface WorkoutDocument extends Document {
  title: string;
  description?: string;
  difficulty: string;
  durationMinutes: number;
  exercises: WorkoutExercise[];
  scheduledDate?: Date;
}

const workoutExerciseSchema = new Schema<WorkoutExercise>(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, min: 1 },
    reps: { type: Number, min: 1 },
    durationMinutes: { type: Number, min: 0 }
  },
  { _id: false }
);

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, required: true, trim: true, default: "Moderate" },
    durationMinutes: { type: Number, required: true, min: 0 },
    exercises: { type: [workoutExerciseSchema], default: [] },
    scheduledDate: { type: Date }
  },
  { timestamps: true }
);

const Workout = model<WorkoutDocument>("Workout", workoutSchema);
export default Workout;
