"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = __importDefault(require("./routes/activity"));
const PORT = 8000;
const MONGO_DB = process.env.MONGO_DB || "octofit_db";
const MONGO_URI = `mongodb://127.0.0.1:27017/${MONGO_DB}`;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/activities", activity_1.default);
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "OctoFit Tracker backend is running." });
});
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : `http://localhost:${PORT}`;
    console.log("Connected to MongoDB at", MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Backend running at ${baseUrl}`);
    });
})
    .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
});
