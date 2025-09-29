import { Router } from "express";
import { getDashboardStats } from "./dashboardController";
import { protect, adminOnly } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", protect, adminOnly, getDashboardStats);

export default router;
