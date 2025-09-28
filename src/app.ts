import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Auth/authRoutes";
import blogRoutes from "./blog/blogRoutes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Tahsina Tnvin here!");
});
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

export default app;
