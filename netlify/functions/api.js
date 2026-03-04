const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

dotenv.config();

const authRoutes = require("../../src/routes/auth");
const issueRoutes = require("../../src/routes/issues");
const staffRoutes = require("../../src/routes/staffs");
const commentRoutes = require("../../src/routes/comment");
const adminRoutes = require("../../src/routes/admin");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/staffs", staffRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

const MONGO_URL = process.env.MONGO_URL;

let conn = null;

const connectDB = async () => {
  if (conn == null) {
    conn = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return conn;
};

module.exports.handler = async (event, context) => {
  await connectDB();
  const handler = serverless(app);
  return handler(event, context);
};