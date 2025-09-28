import { Router } from "express";
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./blogController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
