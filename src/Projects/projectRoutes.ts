import { Router } from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "./projectController";
import { protect, adminOnly } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", protect, adminOnly, createProject);
router.put("/:id", protect, adminOnly, updateProject);
router.delete("/:id", protect, adminOnly, deleteProject);

export default router;
