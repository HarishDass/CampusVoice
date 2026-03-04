const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const dns = require("dns");
const serverless = require("serverless-http");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const authRoutes = require("./src/routes/auth");
const issueRoutes = require("./src/routes/issues");
const staffRoutes = require("./src/routes/staffs");
const commentRoutes = require("./src/routes/comment");
const adminRoutes = require("./src/routes/admin");

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

const MONGO_URL = "mongodb+srv://HarishDass:AlQ1gMyxD2UEoLLE@cluster0.zpcjhcf.mongodb.net/?appName=Cluster0";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Mongo connection error", err));

module.exports.handler = serverless(app);
