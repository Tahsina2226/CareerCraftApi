import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Auth/authRoutes";
import blogRoutes from "./blog/blogRoutes";
import projectRoutes from "./projects/projectRoutes";
import dashboardRoutes from "./dashboard/dashboardRoutes"; 
import { protect, adminOnly } from "./middlewares/authMiddleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Tahsina Tanvin Portfolio Backend Running!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", protect, adminOnly, dashboardRoutes);

app.get("/api/admin/dashboard", protect, adminOnly, (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome Admin!" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Something went wrong on the server." });
});

export default app;
