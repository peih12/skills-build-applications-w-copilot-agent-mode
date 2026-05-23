import mongoose from "mongoose";
import { MONGO_URI } from "../config/database";
import User from "../models/user";
import Team from "../models/team";
import Activity from "../models/activity";
import Workout from "../models/workout";
import LeaderboardEntry from "../models/leaderboard";

async function seed() {
  console.log("Seed the octofit_db database with test data");

  await mongoose.connect(MONGO_URI);

  try {
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({})
    ]);

    const users = await User.create([
      {
        name: "Avery Walker",
        email: "avery.walker@example.com",
        passwordHash: "hashed-password-1",
        age: 28,
        weightKg: 68,
        goals: "Increase strength and run a half marathon"
      },
      {
        name: "Noah Kim",
        email: "noah.kim@example.com",
        passwordHash: "hashed-password-2",
        age: 32,
        weightKg: 76,
        goals: "Improve endurance and lose body fat"
      },
      {
        name: "Mia Patel",
        email: "mia.patel@example.com",
        passwordHash: "hashed-password-3",
        age: 24,
        weightKg: 61,
        goals: "Build muscle and stay active"
      },
      {
        name: "Luca Rossi",
        email: "luca.rossi@example.com",
        passwordHash: "hashed-password-4",
        age: 29,
        weightKg: 82,
        goals: "Train for a cycling challenge"
      }
    ]);

    const teams = await Team.create([
      {
        name: "Coastal Crushers",
        description: "A high-energy crew focused on interval training and outdoor runs.",
        members: [users[0]._id, users[1]._id]
      },
      {
        name: "Peak Performers",
        description: "Strength and mobility team training for long-term gains.",
        members: [users[2]._id, users[3]._id]
      }
    ]);

    await User.updateMany(
      { _id: { $in: [users[0]._id, users[1]._id] } },
      { team: teams[0]._id }
    );
    await User.updateMany(
      { _id: { $in: [users[2]._id, users[3]._id] } },
      { team: teams[1]._id }
    );

    const activities = await Activity.create([
      {
        name: "Morning Run",
        type: "Cardio",
        durationMinutes: 35,
        caloriesBurned: 420,
        date: new Date(),
        notes: "Steady pace with a hill interval finish.",
        user: users[0]._id,
        team: teams[0]._id
      },
      {
        name: "Strength Circuit",
        type: "Strength",
        durationMinutes: 50,
        caloriesBurned: 380,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24),
        notes: "Focused on legs, core, and mobility.",
        user: users[2]._id,
        team: teams[1]._id
      },
      {
        name: "Cycling Intervals",
        type: "Cardio",
        durationMinutes: 45,
        caloriesBurned: 510,
        date: new Date(Date.now() - 1000 * 60 * 60 * 48),
        notes: "Short hard efforts with easy recovery.",
        user: users[3]._id,
        team: teams[1]._id
      }
    ]);

    const workouts = await Workout.create([
      {
        title: "Upper Body Push",
        description: "A strength workout focused on chest, shoulders, and triceps.",
        difficulty: "Challenging",
        durationMinutes: 45,
        exercises: [
          { name: "Bench Press", sets: 4, reps: 8 },
          { name: "Overhead Press", sets: 3, reps: 10 },
          { name: "Triceps Dips", sets: 3, reps: 15 }
        ]
      },
      {
        title: "Recovery Ride",
        description: "Easy-paced cycling to promote recovery and maintain cadence.",
        difficulty: "Easy",
        durationMinutes: 30,
        exercises: [{ name: "Cycling", durationMinutes: 30 }],
        scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24)
      }
    ]);

    const leaderboard = await LeaderboardEntry.create([
      {
        user: users[0]._id,
        team: teams[0]._id,
        score: 1420,
        rank: 1,
        period: "Weekly"
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        score: 1285,
        rank: 2,
        period: "Weekly"
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        score: 1340,
        rank: 3,
        period: "Weekly"
      }
    ]);

    console.log(`Created ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${workouts.length} workouts, and ${leaderboard.length} leaderboard entries.`);
  } catch (error) {
    console.error("Seed script failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}

seed();
