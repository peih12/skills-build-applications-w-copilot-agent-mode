import mongoose from "mongoose";

const MONGO_DB = process.env.MONGO_DB || "octofit_db";
const MONGO_URI = `mongodb://127.0.0.1:27017/${MONGO_DB}`;

mongoose.set("strictQuery", false);

const connectDatabase = async () => {
  return mongoose.connect(MONGO_URI);
};

export { MONGO_URI, connectDatabase };
